import Image from "next/image";

const POINTS = [
  { title: "Premium Materials", description: "Made from carefully selected quality woods with a beautiful natural finish." },
  { title: "Handcrafted Excellence", description: "Every piece is handcrafted with precision, ensuring uniqueness and lasting quality." },
  { title: "Timeless Designs", description: "Elegant wooden creations designed to complement modern and classic lifestyles." },
];

export default function CraftStory() {
  return <section className="grain-texture bg-walnut">
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-paper-warm shadow-2xl lg:aspect-square">
        <Image
          src="https://images.unsplash.com/photo-1611486212557-88be5ff6f941?auto=format&fit=crop&w=1200&q=85"
          alt="Handcrafted wooden furniture by Infinity Creations"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        <p className="absolute bottom-6 left-6 right-6 font-display text-xl font-semibold text-white">
          Made thoughtfully. Built beautifully.
        </p>
      </div>

      <div className="flex flex-col justify-center text-paper">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sandalwood">Our Craft</p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
          Crafted with Passion, Designed to Last
        </h2>
        <p className="mt-5 max-w-xl leading-7 text-paper/75">
          At Infinity Creations, we create handcrafted wooden products that blend timeless elegance with everyday functionality. Each piece is carefully crafted with attention to detail, bringing warmth, beauty, and craftsmanship into your home.
        </p>

        <ol className="mt-9 space-y-6">
          {POINTS.map((point, index) => <li key={point.title} className="flex gap-5 border-t border-paper/10 pt-5 first:border-0 first:pt-0">
            <span className="font-display text-lg font-semibold text-sandalwood">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="font-semibold text-paper">{point.title}</h3>
              <p className="mt-1 max-w-lg text-sm leading-6 text-paper/65">{point.description}</p>
            </div>
          </li>)}
        </ol>
      </div>
    </div>
  </section>;
}
