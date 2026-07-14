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

function TrustCard({ item }) {
  return (
    <div className="flex w-[min(74vw,320px)] shrink-0 items-center gap-3 rounded-2xl border border-bw-100 bg-bw-50/80 px-3.5 py-3">
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

export default function TrustStrip() {
  return (
    <div>
      <p className="mb-3 text-[10px] font-semibold tracking-[0.22em] text-bw-400 uppercase">
        Neden Mepotia?
      </p>
      <PremiumScrollRow ariaLabel="Güven ilkeleri" gap="gap-2.5">
        {TRUST.map((item) => (
          <TrustCard key={item.t} item={item} />
        ))}
      </PremiumScrollRow>
    </div>
  );
}
