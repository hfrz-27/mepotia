"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BadgeDollarSign,
  Search,
  Sparkles,
  Store,
  TrendingDown,
} from "lucide-react";

const SAMPLES = [
  { q: "iPhone 15 Pro", mepotia: "48.750 ₺", market: "52.900 ₺", save: "4.150 ₺" },
  { q: "Samsung S24", mepotia: "38.900 ₺", market: "42.500 ₺", save: "3.600 ₺" },
  { q: "MacBook Air M2", mepotia: "29.500 ₺", market: "32.990 ₺", save: "3.490 ₺" },
];

export default function HomePriceCompareSection() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const sample = SAMPLES[active];

  const go = (q) => {
    const value = (q || query).trim();
    window.location.href = value
      ? `/fiyat-karsilastir?q=${encodeURIComponent(value)}`
      : "/fiyat-karsilastir";
  };

  return (
    <section className="relative overflow-hidden border-y border-bw-200/70 bg-[#f7f7f8]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-bw-900/80 bg-bw-950 text-white shadow-[0_28px_70px_-36px_rgba(0,0,0,0.55)] sm:rounded-[1.65rem]">
          {/* Effects */}
          <div
            className="pointer-events-none absolute -top-20 right-0 h-56 w-56 rounded-full bg-emerald-400/25 blur-3xl animate-pulse"
            style={{ animationDuration: "4s" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-10 h-52 w-52 rounded-full bg-sky-500/20 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            aria-hidden
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" aria-hidden />

          <div className="relative grid gap-5 p-5 sm:gap-6 sm:p-6 lg:grid-cols-[1.15fr_0.95fr] lg:items-center lg:gap-8 lg:p-7">
            {/* Left */}
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
                Fiyat karşılaştır
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                Mepotia <span className="text-white/40">vs</span> piyasa
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">
                Model yaz, vitrin fiyatını mağaza fiyatıyla yan yana gör.
              </p>

              <form
                className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  go();
                }}
              >
                <div className="relative min-w-0 flex-1">
                  <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="iPhone 15, S24 Ultra, MacBook…"
                    className="w-full rounded-2xl border border-white/12 bg-white/[0.08] py-3 pr-4 pl-10 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] placeholder:text-white/35 outline-none backdrop-blur-sm transition focus:border-emerald-400/40 focus:bg-white/[0.12] focus:ring-4 focus:ring-emerald-400/10"
                    aria-label="Karşılaştırılacak model"
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-bw-950 shadow-[0_12px_32px_-14px_rgba(255,255,255,0.55)] transition hover:scale-[1.02] hover:bg-bw-100"
                >
                  Karşılaştır
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </button>
              </form>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {SAMPLES.map((s, i) => (
                  <button
                    key={s.q}
                    type="button"
                    onClick={() => {
                      setActive(i);
                      setQuery(s.q);
                    }}
                    className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition ${
                      active === i
                        ? "border-white bg-white text-bw-950 shadow-md"
                        : "border-white/12 bg-white/[0.05] text-white/70 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {s.q}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { icon: Store, t: "Vitrin fiyatı" },
                  { icon: BadgeDollarSign, t: "Piyasa" },
                  { icon: TrendingDown, t: "Avantaj" },
                ].map(({ icon: Icon, t }) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium text-white/65"
                  >
                    <Icon className="h-3.5 w-3.5 text-emerald-300/90" strokeWidth={1.75} />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right mini result card */}
            <div className="relative">
              <div className="absolute -inset-px rounded-[1.35rem] bg-gradient-to-br from-emerald-400/40 via-white/10 to-sky-400/30 opacity-70 blur-[1px]" aria-hidden />
              <div className="relative overflow-hidden rounded-[1.3rem] border border-white/15 bg-white/[0.08] p-4 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-100">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Örnek
                  </span>
                  <span className="text-[11px] font-medium text-white/45">{sample.q}</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  <div className="rounded-2xl border border-white/20 bg-white p-3.5 text-bw-950 shadow-lg shadow-black/10 transition hover:-translate-y-0.5">
                    <p className="text-[10px] font-bold tracking-[0.14em] text-bw-400 uppercase">
                      Mepotia
                    </p>
                    <p className="mt-1.5 font-display text-xl font-semibold tabular-nums sm:text-2xl">
                      {sample.mepotia}
                    </p>
                    <p className="mt-0.5 text-[10px] text-bw-500">Gerçek vitrin</p>
                  </div>
                  <div className="rounded-2xl border border-white/12 bg-bw-950/50 p-3.5 backdrop-blur-sm transition hover:-translate-y-0.5">
                    <p className="text-[10px] font-bold tracking-[0.14em] text-white/40 uppercase">
                      Piyasa
                    </p>
                    <p className="mt-1.5 font-display text-xl font-semibold tabular-nums text-white sm:text-2xl">
                      {sample.market}
                    </p>
                    <p className="mt-0.5 text-[10px] text-white/40">En düşük mağaza</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2 rounded-2xl border border-emerald-400/25 bg-gradient-to-r from-emerald-500/20 to-emerald-400/10 px-3.5 py-2.5">
                  <p className="text-xs font-semibold text-emerald-100">
                    ~{sample.save} avantaj
                  </p>
                  <Link
                    href={`/fiyat-karsilastir?q=${encodeURIComponent(sample.q)}`}
                    className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white transition hover:bg-white/25"
                  >
                    Dene
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
