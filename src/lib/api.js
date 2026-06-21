import { NextResponse } from "next/server";

export function jsonError(message, status = 400, details) {
  return NextResponse.json(
    { error: message, ...(details ? { details } : {}) },
    { status },
  );
}

export function cleanString(value, max = 500) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function optionalString(value, max = 500) {
  const result = cleanString(value, max);
  return result || null;
}

export function isEmail(value) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isPhone(value) {
  return /^[+\d][\d\s()-]{7,19}$/.test(value);
}

export function slugify(value) {
  return cleanString(value, 120)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function databaseUnavailable(error) {
  if (process.env.DATABASE_URL) console.error(error);
  return jsonError("Database is unavailable. Check DATABASE_URL and try again.", 503);
}
