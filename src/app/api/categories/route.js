import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { databaseUnavailable } from "@/lib/api";

export async function GET() {
  if (!prisma) return databaseUnavailable(new Error("DATABASE_URL is not configured"));
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      include: { _count: { select: { products: { where: { isActive: true } } } } },
    });
    return NextResponse.json({ categories });
  } catch (error) {
    return databaseUnavailable(error);
  }
}
