"use client";

import { BadgeCheck, BadgeDollarSign, Handshake, ShieldCheck } from "lucide-react";

const VALUES = [
  { icon: ShieldCheck, title: "Güvenle al · sat", text: "Şeffaf süreç" },
  { icon: Handshake, title: "Dürüst ticaret", text: "Net açıklama" },
  { icon: BadgeDollarSign, title: "Adil fiyat", text: "Piyasa uyumu" },
  { icon: BadgeCheck, title: "Özenli seçim", text: "Temiz vitrin" },
];

/**
 * Sabit güven şeridi — döngü yok, pv-wrap hizalı.
 */
export default function HomeValueBand({ embedded = false }) {
  const content = (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
      {VALUES.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className="flex items-center gap-2.5 rounded-2xl bg-white px-3 py-2.5 ring-1 ring-black/[0.05] sm:gap-3 sm:px-3.5 sm:py-3"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1d1d1f] text-white sm:h-10 sm:w-10">
              <Icon className="h-4 w-4" strokeWidth={1.6} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold text-[#1d1d1f] sm:text-[13px]">
                {item.title}
              </p>
              <p className="truncate text-[11px] text-[#6e6e73]">{item.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );

  if (embedded) return <div className="mt-5">{content}</div>;

  return (
    <section className="bg-[#f5f5f7] py-5 sm:py-7" aria-label="Değerler">
      <div className="pv-wrap">{content}</div>
    </section>
  );
}
