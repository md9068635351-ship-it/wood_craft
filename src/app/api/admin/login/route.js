import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signAdminToken, COOKIE_NAME } from "@/lib/auth";
import { jsonError } from "@/lib/api";

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return jsonError("Invalid request body"); }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!email || !password) return jsonError("Email and password are required");
  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin || !(await bcrypt.compare(password, admin.password))) return jsonError("Invalid email or password", 401);
    const response = NextResponse.json({ success: true, admin: { id: admin.id, email: admin.email, name: admin.name } });
    response.cookies.set(COOKIE_NAME, signAdminToken({ adminId: admin.id, email: admin.email }), {
      httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, path: "/",
    });
    return response;
  } catch (error) {
    console.error("Admin login failed:", error);
    return jsonError("Login service is temporarily unavailable", 503);
  }
}
