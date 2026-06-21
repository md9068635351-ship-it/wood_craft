"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
export default function Hero() {
    return (<section className="relative overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        <div className="order-2 lg:order-1">
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-4 inline-flex items-center gap-2 rounded-full bg-moss/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-moss">
            Handcrafted · Made to order
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="font-display text-4xl font-semibold leading-[1.1] text-walnut sm:text-5xl lg:text-6xl">
            Wood, shaped by{" "}
            <span className="italic text-rust">hand</span>, not by machine.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-5 max-w-md text-base text-ink/70 sm:text-lg">
            Every grain tells a story. We carve functional, beautiful wooden
            pieces in small batches — from kitchen bowls to statement decor —
            built to last generations, not seasons.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/shop" className="group flex items-center gap-2 rounded-full bg-walnut px-6 py-3.5 text-sm font-semibold text-paper transition-transform hover:scale-105 focus-ring">
              Shop the Collection
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1"/>
            </Link>
            <Link href="/custom" className="rounded-full border border-walnut/20 px-6 py-3.5 text-sm font-semibold text-walnut transition-colors hover:bg-walnut/5 focus-ring">
              Request Custom Piece
            </Link>
          </motion.div>

          <div className="mt-10 flex gap-8 text-sm text-ink/60">
            <div>
              <p className="font-display text-2xl font-semibold text-walnut">100%</p>
              <p>Handmade</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-walnut">3rd</p>
              <p>Gen Artisans</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-walnut">PAN India</p>
              <p>Shipping</p>
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="order-1 relative aspect-[4/5] overflow-hidden rounded-[2rem] lg:order-2">
          <Image src="https://images.unsplash.com/photo-1611486212557-88be5ff6f941?auto=format&fit=crop&w=1200&q=80" alt="Hand-carved wooden craft in progress" fill priority className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw"/>
          <div className="absolute inset-0 bg-gradient-to-t from-walnut/30 via-transparent to-transparent"/>

          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="absolute bottom-5 left-5 rounded-2xl bg-paper/95 px-4 py-3 backdrop-blur-sm">
            <p className="text-xs font-medium text-ink/60">Currently carving</p>
            <p className="font-display text-sm font-semibold text-walnut">
              Sheesham Coffee Table — Batch 04
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>);
}
