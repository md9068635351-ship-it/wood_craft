"use client";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, MessageCircle } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { buildSingleProductWhatsAppLink } from "@/lib/whatsapp";
export default function ProductActions(_a) {
    var product = _a.product;
    var _b = useState(1), quantity = _b[0], setQuantity = _b[1];
    var addItem = useCartStore(function (s) { return s.addItem; });
    var openCart = useCartStore(function (s) { return s.openCart; });
    var outOfStock = product.stock <= 0;
    return (<div className="mt-7">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-ink/60">Quantity</span>
        <div className="flex items-center rounded-full border border-walnut/15">
          <button onClick={function () { return setQuantity(function (q) { return Math.max(1, q - 1); }); }} aria-label="Decrease quantity" className="p-2.5 hover:bg-walnut/5 focus-ring rounded-full">
            <Minus size={15}/>
          </button>
          <span className="w-8 text-center text-sm font-medium">{quantity}</span>
          <button onClick={function () { return setQuantity(function (q) { return Math.min(product.stock, q + 1); }); }} aria-label="Increase quantity" className="p-2.5 hover:bg-walnut/5 focus-ring rounded-full">
            <Plus size={15}/>
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button disabled={outOfStock} onClick={function () {
            addItem(product, quantity);
            openCart();
        }} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-walnut bg-transparent px-6 py-3.5 text-sm font-semibold text-walnut transition-colors hover:bg-walnut hover:text-paper focus-ring disabled:cursor-not-allowed disabled:opacity-40">
          <ShoppingBag size={17}/>
          Add to Cart
        </button>

        <a href={buildSingleProductWhatsAppLink(product, quantity)} target="_blank" rel="noopener noreferrer" aria-disabled={outOfStock} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-moss px-6 py-3.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.02] focus-ring">
          <MessageCircle size={17}/>
          Order on WhatsApp
        </a>
      </div>

      {outOfStock && (<p className="mt-3 text-sm font-medium text-rust">
          Currently out of stock — message us on WhatsApp to be notified.
        </p>)}

      {product.isCustomizable && (<p className="mt-4 text-sm text-ink/60">
          This piece can be customised (size, engraving, or finish). Mention
          your requirements when you message us.
        </p>)}
    </div>);
}
