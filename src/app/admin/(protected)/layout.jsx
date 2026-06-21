import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminMobileNav from "@/components/admin/AdminMobileNav";
export default function ProtectedAdminLayout(_a) {
    var children = _a.children;
    var session = getAdminSession();
    if (!session) {
        redirect("/admin/login");
    }
    return (<div className="min-h-screen bg-paper">
      <AdminSidebar />
      <AdminMobileNav />
      <div className="lg:pl-64">
        <div className="px-5 py-8 lg:px-10">{children}</div>
      </div>
    </div>);
}
