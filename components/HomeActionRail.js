"use client";

import Link from "next/link";
import { ArrowUpRight, HandCoins, Search } from "lucide-react";

const actions = [
  {
    href: "/bana-sat",
    icon: HandCoins,
    eyebrow: "Ürünün var mı?",
    title: "Bana sat",
    text: "Cihazını anlat, fotoğrafla. Hızlı ve adil teklif al.",
    cta: "Hemen sat",
    dark: true,
    steps: ["Anlat", "Fotoğrafla", "Teklif al"],
    surface:
      "bg-gradient-to-br from-[#0b0b14] via-[#1a0b2e] to-[#03030a] text-white shadow-xl",
    iconBox: "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white",
    orbs: [
      "left-[-4rem] top-[-4rem] h-44 w-44 bg-violet-600/30",
      "right-[-4rem] top-1/4 h-40 w-40 bg-fuchsia-500/25",
      "bottom-[-4rem] left-1/4 h-44 w-44 bg-cyan-400/20",
    ],
    scrim: "bg-gradient-to-t from-black/60 via-black/20 to-transparent",
  },
  {
    href: "/urun-iste",
    icon: Search,
    eyebrow: "Aradığını bulamadın mı?",
    title: "Ürün iste",
    text: "Modelini yaz — uygun ilanı veya alternatifi buluruz.",
    cta: "Ürün iste",
    dark: false,
    steps: ["Model yaz", "Bütçe ekle", "Haber verelim"],
    surface:
      "bg-gradient-to-br from-white via-[#fff4ec] to-[#eef1ff] text-[#111] ring-1 ring-black/[0.06] shadow-lg",
    iconBox: "bg-gradient-to-br from-amber-400 to-rose-500 text-white",
    orbs: [
      "left-[-2.5rem] top-[-2.5rem] h-44 w-44 bg-amber-300/45",
      "right-[-2rem] bottom-[-2rem] h-48 w-48 bg-indigo-400/35",
      "right-1/4 top-1/4 h-32 w-32 bg-rose-300/35",
    ],
    scrim: "bg-gradient-to-t from-white/70 via-white/20 to-transparent",
  },
];

/**
 * Sat / iste — iki renkli, efektli büyük kart.
 */
export default function HomeActionRail() {
  return (
    <section className="bg-[#f5f5f7] py-6 sm:py-10" aria-label="Sat ya da iste">
      <div className="pv-wrap">
        <div className="grid gap-2.5 sm:gap-4 md:grid-cols-2">
          {actions.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "group relative flex min-h-[200px] flex-col justify-between overflow-hidden rounded-[20px] p-5 transition duration-300 active:scale-[0.99] hover:-translate-y-0.5 sm:min-h-[260px] sm:rounded-[28px] sm:p-8",
                  item.surface,
                ].join(" ")}
              >
                {/* Renkli ışıltı orb'ları */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  {item.orbs.map((orb, i) => (
                    <span
                      key={i}
                      className={[
                        "absolute rounded-full blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-90",
                        orb,
                      ].join(" ")}
                    />
                  ))}
                </div>
                {/* Üst parıltı */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent" />
                {/* Metin okunurluğu için scrim */}
                <div
                  className={["pointer-events-none absolute inset-0", item.scrim].join(" ")}
                />

                <div className="relative">
                  <span
                    className={[
                      "inline-flex h-10 w-10 items-center justify-center rounded-xl shadow-lg ring-1 ring-white/20 sm:h-12 sm:w-12 sm:rounded-2xl",
                      item.iconBox,
                    ].join(" ")}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
                  </span>
                  <p
                    className={[
                      "mt-3 text-[10px] font-semibold tracking-[0.12em] uppercase sm:mt-5 sm:text-[11px]",
                      item.dark ? "text-white/55" : "text-[#86868b]",
                    ].join(" ")}
                  >
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-1 text-[1.4rem] font-semibold tracking-[-0.03em] sm:mt-1.5 sm:text-[2rem]">
                    {item.title}
                  </h3>
                  <p
                    className={[
                      "mt-1.5 max-w-xs text-[13px] leading-relaxed sm:mt-2 sm:text-[14px]",
                      item.dark ? "text-white/65" : "text-[#6e6e73]",
                    ].join(" ")}
                  >
                    {item.text}
                  </p>
                </div>

                <div className="relative mt-4 flex flex-wrap items-center justify-between gap-2 sm:mt-6 sm:gap-3">
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {item.steps.map((s, i) => (
                      <span
                        key={s}
                        className={[
                          "rounded-full px-2 py-0.5 text-[9px] font-semibold backdrop-blur-sm sm:px-2.5 sm:py-1 sm:text-[10px]",
                          item.dark
                            ? "bg-white/10 text-white/75 ring-1 ring-white/10"
                            : "bg-white/70 text-[#525252] ring-1 ring-black/[0.05]",
                        ].join(" ")}
                      >
                        {i + 1}. {s}
                      </span>
                    ))}
                  </div>
                  <span
                    className={[
                      "inline-flex items-center gap-1.5 text-[13px] font-semibold transition group-hover:gap-2.5 sm:text-[14px]",
                      item.dark ? "text-white" : "text-black",
                    ].join(" ")}
                  >
                    {item.cta}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
