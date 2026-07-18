"use client";

import { Eye, Handshake, ShieldCheck, Sparkles } from "lucide-react";
import HybridAutoScrollRow from "@/components/HybridAutoScrollRow";

const VALUES = [
  { icon: ShieldCheck, title: "Güvenle al, güvenle sat", text: "Şeffaf fiyat" },
  { icon: Eye, title: "Şeffaf vitrin", text: "Net açıklama" },
  { icon: Handshake, title: "Dürüst ticaret", text: "Köklü güven" },
  { icon: Sparkles, title: "Premium deneyim", text: "Sade arayüz" },
];

function ValueCard({ item, compact = false }) {
  const Icon = item.icon;

  return (
    <div
      className={`flex shrink-0 items-center gap-2.5 rounded-2xl border border-bw-800 bg-bw-950 shadow-[0_12px_32px_-20px_rgba(0,0,0,0.55)] ${
        compact ? "w-[9.5rem] px-3 py-2.5" : "w-44 gap-3 px-4 py-3 sm:w-48"
      }`}
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-xl bg-white text-bw-950 ${
          compact ? "h-8 w-8" : "h-10 w-10"
        }`}
      >
        <Icon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} strokeWidth={1.75} />
      </span>
      <div className="min-w-0 text-left">
        <p className={`font-semibold text-white ${compact ? "text-[10px] leading-tight" : "text-xs"}`}>
          {item.title}
        </p>
        <p className={`text-bw-400 ${compact ? "text-[9px]" : "text-[11px]"}`}>{item.text}</p>
      </div>
    </div>
  );
}

export default function HomeValueBand({ embedded = false }) {
  const desktopContent = (
    <div className="hidden flex-wrap items-center justify-center gap-3 sm:flex sm:gap-4">
      {VALUES.map((item) => (
        <ValueCard key={item.title} item={item} />
      ))}
    </div>
  );

  const mobileContent = (
    <div className="sm:hidden">
      <HybridAutoScrollRow ariaLabel="Güven ve şeffaflık" gap="gap-2.5" scrollSpeed={0.18}>
        {VALUES.map((item) => (
          <ValueCard key={item.title} item={item} compact />
        ))}
      </HybridAutoScrollRow>
    </div>
  );

  const content = (
    <>
      {mobileContent}
      {desktopContent}
    </>
  );

  if (embedded) {
    return <div className="mt-6 border-t border-bw-100 pt-6">{content}</div>;
  }

  return (
    <section className="border-y border-bw-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">{content}</div>
    </section>
  );
}
