"use client";

import { useState } from "react";
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

function PricePanel() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      <div className="rounded-[14px] border border-black/[0.06] bg-[#f5f5f7] p-3.5 sm:rounded-[20px] sm:p-5">
        <p className="text-[10px] font-semibold tracking-wide text-[#86868b] uppercase sm:text-[11px]">
          Vitrin
        </p>
        <p className="mt-1.5 text-[1.25rem] font-semibold tracking-tight text-[#111] tabular-nums sm:mt-2 sm:text-[1.75rem]">
          ₺64.900
        </p>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-black/10 sm:mt-3 sm:h-1.5">
          <div className="h-full w-[72%] rounded-full bg-black" />
        </div>
        <p className="mt-1.5 text-[11px] text-[#6e6e73] sm:mt-2 sm:text-[12px]">İlan fiyatı</p>
      </div>
      <div className="rounded-[14px] border border-black/[0.06] bg-white p-3.5 sm:rounded-[20px] sm:p-5">
        <p className="text-[10px] font-semibold tracking-wide text-[#86868b] uppercase sm:text-[11px]">
          Mağaza ort.
        </p>
        <p className="mt-1.5 text-[1.25rem] font-semibold tracking-tight text-[#6e6e73] tabular-nums sm:mt-2 sm:text-[1.75rem]">
          ₺73.800
        </p>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-black/10 sm:mt-3 sm:h-1.5">
          <div className="h-full w-full rounded-full bg-black/25" />
        </div>
        <p className="mt-1.5 text-[11px] text-[#6e6e73] sm:mt-2 sm:text-[12px]">Piyasa</p>
      </div>
      <div className="col-span-2 flex items-center gap-2 rounded-[12px] bg-black px-3 py-2.5 text-white sm:rounded-[16px] sm:px-4 sm:py-3">
        <TrendingDown className="h-4 w-4 shrink-0" />
        <span className="text-[12px] font-semibold sm:text-[13px]">%12 daha uygun</span>
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
    <div className="overflow-hidden rounded-[20px] border border-black/[0.06] bg-white">
      <div className="grid grid-cols-3 border-b border-black/[0.05] bg-[#f5f5f7] px-3 py-2.5 text-[11px] font-semibold text-[#6e6e73]">
        <span>Spek</span>
        <span className="text-center">Pro</span>
        <span className="text-center">Pro Max</span>
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className="grid grid-cols-3 items-center border-b border-black/[0.04] px-3 py-3 last:border-0"
        >
          <span className="text-[12px] text-[#86868b]">{r.label}</span>
          <span className="text-center text-[13px] font-semibold text-[#404040]">{r.a}</span>
          <span className="flex items-center justify-center gap-1 text-[13px] font-semibold text-[#111]">
            {r.b}
            {r.win === "b" ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : null}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * Karşılaştır — üst sekmeler + alt tam genişlik panel (desk değil).
 */
export default function HomeCompareGate() {
  const [active, setActive] = useState(0);
  const current = tools[active];
  const Icon = current.icon;

  return (
    <section className="bg-[#f5f5f7] py-6 sm:py-10" aria-label="Karşılaştır">
      <div className="pv-wrap">
        <div className="overflow-hidden rounded-[20px] border border-black/[0.06] bg-[#fafafa] shadow-md sm:rounded-[28px]">
          <div className="flex items-center gap-1.5 border-b border-black/[0.05] bg-white p-1.5 sm:gap-2 sm:p-2.5">
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
                      ? "bg-black text-white shadow-sm"
                      : "bg-transparent text-[#6e6e73] active:bg-[#f5f5f7]",
                  ].join(" ")}
                >
                  <TIcon className="h-4 w-4" strokeWidth={1.75} />
                  {t.tab}
                </button>
              );
            })}
          </div>

          <div className="grid gap-4 p-4 sm:gap-6 sm:p-7 lg:grid-cols-2 lg:gap-10 lg:p-8">
            <div className="flex flex-col justify-center">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white sm:h-11 sm:w-11 sm:rounded-2xl">
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
                className="mt-4 inline-flex min-h-[44px] w-fit items-center gap-2 rounded-full bg-black px-5 py-2.5 text-[13px] font-semibold text-white transition active:scale-[0.98] sm:mt-5 sm:text-[14px]"
              >
                {current.cta}
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
              </Link>
            </div>

            <div key={current.id}>{current.id === "fiyat" ? <PricePanel /> : <SpecPanel />}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
