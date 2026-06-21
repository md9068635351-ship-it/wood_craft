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
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
export default function AdminProductsPage() {
    var _a = useState([]), products = _a[0], setProducts = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    var _c = useState(""), search = _c[0], setSearch = _c[1];
    var _d = useState(null), deletingId = _d[0], setDeletingId = _d[1];
    useEffect(function () {
        fetchProducts();
    }, []);
    function fetchProducts() {
        return __awaiter(this, void 0, void 0, function () {
            var res, data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        setLoading(true);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, fetch("/api/admin/products")];
                    case 2:
                        res = _b.sent();
                        return [4 /*yield*/, res.json()];
                    case 3:
                        data = _b.sent();
                        setProducts(data.products || []);
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
    function handleDelete(id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!confirm("Delete this product? This cannot be undone."))
                            return [2 /*return*/];
                        setDeletingId(id);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, fetch("/api/admin/products/".concat(id), { method: "DELETE" })];
                    case 2:
                        _b.sent();
                        setProducts(function (prev) { return prev.filter(function (p) { return p.id !== id; }); });
                        return [3 /*break*/, 5];
                    case 3:
                        _a = _b.sent();
                        alert("Could not delete product. Please try again.");
                        return [3 /*break*/, 5];
                    case 4:
                        setDeletingId(null);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    var filtered = products.filter(function (p) {
        return p.name.toLowerCase().includes(search.toLowerCase());
    });
    return (<div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-walnut">
            Products
          </h1>
          <p className="mt-1 text-sm text-ink/60">
            {products.length} {products.length === 1 ? "product" : "products"} total
          </p>
        </div>
        <Link href="/admin/products/new" className="flex items-center justify-center gap-2 rounded-full bg-walnut px-5 py-2.5 text-sm font-semibold text-paper hover:scale-[1.02] transition-transform">
          <Plus size={16}/>
          Add Product
        </Link>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-xl border border-walnut/15 bg-paper-warm px-4 py-2.5">
        <Search size={16} className="text-ink/40"/>
        <input value={search} onChange={function (e) { return setSearch(e.target.value); }} placeholder="Search products..." className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40"/>
      </div>

      {loading ? (<p className="mt-10 text-center text-sm text-ink/50">Loading products...</p>) : filtered.length === 0 ? (<div className="mt-10 rounded-2xl border border-walnut/10 bg-paper-warm p-10 text-center">
          <p className="text-ink/60">No products found.</p>
          <Link href="/admin/products/new" className="mt-3 inline-block text-sm font-medium text-rust">
            Add your first product
          </Link>
        </div>) : (<div className="mt-6 space-y-3">
          {filtered.map(function (product) {
                var _a;
                return (<div key={product.id} className="flex items-center gap-4 rounded-2xl border border-walnut/10 bg-paper-warm p-4">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-paper">
                {product.images[0] && (<Image src={product.images[0].url} alt={product.images[0].altText || product.name} fill className="object-cover" sizes="64px"/>)}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-ink">{product.name}</p>
                <p className="text-sm text-ink/50">
                  {(_a = product.category) === null || _a === void 0 ? void 0 : _a.name} · ₹{product.price.toLocaleString("en-IN")}
                  {" · "}
                  <span className={product.stock <= 5 ? "text-rust" : ""}>
                    {product.stock} in stock
                  </span>
                </p>
              </div>

              {!product.isActive && (<span className="hidden rounded-full bg-ink/10 px-3 py-1 text-xs font-medium text-ink/50 sm:inline-block">
                  Hidden
                </span>)}

              <div className="flex flex-shrink-0 gap-2">
                <Link href={"/admin/products/".concat(product.id)} className="rounded-full p-2.5 text-walnut hover:bg-walnut/10" aria-label="Edit product">
                  <Pencil size={16}/>
                </Link>
                <button onClick={function () { return handleDelete(product.id); }} disabled={deletingId === product.id} className="rounded-full p-2.5 text-rust hover:bg-rust/10 disabled:opacity-50" aria-label="Delete product">
                  <Trash2 size={16}/>
                </button>
              </div>
            </div>);
            })}
        </div>)}
    </div>);
}
