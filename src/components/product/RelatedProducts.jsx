"use client";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import ProductCard from "./ProductCard";

export default function RelatedProducts({products,categoryName}){
  function scroll(direction){document.getElementById('related-products')?.scrollBy({left:direction*620,behavior:'smooth'})}
  if(!products?.length)return null;
  return <section className="mt-20 border-t border-walnut/10 pt-12">
    <div className="mb-6 flex items-end justify-between gap-4"><div><p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[.16em] text-moss"><Sparkles size={14}/>Recommended for you</p><h2 className="mt-2 font-display text-2xl font-semibold text-walnut sm:text-3xl">Customers also viewed</h2><p className="mt-1 text-sm text-ink/50">More handcrafted pieces inspired by {categoryName}</p></div><div className="hidden items-center gap-2 sm:flex"><button onClick={()=>scroll(-1)} aria-label="Previous products" className="rounded-full border border-walnut/15 p-2.5 hover:bg-walnut hover:text-paper"><ChevronLeft size={18}/></button><button onClick={()=>scroll(1)} aria-label="Next products" className="rounded-full border border-walnut/15 p-2.5 hover:bg-walnut hover:text-paper"><ChevronRight size={18}/></button></div></div>
    <div id="related-products" className="scroll-thin -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 lg:mx-0 lg:px-0">{products.map(product=><div key={product.id} className="w-[72vw] max-w-[270px] shrink-0 snap-start sm:w-[250px]"><ProductCard product={product}/></div>)}</div>
    <div className="mt-2 text-center"><Link href="/shop" className="inline-flex rounded-full border border-walnut/20 px-6 py-2.5 text-sm font-semibold text-walnut transition hover:bg-walnut hover:text-paper">Explore all products</Link></div>
  </section>
}
