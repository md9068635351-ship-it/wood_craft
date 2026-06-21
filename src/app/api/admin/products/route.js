import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { cleanString, databaseUnavailable, jsonError, optionalString, slugify } from "@/lib/api";

export async function GET() {
  if (!getAdminSession()) return jsonError("Unauthorized", 401);
  try { return NextResponse.json({ products: await prisma.product.findMany({ include: { images: { orderBy: { order: "asc" } }, videos: { orderBy: { order: "asc" } }, category: true }, orderBy: { createdAt: "desc" } }) }); }
  catch (error) { return databaseUnavailable(error); }
}
export async function POST(request) {
  if (!getAdminSession()) return jsonError("Unauthorized", 401);
  let body; try { body = await request.json(); } catch { return jsonError("Invalid JSON body"); }
  const name=cleanString(body.name,160), description=cleanString(body.description,5000), price=Number(body.price), stock=Number(body.stock);
  if(!name||!description||!body.categoryId||!Number.isFinite(price)||price<=0) return jsonError("Name, description, valid price, and category are required");
  if(!Number.isInteger(stock)||stock<0) return jsonError("Stock must be a non-negative whole number");
  let slug=slugify(body.slug||name); if(await prisma.product.findUnique({where:{slug}})) slug=`${slug}-${Date.now().toString(36)}`;
  try { const product=await prisma.product.create({data:{name,slug,description,story:optionalString(body.story,5000),price,comparePrice:body.comparePrice?Number(body.comparePrice):null,woodType:optionalString(body.woodType,120),dimensions:optionalString(body.dimensions,200),weight:optionalString(body.weight,100),careInfo:optionalString(body.careInfo,2000),stock,isCustomizable:Boolean(body.isCustomizable),isFeatured:Boolean(body.isFeatured),isActive:body.isActive!==false,categoryId:body.categoryId,images:{create:(body.images||[]).map((image,index)=>({url:image.url,altText:image.altText||name,order:index}))},videos:{create:(body.videos||[]).map((video,index)=>({url:video.url,title:video.title||name,order:index}))}},include:{images:true,videos:true,category:true}});return NextResponse.json({product},{status:201}); }
  catch(error){if(error?.code==="P2003")return jsonError("Selected category does not exist",409);return databaseUnavailable(error)}
}
