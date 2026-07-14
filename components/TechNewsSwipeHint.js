"use client";

import { Newspaper, ChevronRight } from "lucide-react";
import { openGlobalNewsDrawer } from "@/components/GlobalNewsDrawer";

export default function TechNewsSwipeHint() {
  return (
    <div className="flex min-h-[30vh] flex-col items-center justify-center px-4 text-center sm:min-h-[42vh]">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-bw-200 bg-white text-bw-950 shadow-[0_20px_40px_-28px_rgba(0,0,0,0.3)] sm:h-14 sm:w-14 sm:rounded-2xl">
        <Newspaper className="h-4 w-4 sm:h-5 sm:w-5" />
      </span>
      <p className="mt-4 text-xs font-semibold text-bw-800 sm:mt-5 sm:text-sm">Haberler için sola kaydır</p>
      <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-bw-500 sm:mt-2 sm:text-sm">
        Sayfanın sağ kenarından sola çekerek güncel haberleri her yerde açabilirsin.
      </p>
      <button
        type="button"
        onClick={openGlobalNewsDrawer}
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-bw-200 bg-white px-3 py-1.5 text-xs font-semibold text-bw-700 transition hover:border-bw-300 hover:text-bw-950 sm:mt-5 sm:px-4 sm:py-2 sm:text-sm"
      >
        Haberleri aç
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
