import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { cleanString, databaseUnavailable, jsonError, optionalString, slugify } from "@/lib/api";

export async function GET() {
  if (!getAdminSession()) return jsonError("Unauthorized", 401);
  if (!prisma) return databaseUnavailable(new Error("DATABASE_URL is not configured"));
  try {
    const categories = await prisma.category.findMany({ orderBy: [{ sortOrder: "asc" }, { name: "asc" }], include: { _count: { select: { products: true } } } });
    return NextResponse.json({ categories });
  } catch (error) { return databaseUnavailable(error); }
}

export async function POST(request) {
  if (!getAdminSession()) return jsonError("Unauthorized", 401);
  let body; try { body = await request.json(); } catch { return jsonError("Invalid JSON body"); }
  const name = cleanString(body.name, 120); if (!name) return jsonError("Name is required");
  try {
    const category = await prisma.category.create({ data: { name, slug: slugify(body.slug || name), woodType: optionalString(body.woodType, 120), isActive: body.isActive !== false, showOnHome: body.showOnHome !== false, sortOrder: Number.isInteger(Number(body.sortOrder)) ? Number(body.sortOrder) : 0 } });
    return NextResponse.json({ category }, { status: 201 });
  } catch (error) { if (error?.code === "P2002") return jsonError("Category name or slug already exists", 409); return databaseUnavailable(error); }
}
