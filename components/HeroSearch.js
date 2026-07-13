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
    <form
      onSubmit={onSubmit}
      className="animate-fade-up-delay mx-auto mt-8 w-full max-w-xl"
    >
      <div
        className={`flex items-center gap-2 rounded-2xl border px-4 py-2 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.45)] transition focus-within:border-white/40 ${
          dark
            ? "border-white/15 bg-white/10 focus-within:bg-white/15"
            : "border-bw-300 bg-white focus-within:border-bw-950"
        }`}
      >
        <Search className={`h-5 w-5 shrink-0 ${dark ? "text-bw-400" : "text-bw-400"}`} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ürün, marka veya şehir ara..."
          className={`w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-bw-500 ${
            dark ? "text-white" : "text-bw-900"
          }`}
          aria-label="Ara"
        />
        <button
          type="submit"
          className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
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
