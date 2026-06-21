import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCustomerSession } from "@/lib/auth";
import { jsonError } from "@/lib/api";
export async function GET(){const session=getCustomerSession();if(!session)return jsonError("Authentication required",401);const user=await prisma.user.findUnique({where:{id:session.userId},select:{id:true,name:true,email:true,phone:true,address:true,city:true,pincode:true}});return user?NextResponse.json({user}):jsonError("Account not found",404)}
