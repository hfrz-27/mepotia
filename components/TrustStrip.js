"use client";

import Link from "next/link";
import { ArrowLeftRight, BadgeDollarSign, BookOpenCheck } from "lucide-react";
import HybridAutoScrollRow from "@/components/HybridAutoScrollRow";

const ACTIONS = [
  {
    href: "/rehber",
    icon: BookOpenCheck,
    t: "Rehber",
    d: "Almadan önce oku",
  },
  {
    href: "/fiyat-karsilastir",
    icon: BadgeDollarSign,
    t: "Fiyat",
    d: "Piyasa karşılaştır",
  },
  {
    href: "/bana-sat",
    icon: ArrowLeftRight,
    t: "Takas",
    d: "Ürününü değerlendir",
  },
];

function TrustCard({ item, compact = false }) {
  if (compact) {
    return (
      <Link
        href={item.href}
        className="flex w-[min(68vw,220px)] shrink-0 items-center gap-2.5 rounded-xl border border-bw-100 bg-bw-50/80 px-3 py-2 transition hover:border-bw-300 hover:bg-white"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bw-950 text-white shadow-[0_4px_12px_-6px_rgba(0,0,0,0.4)]">
          <item.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-bw-950">{item.t}</p>
          <p className="text-[10px] text-bw-500">{item.d}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      className="group flex items-center gap-3 rounded-2xl border border-bw-200/70 bg-gradient-to-br from-white to-bw-50/80 px-4 py-2.5 shadow-[0_10px_28px_-22px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:border-bw-300 hover:shadow-[0_14px_32px_-20px_rgba(0,0,0,0.22)]"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-bw-950 text-white shadow-[0_6px_16px_-8px_rgba(0,0,0,0.45)] transition group-hover:scale-105">
        <item.icon className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 text-left">
        <p className="text-xs font-semibold text-bw-950">{item.t}</p>
        <p className="text-[10px] text-bw-500">{item.d}</p>
      </div>
    </Link>
  );
}

export default function TrustStrip() {
  return (
    <>
      <div className="md:hidden">
        <p className="mb-1.5 text-[9px] font-semibold tracking-[0.2em] text-bw-400 uppercase">
          Hızlı araçlar
        </p>
        <HybridAutoScrollRow ariaLabel="Rehber, karşılaştırma ve takas" gap="gap-2" scrollSpeed={0.18}>
          {ACTIONS.map((item) => (
            <TrustCard key={item.href} item={item} compact />
          ))}
        </HybridAutoScrollRow>
      </div>

      <div className="hidden gap-3 md:grid md:grid-cols-3 lg:gap-4">
        {ACTIONS.map((item) => (
          <TrustCard key={item.href} item={item} />
        ))}
      </div>
    </>
  );
}
