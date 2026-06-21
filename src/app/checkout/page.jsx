"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Loader2, LockKeyhole, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/whatsapp";

const fields = [
  ["customerName", "Full name", "text", "Adnan Khan"], ["customerPhone", "Phone number", "tel", "+91 98765 43210"],
  ["customerEmail", "Email (optional)", "email", "you@example.com"], ["address", "Full delivery address", "text", "House, street, area"],
  ["city", "City", "text", "Moradabad"], ["pincode", "PIN code", "text", "244001"],
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false); const [checkingAccount,setCheckingAccount]=useState(true);
  const [form, setForm] = useState({ customerName: "", customerPhone: "", customerEmail: "", address: "", city: "", pincode: "", notes: "" });
  const [loading, setLoading] = useState(false); const [error, setError] = useState(""); const [order, setOrder] = useState(null);
  useEffect(() => {setMounted(true);fetch('/api/auth/session').then(async response=>{if(!response.ok){router.replace('/account/login?next=/checkout');return}const {user}=await response.json();setForm(current=>({...current,customerName:user.name||'',customerEmail:user.email||'',customerPhone:user.phone||'',address:user.address||'',city:user.city||'',pincode:user.pincode||''}));setCheckingAccount(false)}).catch(()=>router.replace('/account/login?next=/checkout'))}, [router]);
  async function submit(e) {
    e.preventDefault(); setLoading(true); setError("");
    try {
      const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, channel: "ONLINE", items: items.map(({ product, quantity }) => ({ productId: product.id, quantity })) }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not place your order");
      setOrder(data.order); clearCart();
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  }
  if (!mounted || checkingAccount) return <main className="flex min-h-[60vh] items-center justify-center"><Loader2 className="animate-spin text-rust"/></main>;
  if (order) return <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 text-center"><CheckCircle2 size={58} className="text-moss"/><p className="mt-5 text-xs font-bold uppercase tracking-widest text-moss">Order confirmed</p><h1 className="mt-2 font-display text-4xl font-semibold text-walnut">Thank you for your order</h1><p className="mt-4 text-ink/60">Your order number is <strong className="text-ink">{order.orderNumber}</strong>. We’ll contact you shortly to confirm delivery and payment.</p><div className="mt-6 rounded-2xl bg-paper-warm px-8 py-4"><span className="text-sm text-ink/50">Order total</span><p className="font-display text-2xl font-semibold">{formatPrice(order.totalAmount)}</p></div><Link href="/shop" className="mt-8 rounded-full bg-walnut px-8 py-3.5 text-sm font-semibold text-paper">Continue shopping</Link></main>;
  if (!items.length) return <main className="mx-auto flex min-h-[65vh] max-w-lg flex-col items-center justify-center px-5 text-center"><ShoppingBag size={44} className="text-ink/30"/><h1 className="mt-4 font-display text-3xl font-semibold">Your cart is empty</h1><Link href="/shop" className="mt-6 rounded-full bg-walnut px-8 py-3 text-sm font-semibold text-paper">Browse products</Link></main>;
  return <main className="mx-auto max-w-6xl px-5 py-10 lg:px-8"><div className="mb-8"><p className="text-xs font-bold uppercase tracking-widest text-rust">Secure checkout</p><h1 className="font-display text-3xl font-semibold text-walnut sm:text-4xl">Delivery details</h1></div><div className="grid gap-8 lg:grid-cols-[1fr_420px]">
    <form onSubmit={submit} className="rounded-3xl border border-walnut/10 bg-paper-warm/50 p-5 sm:p-8"><div className="grid gap-5 sm:grid-cols-2">{fields.map(([key,label,type,placeholder], index) => <label key={key} className={index === 3 ? "sm:col-span-2" : ""}><span className="text-sm font-medium">{label}</span><input required={!key.includes("Email")} type={type} value={form[key]} onChange={(e)=>setForm({...form,[key]:e.target.value})} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-walnut/15 bg-paper px-4 py-3 text-sm outline-none focus:border-rust"/></label>)}</div><label className="mt-5 block"><span className="text-sm font-medium">Order notes (optional)</span><textarea rows={3} value={form.notes} onChange={(e)=>setForm({...form,notes:e.target.value})} className="mt-2 w-full rounded-xl border border-walnut/15 bg-paper px-4 py-3 text-sm outline-none focus:border-rust" placeholder="Customisation or delivery notes"/></label>{error && <p className="mt-4 rounded-xl bg-rust/10 p-3 text-sm text-rust">{error}</p>}<button disabled={loading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-rust px-6 py-4 text-sm font-bold text-white disabled:opacity-60">{loading ? <Loader2 className="animate-spin" size={18}/> : <LockKeyhole size={17}/>} Place order — Cash on delivery</button><p className="mt-3 text-center text-xs text-ink/45">Your total is recalculated securely from current prices.</p></form>
    <aside className="h-fit rounded-3xl border border-walnut/10 bg-paper-warm p-5 sm:p-7"><h2 className="font-display text-xl font-semibold">Order summary</h2><ul className="mt-5 space-y-4">{items.map(({product,quantity})=><li key={product.id} className="flex gap-3"><div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-paper">{product.images?.[0] && <Image src={product.images[0].url} alt={product.name} fill className="object-cover" sizes="64px"/>}<span className="absolute right-1 top-1 rounded-full bg-walnut px-1.5 text-[10px] text-paper">{quantity}</span></div><div className="min-w-0 flex-1"><p className="line-clamp-2 text-sm font-medium">{product.name}</p><p className="text-xs text-ink/45">{product.woodType}</p></div><span className="text-sm font-semibold">{formatPrice(product.price*quantity)}</span></li>)}</ul><div className="mt-6 space-y-2 border-t border-walnut/10 pt-5 text-sm"><div className="flex justify-between text-ink/60"><span>Subtotal</span><span>{formatPrice(totalPrice())}</span></div><div className="flex justify-between text-ink/60"><span>Shipping</span><span className="text-moss">Confirmed by seller</span></div><div className="flex justify-between pt-3 font-display text-xl font-semibold"><span>Total</span><span>{formatPrice(totalPrice())}</span></div></div></aside>
  </div></main>;
}
