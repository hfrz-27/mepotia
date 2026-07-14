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
    <div className="flex w-[min(78vw,280px)] snap-start shrink-0 items-center gap-3 rounded-xl bg-bw-50 px-4 py-3.5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-bw-200 bg-bw-50 text-bw-900">
        <item.icon className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-bw-950">{item.t}</p>
        <p className="text-xs text-bw-500">{item.d}</p>
      </div>
    </div>
  );
}

export default function TrustStrip() {
  return (
    <>
      <div className="md:hidden rounded-2xl border border-bw-200 bg-white px-4 py-4 shadow-[0_32px_80px_-40px_rgba(0,0,0,0.65)]">
        <PremiumScrollRow ariaLabel="Güven ilkeleri" gap="gap-3" className="-mx-1 px-1">
          {TRUST.map((item) => (
            <TrustCard key={item.t} item={item} />
          ))}
        </PremiumScrollRow>
      </div>

      <div className="hidden gap-6 rounded-2xl border border-bw-200 bg-white px-8 py-6 shadow-[0_32px_80px_-40px_rgba(0,0,0,0.65)] md:grid md:grid-cols-3">
        {TRUST.map((item) => (
          <div key={item.t} className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-bw-200 bg-bw-50 text-bw-900">
              <item.icon className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-sm font-semibold text-bw-950">{item.t}</p>
              <p className="text-xs text-bw-500">{item.d}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
