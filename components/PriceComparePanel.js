"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  ExternalLink,
  PackageSearch,
  Store,
} from "lucide-react";

export function formatTry(value) {
  if (!Number.isFinite(value)) return "—";
  return `${value.toLocaleString("tr-TR")} ₺`;
}

function conditionLabel(value) {
  if (value === "new") return "Sıfır";
  if (value === "used") return "İkinci el";
  return null;
}

function VerdictLine({ comparison, mode, isDark }) {
  if (!comparison && mode === "market-only") {
    return (
      <p
        className={`rounded-xl px-3 py-2 text-xs font-medium ${
          isDark
            ? "border border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
            : "border border-emerald-200 bg-emerald-50 text-emerald-900"
        }`}
      >
        Vitrinde yok · piyasa fiyatları aşağıda
      </p>
    );
  }
  if (!comparison) return null;

  const { diff, percent, verdict } = comparison;
  const absDiff = Math.abs(diff);
  let text = `Piyasaya yakın · fark ${formatTry(absDiff)}`;
  if (verdict === "cheaper") {
    text = `Mepotia daha uygun · ~${formatTry(absDiff)} (%${Math.abs(percent)})`;
  } else if (verdict === "expensive") {
    text = `Piyasa daha düşük · ~${formatTry(absDiff)} (%${percent})`;
  }

  return (
    <p
      className={`rounded-xl px-3 py-2 text-xs font-medium ${
        isDark ? "border border-white/10 bg-white/[0.05] text-white/75" : "border border-bw-200 bg-bw-50 text-bw-700"
      }`}
    >
      {text}
    </p>
  );
}

export default function PriceComparePanel({
  result,
  variant = "dark",
  showListings = true,
  mepotiaLabel = "Mepotia",
}) {
  const [offersOpen, setOffersOpen] = useState(false);
  const [listingsOpen, setListingsOpen] = useState(false);

  const isDark = variant === "dark";
  const mepotia = result?.mepotia;
  const market = result?.market;
  const comparison = result?.comparison;
  const mode =
    result?.mode ||
    (market && mepotia?.available ? "both" : market ? "market-only" : "mepotia-only");
  const hasMepotiaPrice = Number.isFinite(
    mepotia?.referencePrice ?? mepotia?.summary?.min ?? mepotia?.summary?.average,
  );

  const titleClass = isDark ? "text-white" : "text-bw-950";
  const mutedClass = isDark ? "text-white/45" : "text-bw-500";
  const priceClass = isDark ? "text-white" : "text-bw-950";
  const cardShell = isDark
    ? "rounded-xl border border-white/10 bg-white/[0.05] p-3"
    : "rounded-xl border border-bw-200 bg-bw-50 p-3";
  const shell = isDark
    ? "rounded-xl border border-white/10 bg-white/[0.04]"
    : "rounded-xl border border-bw-200 bg-white";

  const offers = market?.offers || [];
  const previewOffers = offers.slice(0, 3);
  const visibleOffers = offersOpen ? offers.slice(0, 8) : previewOffers;
  const listings = result?.mepotia?.listings || [];
  const visibleListings = listingsOpen ? listings.slice(0, 6) : listings.slice(0, 2);

  return (
    <div className="space-y-3">
      <VerdictLine comparison={comparison} mode={mode} isDark={isDark} />

      {/* Summary duo */}
      <div className="grid grid-cols-2 gap-2">
        <div className={cardShell}>
          <p className={`text-[9px] font-semibold uppercase tracking-[0.14em] ${mutedClass}`}>
            {mepotiaLabel}
          </p>
          {hasMepotiaPrice ? (
            <>
              <p className={`mt-1 font-display text-lg font-semibold tabular-nums sm:text-xl ${priceClass}`}>
                {formatTry(mepotia?.referencePrice ?? mepotia?.summary?.min ?? mepotia?.summary?.average)}
              </p>
              {mepotia?.summary ? (
                <p className={`mt-0.5 text-[10px] ${mutedClass}`}>
                  {mepotia.summary.count} ilan · ort {formatTry(mepotia.summary.average)}
                </p>
              ) : null}
            </>
          ) : (
            <div className="mt-1.5 flex items-center gap-1.5">
              <PackageSearch className={`h-3.5 w-3.5 shrink-0 ${mutedClass}`} />
              <p className={`text-xs font-semibold ${titleClass}`}>Vitrinde yok</p>
            </div>
          )}
        </div>

        <div className={cardShell}>
          <p className={`text-[9px] font-semibold uppercase tracking-[0.14em] ${mutedClass}`}>
            Piyasa min
          </p>
          {market ? (
            <>
              <p className={`mt-1 font-display text-lg font-semibold tabular-nums sm:text-xl ${priceClass}`}>
                {formatTry(market.lowest)}
              </p>
              <p className={`mt-0.5 text-[10px] ${mutedClass}`}>
                {market.count} mağaza · ort {formatTry(market.average)}
              </p>
            </>
          ) : (
            <>
              <p className={`mt-1 text-sm font-semibold ${titleClass}`}>—</p>
              <p className={`mt-0.5 line-clamp-2 text-[10px] ${mutedClass}`}>
                {result?.marketError || "Alınamadı"}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Compact store list */}
      {offers.length ? (
        <div className={`${shell} p-2.5 sm:p-3`}>
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className={`text-[10px] font-semibold uppercase tracking-[0.12em] ${mutedClass}`}>
              Mağazalar
              <span className="ml-1 font-medium normal-case tracking-normal opacity-70">
                ({offers.length})
              </span>
            </p>
            {market.productUrl ? (
              <a
                href={market.productUrl}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1 text-[10px] font-semibold ${isDark ? "text-white/70 hover:text-white" : "text-bw-600 hover:text-bw-950"}`}
              >
                Kaynak
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : null}
          </div>

          <ul className="divide-y divide-bw-100/80 dark:divide-white/10">
            {visibleOffers.map((offer, index) => (
              <li
                key={`${offer.store}-${offer.price}-${index}`}
                className={`flex items-center gap-2 py-1.5 ${isDark ? "border-white/10" : ""}`}
              >
                <Store className={`h-3.5 w-3.5 shrink-0 ${mutedClass}`} />
                <span className={`min-w-0 flex-1 truncate text-xs font-medium ${titleClass}`}>
                  {offer.store}
                  {index === 0 ? (
                    <span className="ml-1.5 rounded bg-emerald-500/15 px-1 py-0.5 text-[9px] font-bold text-emerald-700">
                      min
                    </span>
                  ) : null}
                  {offer.isOutlet ? (
                    <span className={`ml-1 text-[9px] ${mutedClass}`}>· 2.el</span>
                  ) : null}
                </span>
                <span className={`shrink-0 text-xs font-semibold tabular-nums ${priceClass}`}>
                  {formatTry(offer.price)}
                </span>
              </li>
            ))}
          </ul>

          {offers.length > 3 ? (
            <button
              type="button"
              onClick={() => setOffersOpen((v) => !v)}
              className={`mt-2 flex w-full items-center justify-center gap-1 rounded-lg py-1.5 text-[11px] font-semibold transition ${
                isDark
                  ? "bg-white/[0.06] text-white/70 hover:bg-white/10 hover:text-white"
                  : "bg-bw-50 text-bw-600 hover:bg-bw-100 hover:text-bw-950"
              }`}
            >
              {offersOpen ? "Daha az" : `+${Math.min(offers.length - 3, 5)} mağaza daha`}
              <ChevronDown className={`h-3.5 w-3.5 transition ${offersOpen ? "rotate-180" : ""}`} />
            </button>
          ) : null}
        </div>
      ) : null}

      {/* Compact mepotia listings */}
      {showListings && listings.length ? (
        <div className={`${shell} p-2.5 sm:p-3`}>
          <p className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] ${mutedClass}`}>
            Vitrin ilanları
          </p>
          <ul className="space-y-1.5">
            {visibleListings.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.url}
                  className={`flex items-center gap-2 rounded-lg px-1.5 py-1.5 transition ${
                    isDark ? "hover:bg-white/5" : "hover:bg-bw-50"
                  }`}
                >
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md bg-bw-200">
                    {item.image ? (
                      <Image src={item.image} alt="" fill className="object-cover" sizes="36px" />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`line-clamp-1 text-xs font-medium ${titleClass}`}>{item.title}</p>
                    <p className={`text-[10px] ${mutedClass}`}>
                      {[conditionLabel(item.condition), item.city].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <span className={`shrink-0 text-xs font-semibold tabular-nums ${priceClass}`}>
                    {formatTry(item.price)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {listings.length > 2 ? (
            <button
              type="button"
              onClick={() => setListingsOpen((v) => !v)}
              className={`mt-1.5 flex w-full items-center justify-center gap-1 rounded-lg py-1.5 text-[11px] font-semibold ${
                isDark ? "text-white/60 hover:text-white" : "text-bw-500 hover:text-bw-950"
              }`}
            >
              {listingsOpen ? "Daha az" : `+${listings.length - 2} ilan`}
              <ChevronDown className={`h-3.5 w-3.5 transition ${listingsOpen ? "rotate-180" : ""}`} />
            </button>
          ) : null}
        </div>
      ) : null}

      {showListings && mode === "market-only" ? (
        <p className={`text-center text-[11px] ${mutedClass}`}>
          <Link href="/urun-iste" className={`font-semibold underline-offset-2 hover:underline ${titleClass}`}>
            Ürün iste
          </Link>
          {" · "}
          <Link href="/bana-sat" className={`font-semibold underline-offset-2 hover:underline ${titleClass}`}>
            Sat
          </Link>
        </p>
      ) : null}
    </div>
  );
}
