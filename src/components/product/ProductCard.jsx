"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/whatsapp";
import { useCartStore } from "@/lib/cart-store";
export default function ProductCard(_a) {
    var _b, _c;
    var product = _a.product;
    var addItem = useCartStore(function (s) { return s.addItem; });
    var openCart = useCartStore(function (s) { return s.openCart; });
    var discount = product.comparePrice && product.comparePrice > product.price
        ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
        : null;
    return (<div className="group relative flex flex-col overflow-hidden rounded-2xl bg-paper-warm carved-border transition-shadow hover:shadow-lg">
      <Link href={"/product/".concat(product.slug)} className="relative block aspect-square overflow-hidden">
        <Image src={(_b = product.images[0]) === null || _b === void 0 ? void 0 : _b.url} alt={((_c = product.images[0]) === null || _c === void 0 ? void 0 : _c.altText) || product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"/>
        {discount && (<span className="absolute left-3 top-3 rounded-full bg-rust px-2.5 py-1 text-xs font-semibold text-paper">
            {discount}% off
          </span>)}
        {product.isCustomizable && (<span className="absolute right-3 top-3 rounded-full bg-walnut/90 px-2.5 py-1 text-[11px] font-medium text-paper">
            Customisable
          </span>)}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        {product.woodType && (<p className="text-[11px] font-medium uppercase tracking-wide text-moss">
            {product.woodType}
          </p>)}
        <Link href={"/product/".concat(product.slug)}>
          <h3 className="font-display text-base font-medium leading-snug text-ink hover:text-rust">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold text-walnut">
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && (<span className="text-sm text-ink/40 line-through">
              {formatPrice(product.comparePrice)}
            </span>)}
        </div>

        <button onClick={function () {
            addItem(product, 1);
            openCart();
        }} className="mt-3 flex items-center justify-center gap-2 rounded-full border border-walnut/20 py-2.5 text-sm font-medium text-walnut transition-colors hover:bg-walnut hover:text-paper focus-ring">
          <ShoppingBag size={15}/>
          Add to Cart
        </button>
      </div>
    </div>);
}
