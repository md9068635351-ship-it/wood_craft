"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import WhatsAppFloatButton from "./WhatsAppFloatButton";
export default function SiteChrome({children}){const admin=usePathname().startsWith('/admin');if(admin)return children;return <><Header/>{children}<Footer/><CartDrawer/><WhatsAppFloatButton/></>}
