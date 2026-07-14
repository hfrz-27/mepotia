import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

function buildHref(basePath, page, query = {}) {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  for (const [key, value] of Object.entries(query)) {
    if (value != null && value !== "") params.set(key, String(value));
  }
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

function getPageItems(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const items = [];
  let prev = 0;

  for (let i = 1; i <= total; i++) {
    const isEdge = i === 1 || i === total;
    const isNear = i >= current - 1 && i <= current + 1;
    if (!isEdge && !isNear) continue;

    if (prev && i - prev > 1) items.push("…");
    items.push(i);
    prev = i;
  }

  return items;
}

export default function PremiumPagination({
  basePath,
  page,
  totalPages,
  totalItems,
  pageSize,
  query = {},
  itemLabel = "haber",
  mobileMode = false,
}) {
  if (totalPages <= 1) return null;

  const safePage = Math.min(Math.max(page, 1), totalPages);
  const from = (safePage - 1) * pageSize + 1;
  const to = Math.min(safePage * pageSize, totalItems);
  const pageItems = getPageItems(safePage, totalPages);
  const remaining = Math.max(0, totalItems - to);
  const nextBatch = Math.min(pageSize, remaining);

  const linkClass = (active) =>
    active
      ? "relative z-[1] min-w-[2.5rem] rounded-xl bg-bw-950 px-3 py-2 text-center text-sm font-semibold text-white shadow-[0_12px_30px_-18px_rgba(0,0,0,0.55)]"
      : "min-w-[2.5rem] rounded-xl px-3 py-2 text-center text-sm font-medium text-bw-600 transition hover:bg-bw-100 hover:text-bw-950";

  return (
    <nav aria-label="Sayfalar" className="mt-14 border-t border-bw-200 pt-10">
      {/* Mobil — premium sonraki / önceki */}
      <div className={mobileMode ? "block sm:hidden" : "hidden"}>
        <div className="overflow-hidden rounded-[1.75rem] border border-bw-200 bg-gradient-to-b from-bw-950 via-bw-900 to-bw-950 p-6 shadow-[0_32px_80px_-48px_rgba(0,0,0,0.55)]">
          <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-bw-400 uppercase">
            <Sparkles className="h-3 w-3 text-amber-300/80" />
            Daha fazla haber
          </p>
          <p className="mt-2 text-sm text-bw-300">
            {safePage === 1
              ? "En güncel haberler en üstte listelenir."
              : `${from}–${to}. haberleri görüntülüyorsun.`}
          </p>
          <p className="mt-1 text-xs text-bw-500">
            Sayfa {safePage} / {totalPages}
          </p>

          <div className="mt-5 flex flex-col gap-2.5">
            {safePage < totalPages ? (
              <Link
                href={buildHref(basePath, safePage + 1, query)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-bw-950 transition hover:bg-bw-100"
              >
                Sonraki haberler
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : null}
            {safePage > 1 ? (
              <Link
                href={buildHref(basePath, safePage - 1, query)}
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <ChevronLeft className="h-4 w-4" />
                Önceki haberler
              </Link>
            ) : null}
            {safePage < totalPages && nextBatch > 0 ? (
              <p className="text-center text-xs text-bw-500">
                {nextBatch} haber daha var
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {/* Masaüstü — tam sayfalama */}
      <div className={mobileMode ? "hidden sm:flex" : "flex"}>
        <div className="mx-auto flex w-full flex-col items-center gap-5">
          <p className="text-center text-sm text-bw-500">
            <span className="font-semibold text-bw-800">
              {from}–{to}
            </span>
            {" / "}
            {totalItems} {itemLabel}
            <span className="mx-2 text-bw-300">·</span>
            Sayfa{" "}
            <span className="font-semibold text-bw-800">{safePage}</span> / {totalPages}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-1 rounded-[1.25rem] border border-bw-200 bg-white p-2 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.35)]">
            {safePage > 1 ? (
              <Link
                href={buildHref(basePath, safePage - 1, query)}
                className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-bw-700 transition hover:bg-bw-100 hover:text-bw-950"
                aria-label="Önceki sayfa"
              >
                <ChevronLeft className="h-4 w-4" />
                Önceki
              </Link>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-bw-300">
                <ChevronLeft className="h-4 w-4" />
                Önceki
              </span>
            )}

            <div className="mx-1 flex items-center gap-0.5">
              {pageItems.map((item, index) =>
                item === "…" ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="min-w-[2rem] px-1 text-center text-sm text-bw-400"
                    aria-hidden
                  >
                    …
                  </span>
                ) : (
                  <Link
                    key={item}
                    href={buildHref(basePath, item, query)}
                    className={linkClass(item === safePage)}
                    aria-current={item === safePage ? "page" : undefined}
                  >
                    {item}
                  </Link>
                ),
              )}
            </div>

            {safePage < totalPages ? (
              <Link
                href={buildHref(basePath, safePage + 1, query)}
                className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-bw-700 transition hover:bg-bw-100 hover:text-bw-950"
                aria-label="Sonraki sayfa"
              >
                Sonraki
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-bw-300">
                Sonraki
                <ChevronRight className="h-4 w-4" />
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
