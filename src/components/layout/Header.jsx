"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ShoppingBag, MessageCircle, UserRound } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/layout/ThemeToggle";
var NAV_LINKS = [
    { label: "Shop", href: "/shop" },
    { label: "Custom Orders", href: "/custom" },
    { label: "Our Story", href: "/about" },
    { label: "Contact", href: "/contact" },
];
export default function Header() {
    var _a = useState(false), mobileOpen = _a[0], setMobileOpen = _a[1];
    var totalItems = useCartStore(function (s) { return s.totalItems(); });
    var openCart = useCartStore(function (s) { return s.openCart; });
    return (<header className="sticky top-0 z-50 border-b border-walnut/10 bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 text-walnut">
          <Image src="/brand/infinity-creations-logo.jpeg" alt="Infinity Creations" width={42} height={42} priority className="rounded-full border border-walnut/15 object-cover shadow-sm"/>
          <span className="hidden font-display text-xl font-semibold sm:inline">Infinity Creations</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map(function (link) { return (<Link key={link.href} href={link.href} className="text-sm font-medium text-ink/80 transition-colors hover:text-rust focus-ring rounded">
              {link.label}
            </Link>); })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href="https://wa.me/919068635351" target="_blank" rel="noopener noreferrer" className="hidden items-center gap-2 rounded-full bg-moss px-4 py-2 text-sm font-medium text-paper transition-transform hover:scale-105 focus-ring sm:flex">
            <MessageCircle size={16}/>
            Chat on WhatsApp
          </a>

          <Link href="/account" aria-label="Your account" className="rounded-full border border-walnut/15 p-2.5 transition-colors hover:bg-walnut/10 focus-ring"><UserRound size={20}/></Link>

          <button onClick={openCart} aria-label={"Cart, ".concat(totalItems, " items")} className="relative rounded-full border border-walnut/15 p-2.5 transition-colors hover:bg-walnut/5 focus-ring">
            <ShoppingBag size={20} className="text-walnut"/>
            {totalItems > 0 && (<span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rust text-[11px] font-semibold text-paper">
                {totalItems}
              </span>)}
          </button>

          <button onClick={function () { return setMobileOpen(function (v) { return !v; }); }} aria-label="Toggle menu" className="rounded-full p-2.5 hover:bg-walnut/5 focus-ring lg:hidden">
            {mobileOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </div>

      <div className={cn("overflow-hidden border-t border-walnut/10 transition-all lg:hidden", mobileOpen ? "max-h-64" : "max-h-0 border-t-0")}>
        <nav className="flex flex-col gap-1 px-5 py-3">
          {NAV_LINKS.map(function (link) { return (<Link key={link.href} href={link.href} onClick={function () { return setMobileOpen(false); }} className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink/80 hover:bg-walnut/5">
              {link.label}
            </Link>); })}
        </nav>
      </div>
    </header>);
}
