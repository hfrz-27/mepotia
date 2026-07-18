"use client";

import Link from "next/link";
import { ChevronDown, ArrowUpRight } from "lucide-react";

export default function OtherGuidesMenu({ guides = [] }) {
  if (!guides.length) return null;

  return (
    <details className="group mt-10 overflow-hidden rounded-2xl border border-bw-200 bg-white shadow-[0_12px_36px_-30px_rgba(0,0,0,0.3)] open:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.35)]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 transition hover:bg-bw-50/80 sm:px-5 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-bw-400">
            Keşfet
          </p>
          <p className="mt-0.5 text-sm font-semibold text-bw-950 sm:text-[15px]">
            Diğer rehberler
            <span className="ml-1.5 font-medium text-bw-400">({guides.length})</span>
          </p>
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-bw-200 bg-bw-50 text-bw-700 transition group-open:rotate-180">
          <ChevronDown className="h-4 w-4" />
        </span>
      </summary>

      <div className="border-t border-bw-100 px-2 py-2 sm:px-3 sm:py-2.5">
        <ul className="max-h-64 space-y-0.5 overflow-y-auto">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/rehber/${g.slug}`}
                className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-bw-50"
              >
                <span className="min-w-0">
                  <span className="block font-semibold text-bw-950">{g.shortLabel}</span>
                  <span className="mt-0.5 block truncate text-xs text-bw-500">{g.title}</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-bw-400" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="border-t border-bw-100 px-2 pt-2 pb-1">
          <Link
            href="/rehber"
            className="block rounded-xl px-3 py-2 text-center text-xs font-semibold text-bw-600 transition hover:bg-bw-50 hover:text-bw-950"
          >
            Tüm rehberleri gör
          </Link>
        </div>
      </div>
    </details>
  );
}
