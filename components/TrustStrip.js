"use client";

import { Eye, Heart, ShieldCheck } from "lucide-react";
import PremiumScrollRow from "@/components/PremiumScrollRow";

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
      <div className="flex w-[min(68vw,220px)] shrink-0 items-center gap-2.5 rounded-xl border border-bw-100 bg-bw-50/80 px-3 py-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bw-950 text-white">
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
    <div className="flex items-center gap-3 text-left">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-bw-200 bg-bw-50 text-bw-900">
        <item.icon className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <div>
        <p className="text-xs font-semibold text-bw-950">{item.t}</p>
        <p className="mt-0.5 text-[10px] text-bw-500">{item.d}</p>
      </div>
    </div>
  );
}

export default function TrustStrip() {
  return (
    <>
      <div className="md:hidden">
        <p className="mb-2 text-[9px] font-semibold tracking-[0.2em] text-bw-400 uppercase">
          Neden Mepotia?
        </p>
        <PremiumScrollRow ariaLabel="Güven ilkeleri" gap="gap-2">
          {TRUST.map((item) => (
            <TrustCard key={item.t} item={item} compact />
          ))}
        </PremiumScrollRow>
      </div>

      <div className="hidden gap-6 rounded-2xl border border-bw-200 bg-white px-6 py-5 text-center md:grid md:grid-cols-3 lg:gap-8 lg:px-8 lg:py-6">
        {TRUST.map((item) => (
          <div key={item.t} className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-bw-200 bg-bw-50 text-bw-900">
              <item.icon className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-sm font-semibold text-bw-950">{item.t}</p>
              <p className="mt-0.5 text-xs text-bw-500">{item.d}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
