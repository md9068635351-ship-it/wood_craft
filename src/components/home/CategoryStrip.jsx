import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { categories as fallbackCategories } from "@/data/products";

export default async function CategoryStrip() {
  let categories = fallbackCategories;
  if (prisma) {
    try {
      const stored = await prisma.category.findMany({ where: { isActive: true, showOnHome: true }, orderBy: [{ sortOrder: "asc" }, { name: "asc" }] });
      if (stored.length) categories = stored;
    } catch {}
  }
  return <section className="border-y border-walnut/10 bg-paper-warm/45"><div className="mx-auto max-w-7xl px-5 py-5 lg:px-8"><div className="scroll-thin flex gap-3 overflow-x-auto py-1 lg:justify-center">
    {categories.map((cat) => <Link key={cat.id} href={`/shop?category=${cat.slug}`} className="flex-shrink-0 rounded-full border border-walnut/15 bg-paper/80 px-5 py-2.5 text-sm font-medium text-ink/80 shadow-sm transition-all hover:-translate-y-0.5 hover:border-rust hover:bg-paper hover:text-rust focus-ring">{cat.name}</Link>)}
  </div></div></section>;
}
