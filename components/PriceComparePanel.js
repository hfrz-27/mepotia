"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowUpRight,
  ExternalLink,
  Minus,
  Store,
  TrendingDown,
  TrendingUp,
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

function VerdictBanner({ comparison }) {
  if (!comparison) return null;

  const { diff, percent, verdict } = comparison;
  const absDiff = Math.abs(diff);

  if (verdict === "cheaper") {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3.5 text-emerald-950">
        <TrendingDown className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="text-sm font-semibold">Mepotia&apos;da piyasadan daha uygun</p>
          <p className="mt-1 text-sm text-emerald-900/80">
            En düşük piyasa fiyatına göre yaklaşık {formatTry(absDiff)} (
            {Math.abs(percent)}%) avantajlı.
          </p>
        </div>
      </div>
    );
  }

  if (verdict === "expensive") {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3.5 text-amber-950">
        <TrendingUp className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="text-sm font-semibold">Piyasada daha düşük fiyatlar var</p>
          <p className="mt-1 text-sm text-amber-900/80">
            En düşük piyasa fiyatından yaklaşık {formatTry(absDiff)} ({percent}%) fark
            görünüyor.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-bw-200 bg-bw-50 px-4 py-3.5 text-bw-800">
      <Minus className="mt-0.5 h-5 w-5 shrink-0" />
      <div>
        <p className="text-sm font-semibold">Piyasa ile yakın seviyede</p>
        <p className="mt-1 text-sm text-bw-600">
          Mepotia fiyatı, Epey&apos;deki en düşük fiyata oldukça yakın.
        </p>
      </div>
    </div>
  );
}

export default function PriceComparePanel({
  result,
  variant = "dark",
  showListings = true,
  mepotiaLabel = "Mepotia vitrin",
}) {
  const isDark = variant === "dark";
  const mepotia = result?.mepotia;
  const market = result?.market;
  const comparison = result?.comparison;

  const shell = isDark
    ? "rounded-2xl border border-white/10 bg-white/[0.04]"
    : "rounded-2xl border border-bw-200 bg-white";

  const cardShell = isDark
    ? "rounded-2xl border border-white/10 bg-bw-950/40 p-4"
    : "rounded-2xl border border-bw-200 bg-bw-50 p-4";

  const titleClass = isDark ? "text-white" : "text-bw-950";
  const mutedClass = isDark ? "text-bw-400" : "text-bw-600";
  const priceClass = isDark ? "text-amber-200" : "text-bw-950";

  return (
    <div className="space-y-4">
      {comparison ? <VerdictBanner comparison={comparison} /> : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <div className={cardShell}>
          <p className={`text-[10px] font-semibold tracking-[0.18em] uppercase ${mutedClass}`}>
            {mepotiaLabel}
          </p>
          <p className={`mt-2 font-display text-3xl font-semibold ${priceClass}`}>
            {formatTry(mepotia?.referencePrice ?? mepotia?.summary?.min ?? mepotia?.summary?.average)}
          </p>
          {mepotia?.summary ? (
            <p className={`mt-2 text-sm ${mutedClass}`}>
              {mepotia.summary.count} ilan · ort. {formatTry(mepotia.summary.average)}
            </p>
          ) : (
            <p className={`mt-2 text-sm ${mutedClass}`}>Bu ürünün Mepotia fiyatı</p>
          )}
        </div>

        <div className={cardShell}>
          <p className={`text-[10px] font-semibold tracking-[0.18em] uppercase ${mutedClass}`}>
            Piyasada en düşük
          </p>
          <p className={`mt-2 font-display text-3xl font-semibold ${priceClass}`}>
            {formatTry(market?.lowest)}
          </p>
          {market ? (
            <p className={`mt-2 text-sm ${mutedClass}`}>
              {market.count} mağaza · ort. {formatTry(market.average)}
            </p>
          ) : null}
        </div>
      </div>

      {market?.offers?.length ? (
        <div className={`${shell} p-4 sm:p-5`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className={`text-[10px] font-semibold tracking-[0.18em] uppercase ${mutedClass}`}>
                Mağaza karşılaştırması
              </p>
              {market.productTitle ? (
                <p className={`mt-1 text-sm font-medium ${titleClass}`}>{market.productTitle}</p>
              ) : null}
            </div>
            {market.productUrl ? (
              <a
                href={market.productUrl}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-2 hover:underline ${
                  isDark ? "text-white" : "text-bw-950"
                }`}
              >
                Epey&apos;de aç
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-bw-200/20">
            <table className="min-w-full text-left text-sm">
              <thead className={isDark ? "bg-white/5 text-bw-300" : "bg-bw-50 text-bw-500"}>
                <tr>
                  <th className="px-3 py-2.5 font-semibold">Mağaza</th>
                  <th className="px-3 py-2.5 font-semibold">Fiyat</th>
                  <th className="px-3 py-2.5 font-semibold">Durum</th>
                </tr>
              </thead>
              <tbody>
                {market.offers.map((offer, index) => {
                  const ref = mepotia?.referencePrice ?? mepotia?.summary?.min;
                  const cheaperThanMepotia =
                    Number.isFinite(ref) && offer.price < ref && !offer.isOutlet;
                  const expensiveThanMepotia =
                    Number.isFinite(ref) && offer.price > ref && !offer.isOutlet;

                  return (
                    <tr
                      key={`${offer.store}-${offer.price}-${index}`}
                      className={isDark ? "border-t border-white/10" : "border-t border-bw-100"}
                    >
                      <td className={`px-3 py-3 ${titleClass}`}>
                        <div className="flex items-center gap-2">
                          <Store className={`h-4 w-4 ${mutedClass}`} />
                          {offer.url ? (
                            <a
                              href={offer.url}
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium hover:underline"
                            >
                              {offer.store}
                            </a>
                          ) : (
                            <span className="font-medium">{offer.store}</span>
                          )}
                        </div>
                      </td>
                      <td className={`px-3 py-3 font-semibold ${priceClass}`}>
                        <div className="flex items-center gap-1.5">
                          {formatTry(offer.price)}
                          {cheaperThanMepotia ? (
                            <ArrowDownRight className="h-4 w-4 text-emerald-500" aria-hidden />
                          ) : null}
                          {expensiveThanMepotia ? (
                            <ArrowUpRight className="h-4 w-4 text-amber-500" aria-hidden />
                          ) : null}
                        </div>
                      </td>
                      <td className={`px-3 py-3 text-xs ${mutedClass}`}>
                        {offer.isOutlet ? "Outlet / 2. el" : "Perakende"}
                        {offer.freeShipping ? " · Ücretsiz kargo" : ""}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className={`mt-3 text-xs ${mutedClass}`}>
            Fiyatlar Epey üzerinden alınır; mağaza fiyatları anlık değişebilir.
            {market.outletCount
              ? ` ${market.outletCount} outlet / 2. el teklif de listeleniyor.`
              : ""}
          </p>
        </div>
      ) : null}

      {showListings && result?.mepotia?.listings?.length ? (
        <div className={`${shell} p-4 sm:p-5`}>
          <p className={`text-[10px] font-semibold tracking-[0.18em] uppercase ${mutedClass}`}>
            Mepotia&apos;daki eşleşen ilanlar
          </p>
          <ul className="mt-3 space-y-2">
            {result.mepotia.listings.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.url}
                  className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition ${
                    isDark
                      ? "border-white/10 bg-bw-950/30 hover:border-white/20 hover:bg-bw-950/50"
                      : "border-bw-200 bg-bw-50 hover:border-bw-300 hover:bg-white"
                  }`}
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-bw-200">
                    {item.image ? (
                      <Image src={item.image} alt="" fill className="object-cover" sizes="48px" />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`line-clamp-1 text-sm font-medium ${titleClass}`}>{item.title}</p>
                    <p className={`mt-0.5 text-xs ${mutedClass}`}>
                      {[item.brand, item.model, conditionLabel(item.condition), item.city]
                        .filter(Boolean)
                        .join(" · ")}
                      {item.status === "sold" ? " · Satıldı" : ""}
                    </p>
                  </div>
                  <span className={`shrink-0 text-sm font-semibold ${priceClass}`}>
                    {formatTry(item.price)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {result.searchUrl ? (
            <Link
              href={result.searchUrl}
              className={`mt-4 inline-flex text-sm font-semibold underline-offset-2 hover:underline ${
                isDark ? "text-white" : "text-bw-950"
              }`}
            >
              Tüm vitrin sonuçları →
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
