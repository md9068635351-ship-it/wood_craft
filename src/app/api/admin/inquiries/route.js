import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { databaseUnavailable, jsonError } from "@/lib/api";

export async function GET(request) {
  if (!getAdminSession()) return jsonError("Unauthorized", 401);
  if (!prisma) return databaseUnavailable(new Error("DATABASE_URL is not configured"));
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const type = searchParams.get("type");
  const validStatuses = ["NEW", "IN_PROGRESS", "CLOSED"];
  const validTypes = ["CONTACT", "CUSTOM"];
  try {
    const inquiries = await prisma.inquiry.findMany({
      where: {
        ...(validStatuses.includes(status) ? { status } : {}),
        ...(validTypes.includes(type) ? { type } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    return NextResponse.json({ inquiries });
  } catch (error) {
    return databaseUnavailable(error);
  }
}
