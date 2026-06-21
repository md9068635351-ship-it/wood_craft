"use client";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
export default function CustomOrdersPage() {
    var _a = useState(""), name = _a[0], setName = _a[1];
    var _b = useState(""), description = _b[0], setDescription = _b[1];
    var _c = useState(""), budget = _c[0], setBudget = _c[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        var lines = [
            "Hi! I'd like a custom wooden piece made.",
            "",
            "Name: ".concat(name),
            "What I'm looking for: ".concat(description),
            budget ? "Budget range: ".concat(budget) : "",
        ].filter(Boolean);
        var message = encodeURIComponent(lines.join("\n"));
        var whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919068635351";
        window.open("https://wa.me/".concat(whatsappNumber, "?text=").concat(message), "_blank");
    };
    return (<main className="mx-auto max-w-2xl px-5 py-14 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-moss">
        Custom Orders
      </p>
      <h1 className="mt-1 font-display text-3xl font-semibold text-walnut sm:text-4xl">
        Have something specific in mind?
      </h1>
      <p className="mt-3 text-ink/70">
        Tell us what you&apos;re imagining — size, wood type, engraving, or a
        completely original design. We&apos;ll get back to you on WhatsApp
        with options and pricing.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink">
            Your name
          </label>
          <input id="name" required value={name} onChange={function (e) { return setName(e.target.value); }} className="mt-1.5 w-full rounded-xl border border-walnut/15 bg-paper px-4 py-3 text-sm focus-ring focus:border-walnut/40" placeholder="e.g. Riyaz"/>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-ink">
            What are you looking for?
          </label>
          <textarea id="description" required rows={5} value={description} onChange={function (e) { return setDescription(e.target.value); }} className="mt-1.5 w-full rounded-xl border border-walnut/15 bg-paper px-4 py-3 text-sm focus-ring focus:border-walnut/40" placeholder="e.g. A wooden nameplate, 12x6 inches, engraved with my family name, in sheesham wood"/>
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-ink">
            Budget range (optional)
          </label>
          <input id="budget" value={budget} onChange={function (e) { return setBudget(e.target.value); }} className="mt-1.5 w-full rounded-xl border border-walnut/15 bg-paper px-4 py-3 text-sm focus-ring focus:border-walnut/40" placeholder="e.g. ₹1000–2000"/>
        </div>

        <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-moss px-6 py-3.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.01] focus-ring">
          <MessageCircle size={18}/>
          Send via WhatsApp
        </button>
      </form>
    </main>);
}
