"use client";

import Link from "next/link";
import { ChevronRight, Laptop, Smartphone, Tablet, Watch } from "lucide-react";
import { useState } from "react";

const DEVICES = [
  { id: "telefon", label: "Telefon", Icon: Smartphone },
  { id: "bilgisayar", label: "Bilgisayar", Icon: Laptop },
  { id: "tablet", label: "Tablet", Icon: Tablet },
  { id: "saat", label: "Akıllı saat", Icon: Watch },
];

export default function HomeTradeQuickStart() {
  const [selected, setSelected] = useState("telefon");

  return (
    <div className="absolute inset-x-4 bottom-4 z-10 rounded-[22px] border border-white/70 bg-white/88 p-4 text-[#1d1d1f] shadow-[0_24px_70px_-30px_rgba(0,0,0,.48)] backdrop-blur-2xl sm:inset-x-6 sm:bottom-6 sm:p-5 lg:inset-x-8 lg:bottom-8">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[.17em] text-[#86868b]">Hızlı başlangıç</p>
          <p className="mt-1 text-[15px] font-semibold tracking-[-.025em]">Hangi cihazı takas edeceksin?</p>
        </div>
        <span className="hidden text-[11px] text-[#86868b] sm:block">1 dakikada başla</span>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {DEVICES.map(({ id, label, Icon }) => {
          const active = selected === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setSelected(id)}
              className={`flex min-w-0 flex-col items-center justify-center rounded-[14px] px-1 py-3 transition duration-300 ${active ? "bg-[#1d1d1f] text-white shadow-lg" : "bg-black/[.045] text-[#6e6e73] hover:bg-black/[.075] hover:text-[#1d1d1f]"}`}
              aria-pressed={active}
            >
              <Icon className="h-5 w-5" strokeWidth={1.6} />
              <span className="mt-1.5 max-w-full truncate text-[10px] font-medium sm:text-[11px]">{label}</span>
            </button>
          );
        })}
      </div>

      <Link href={`/takas?cihaz=${selected}`} className="mt-3 flex h-11 items-center justify-center gap-1 rounded-full bg-[#0071e3] px-5 text-[13px] font-semibold text-white transition hover:bg-[#0077ed]">
        Takas değerini öğren <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
