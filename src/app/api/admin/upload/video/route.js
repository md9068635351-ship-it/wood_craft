import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { getAdminSession } from "@/lib/auth";
import { jsonError } from "@/lib/api";

const types = { "video/mp4": ".mp4", "video/webm": ".webm", "video/quicktime": ".mov" };
export async function POST(request) {
  if (!getAdminSession()) return jsonError("Unauthorized", 401);
  try {
    const file = (await request.formData()).get("file");
    if (!file || !types[file.type]) return jsonError("Upload an MP4, WebM, or MOV video");
    if (file.size > 100 * 1024 * 1024) return jsonError("Video must be smaller than 100MB");
    const directory = path.join(process.cwd(), "public", "uploads", "videos");
    await mkdir(directory, { recursive: true });
    const filename = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}${types[file.type]}`;
    await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()));
    return NextResponse.json({ url: `/uploads/videos/${filename}` });
  } catch (error) { console.error(error); return NextResponse.json({ error: "Video upload failed" }, { status: 500 }); }
}
