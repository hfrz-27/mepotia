"use client";

import { useEffect, useRef } from "react";

/** /ara sayfasında kutu otomatik odaklanır */
export default function SearchFocusInput({ defaultValue = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Mobil klavye için kısa gecikme
    const t = window.setTimeout(() => {
      el.focus({ preventScroll: false });
      try {
        const len = el.value?.length || 0;
        el.setSelectionRange(len, len);
      } catch {
        /* ignore */
      }
    }, 80);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <input
      ref={ref}
      name="q"
      type="search"
      enterKeyHint="search"
      autoComplete="off"
      autoCorrect="off"
      defaultValue={defaultValue}
      placeholder="Ürün, marka veya şehir ara…"
      className="min-w-0 flex-1 bg-transparent px-1 py-2 text-[16px] text-[#1d1d1f] outline-none placeholder:text-[#86868b] sm:text-[15px]"
      aria-label="Ürün ara"
    />
  );
}
