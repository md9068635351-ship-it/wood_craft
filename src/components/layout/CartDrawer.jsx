"use client";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore();
  return <>
    <div className={cn("fixed inset-0 z-[60] bg-black/55 backdrop-blur-sm transition-opacity", isOpen ? "opacity-100" : "pointer-events-none opacity-0")} onClick={closeCart}/>
    <aside className={cn("fixed right-0 top-0 z-[70] flex h-dvh w-full max-w-lg flex-col bg-paper shadow-2xl transition-transform duration-300", isOpen ? "translate-x-0" : "translate-x-full")} role="dialog" aria-modal="true" aria-label="Shopping cart">
      <header className="flex items-center justify-between border-b border-walnut/10 px-5 py-5 sm:px-7">
        <div><p className="text-xs font-semibold uppercase tracking-widest text-rust">Shopping bag</p><h2 className="font-display text-2xl font-semibold text-walnut">Your Cart <span className="text-base text-ink/40">({items.length})</span></h2></div>
        <button onClick={closeCart} className="rounded-full border border-walnut/10 p-2.5 hover:bg-walnut/10 focus-ring"><X size={20}/></button>
      </header>
      {!items.length ? <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <span className="mb-5 rounded-full bg-paper-warm p-6 text-walnut"><ShoppingBag size={34}/></span>
        <h3 className="font-display text-xl font-semibold">Your cart feels light</h3><p className="mt-2 text-sm text-ink/55">Discover something handmade for your home.</p>
        <Link href="/shop" onClick={closeCart} className="mt-6 rounded-full bg-walnut px-7 py-3 text-sm font-semibold text-paper">Explore the shop</Link>
      </div> : <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7"><ul className="divide-y divide-walnut/10">
        {items.map(({ product, quantity }) => <li key={product.id} className="flex gap-4 py-5 first:pt-0">
          <Link href={`/product/${product.slug}`} onClick={closeCart} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-paper-warm">
            {product.images?.[0]?.url && <Image src={product.images[0].url} alt={product.name} fill className="object-cover" sizes="96px"/>}
          </Link>
          <div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><div><p className="line-clamp-2 text-sm font-semibold">{product.name}</p><p className="mt-1 text-xs text-ink/50">{product.woodType || product.category?.name}</p></div><button onClick={() => removeItem(product.id)} className="h-fit p-1.5 text-ink/40 hover:text-rust"><Trash2 size={16}/></button></div>
            <div className="mt-4 flex items-center justify-between"><div className="flex items-center rounded-full border border-walnut/15 bg-paper-warm"><button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-2"><Minus size={13}/></button><span className="w-7 text-center text-sm">{quantity}</span><button disabled={quantity >= product.stock} onClick={() => updateQuantity(product.id, quantity + 1)} className="p-2 disabled:opacity-30"><Plus size={13}/></button></div><p className="font-semibold text-walnut">{formatPrice(product.price * quantity)}</p></div>
          </div>
        </li>)}
      </ul></div>}
      {!!items.length && <footer className="border-t border-walnut/10 bg-paper-warm/60 px-5 py-5 sm:px-7"><div className="flex items-end justify-between"><div><p className="text-sm text-ink/55">Subtotal</p><p className="text-xs text-ink/40">Shipping confirmed at checkout</p></div><strong className="font-display text-2xl text-walnut">{formatPrice(totalPrice())}</strong></div>
        <Link href="/checkout" onClick={closeCart} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-rust px-6 py-4 text-sm font-bold text-white shadow-lg shadow-rust/15 hover:brightness-110">Secure checkout <ArrowRight size={17}/></Link>
      </footer>}
    </aside>
  </>;
}
