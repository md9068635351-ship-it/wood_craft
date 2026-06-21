import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { cleanString, jsonError } from "@/lib/api";
import { CUSTOMER_COOKIE_NAME, signCustomerToken } from "@/lib/auth";
export async function POST(request){let body;try{body=await request.json()}catch{return jsonError("Invalid request")};const email=cleanString(body.email,200).toLowerCase(),user=await prisma.user.findUnique({where:{email}});if(!user||!await bcrypt.compare(String(body.password||""),user.password))return jsonError("Invalid email or password",401);const response=NextResponse.json({user:{id:user.id,name:user.name,email:user.email}});response.cookies.set(CUSTOMER_COOKIE_NAME,signCustomerToken({userId:user.id,email:user.email}),{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",maxAge:2592000,path:"/"});return response}
