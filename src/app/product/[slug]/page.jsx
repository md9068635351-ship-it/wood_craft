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
import { notFound } from "next/navigation";
import { getProductBySlug, products as demoProducts } from "@/data/products";
import { getProductBySlugDb, getRelatedProductsDb } from "@/lib/queries";
import ProductGallery from "@/components/product/ProductGallery";
import ProductActions from "@/components/product/ProductActions";
import RelatedProducts from "@/components/product/RelatedProducts";
import { formatPrice } from "@/lib/whatsapp";
export const dynamic = "force-dynamic";
export default function ProductPage(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var product, related;
        var params = _b.params;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getProductBySlugDb(params.slug)];
                case 1:
                    product = _c.sent();
                    if (!product) return [3 /*break*/, 3];
                    return [4 /*yield*/, getRelatedProductsDb(product.category.slug, product.id)];
                case 2:
                    related = _c.sent();
                    return [3 /*break*/, 4];
                case 3:
                    product = getProductBySlug(params.slug) || null;
                    if (!product)
                        notFound();
                    related = demoProducts
                        .filter(function (p) { return p.category.slug === product.category.slug && p.id !== product.id; })
                        .slice(0, 4);
                    _c.label = 4;
                case 4:
                    if (!product)
                        notFound();
                    return [2 /*return*/, (<main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} videos={product.videos || []}/>

        <div>
          {product.woodType && (<p className="text-xs font-semibold uppercase tracking-wide text-moss">
              {product.woodType}
            </p>)}
          <h1 className="mt-1 font-display text-3xl font-semibold text-walnut sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-2xl font-semibold text-walnut">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (<span className="text-base text-ink/40 line-through">
                {formatPrice(product.comparePrice)}
              </span>)}
            {product.stock <= 5 && product.stock > 0 && (<span className="rounded-full bg-rust/10 px-2.5 py-1 text-xs font-medium text-rust">
                Only {product.stock} left
              </span>)}
          </div>

          <p className="mt-5 text-base leading-relaxed text-ink/70">
            {product.description}
          </p>

          {product.story && (<div className="mt-5 rounded-2xl bg-paper-warm p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-moss">
                Behind this piece
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                {product.story}
              </p>
            </div>)}

          <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-walnut/10 py-5 text-sm">
            {product.dimensions && (<div>
                <dt className="text-ink/50">Dimensions</dt>
                <dd className="mt-0.5 font-medium text-ink">{product.dimensions}</dd>
              </div>)}
            {product.weight && (<div>
                <dt className="text-ink/50">Weight</dt>
                <dd className="mt-0.5 font-medium text-ink">{product.weight}</dd>
              </div>)}
          </dl>

          {product.careInfo && (<p className="mt-5 text-sm text-ink/50">
              <span className="font-medium text-ink/70">Care: </span>
              {product.careInfo}
            </p>)}

          <ProductActions product={product}/>
        </div>
      </div>

      <RelatedProducts products={related} categoryName={product.category.name}/>
    </main>)];
            }
        });
    });
}
