"use client";

import { Eye, Heart, ShieldCheck } from "lucide-react";
import PremiumScrollRow from "@/components/PremiumScrollRow";

const TRUST = [
  {
    icon: ShieldCheck,
    t: "Güvenle Al, Güvenle Sat",
    d: "Güvenle alışveriş edebileceğiniz bir vitrin.",
  },
  {
    icon: Eye,
    t: "Şeffaf sunum",
    d: "Net fiyat, net açıklama",
  },
  {
    icon: Heart,
    t: "Dürüstlüğün Değeri",
    d: "Zorlu yollardan gelen tecrübe",
  },
];

function TrustCard({ item, compact = false }) {
  if (compact) {
    return (
      <div className="flex w-[min(74vw,260px)] shrink-0 items-center gap-3 rounded-2xl border border-bw-100 bg-bw-50/80 px-3.5 py-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-bw-950 text-white">
          <item.icon className="h-4 w-4" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-bw-950">{item.t}</p>
          <p className="text-[11px] text-bw-500">{item.d}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 text-left">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-bw-200 bg-bw-50 text-bw-900">
        <item.icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <div>
        <p className="text-sm font-semibold text-bw-950">{item.t}</p>
        <p className="mt-0.5 text-xs text-bw-500">{item.d}</p>
      </div>
    </div>
  );
}

export default function TrustStrip() {
  return (
    <>
      <div className="md:hidden">
        <p className="mb-3 text-[10px] font-semibold tracking-[0.22em] text-bw-400 uppercase">
          Neden Mepotia?
        </p>
        <PremiumScrollRow ariaLabel="Güven ilkeleri" gap="gap-2.5">
          {TRUST.map((item) => (
            <TrustCard key={item.t} item={item} compact />
          ))}
        </PremiumScrollRow>
      </div>

      <div className="hidden gap-8 rounded-2xl border border-bw-200 bg-white px-8 py-7 shadow-[0_32px_80px_-40px_rgba(0,0,0,0.12)] md:grid md:grid-cols-3 lg:gap-10 lg:px-10 lg:py-8">
        {TRUST.map((item) => (
          <TrustCard key={item.t} item={item} />
        ))}
      </div>
    </>
  );
}
