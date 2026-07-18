"use client";

import Link from "next/link";
import { ArrowLeftRight, ArrowUpRight, LayoutGrid, Repeat2 } from "lucide-react";

/**
 * Takas — ortada swap simgesi, iki kutup (A ↔ B), alt CTA’lar.
 * Sat/iste ve karşılaştırdan tamamen farklı layout.
 */
export default function HomeTradeGate() {
  return (
    <section className="bg-[#f5f5f7] py-6 sm:py-10" aria-label="Takas">
      <div className="pv-wrap">
        <div className="overflow-hidden rounded-[20px] bg-black text-white shadow-[0_24px_60px_-36px_rgba(0,0,0,0.5)] sm:rounded-[32px]">
          <div className="border-b border-white/10 px-4 py-5 text-center sm:px-8 sm:py-8">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-white/45 uppercase sm:text-[11px]">
              Takas
            </p>
            <h2 className="mt-1.5 text-[1.4rem] font-semibold tracking-[-0.03em] sm:mt-2 sm:text-[2.25rem]">
              Cihazını takas et
            </h2>
            <p className="mx-auto mt-1.5 max-w-md text-[13px] leading-relaxed text-white/55 sm:mt-2 sm:text-[15px]">
              Senin cihazın + istediğin model. Fark varsa nakit ile kapanır.
            </p>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 py-5 sm:gap-6 sm:px-8 sm:py-10">
            <div className="rounded-[16px] border border-white/15 bg-white/[0.06] p-3 text-center sm:rounded-[24px] sm:p-6">
              <p className="text-[9px] font-semibold tracking-[0.12em] text-white/40 uppercase sm:text-[10px]">
                Senin
              </p>
              <p className="mt-1.5 text-[0.95rem] font-semibold tracking-tight sm:mt-3 sm:text-[1.25rem]">
                iPhone 13
              </p>
              <p className="mt-0.5 text-[12px] font-semibold text-white/70 tabular-nums sm:mt-1 sm:text-[15px]">
                ≈ ₺28.000
              </p>
            </div>

            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white text-black sm:h-14 sm:w-14">
              <ArrowLeftRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
            </span>

            <div className="rounded-[16px] border border-white/25 bg-white p-3 text-center text-black sm:rounded-[24px] sm:p-6">
              <p className="text-[9px] font-semibold tracking-[0.12em] text-black/40 uppercase sm:text-[10px]">
                İstediğin
              </p>
              <p className="mt-1.5 text-[0.95rem] font-semibold tracking-tight sm:mt-3 sm:text-[1.25rem]">
                iPhone 15
              </p>
              <p className="mt-0.5 text-[12px] font-semibold text-black/70 tabular-nums sm:mt-1 sm:text-[15px]">
                ≈ ₺48.000
              </p>
            </div>
          </div>

          <div className="mx-3 mb-2 rounded-[12px] border border-white/10 bg-white/10 px-3 py-2.5 text-center sm:mx-8 sm:rounded-[16px] sm:px-4 sm:py-3">
            <p className="text-[11px] text-white/50 sm:text-[12px]">Tahmini fark</p>
            <p className="mt-0.5 text-[1.15rem] font-semibold tracking-tight tabular-nums sm:text-[1.35rem]">
              + ₺20.000
            </p>
          </div>

          <div className="grid gap-2 p-3 sm:grid-cols-2 sm:gap-3 sm:p-6 sm:pt-4">
            <Link
              href="/takas"
              className="group flex items-center justify-between gap-2 rounded-[14px] bg-white px-3.5 py-3.5 text-black transition active:scale-[0.99] sm:gap-3 sm:rounded-[18px] sm:px-5 sm:py-4"
            >
              <span className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black text-white sm:h-10 sm:w-10">
                  <Repeat2 className="h-4 w-4" strokeWidth={2} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-semibold sm:text-[14px]">
                    Takas teklifi ver
                  </span>
                  <span className="block text-[11px] text-black/50 sm:text-[12px]">Formu doldur</span>
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </Link>
            <Link
              href="/ara"
              className="group flex items-center justify-between gap-2 rounded-[14px] border border-white/15 bg-white/5 px-3.5 py-3.5 text-white transition active:scale-[0.99] sm:gap-3 sm:rounded-[18px] sm:px-5 sm:py-4"
            >
              <span className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 sm:h-10 sm:w-10">
                  <LayoutGrid className="h-4 w-4" strokeWidth={2} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-semibold sm:text-[14px]">
                    Vitrinden seç
                  </span>
                  <span className="block text-[11px] text-white/45 sm:text-[12px]">
                    İlana takas teklifi
                  </span>
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
