import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { databaseUnavailable, jsonError } from "@/lib/api";

const statuses = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

export async function PUT(request, { params }) {
  if (!getAdminSession()) return jsonError("Unauthorized", 401);
  if (!prisma) return databaseUnavailable(new Error("DATABASE_URL is not configured"));
  let body;
  try { body = await request.json(); } catch { return jsonError("Invalid JSON body"); }
  if (!statuses.includes(body.status)) return jsonError("Invalid order status");
  try {
    const order = await prisma.order.update({ where: { id: params.id }, data: { status: body.status } });
    return NextResponse.json({ order });
  } catch (error) {
    if (error?.code === "P2025") return jsonError("Order not found", 404);
    return databaseUnavailable(error);
  }
}
