import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { databaseUnavailable, jsonError } from "@/lib/api";

export async function GET(_request, { params }) {
  if (!prisma) return databaseUnavailable(new Error("DATABASE_URL is not configured"));
  try {
    const product = await prisma.product.findFirst({
      where: { slug: params.slug, isActive: true },
      include: { images: { orderBy: { order: "asc" } }, videos: { orderBy: { order: "asc" } }, category: true },
    });
    if (!product) return jsonError("Product not found", 404);
    return NextResponse.json({ product });
  } catch (error) {
    return databaseUnavailable(error);
  }
}
