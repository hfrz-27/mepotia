"use client";

import { Newspaper, ChevronRight } from "lucide-react";
import { openGlobalNewsDrawer } from "@/components/GlobalNewsDrawer";

export default function TechNewsSwipeHint() {
  return (
    <div className="flex min-h-[42vh] flex-col items-center justify-center px-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-bw-200 bg-white text-bw-950 shadow-[0_20px_40px_-28px_rgba(0,0,0,0.3)]">
        <Newspaper className="h-5 w-5" />
      </span>
      <p className="mt-5 text-sm font-semibold text-bw-800">Haberler için sağa kaydır</p>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-bw-500">
        Sayfanın sol kenarından sağa çekerek güncel haberleri her yerde açabilirsin.
      </p>
      <button
        type="button"
        onClick={openGlobalNewsDrawer}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-bw-200 bg-white px-4 py-2 text-sm font-semibold text-bw-700 transition hover:border-bw-300 hover:text-bw-950"
      >
        Haberleri aç
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
