"use client";

import Link from "next/link";
import { ArrowRight, BadgeDollarSign, Package, Search } from "lucide-react";
import PremiumScrollRow from "@/components/PremiumScrollRow";
import HomeSectionHeader from "@/components/HomeSectionHeader";

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
    href: "/fiyat-karsilastir",
    icon: BadgeDollarSign,
    eyebrow: "Karşılaştır",
    title: "Fiyat Kontrolü",
    text: "Mepotia ilanını piyasa fiyatlarıyla yan yana gör.",
    cta: "Karşılaştırmaya git",
  },
  {
    href: "/urun-iste",
    icon: Search,
    eyebrow: "Aradığını bulalım",
    title: "Ürün Talebi Oluştur",
    text: "Aradığın ürünü yaz; uygun seçenek bulunca haber verelim.",
    cta: "İstek gönder",
  },
];

function ActionCard({ action, compact = false }) {
  return (
    <Link
      href={action.href}
      className={`group/item flex h-full flex-col rounded-2xl border border-bw-200 bg-white text-center transition hover:border-bw-400 hover:shadow-[0_24px_56px_-32px_rgba(0,0,0,0.2)] sm:text-left ${
        compact ? "w-[min(82vw,280px)] shrink-0 p-4" : "p-6 lg:p-7"
      }`}
    >
      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-bw-950 text-white sm:mx-0">
        <action.icon className="h-5 w-5" />
      </span>
      <p className="mt-4 text-[10px] font-semibold tracking-[0.18em] text-bw-500 uppercase">
        {action.eyebrow}
      </p>
      <h3 className="mt-2 font-display text-xl font-semibold tracking-wide text-bw-950 lg:text-2xl">
        {action.title}
      </h3>
      <p className={`mt-2 flex-1 leading-relaxed text-bw-600 ${compact ? "line-clamp-2 text-xs" : "text-sm"}`}>
        {action.text}
      </p>
      <span className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-semibold text-bw-950 sm:justify-start">
        {action.cta}
        <ArrowRight className="h-4 w-4 transition group-hover/item:translate-x-0.5" />
      </span>
    </Link>
  );
}

export default function BuySellAccordion() {
  return (
    <section id="al-sat" className="relative scroll-mt-28 overflow-hidden border-y border-bw-200 bg-bw-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <HomeSectionHeader
          eyebrow="Senin için"
          title="Sat, karşılaştır, talep et"
          description="Üç eşit kanal: satış değerlendirmesi, fiyat kontrolü ve ürün isteği."
        />

        <div className="mt-2 md:hidden">
          <PremiumScrollRow
            ariaLabel="Satış, fiyat ve ürün isteği seçenekleri"
            fadeFrom="from-bw-50/35"
            gap="gap-3"
          >
            {ACTIONS.map((action) => (
              <ActionCard key={action.href} action={action} compact />
            ))}
          </PremiumScrollRow>
        </div>

        <div className="hidden gap-4 md:grid md:grid-cols-3 lg:gap-5">
          {ACTIONS.map((action) => (
            <ActionCard key={action.href} action={action} />
          ))}
        </div>
      </div>
    </section>
  );
}
