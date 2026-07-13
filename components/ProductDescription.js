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
    <div className={wide ? "" : ""}>
      <div className={`relative ${!expanded && isLong && wide ? "max-h-[340px] overflow-hidden" : ""}`}>
        <p
          className={`whitespace-pre-wrap leading-relaxed text-bw-700 ${
            wide
              ? "text-base lg:columns-2 lg:gap-x-12 lg:text-[15px] lg:leading-[1.9]"
              : "mt-3 text-sm sm:text-base"
          } ${!expanded && isLong && !wide ? "line-clamp-6" : ""}`}
        >
          {text}
        </p>
        {!expanded && isLong && wide ? (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bw-50 via-bw-50/80 to-transparent"
            aria-hidden
          />
        ) : null}
      </div>
      {isLong ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-bw-800 underline-offset-4 hover:text-bw-950 hover:underline ${
            wide ? "mt-6" : "mt-3"
          }`}
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
