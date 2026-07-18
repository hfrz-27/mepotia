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
    router.push(q ? `/ara?q=${encodeURICommand(q)}` : "/ara");
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div
        className={`flex items-center gap-2 border px-3 py-1.5 transition sm:px-3 sm:py-2 ${
          dark
            ? "border-[#2a2a30] bg-[#111114] focus-within:border-[#ff4d1a]"
            : "border-bw-300 bg-white focus-within:border-bw-950"
        }`}
      >
        <Search className={`h-4 w-4 shrink-0 ${dark ? "text-zinc-500" : "text-bw-400"}`} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ürün, marka veya şehir ara..."
          className={`w-full bg-transparent py-2 text-sm outline-none ${
            dark
              ? "text-white placeholder:text-zinc-600"
              : "text-bw-900 placeholder:text-bw-500"
          }`}
          aria-label="Ara"
        />
        <button
          type="submit"
          className={`shrink-0 px-4 py-2.5 text-xs font-bold tracking-wide uppercase transition sm:text-sm ${
            dark
              ? "bg-[#ff4d1a] text-white hover:bg-[#ff6a3d]"
              : "bg-bw-950 text-white hover:bg-bw-800"
          }`}
        >
          Ara
        </button>
      </div>
    </form>
  );
}
