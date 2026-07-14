"use client";

import Link from "next/link";
import { ArrowRight, Package, Search } from "lucide-react";
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
      className={`group/item block shrink-0 rounded-2xl border border-bw-200 bg-white transition hover:border-bw-400 hover:shadow-[0_24px_56px_-32px_rgba(0,0,0,0.2)] ${
        compact ? "w-[min(82vw,300px)] p-4" : "p-6 lg:p-7"
      }`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bw-950 text-white">
        <action.icon className="h-5 w-5" />
      </span>
      <p className="mt-4 text-[10px] font-semibold tracking-[0.18em] text-bw-500 uppercase">
        {action.eyebrow}
      </p>
      <h3 className="mt-2 font-display text-xl font-semibold tracking-wide text-bw-950 lg:text-2xl">
        {action.title}
      </h3>
      <p className={`mt-2 leading-relaxed text-bw-600 ${compact ? "line-clamp-2 text-xs" : "text-sm"}`}>
        {action.text}
      </p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-bw-950">
        {action.cta}
        <ArrowRight className="h-4 w-4 transition group-hover/item:translate-x-0.5" />
      </span>
    </Link>
  );
}

export default function BuySellAccordion() {
  return (
    <section id="al-sat" className="relative scroll-mt-28 overflow-hidden border-y border-bw-200 bg-bw-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="max-w-2xl md:max-w-none">
          <p className="text-[10px] font-semibold tracking-[0.22em] text-bw-500 uppercase">Senin için</p>
          <h2 className="mt-1 font-display text-xl font-semibold tracking-wide text-bw-950 sm:text-3xl lg:text-4xl">
            Ürününü Sat, Aradığını Bul
          </h2>
        </div>

        <div className="mt-5 md:hidden">
          <PremiumScrollRow
            ariaLabel="Satış ve ürün isteği seçenekleri"
            fadeFrom="from-bw-50/35"
            gap="gap-3"
          >
            {ACTIONS.map((action) => (
              <ActionCard key={action.href} action={action} compact />
            ))}
          </PremiumScrollRow>
        </div>

        <div className="mt-6 hidden gap-5 md:grid md:grid-cols-2 lg:gap-6">
          {ACTIONS.map((action) => (
            <ActionCard key={action.href} action={action} />
          ))}
        </div>
      </div>
    </section>
  );
}
