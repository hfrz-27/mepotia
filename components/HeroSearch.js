"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function HeroSearch({ variant = "light" }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const dark = variant === "dark";

  const onSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/ara?q=${encodeURIComponent(q)}` : "/ara");
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div
        className={[
          "flex items-center gap-2 rounded-full px-4 py-2 transition sm:px-5 sm:py-2.5",
          dark
            ? "border border-white/15 bg-white/95 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] focus-within:ring-4 focus-within:ring-white/10"
            : "border border-black/[0.06] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] focus-within:ring-4 focus-within:ring-black/[0.04]",
        ].join(" ")}
      >
        <Search className="h-4 w-4 shrink-0 text-[#6e6e73]" strokeWidth={1.6} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ürün, marka veya şehir ara..."
          className="w-full bg-transparent py-2.5 text-[15px] text-[#1d1d1f] outline-none placeholder:text-[#86868b]"
          aria-label="Ara"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-[#1d1d1f] px-5 py-2.5 text-[14px] font-normal text-white transition hover:bg-[#000000]"
        >
          Ara
        </button>
      </div>
    </form>
  );
}
