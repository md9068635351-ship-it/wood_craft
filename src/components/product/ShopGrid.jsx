"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";
export default function ShopGrid(_a) {
    var products = _a.products, categories = _a.categories;
    var searchParams = useSearchParams();
    var initialCategory = searchParams.get("category") || "all";
    var _b = useState(initialCategory), activeCategory = _b[0], setActiveCategory = _b[1];
    var filtered = useMemo(function () {
        if (activeCategory === "all")
            return products;
        return products.filter(function (p) { return p.category.slug === activeCategory; });
    }, [activeCategory, products]);
    return (<main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-moss">
          Shop
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-walnut sm:text-4xl">
          All Products
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          {filtered.length} handcrafted {filtered.length === 1 ? "piece" : "pieces"}
        </p>
      </div>

      <div className="scroll-thin mb-8 flex gap-2.5 overflow-x-auto pb-2">
        <button onClick={function () { return setActiveCategory("all"); }} className={cn("flex-shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-ring", activeCategory === "all"
            ? "border-walnut bg-walnut text-paper"
            : "border-walnut/15 text-ink/70 hover:border-walnut/40")}>
          All
        </button>
        {categories.map(function (cat) { return (<button key={cat.id} onClick={function () { return setActiveCategory(cat.slug); }} className={cn("flex-shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-ring", activeCategory === cat.slug
                ? "border-walnut bg-walnut text-paper"
                : "border-walnut/15 text-ink/70 hover:border-walnut/40")}>
            {cat.name}
          </button>); })}
      </div>

      {filtered.length === 0 ? (<div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
          <p className="font-display text-lg text-walnut">No products here yet</p>
          <p className="text-sm text-ink/50">Check back soon, or browse another category.</p>
        </div>) : (<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {filtered.map(function (product) { return (<ProductCard key={product.id} product={product}/>); })}
        </div>)}
    </main>);
}
