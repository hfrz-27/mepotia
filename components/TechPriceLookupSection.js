"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeDollarSign,
  GitCompareArrows,
  Loader2,
  Search,
  Sparkles,
  Store,
  TrendingDown,
} from "lucide-react";
import PriceComparePanel from "@/components/PriceComparePanel";

const HINTS = ["iPhone 15", "Samsung S24", "MacBook Air M2", "AirPods Pro"];

export default function TechPriceLookupSection({ initialQuery = "", compact = false }) {
  const [query, setQuery] = useState(initialQuery || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const runSearch = useCallback(async (raw) => {
    const q = String(raw || "").trim();
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
  }, []);

  useEffect(() => {
    if (initialQuery && String(initialQuery).trim().length >= 2) {
      runSearch(initialQuery);
    }
  }, [initialQuery, runSearch]);

  const onSearch = async (e) => {
    e.preventDefault();
    await runSearch(query);
  };

  return (
    <section id="fiyat-sorgula" className="relative scroll-mt-28 bg-[#f5f5f7]">
      <div className="relative mx-auto max-w-[1200px] px-4 pt-10 pb-12 sm:px-6 sm:pt-14 sm:pb-16">
        {!compact ? (
          <>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 rounded-full border border-bw-200 bg-white px-3 py-1.5 text-xs font-semibold text-bw-700 shadow-sm transition hover:border-bw-300 hover:text-bw-950"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
            Vitrine dön
          </Link>
          <Link
            href="/urun-karsilastir"
            className="inline-flex items-center gap-2 rounded-full border border-bw-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-bw-700 shadow-sm transition hover:border-bw-300 hover:text-bw-950"
          >
            <GitCompareArrows className="h-3.5 w-3.5" />
            Özellik aracı
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-bw-200 bg-white px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-bw-500">
            <Sparkles className="h-3.5 w-3.5" />
            Fiyat karşılaştırma · 2026
          </p>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-bw-950 sm:text-5xl lg:text-6xl">
            Piyasayı gör.
            <br />
            <span className="text-bw-400">Farkı bil.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-bw-500 sm:text-base">
            Model yaz. Vitrinde olmasa bile piyasa mağaza fiyatları gelir; sitede ilan varsa yan yana
            karşılaştırırsın.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {[
              { icon: Store, label: "Vitrin" },
              { icon: BadgeDollarSign, label: "Piyasa min" },
              { icon: TrendingDown, label: "Avantaj" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-bw-200 bg-white px-3 py-1.5 text-[11px] font-medium text-bw-600"
              >
                <Icon className="h-3.5 w-3.5 text-bw-500" strokeWidth={1.75} />
                {label}
              </span>
            ))}
          </div>
        </div>
          </>
        ) : null}

        {/* Search card */}
        <div className={`mx-auto max-w-2xl ${compact ? "mt-0" : "mt-9"}`}>
          <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_28px_80px_-52px_rgba(0,0,0,0.5)] ring-1 ring-black/[0.05]">
            <div className="p-3.5 sm:p-4">
              <form onSubmit={onSearch} className="flex flex-col gap-2.5 sm:flex-row">
                <div className="relative min-w-0 flex-1">
                  <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-bw-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Örn. iPhone 15, Samsung S24, MacBook Air M2"
                    className="w-full rounded-2xl border border-bw-200 bg-bw-50/80 py-3.5 pr-4 pl-10 text-sm text-bw-950 outline-none transition placeholder:text-bw-400 focus:border-bw-900 focus:bg-white focus:ring-4 focus:ring-bw-950/8"
                    aria-label="Teknoloji modeli"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-bw-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-bw-800 disabled:opacity-60"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <BadgeDollarSign className="h-4 w-4" />}
                  Karşılaştır
                </button>
              </form>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {HINTS.map((hint) => (
                  <button
                    key={hint}
                    type="button"
                    onClick={() => {
                      setQuery(hint);
                      runSearch(hint);
                    }}
                    className="rounded-full border border-bw-200 bg-bw-50 px-2.5 py-1 text-[11px] font-medium text-bw-600 transition hover:border-bw-300 hover:bg-white hover:text-bw-950"
                  >
                    {hint}
                  </button>
                ))}
              </div>

              {error ? (
                <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-800">
                  {error}
                </p>
              ) : null}

              {loading ? (
                <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-bw-100 bg-bw-50 px-4 py-7 text-sm text-bw-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Piyasa ve vitrin taranıyor…
                </div>
              ) : null}

              {result?.hasData ? (
                <div className="mt-4 border-t border-bw-100 pt-4">
                  {result.mode === "market-only" ? (
                    <p className="mb-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-900">
                      Vitrinde yok — piyasa mağaza fiyatları gösteriliyor.
                    </p>
                  ) : null}
                  <PriceComparePanel result={result} variant="light" />
                </div>
              ) : null}

              {result && !result.hasData && !loading ? (
                <div className="mt-4 rounded-2xl border border-dashed border-bw-200 bg-bw-50 px-4 py-5 text-sm text-bw-600">
                  Sonuç yok. Daha net model adı dene.{" "}
                  <Link href={result.searchUrl} className="font-semibold text-bw-950 underline">
                    Vitrinde ara
                  </Link>
                  {result.marketFallbackUrl ? (
                    <>
                      {" "}
                      ·{" "}
                      <a
                        href={result.marketFallbackUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-bw-950 underline"
                      >
                        Piyasa
                      </a>
                    </>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
