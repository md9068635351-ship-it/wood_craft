"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, LogOut, ExternalLink, Tags } from "lucide-react";
import { cn } from "@/lib/utils";
var NAV_ITEMS = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Categories", href: "/admin/categories", icon: Tags },
    { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
];
export default function AdminSidebar() {
    var _this = this;
    var pathname = usePathname();
    var router = useRouter();
    var handleLogout = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/api/admin/logout", { method: "POST" })];
                case 1:
                    _a.sent();
                    router.push("/admin/login");
                    return [2 /*return*/];
            }
        });
    }); };
    return (<aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-walnut/10 bg-walnut text-paper lg:flex">
      <div className="px-6 py-6">
        <p className="font-display text-xl font-semibold">Infinity Creations</p>
        <p className="text-xs text-paper/50">Admin Panel</p>
      </div>

      <nav className="flex-1 px-3">
        {NAV_ITEMS.map(function (item) {
            var Icon = item.icon;
            var active = pathname.startsWith(item.href);
            return (<Link key={item.href} href={item.href} className={cn("mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors", active
                    ? "bg-paper/10 text-paper"
                    : "text-paper/60 hover:bg-paper/5 hover:text-paper")}>
              <Icon size={18}/>
              {item.label}
            </Link>);
        })}
      </nav>

      <div className="border-t border-paper/10 px-3 py-4">
        <a href="/" target="_blank" rel="noopener noreferrer" className="mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-paper/60 hover:bg-paper/5 hover:text-paper">
          <ExternalLink size={18}/>
          View Site
        </a>
        <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-paper/60 hover:bg-rust/20 hover:text-paper">
          <LogOut size={18}/>
          Logout
        </button>
      </div>
    </aside>);
}
