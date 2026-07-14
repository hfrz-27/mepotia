"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ExternalLink, Loader2, Scale, Sparkles } from "lucide-react";
import PriceComparePanel from "@/components/PriceComparePanel";

export default function ProductMarketCompare({ query, referencePrice, condition }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (window.location.hash === "#piyasa-karsilastirmasi") {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!open || result || !query || query.trim().length < 2) return;

      setLoading(true);
      setError("");

      try {
        const res = await fetch("/api/tech-price-lookup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, referencePrice }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Karşılaştırma alınamadı.");
        if (!cancelled) setResult(data);
      } catch (err) {
        if (!cancelled) setError(err.message || "Karşılaştırma alınamadı.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [open, query, referencePrice, result]);

  return (
    <section
      id="piyasa-karsilastirmasi"
      className="mt-5 scroll-mt-24 overflow-hidden rounded-[1.75rem] border border-bw-200 bg-white shadow-[0_20px_48px_-40px_rgba(0,0,0,0.28)] sm:mt-8"
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="group flex w-full items-center gap-3 p-4 text-left transition hover:bg-bw-50 sm:p-5"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-bw-950 text-white shadow-[0_12px_28px_-16px_rgba(0,0,0,0.55)]">
          <Scale className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.18em] text-bw-500 uppercase">
            <Sparkles className="h-3 w-3" />
            Premium bilgi
          </span>
          <span className="mt-0.5 block font-display text-lg font-semibold tracking-wide text-bw-950">
            Başka yerde ne kadar?
          </span>
          <span className="mt-0.5 block text-xs text-bw-500">
            Bu ilanın fiyatını piyasa teklifleriyle karşılaştır.
          </span>
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-bw-500 transition duration-200 ${
            open ? "rotate-180" : "group-hover:translate-y-0.5"
          }`}
        />
      </button>

      {open ? (
        <div className="border-t border-bw-100 px-4 pb-4 pt-5 sm:px-5 sm:pb-5">
          {loading ? (
            <div className="flex items-center gap-3 rounded-2xl bg-bw-50 px-4 py-4 text-sm text-bw-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              Piyasa fiyatları karşılaştırılıyor…
            </div>
          ) : error || !result?.market ? (
            <div className="rounded-2xl bg-bw-50 px-4 py-4">
              <p className="text-sm text-bw-600">
                {error ||
                  result?.marketError ||
                  "Bu ürün için otomatik piyasa karşılaştırması bulunamadı."}
              </p>
              {result?.marketFallbackUrl ? (
                <a
                  href={result.marketFallbackUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-bw-950 underline-offset-2 hover:underline"
                >
                  Epey&apos;de fiyatlara bak
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>
          ) : (
            <>
              <p className="mb-4 text-sm text-bw-600">
                {condition === "used"
                  ? "İkinci el ilan fiyatını sıfır/perakende piyasa teklifleriyle karşılaştırıyoruz."
                  : "Bu ilanın fiyatını güncel mağaza teklifleriyle karşılaştırıyoruz."}
              </p>
              <PriceComparePanel
                result={result}
                variant="light"
                showListings={false}
                mepotiaLabel="Bu ilanın fiyatı"
              />
            </>
          )}
        </div>
      ) : null}
    </section>
  );
}
