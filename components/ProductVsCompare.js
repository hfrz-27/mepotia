"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  GitCompareArrows,
  Loader2,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import { formatTry } from "@/components/PriceComparePanel";

const PRESETS = [
  ["iPhone 15", "Samsung S24"],
  ["iPhone 15 Pro", "iPhone 14 Pro"],
  ["Galaxy S24 Ultra", "iPhone 15 Pro Max"],
  ["MacBook Air M2", "MacBook Air M3"],
];

const field =
  "w-full rounded-2xl border border-bw-200 bg-bw-50/80 px-3.5 py-3 text-sm text-bw-950 outline-none transition placeholder:text-bw-400 focus:border-bw-900 focus:bg-white focus:ring-4 focus:ring-bw-950/8";

export default function ProductVsCompare({ variant = "embed" }) {
  const isPage = variant === "page";
  const [slots, setSlots] = useState(["", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  const setSlot = (index, value) => {
    setSlots((prev) => prev.map((s, i) => (i === index ? value : s)));
  };

  const addSlot = () => {
    if (slots.length >= 3) return;
    setSlots((prev) => [...prev, ""]);
  };

  const removeSlot = (index) => {
    if (slots.length <= 2) return;
    setSlots((prev) => prev.filter((_, i) => i !== index));
  };

  const run = async (queries) => {
    const list = (queries || slots).map((q) => q.trim()).filter(Boolean);
    if (list.length < 2) {
      setError("En az 2 model yaz.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setShowAllSpecs(false);

    try {
      const res = await fetch("/api/product-vs-compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ queries: list }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Karşılaştırma alınamadı.");
      setResult(data);
      setSlots(list.length >= 3 ? list.slice(0, 3) : [list[0], list[1]]);
    } catch (err) {
      setError(err.message || "Karşılaştırma alınamadı.");
    } finally {
      setLoading(false);
    }
  };

  const rows = result?.rows || [];
  const visibleRows = showAllSpecs ? rows : rows.slice(0, isPage ? 14 : 10);
  const n = result?.items?.length || 2;

  /* ── Page layout: matches price tool floating card ── */
  if (isPage) {
    return (
      <div className="mx-auto max-w-2xl lg:max-w-3xl">
        <div className="overflow-hidden rounded-[1.5rem] border border-white/12 bg-white shadow-[0_32px_80px_-36px_rgba(0,0,0,0.7)] ring-1 ring-black/5">
          <div
            className="h-[2px] w-full bg-gradient-to-r from-violet-400 via-fuchsia-300 to-pink-400"
            aria-hidden
          />
          <div className="p-3.5 sm:p-4">
            <div
              className={`grid gap-2.5 ${slots.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
            >
              {slots.map((value, index) => (
                <div key={index} className="relative">
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.12em] text-bw-400">
                    Ürün {index + 1}
                  </label>
                  <div className="relative">
                    <input
                      value={value}
                      onChange={(e) => setSlot(index, e.target.value)}
                      placeholder={
                        index === 0 ? "iPhone 15" : index === 1 ? "Samsung S24" : "3. model"
                      }
                      className={field}
                    />
                    {slots.length > 2 ? (
                      <button
                        type="button"
                        onClick={() => removeSlot(index)}
                        className="absolute top-[2.15rem] right-2 -translate-y-1/2 rounded-md p-1 text-bw-400 hover:bg-bw-100 hover:text-bw-950"
                        aria-label="Kaldır"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              {slots.length < 3 ? (
                <button
                  type="button"
                  onClick={addSlot}
                  className="inline-flex items-center justify-center gap-1 rounded-2xl border border-bw-200 bg-bw-50 px-4 py-3 text-xs font-semibold text-bw-700 transition hover:border-bw-300 hover:bg-white"
                >
                  <Plus className="h-3.5 w-3.5" />
                  3. ürün
                </button>
              ) : null}
              <button
                type="button"
                disabled={loading}
                onClick={() => run()}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-bw-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-bw-800 disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <GitCompareArrows className="h-4 w-4" />
                )}
                Karşılaştır
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {PRESETS.map(([a, b]) => (
                <button
                  key={`${a}-${b}`}
                  type="button"
                  onClick={() => {
                    setSlots([a, b]);
                    run([a, b]);
                  }}
                  className="rounded-full border border-bw-200 bg-bw-50 px-2.5 py-1 text-[11px] font-medium text-bw-600 transition hover:border-bw-300 hover:bg-white hover:text-bw-950"
                >
                  {a} vs {b}
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
                Özellikler hazırlanıyor…
              </div>
            ) : null}

            {result?.items?.length ? (
              <div className="mt-4 border-t border-bw-100 pt-4">
                <ResultTable
                  result={result}
                  n={n}
                  visibleRows={visibleRows}
                  rows={rows}
                  showAllSpecs={showAllSpecs}
                  setShowAllSpecs={setShowAllSpecs}
                  isPage
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  /* ── Embed layout ── */
  return (
    <section className="border-t border-bw-200/70 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-5">
          <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] text-bw-400 uppercase">
            <GitCompareArrows className="h-3.5 w-3.5" />
            Özellik karşılaştır
          </p>
          <h2 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-bw-950 sm:text-3xl">
            Ürün özellikleri yan yana
          </h2>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-bw-200/90 bg-white shadow-[0_24px_60px_-36px_rgba(0,0,0,0.35)]">
          <div className="p-4 sm:p-5">
            <div
              className={`grid gap-2.5 ${slots.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
            >
              {slots.map((value, index) => (
                <div key={index}>
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.12em] text-bw-400">
                    Ürün {index + 1}
                  </label>
                  <input
                    value={value}
                    onChange={(e) => setSlot(index, e.target.value)}
                    placeholder={index === 0 ? "iPhone 15" : "Samsung S24"}
                    className={field}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={() => run()}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-bw-950 px-5 py-2.5 text-xs font-semibold text-white disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <GitCompareArrows className="h-4 w-4" />}
              Karşılaştır
            </button>
            {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
            {result?.items?.length ? (
              <div className="mt-4">
                <ResultTable
                  result={result}
                  n={n}
                  visibleRows={visibleRows}
                  rows={rows}
                  showAllSpecs={showAllSpecs}
                  setShowAllSpecs={setShowAllSpecs}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultTable({ result, n, visibleRows, rows, showAllSpecs, setShowAllSpecs, isPage }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-bw-200">
      <div
        className="grid border-b border-bw-100 bg-bw-50/90"
        style={{ gridTemplateColumns: `minmax(7rem,9rem) repeat(${n}, minmax(0, 1fr))` }}
      >
        <div className="px-2.5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-bw-400 sm:px-3">
          Özellik
        </div>
        {result.items.map((item, index) => (
          <div
            key={`${item.query}-${index}`}
            className={`border-l border-bw-100 px-2.5 py-3 sm:px-3 ${
              result.winnerIndex === index ? "bg-emerald-50/70" : ""
            }`}
          >
            <p className="line-clamp-2 text-xs font-semibold leading-snug text-bw-950 sm:text-sm">
              {item.title}
            </p>
            {Number.isFinite(item.lowest) ? (
              <p className="mt-1 text-[11px] font-semibold tabular-nums text-bw-700">
                {formatTry(item.lowest)}
                <span className="ml-1 font-medium text-bw-400">min</span>
              </p>
            ) : (
              <p className="mt-1 text-[10px] text-bw-400">{item.error || "—"}</p>
            )}
            {item.productUrl ? (
              <a
                href={item.productUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center gap-0.5 text-[10px] font-semibold text-bw-500 hover:text-bw-950"
              >
                Kaynak
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            ) : null}
          </div>
        ))}
      </div>

      {visibleRows.length ? (
        <div className={`overflow-y-auto ${isPage ? "max-h-[28rem]" : "max-h-[22rem]"}`}>
          {visibleRows.map((row) => (
            <div
              key={row.key}
              className="grid border-b border-bw-50 last:border-0"
              style={{
                gridTemplateColumns: `minmax(7rem,9rem) repeat(${n}, minmax(0, 1fr))`,
              }}
            >
              <div className="px-2.5 py-2.5 text-[11px] font-medium text-bw-500 sm:px-3 sm:text-xs">
                {row.key}
              </div>
              {row.values.map((val, i) => (
                <div
                  key={`${row.key}-${i}`}
                  className={`border-l border-bw-50 px-2.5 py-2.5 text-[11px] leading-snug sm:px-3 sm:text-xs ${
                    row.same
                      ? "text-bw-400"
                      : val !== "—"
                        ? "font-semibold text-bw-950"
                        : "text-bw-300"
                  }`}
                >
                  {val}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p className="px-4 py-8 text-center text-sm text-bw-500">
          Özellik tablosu bulunamadı. Model adını daha net yaz.
        </p>
      )}

      {rows.length > (isPage ? 14 : 10) ? (
        <button
          type="button"
          onClick={() => setShowAllSpecs((v) => !v)}
          className="flex w-full items-center justify-center border-t border-bw-100 py-2.5 text-[11px] font-semibold text-bw-600 hover:bg-bw-50 hover:text-bw-950"
        >
          {showAllSpecs
            ? "Daha az özellik"
            : `Tüm özellikler (+${rows.length - (isPage ? 14 : 10)})`}
        </button>
      ) : null}

      <p className="flex items-center justify-center gap-1.5 border-t border-bw-100 px-3 py-2 text-[10px] text-bw-400">
        <Sparkles className="h-3 w-3" />
        Teknik özellikler Mepotia piyasa motoru ile derlenir.
      </p>
    </div>
  );
}
