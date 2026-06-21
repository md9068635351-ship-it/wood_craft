import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { cleanString, isEmail, isPhone, jsonError, optionalString } from "@/lib/api";
import { CUSTOMER_COOKIE_NAME, signCustomerToken } from "@/lib/auth";

export async function POST(request) {
  let body; try { body=await request.json(); } catch { return jsonError("Invalid request"); }
  const name=cleanString(body.name,100), email=cleanString(body.email,200).toLowerCase(), phone=optionalString(body.phone,20), password=String(body.password||"");
  if(!name||!isEmail(email)) return jsonError("Valid name and email are required");
  if(phone&&!isPhone(phone)) return jsonError("Phone number is invalid");
  if(password.length<8) return jsonError("Password must contain at least 8 characters");
  try {
    const user=await prisma.user.create({data:{name,email,phone,password:await bcrypt.hash(password,12)}});
    const response=NextResponse.json({user:{id:user.id,name:user.name,email:user.email,phone:user.phone}},{status:201});
    response.cookies.set(CUSTOMER_COOKIE_NAME,signCustomerToken({userId:user.id,email:user.email}),{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",maxAge:60*60*24*30,path:"/"});return response;
  } catch(error){if(error?.code==="P2002")return jsonError("An account with this email already exists",409);return jsonError("Could not create account",500)}
}
