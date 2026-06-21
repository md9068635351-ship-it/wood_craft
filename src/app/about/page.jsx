import Image from "next/image";
export default function AboutPage() {
    return (<main>
      <section className="mx-auto max-w-4xl px-5 py-14 text-center lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-moss">
          Our Story
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-walnut sm:text-4xl">
          Three generations, one workshop
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-ink/70">
          Infinity Creations began as a small family workshop, carving everyday objects
          for neighbours and local markets. Today, we still work the same
          way — by hand, in small batches, with the same tools that have
          shaped wood in our family for decades.
        </p>
      </section>

      <section className="relative mx-auto aspect-[16/7] max-w-6xl overflow-hidden rounded-2xl px-5 lg:px-8">
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <Image src="https://images.unsplash.com/photo-1597481499666-72d4e9be4a8f?auto=format&fit=crop&w=1600&q=80" alt="Wood workshop" fill className="object-cover"/>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14 lg:px-8">
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-xl font-semibold text-walnut">
              Why handmade matters
            </h2>
            <p className="mt-2 text-ink/70">
              Machines can cut wood fast, but they can&apos;t feel it. Every
              piece we make is shaped by someone who has spent years learning
              how each type of wood bends, grains, and ages — so the final
              piece lasts well beyond its first home.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-walnut">
              Sustainable by default
            </h2>
            <p className="mt-2 text-ink/70">
              We source wood responsibly and use offcuts for smaller items
              like keychains and coasters, so very little goes to waste.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-walnut">
              Made to order, not mass produced
            </h2>
            <p className="mt-2 text-ink/70">
              We keep batches small. It means occasional waiting time, but it
              also means quality control on every single piece before it
              reaches you.
            </p>
          </div>
        </div>
      </section>
    </main>);
}
