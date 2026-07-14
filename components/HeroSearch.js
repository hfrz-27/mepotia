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
        className={`flex items-center gap-2 rounded-2xl border px-3 py-1.5 transition sm:px-4 sm:py-2 ${
          dark
            ? "border-white/12 bg-black/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md focus-within:border-white/25 focus-within:bg-black/30"
            : "border-bw-300 bg-white shadow-[0_12px_32px_-20px_rgba(0,0,0,0.2)] focus-within:border-bw-950"
        }`}
      >
        <Search className={`h-4 w-4 shrink-0 ${dark ? "text-white/40" : "text-bw-400"}`} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ürün, marka veya şehir ara..."
          className={`w-full bg-transparent py-2 text-sm outline-none placeholder:text-bw-500 ${
            dark ? "text-white placeholder:text-white/35" : "text-bw-900"
          }`}
          aria-label="Ara"
        />
        <button
          type="submit"
          className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-semibold transition sm:px-4 sm:py-2.5 sm:text-sm ${
            dark
              ? "bg-white text-bw-950 hover:bg-bw-100"
              : "bg-bw-950 text-white hover:bg-bw-800"
          }`}
        >
          Ara
        </button>
      </div>
    </form>
  );
}
