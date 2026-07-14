"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Loader2, Scale } from "lucide-react";
import PriceComparePanel from "@/components/PriceComparePanel";

export default function ProductMarketCompare({ query, referencePrice, condition }) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!query || query.trim().length < 2) {
        setLoading(false);
        return;
      }

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
  }, [query, referencePrice]);

  if (loading) {
    return (
      <section
        id="piyasa-karsilastirmasi"
        className="mt-5 scroll-mt-24 rounded-[1.75rem] border border-bw-200 bg-white p-5 sm:mt-8 sm:p-6"
      >
        <div className="flex items-center gap-3 text-sm text-bw-600">
          <Loader2 className="h-4 w-4 animate-spin" />
          Piyasa fiyatları karşılaştırılıyor…
        </div>
      </section>
    );
  }

  if (error || !result?.market) {
    if (!result?.marketFallbackUrl && !error) return null;

    return (
      <section
        id="piyasa-karsilastirmasi"
        className="mt-5 scroll-mt-24 rounded-[1.75rem] border border-bw-200 bg-white p-5 sm:mt-8 sm:p-6"
      >
        <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] text-bw-500 uppercase">
          <Scale className="h-3.5 w-3.5" />
          Piyasa karşılaştırması
        </p>
        <p className="mt-3 text-sm text-bw-600">
          {error || result?.marketError || "Bu ürün için otomatik piyasa karşılaştırması bulunamadı."}
        </p>
        {result?.marketFallbackUrl ? (
          <a
            href={result.marketFallbackUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-bw-950 underline-offset-2 hover:underline"
          >
            Epey&apos;de fiyatlara bak
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : null}
      </section>
    );
  }

  return (
    <section
      id="piyasa-karsilastirmasi"
      className="mt-5 scroll-mt-24 rounded-[1.75rem] border border-bw-200 bg-white p-5 sm:mt-8 sm:p-6"
    >
      <div className="mb-5">
        <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] text-bw-500 uppercase">
          <Scale className="h-3.5 w-3.5" />
          Piyasa karşılaştırması
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-wide text-bw-950">
          Başka yerde ne kadar?
        </h2>
        <p className="mt-2 text-sm text-bw-600">
          Bu ilanın fiyatını Epey&apos;deki mağaza teklifleriyle karşılaştırıyoruz.
          {condition === "used" ? " Ürün ikinci el olduğu için piyasa fiyatları sıfır/perakende teklifleridir." : ""}
        </p>
      </div>

      <PriceComparePanel
        result={result}
        variant="light"
        showListings={false}
        mepotiaLabel="Bu ilanın fiyatı"
      />
    </section>
  );
}
