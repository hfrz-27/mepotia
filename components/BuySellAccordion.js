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

function ActionCard({ action }) {
  return (
    <Link
      href={action.href}
      className="group/item block w-[min(82vw,340px)] shrink-0 rounded-2xl border border-bw-200 bg-white p-4 transition hover:border-bw-300"
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
      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-bw-600">{action.text}</p>
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
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
            <ActionCard key={action.href} action={action} />
          ))}
        </PremiumScrollRow>
      </div>
    </section>
  );
}
