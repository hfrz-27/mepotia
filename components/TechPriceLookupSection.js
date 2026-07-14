"use client";

import { useState } from "react";
import Link from "next/link";
import { Banknote, Loader2, Search, Sparkles } from "lucide-react";
import PriceComparePanel from "@/components/PriceComparePanel";

export default function TechPriceLookupSection() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const onSearch = async (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q.length < 2) {
      setError("Model veya ürün adı gir.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/tech-price-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Fiyat alınamadı.");
      setResult(data);
    } catch (err) {
      setError(err.message || "Fiyat alınamadı.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="fiyat-sorgula"
      className="relative scroll-mt-28 overflow-hidden bg-bw-50"
    >
      <div className="story-band-grid absolute inset-0 opacity-[0.035]" aria-hidden />
      <div className="absolute -top-32 right-[-7rem] h-80 w-80 rounded-full bg-amber-200/40 blur-3xl" aria-hidden />
      <div className="absolute -left-24 top-28 h-56 w-56 rounded-full bg-bw-300/30 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.24em] text-amber-800 uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            Fiyat karşılaştır
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-wide text-bw-950 sm:text-4xl">
            Mepotia vs piyasa fiyatı
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-bw-600 sm:text-base">
            Model adını yaz — Mepotia&apos;daki gerçek ilanı Epey üzerinden toplanan mağaza
            fiyatlarıyla karşılaştır. Başka yerde ne kadara satılıyor, tek bakışta gör.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-bw-200 bg-white p-3 shadow-[0_28px_80px_-48px_rgba(0,0,0,0.35)] sm:p-4 lg:mt-10">
          <form onSubmit={onSearch} className="flex flex-col gap-3 sm:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-bw-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Örn. iPhone 15, Samsung S24, MacBook Air M2"
                className="w-full rounded-2xl border border-bw-200 bg-bw-50 py-3.5 pr-4 pl-11 text-sm text-bw-950 placeholder:text-bw-400 outline-none transition focus:border-bw-400 focus:bg-white focus:ring-2 focus:ring-bw-950/10"
                aria-label="Teknoloji modeli"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-bw-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-bw-800 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Banknote className="h-4 w-4" />
              )}
              Karşılaştır
            </button>
          </form>

          {error ? (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {error}
            </p>
          ) : null}

          {result?.hasData ? (
            <div className="mt-6">
              <PriceComparePanel result={result} variant="light" />
            </div>
          ) : null}

          {result && !result.hasData ? (
            <div className="mt-6 rounded-xl border border-dashed border-bw-300 bg-bw-50 px-4 py-4 text-sm text-bw-600">
              Bu model için karşılaştırma bulunamadı.{" "}
              <Link href={result.searchUrl} className="font-semibold text-bw-950 underline">
                Vitrinde ara
              </Link>
              {result.marketFallbackUrl ? (
                <>
                  {" "}
                  veya{" "}
                  <a
                    href={result.marketFallbackUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-bw-950 underline"
                  >
                    Epey&apos;de ara
                  </a>
                </>
              ) : null}
            </div>
          ) : null}

          {result?.marketError ? (
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Piyasa fiyatı şu an alınamadı ({result.marketError}). Mepotia vitrin sonuçları
              yine de gösteriliyor.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
