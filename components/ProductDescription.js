"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const MIN_CHARS = 280;

export default function ProductDescription({ text }) {
  const [expanded, setExpanded] = useState(false);

  if (!text?.trim()) {
    return (
      <p className="mt-3 text-sm leading-relaxed text-bw-500 sm:text-base">Açıklama eklenmemiş.</p>
    );
  }

  const isLong = text.length > MIN_CHARS || text.split("\n").length > 5;

  return (
    <div>
      <p
        className={`mt-3 whitespace-pre-wrap text-sm leading-relaxed text-bw-700 sm:text-base ${
          !expanded && isLong ? "line-clamp-6" : ""
        }`}
      >
        {text}
      </p>
      {isLong ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-bw-800 underline-offset-4 hover:text-bw-950 hover:underline"
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
