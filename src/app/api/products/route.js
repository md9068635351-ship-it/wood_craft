import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { databaseUnavailable } from "@/lib/api";

export async function GET(request) {
  if (!prisma) return databaseUnavailable(new Error("DATABASE_URL is not configured"));
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1", 10) || 1);
  const limit = Math.min(50, Math.max(1, Number.parseInt(searchParams.get("limit") || "20", 10) || 20));
  const search = (searchParams.get("search") || "").trim().slice(0, 100);
  const category = (searchParams.get("category") || "").trim();
  const featured = searchParams.get("featured");
  const where = {
    isActive: true,
    ...(category ? { category: { slug: category } } : {}),
    ...(featured === "true" ? { isFeatured: true } : {}),
    ...(search
      ? { OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { woodType: { contains: search, mode: "insensitive" } },
        ] }
      : {}),
  };
  try {
    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        include: { images: { orderBy: { order: "asc" } }, videos: { orderBy: { order: "asc" } }, category: true },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);
    return NextResponse.json({ products, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) {
    return databaseUnavailable(error);
  }
}
