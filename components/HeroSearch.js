"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

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
      <div className="flex items-center gap-2 rounded-2xl border border-bw-300 bg-white/95 px-4 py-2 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)] backdrop-blur transition focus-within:border-bw-950">
        <Search className="h-5 w-5 shrink-0 text-bw-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ürün, marka veya şehir ara..."
          className="w-full bg-transparent py-2.5 text-sm text-bw-900 outline-none placeholder:text-bw-400"
          aria-label="Ara"
        />
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-bw-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-bw-800"
        >
          Ara
        </button>
      </div>
    </form>
  );
}
