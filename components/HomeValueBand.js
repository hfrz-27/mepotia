"use client";

import {
  BadgeCheck,
  BadgeDollarSign,
  Handshake,
  ShieldCheck,
} from "lucide-react";

const VALUES = [
  { icon: ShieldCheck, title: "Güvenle al · sat", text: "Şeffaf süreç" },
  { icon: Handshake, title: "Dürüst ticaret", text: "Net açıklama" },
  { icon: BadgeDollarSign, title: "Adil fiyat", text: "Piyasa uyumu" },
  { icon: BadgeCheck, title: "Özenli seçim", text: "Temiz vitrin" },
];

function Chip({ item }) {
  const Icon = item.icon;
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl bg-white py-2 pr-2.5 pl-2 ring-1 ring-black/[0.05] sm:gap-3 sm:rounded-full sm:py-2.5 sm:pr-4 sm:pl-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f] sm:h-10 sm:w-10">
        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.6} />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[11px] font-semibold tracking-[-0.01em] text-[#1d1d1f] sm:text-[13px]">
          {item.title}
        </p>
        <p className="truncate text-[10px] text-[#6e6e73] sm:text-[12px]">{item.text}</p>
      </div>
    </div>
  );
}

/**
 * Sabit değer şeridi — döngü yok, pv-wrap ile üst bölümlerle hizalı.
 */
export default function HomeValueBand({ embedded = false }) {
  const content = (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-2.5 lg:grid-cols-4 lg:gap-3">
      {VALUES.map((item) => (
        <Chip key={item.title} item={item} />
      ))}
    </div>
  );

  if (embedded) return <div className="mt-5">{content}</div>;

  return (
    <section className="bg-[#f5f5f7] py-6 sm:py-8" aria-label="Değerler">
      <div className="pv-wrap">{content}</div>
    </section>
  );
}
