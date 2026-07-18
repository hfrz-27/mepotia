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
  },
];

/**
 * Sat / iste — iki eşit büyük kart (desk layout değil).
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
                  "group relative flex min-h-[200px] flex-col justify-between overflow-hidden rounded-[20px] p-5 transition active:scale-[0.99] sm:min-h-[260px] sm:rounded-[28px] sm:p-8",
                  item.dark
                    ? "bg-black text-white shadow-lg"
                    : "bg-white text-[#111] ring-1 ring-black/[0.06] shadow-md",
                ].join(" ")}
              >
                {/* Decor */}
                {item.dark ? (
                  <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/[0.06] blur-2xl" />
                ) : (
                  <div className="pointer-events-none absolute -right-8 bottom-0 h-32 w-32 rounded-full bg-black/[0.03] blur-2xl" />
                )}

                <div className="relative">
                  <span
                    className={[
                      "inline-flex h-10 w-10 items-center justify-center rounded-xl sm:h-12 sm:w-12 sm:rounded-2xl",
                      item.dark ? "bg-white/10 text-white" : "bg-black text-white",
                    ].join(" ")}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
                  </span>
                  <p
                    className={[
                      "mt-3 text-[10px] font-semibold tracking-[0.12em] uppercase sm:mt-5 sm:text-[11px]",
                      item.dark ? "text-white/50" : "text-[#86868b]",
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
                      item.dark ? "text-white/60" : "text-[#6e6e73]",
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
                          "rounded-full px-2 py-0.5 text-[9px] font-semibold sm:px-2.5 sm:py-1 sm:text-[10px]",
                          item.dark
                            ? "bg-white/10 text-white/70"
                            : "bg-[#f5f5f7] text-[#525252]",
                        ].join(" ")}
                      >
                        {i + 1}. {s}
                      </span>
                    ))}
                  </div>
                  <span
                    className={[
                      "inline-flex items-center gap-1.5 text-[13px] font-semibold sm:text-[14px]",
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
