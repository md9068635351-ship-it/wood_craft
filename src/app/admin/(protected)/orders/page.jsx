"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
var STATUS_OPTIONS = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];
var STATUS_COLORS = {
    PENDING: "bg-gold/10 text-gold",
    CONFIRMED: "bg-moss/10 text-moss",
    SHIPPED: "bg-walnut/10 text-walnut",
    DELIVERED: "bg-moss/20 text-moss",
    CANCELLED: "bg-rust/10 text-rust",
};
export default function AdminOrdersPage() {
    var _a = useState([]), orders = _a[0], setOrders = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    var _c = useState("ALL"), filter = _c[0], setFilter = _c[1];
    useEffect(function () {
        fetchOrders();
    }, []);
    function fetchOrders() {
        return __awaiter(this, void 0, void 0, function () {
            var res, data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        setLoading(true);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, fetch("/api/admin/orders")];
                    case 2:
                        res = _b.sent();
                        return [4 /*yield*/, res.json()];
                    case 3:
                        data = _b.sent();
                        setOrders(data.orders || []);
                        return [3 /*break*/, 6];
                    case 4:
                        _a = _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    function updateStatus(orderId, status) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        setOrders(function (prev) {
                            return prev.map(function (o) { return (o.id === orderId ? __assign(__assign({}, o), { status: status }) : o); });
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetch("/api/admin/orders/".concat(orderId), {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ status: status }),
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        fetchOrders(); // revert on failure by refetching
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    var filtered = filter === "ALL" ? orders : orders.filter(function (o) { return o.status === filter; });
    return (<div>
      <h1 className="font-display text-2xl font-semibold text-walnut">Orders</h1>
      <p className="mt-1 text-sm text-ink/60">
        Orders placed via WhatsApp won&apos;t appear automatically — log them
        here manually after confirming on WhatsApp, so you can track status.
      </p>

      <div className="scroll-thin mt-5 flex gap-2 overflow-x-auto pb-1">
        {__spreadArray(["ALL"], STATUS_OPTIONS, true).map(function (s) { return (<button key={s} onClick={function () { return setFilter(s); }} className={cn("flex-shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium", filter === s
                ? "border-walnut bg-walnut text-paper"
                : "border-walnut/15 text-ink/70")}>
            {s}
          </button>); })}
      </div>

      {loading ? (<p className="mt-10 text-center text-sm text-ink/50">Loading orders...</p>) : filtered.length === 0 ? (<div className="mt-8 rounded-2xl border border-walnut/10 bg-paper-warm p-10 text-center text-ink/60">
          No orders here yet.
        </div>) : (<div className="mt-6 space-y-3">
          {filtered.map(function (order) { return (<div key={order.id} className="rounded-2xl border border-walnut/10 bg-paper-warm p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-ink">{order.orderNumber}</p>
                  <p className="text-sm text-ink/60">
                    {order.customerName} · {order.customerPhone}
                  </p>
                </div>
                <select value={order.status} onChange={function (e) { return updateStatus(order.id, e.target.value); }} className={cn("rounded-full px-3 py-1.5 text-xs font-semibold focus-ring", STATUS_COLORS[order.status])}>
                  {STATUS_OPTIONS.map(function (s) { return (<option key={s} value={s}>
                      {s}
                    </option>); })}
                </select>
              </div>

              <ul className="mt-3 space-y-1 text-sm text-ink/70">
                {order.items.map(function (item) { return (<li key={item.id}>
                    {item.product.name} x{item.quantity} — ₹
                    {(item.price * item.quantity).toLocaleString("en-IN")}
                  </li>); })}
              </ul>

              <div className="mt-3 flex items-center justify-between border-t border-walnut/10 pt-3">
                <span className="text-xs text-ink/40">
                  {order.channel} · {new Date(order.createdAt).toLocaleDateString("en-IN")}
                </span>
                <span className="font-display font-semibold text-walnut">
                  ₹{order.totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>); })}
        </div>)}
    </div>);
}
