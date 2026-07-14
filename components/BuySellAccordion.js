"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, Package, Search } from "lucide-react";
import PremiumScrollRow from "@/components/PremiumScrollRow";

const ACTIONS = [
  {
    href: "/bana-sat",
    icon: Package,
    eyebrow: "Satış teklifi",
    title: "Ürününü Değerlendir",
    text: "Kullanmadığın ürünleri paylaş, doğru değerini birlikte bulalım.",
    cta: "Satış talebi oluştur",
  },
  {
    href: "/urun-iste",
    icon: Search,
    eyebrow: "Aradığını bulalım",
    title: "Ürün Talebi Oluştur",
    text: "Aradığın ürünü yaz; uygun bir seçenek bulduğumda seni haberdar edeyim.",
    cta: "İstek gönder",
  },
];

function ActionCard({ action, compact = false }) {
  return (
    <Link
      href={action.href}
      className={`group/item block shrink-0 rounded-2xl border border-bw-200 bg-white transition sm:hover:border-bw-400 sm:hover:shadow-[0_20px_48px_-32px_rgba(0,0,0,0.25)] ${
        compact ? "w-[min(82vw,300px)] p-4" : "p-5"
      }`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-bw-950 text-white">
        <action.icon className="h-4 w-4" />
      </span>
      <p className="mt-3 text-[10px] font-semibold tracking-[0.18em] text-bw-500 uppercase">
        {action.eyebrow}
      </p>
      <h3 className="mt-1.5 font-display text-lg font-semibold tracking-wide text-bw-950">
        {action.title}
      </h3>
      <p className="mt-2 text-xs leading-relaxed text-bw-600 line-clamp-2">{action.text}</p>
      <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-bw-950">
        {action.cta}
        <ArrowRight className="h-3.5 w-3.5 transition group-hover/item:translate-x-0.5" />
      </span>
    </Link>
  );
}

export default function BuySellAccordion() {
  return (
    <section id="al-sat" className="relative scroll-mt-28 overflow-hidden border-y border-bw-200 bg-bw-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Mobil — kaydırmalı kartlar */}
        <div className="md:hidden">
          <p className="text-[10px] font-semibold tracking-[0.22em] text-bw-500 uppercase">Senin için</p>
          <h2 className="mt-1 font-display text-xl font-semibold tracking-wide text-bw-950">
            Ürününü Sat, Aradığını Bul
          </h2>
          <PremiumScrollRow
            ariaLabel="Satış ve ürün isteği seçenekleri"
            className="mt-4"
            fadeFrom="from-bw-50/35"
            gap="gap-3"
          >
            {ACTIONS.map((action) => (
              <ActionCard key={action.href} action={action} compact />
            ))}
          </PremiumScrollRow>
        </div>

        {/* Masaüstü — açılır menü */}
        <details className="group relative hidden overflow-hidden rounded-[1.75rem] bg-bw-950 shadow-[0_28px_70px_-42px_rgba(0,0,0,0.65)] md:block">
          <div className="story-band-grid absolute inset-0 opacity-15" aria-hidden />
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" aria-hidden />
          <summary className="relative flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-7 sm:py-6">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.22em] text-bw-400 uppercase">
                Senin için
              </p>
              <h2 className="mt-1 font-display text-xl font-semibold tracking-wide text-white sm:text-2xl">
                Ürününü Sat, Aradığını Bul
              </h2>
              <p className="mt-1 text-sm text-bw-400">
                Satış veya ürün isteği için seçenekleri aç.
              </p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition group-open:rotate-180">
              <ChevronDown className="h-4 w-4" />
            </span>
          </summary>

          <div className="relative grid gap-3 border-t border-white/10 bg-white p-4 sm:grid-cols-2 sm:p-5">
            {ACTIONS.map((action) => (
              <ActionCard key={action.href} action={action} />
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
