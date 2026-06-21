import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cleanString, databaseUnavailable, isEmail, isPhone, jsonError, optionalString } from "@/lib/api";

export async function POST(request) {
  if (!prisma) return databaseUnavailable(new Error("DATABASE_URL is not configured"));
  let body;
  try { body = await request.json(); } catch { return jsonError("Invalid JSON body"); }
  const name = cleanString(body.name, 100);
  const message = cleanString(body.message || body.description, 3000);
  const phone = optionalString(body.phone, 20);
  const email = optionalString(body.email, 200);
  const type = body.type === "CUSTOM" ? "CUSTOM" : "CONTACT";
  if (!name || !message) return jsonError("Name and message are required");
  if (phone && !isPhone(phone)) return jsonError("Phone number is invalid");
  if (!isEmail(email)) return jsonError("Email address is invalid");
  if (!phone && !email) return jsonError("Provide a phone number or email address");
  try {
    const inquiry = await prisma.inquiry.create({ data: {
      type, name, message, phone, email,
      subject: optionalString(body.subject, 200), budget: optionalString(body.budget, 100),
      dimensions: optionalString(body.dimensions, 200), woodType: optionalString(body.woodType, 100),
      referenceUrl: optionalString(body.referenceUrl, 1000),
    } });
    return NextResponse.json({ inquiry: { id: inquiry.id, status: inquiry.status, createdAt: inquiry.createdAt } }, { status: 201 });
  } catch (error) {
    return databaseUnavailable(error);
  }
}
