import { NextResponse } from "next/server";
import { CUSTOMER_COOKIE_NAME } from "@/lib/auth";
export function POST(){const response=NextResponse.json({success:true});response.cookies.set(CUSTOMER_COOKIE_NAME,"",{maxAge:0,path:"/"});return response}
