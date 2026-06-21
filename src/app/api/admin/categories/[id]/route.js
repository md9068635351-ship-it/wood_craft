import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { cleanString, databaseUnavailable, jsonError, optionalString, slugify } from "@/lib/api";

export async function PUT(request, { params }) {
  if (!getAdminSession()) return jsonError("Unauthorized", 401);
  if (!prisma) return databaseUnavailable(new Error("DATABASE_URL is not configured"));
  let body;
  try { body = await request.json(); } catch { return jsonError("Invalid JSON body"); }
  const name = cleanString(body.name, 120);
  if (!name) return jsonError("Name is required");
  try {
    const category = await prisma.category.update({ where: { id: params.id }, data: {
      name, slug: slugify(body.slug || name), woodType: optionalString(body.woodType, 120),
      isActive: body.isActive !== false, showOnHome: body.showOnHome !== false,
      sortOrder: Number.isInteger(Number(body.sortOrder)) ? Number(body.sortOrder) : 0,
    } });
    return NextResponse.json({ category });
  } catch (error) {
    if (error?.code === "P2025") return jsonError("Category not found", 404);
    if (error?.code === "P2002") return jsonError("Category name or slug already exists", 409);
    return databaseUnavailable(error);
  }
}

export async function DELETE(_request, { params }) {
  if (!getAdminSession()) return jsonError("Unauthorized", 401);
  if (!prisma) return databaseUnavailable(new Error("DATABASE_URL is not configured"));
  try {
    const count = await prisma.product.count({ where: { categoryId: params.id } });
    if (count) return jsonError("Move or delete products in this category first", 409);
    await prisma.category.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error?.code === "P2025") return jsonError("Category not found", 404);
    return databaseUnavailable(error);
  }
}
