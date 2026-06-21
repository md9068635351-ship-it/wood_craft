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
import { prisma } from "@/lib/prisma";
import { Package, ShoppingCart, AlertCircle, IndianRupee } from "lucide-react";
import Link from "next/link";
function getStats() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, totalProducts, totalOrders, lowStock, orders, revenue, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, Promise.all([
                            prisma.product.count({ where: { isActive: true } }),
                            prisma.order.count(),
                            prisma.product.count({ where: { stock: { lte: 5 }, isActive: true } }),
                            prisma.order.findMany({
                                where: { status: "PENDING" },
                                orderBy: { createdAt: "desc" },
                                take: 5,
                                include: { items: true },
                            }),
                        ])];
                case 1:
                    _a = _c.sent(), totalProducts = _a[0], totalOrders = _a[1], lowStock = _a[2], orders = _a[3];
                    return [4 /*yield*/, prisma.order.aggregate({
                            _sum: { totalAmount: true },
                            where: { status: { in: ["CONFIRMED", "SHIPPED", "DELIVERED"] } },
                        })];
                case 2:
                    revenue = _c.sent();
                    return [2 /*return*/, {
                            totalProducts: totalProducts,
                            totalOrders: totalOrders,
                            lowStock: lowStock,
                            recentOrders: orders,
                            revenue: revenue._sum.totalAmount || 0,
                        }];
                case 3:
                    _b = _c.sent();
                    return [2 /*return*/, {
                            totalProducts: 0,
                            totalOrders: 0,
                            lowStock: 0,
                            recentOrders: [],
                            revenue: 0,
                        }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export default function AdminDashboardPage() {
    return __awaiter(this, void 0, void 0, function () {
        var stats, cards;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getStats()];
                case 1:
                    stats = _a.sent();
                    cards = [
                        {
                            label: "Active Products",
                            value: stats.totalProducts,
                            icon: Package,
                            href: "/admin/products",
                        },
                        {
                            label: "Total Orders",
                            value: stats.totalOrders,
                            icon: ShoppingCart,
                            href: "/admin/orders",
                        },
                        {
                            label: "Low Stock Items",
                            value: stats.lowStock,
                            icon: AlertCircle,
                            href: "/admin/products",
                            alert: stats.lowStock > 0,
                        },
                        {
                            label: "Revenue (confirmed)",
                            value: "\u20B9".concat(stats.revenue.toLocaleString("en-IN")),
                            icon: IndianRupee,
                            href: "/admin/orders",
                        },
                    ];
                    return [2 /*return*/, (<div>
      <h1 className="font-display text-2xl font-semibold text-walnut">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-ink/60">
        A quick look at how the shop is doing.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(function (card) {
                                var Icon = card.icon;
                                return (<Link key={card.label} href={card.href} className="rounded-2xl border border-walnut/10 bg-paper-warm p-5 transition-colors hover:border-walnut/30">
              <span className={"flex h-10 w-10 items-center justify-center rounded-full ".concat(card.alert ? "bg-rust/10 text-rust" : "bg-walnut/10 text-walnut")}>
                <Icon size={18}/>
              </span>
              <p className="mt-3 font-display text-2xl font-semibold text-walnut">
                {card.value}
              </p>
              <p className="text-sm text-ink/60">{card.label}</p>
            </Link>);
                            })}
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-walnut">
            Pending Orders
          </h2>
          <Link href="/admin/orders" className="text-sm font-medium text-rust">
            View all
          </Link>
        </div>

        {stats.recentOrders.length === 0 ? (<div className="rounded-2xl border border-walnut/10 bg-paper-warm p-8 text-center text-sm text-ink/50">
            No pending orders right now.
          </div>) : (<div className="overflow-hidden rounded-2xl border border-walnut/10">
            <table className="w-full text-sm">
              <thead className="bg-paper-warm text-left text-ink/60">
                <tr>
                  <th className="px-4 py-3 font-medium">Order #</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Items</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-walnut/10">
                {stats.recentOrders.map(function (order) { return (<tr key={order.id}>
                    <td className="px-4 py-3 font-medium text-ink">
                      {order.orderNumber}
                    </td>
                    <td className="px-4 py-3 text-ink/70">{order.customerName}</td>
                    <td className="px-4 py-3 text-ink/70">{order.items.length}</td>
                    <td className="px-4 py-3 font-medium text-walnut">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </td>
                  </tr>); })}
              </tbody>
            </table>
          </div>)}
      </div>
    </div>)];
            }
        });
    });
}
