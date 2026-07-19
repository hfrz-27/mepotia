"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeDollarSign,
  Check,
  GitCompareArrows,
  TrendingDown,
} from "lucide-react";

const tools = [
  {
    id: "fiyat",
    href: "/fiyat-karsilastir",
    icon: BadgeDollarSign,
    tab: "Fiyat",
    title: "Vitrin ile mağaza fiyatını yan yana oku",
    text: "Aynı ürünün ilan fiyatı ve piyasa ortalaması bir bakışta. Fırsat mı, pahalı mı — netleşsin.",
    cta: "Fiyatı karşılaştır",
  },
  {
    id: "ozellik",
    href: "/urun-karsilastir",
    icon: GitCompareArrows,
    tab: "Özellik",
    title: "2–3 modelin speklerini tabloda ölç",
    text: "Ekran, batarya, kamera, işlemci yan yana. Hangisi sana uygun anında gör.",
    cta: "Özellikleri karşılaştır",
  },
];

function PricePanel({ mounted }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      <div className="rounded-[14px] border border-emerald-200/70 bg-gradient-to-br from-emerald-50 to-teal-50 p-3.5 shadow-sm sm:rounded-[20px] sm:p-5">
        <p className="text-[10px] font-semibold tracking-wide text-emerald-700 uppercase sm:text-[11px]">
          Vitrin
        </p>
        <p className="mt-1.5 text-[1.25rem] font-semibold tracking-tight text-emerald-600 tabular-nums sm:mt-2 sm:text-[1.75rem]">
          ₺64.900
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-emerald-100 sm:mt-3 sm:h-2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-[width] duration-700 ease-out"
            style={{ width: mounted ? "72%" : "0%" }}
          />
        </div>
        <p className="mt-1.5 text-[11px] text-emerald-700/70 sm:mt-2 sm:text-[12px]">İlan fiyatı</p>
      </div>
      <div className="rounded-[14px] border border-black/[0.06] bg-white p-3.5 shadow-sm sm:rounded-[20px] sm:p-5">
        <p className="text-[10px] font-semibold tracking-wide text-[#86868b] uppercase sm:text-[11px]">
          Mağaza ort.
        </p>
        <p className="mt-1.5 text-[1.25rem] font-semibold tracking-tight text-[#9ca3af] tabular-nums line-through decoration-rose-300/70 sm:mt-2 sm:text-[1.75rem]">
          ₺73.800
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/10 sm:mt-3 sm:h-2">
          <div
            className="h-full rounded-full bg-[#c7c7cc] transition-[width] duration-700 ease-out"
            style={{ width: mounted ? "100%" : "0%" }}
          />
        </div>
        <p className="mt-1.5 text-[11px] text-[#6e6e73] sm:mt-2 sm:text-[12px]">Piyasa</p>
      </div>
      <div className="col-span-2 flex items-center gap-2 rounded-[12px] bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-2.5 text-white shadow-lg shadow-emerald-500/25 sm:rounded-[16px] sm:px-4 sm:py-3">
        <TrendingDown className="h-4 w-4 shrink-0" />
        <span className="text-[12px] font-semibold sm:text-[13px]">₺8.900 · %12 daha uygun</span>
      </div>
    </div>
  );
}

function SpecPanel() {
  const rows = [
    { label: "Ekran", a: '6.1"', b: '6.7"', win: "b" },
    { label: "Batarya", a: "3274", b: "4422", win: "b" },
    { label: "Kamera", a: "48 MP", b: "48 MP", win: "tie" },
  ];
  return (
    <div className="overflow-hidden rounded-[20px] border border-black/[0.06] bg-white shadow-sm">
      <div className="grid grid-cols-3 border-b border-black/[0.05] bg-gradient-to-r from-violet-50 to-indigo-50 px-3 py-2.5 text-[11px] font-semibold text-[#6e6e73]">
        <span>Spek</span>
        <span className="text-center">Pro</span>
        <span className="text-center text-indigo-600">Pro Max</span>
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className="grid grid-cols-3 items-center border-b border-black/[0.04] px-3 py-3 last:border-0"
        >
          <span className="text-[12px] text-[#86868b]">{r.label}</span>
          <span className="text-center text-[13px] font-semibold text-[#404040]">{r.a}</span>
          <span
            className={[
              "flex items-center justify-center gap-1 text-[13px] font-semibold",
              r.win === "b" ? "text-emerald-600" : "text-[#111]",
            ].join(" ")}
          >
            {r.b}
            {r.win === "b" ? (
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
            ) : null}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * Karşılaştır — üst sekmeler + alt tam genişlik panel, renkli & efektli.
 */
export default function HomeCompareGate() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const current = tools[active];
  const Icon = current.icon;

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="bg-[#f5f5f7] py-6 sm:py-10" aria-label="Karşılaştır">
      <div className="pv-wrap">
        <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-white via-white to-[#f1efff] ring-1 ring-black/[0.06] shadow-[0_24px_70px_-30px_rgba(76,60,180,0.35)] sm:rounded-[28px]">
          {/* Renkli ışıltı */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-indigo-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-emerald-400/15 blur-3xl" />

          <div className="relative flex items-center gap-1.5 border-b border-black/[0.05] bg-white/70 p-1.5 backdrop-blur-sm sm:gap-2 sm:p-2.5">
            {tools.map((t, i) => {
              const on = i === active;
              const TIcon = t.icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={[
                    "inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-[12px] px-3 py-2.5 text-[13px] font-semibold transition sm:gap-2 sm:rounded-[16px] sm:px-5 sm:text-[14px]",
                    on
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                      : "bg-transparent text-[#6e6e73] active:bg-[#f5f5f7]",
                  ].join(" ")}
                >
                  <TIcon className="h-4 w-4" strokeWidth={1.75} />
                  {t.tab}
                </button>
              );
            })}
          </div>

          <div className="relative grid gap-4 p-4 sm:gap-6 sm:p-7 lg:grid-cols-2 lg:gap-10 lg:p-8">
            <div className="flex flex-col justify-center">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 sm:h-11 sm:w-11 sm:rounded-2xl">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-3 text-[1.25rem] font-semibold leading-snug tracking-[-0.03em] text-[#111] sm:mt-4 sm:text-[1.75rem]">
                {current.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#6e6e73] sm:mt-2 sm:text-[15px]">
                {current.text}
              </p>
              <Link
                href={current.href}
                className="group mt-4 inline-flex min-h-[44px] w-fit items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-indigo-500/40 active:scale-[0.98] sm:mt-5 sm:text-[14px]"
              >
                {current.cta}
                <ArrowUpRight
                  className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2.25}
                />
              </Link>
            </div>

            <div key={current.id}>
              {current.id === "fiyat" ? <PricePanel mounted={mounted} /> : <SpecPanel />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
