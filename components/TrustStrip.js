"use client";

import { Eye, Heart, ShieldCheck } from "lucide-react";
import HybridAutoScrollRow from "@/components/HybridAutoScrollRow";

const TRUST = [
  {
    icon: ShieldCheck,
    t: "Güvenle Al, Güvenle Sat",
    d: "Şeffaf vitrin",
  },
  {
    icon: Eye,
    t: "Şeffaf sunum",
    d: "Net fiyat",
  },
  {
    icon: Heart,
    t: "Dürüstlüğün Değeri",
    d: "Köklü güven",
  },
];

function TrustCard({ item, compact = false }) {
  if (compact) {
    return (
      <div className="flex w-[min(68vw,220px)] shrink-0 items-center gap-2.5 rounded-xl border border-bw-100 bg-bw-50/80 px-3 py-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bw-950 text-white shadow-[0_4px_12px_-6px_rgba(0,0,0,0.4)]">
          <item.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-bw-950">{item.t}</p>
          <p className="text-[10px] text-bw-500">{item.d}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-bw-200/70 bg-gradient-to-br from-white to-bw-50/80 px-4 py-2.5 shadow-[0_10px_28px_-22px_rgba(0,0,0,0.18)]">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-bw-950 text-white shadow-[0_6px_16px_-8px_rgba(0,0,0,0.45)]">
        <item.icon className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 text-left">
        <p className="text-xs font-semibold text-bw-950">{item.t}</p>
        <p className="text-[10px] text-bw-500">{item.d}</p>
      </div>
    </div>
  );
}

export default function TrustStrip() {
  return (
    <>
      <div className="md:hidden">
        <p className="mb-1.5 text-[9px] font-semibold tracking-[0.2em] text-bw-400 uppercase">
          Neden Mepotia?
        </p>
        <HybridAutoScrollRow ariaLabel="Güven ilkeleri" gap="gap-2" scrollSpeed={0.18}>
          {TRUST.map((item) => (
            <TrustCard key={item.t} item={item} compact />
          ))}
        </HybridAutoScrollRow>
      </div>

      <div className="hidden gap-3 md:grid md:grid-cols-3 lg:gap-4">
        {TRUST.map((item) => (
          <TrustCard key={item.t} item={item} />
        ))}
      </div>
    </>
  );
}
