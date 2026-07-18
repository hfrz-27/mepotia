import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  GitCompareArrows,
  Sparkles,
} from "lucide-react";

const CARDS = [
  {
    href: "/fiyat-karsilastir",
    eyebrow: "Fiyat",
    title: "Piyasa fiyatı",
    description: "Vitrin + piyasa mağaza fiyatı yan yana.",
    cta: "Fiyat karşılaştır",
    icon: BadgeDollarSign,
    glow: "bg-emerald-400/25",
    bar: "from-emerald-400 via-teal-300 to-sky-400",
    chip: "Piyasa",
  },
  {
    href: "/urun-karsilastir",
    eyebrow: "Özellik",
    title: "Ürün vs ürün",
    description: "Ekran, RAM, batarya — spek tablosu.",
    cta: "Özellik karşılaştır",
    icon: GitCompareArrows,
    glow: "bg-violet-400/25",
    bar: "from-violet-400 via-fuchsia-300 to-pink-400",
    chip: "Spek",
  },
];

export default function HomeCompareGate() {
  return (
    <section className="border-y border-bw-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <div className="mb-3 flex items-center gap-2 sm:mb-3.5">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-bw-200 bg-bw-50 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-bw-500">
            <Sparkles className="h-3 w-3" />
            Karşılaştır
          </p>
          <h2 className="font-display text-base font-semibold tracking-tight text-bw-950 sm:text-lg">
            Fiyat mı, özellik mi?
          </h2>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group relative isolate flex items-center gap-3.5 overflow-hidden rounded-2xl border border-bw-900/90 bg-[#0a0a0c] px-3.5 py-3.5 text-white shadow-[0_16px_40px_-24px_rgba(0,0,0,0.5)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-22px_rgba(0,0,0,0.55)] sm:gap-4 sm:px-4 sm:py-4"
              >
                <div
                  className={`pointer-events-none absolute -top-12 -right-8 h-28 w-28 rounded-full ${card.glow} blur-2xl transition duration-500 group-hover:scale-110`}
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.14) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                  aria-hidden
                />
                <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${card.bar}`} aria-hidden />

                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-bw-950 shadow-[0_8px_20px_-10px_rgba(255,255,255,0.5)] transition group-hover:scale-105 sm:h-11 sm:w-11 sm:rounded-[0.85rem]">
                  <Icon className="h-4 w-4 sm:h-[1.1rem] sm:w-[1.1rem]" strokeWidth={1.75} />
                </span>

                <div className="relative min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">
                      {card.eyebrow}
                    </p>
                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-1.5 py-0.5 text-[9px] font-semibold text-white/50">
                      {card.chip}
                    </span>
                  </div>
                  <h3 className="mt-0.5 truncate text-[15px] font-semibold tracking-tight sm:text-base">
                    {card.title}
                  </h3>
                  <p className="mt-0.5 line-clamp-1 text-[11px] leading-snug text-white/50 sm:text-xs">
                    {card.description}
                  </p>
                </div>

                <span className="relative hidden shrink-0 items-center gap-1 rounded-full bg-white px-3 py-2 text-[11px] font-semibold text-bw-950 shadow-sm transition group-hover:gap-1.5 sm:inline-flex">
                  {card.cta.split(" ")[0]}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <ArrowRight className="relative h-4 w-4 shrink-0 text-white/45 transition group-hover:translate-x-0.5 group-hover:text-white sm:hidden" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
