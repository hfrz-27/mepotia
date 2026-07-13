"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const MIN_CHARS = 280;

export default function ProductDescription({ text, wide = false }) {
  const [expanded, setExpanded] = useState(false);

  if (!text?.trim()) {
    return (
      <p className={`text-sm leading-relaxed text-bw-500 sm:text-base ${wide ? "" : "mt-3"}`}>
        Açıklama eklenmemiş.
      </p>
    );
  }

  const isLong = text.length > MIN_CHARS || text.split("\n").length > 5;

  return (
    <div>
      <div
        className={`relative ${!expanded && isLong && wide ? "max-h-[340px] overflow-hidden" : ""} ${
          !expanded && isLong && !wide ? "max-h-[9.5rem] overflow-hidden sm:max-h-[10.5rem]" : ""
        }`}
      >
        <p
          className={`whitespace-pre-wrap leading-relaxed text-bw-700 ${
            wide
              ? "text-base lg:columns-2 lg:gap-x-12 lg:text-[15px] lg:leading-[1.9]"
              : "mt-0 text-sm leading-[1.65] sm:text-base"
          }`}
        >
          {text}
        </p>
        {!expanded && isLong ? (
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t to-transparent ${
              wide ? "from-bw-50 via-bw-50/90" : "from-white via-white/95"
            }`}
            aria-hidden
          />
        ) : null}
      </div>

      {isLong ? (
        <div className={`flex justify-center ${wide ? "mt-6" : "mt-3"}`}>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className={`group inline-flex w-full max-w-sm items-center justify-center gap-1.5 rounded-xl px-5 text-sm font-semibold transition duration-300 sm:w-auto ${
              wide ? "py-3.5" : "py-2.5"
            } ${
              expanded
                ? "border border-bw-200 bg-white text-bw-900 hover:border-bw-950 hover:bg-bw-50"
                : wide
                  ? "border-2 border-bw-950 bg-bw-950 text-white shadow-[0_12px_32px_-16px_rgba(0,0,0,0.55)] hover:bg-bw-800 hover:shadow-[0_16px_40px_-14px_rgba(0,0,0,0.5)] active:scale-[0.98]"
                  : "border border-bw-950 bg-bw-950 text-white shadow-[0_8px_24px_-14px_rgba(0,0,0,0.45)] hover:bg-bw-800 active:scale-[0.98]"
            }`}
          >
          {expanded ? "Daha az göster" : "Daha fazla göster"}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
        </div>
      ) : null}
    </div>
  );
}
