"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const MIN_CHARS = 240;

export default function TechPostBody({ text }) {
  const [expanded, setExpanded] = useState(false);

  if (!text?.trim()) {
    return <p className="text-base leading-relaxed text-bw-500">İçerik eklenmemiş.</p>;
  }

  const isLong = text.length > MIN_CHARS || text.split("\n").length > 4;

  return (
    <div>
      <div className={`relative ${!expanded && isLong ? "max-h-[220px] overflow-hidden sm:max-h-[260px]" : ""}`}>
        <div
          className={`whitespace-pre-wrap text-base leading-[1.9] text-bw-700 sm:text-[17px] sm:leading-[1.95] ${
            !expanded && isLong ? "" : ""
          }`}
        >
          {text}
        </div>
        {!expanded && isLong ? (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/90 to-transparent"
            aria-hidden
          />
        ) : null}
      </div>
      {isLong ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-5 inline-flex items-center gap-1.5 rounded-xl border border-bw-200 bg-bw-50 px-4 py-2.5 text-sm font-semibold text-bw-900 transition hover:border-bw-400 hover:bg-white"
        >
          {expanded ? "Daha az göster" : "Daha fazla göster"}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
      ) : null}
    </div>
  );
}
