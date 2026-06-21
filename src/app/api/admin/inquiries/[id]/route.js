import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { cleanString, databaseUnavailable, jsonError } from "@/lib/api";

export async function PATCH(request, { params }) {
  if (!getAdminSession()) return jsonError("Unauthorized", 401);
  if (!prisma) return databaseUnavailable(new Error("DATABASE_URL is not configured"));
  let body;
  try { body = await request.json(); } catch { return jsonError("Invalid JSON body"); }
  if (!["NEW", "IN_PROGRESS", "CLOSED"].includes(body.status)) return jsonError("Invalid inquiry status");
  try {
    const inquiry = await prisma.inquiry.update({
      where: { id: params.id },
      data: { status: body.status, adminNotes: cleanString(body.adminNotes, 2000) || null },
    });
    return NextResponse.json({ inquiry });
  } catch (error) {
    if (error?.code === "P2025") return jsonError("Inquiry not found", 404);
    return databaseUnavailable(error);
  }
}

export async function DELETE(_request, { params }) {
  if (!getAdminSession()) return jsonError("Unauthorized", 401);
  if (!prisma) return databaseUnavailable(new Error("DATABASE_URL is not configured"));
  try {
    await prisma.inquiry.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error?.code === "P2025") return jsonError("Inquiry not found", 404);
    return databaseUnavailable(error);
  }
}
