import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { databaseUnavailable, jsonError } from "@/lib/api";

export async function GET(request) {
  if (!getAdminSession()) return jsonError("Unauthorized", 401);
  if (!prisma) return databaseUnavailable(new Error("DATABASE_URL is not configured"));
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const where = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"].includes(status) ? { status } : {};
  try {
    const orders = await prisma.order.findMany({
      where,
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
      take: 500,
    });
    return NextResponse.json({ orders });
  } catch (error) {
    return databaseUnavailable(error);
  }
}

// Orders are created through /api/orders, where prices are loaded from the DB.
export function POST() {
  return jsonError("Use POST /api/orders to create orders", 405);
}
