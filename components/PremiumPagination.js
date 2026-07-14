import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
}) {
  if (totalPages <= 1) return null;

  const safePage = Math.min(Math.max(page, 1), totalPages);
  const from = (safePage - 1) * pageSize + 1;
  const to = Math.min(safePage * pageSize, totalItems);
  const pageItems = getPageItems(safePage, totalPages);

  const linkClass = (active) =>
    active
      ? "relative z-[1] min-w-[2.5rem] rounded-xl bg-bw-950 px-3 py-2 text-center text-sm font-semibold text-white shadow-[0_12px_30px_-18px_rgba(0,0,0,0.55)]"
      : "min-w-[2.5rem] rounded-xl px-3 py-2 text-center text-sm font-medium text-bw-600 transition hover:bg-bw-100 hover:text-bw-950";

  return (
    <nav
      aria-label="Sayfalar"
      className="mt-14 flex flex-col items-center gap-5 border-t border-bw-200 pt-10"
    >
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
            <span className="hidden sm:inline">Önceki</span>
          </Link>
        ) : (
          <span className="inline-flex cursor-not-allowed items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-bw-300">
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Önceki</span>
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
            <span className="hidden sm:inline">Sonraki</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span className="inline-flex cursor-not-allowed items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-bw-300">
            <span className="hidden sm:inline">Sonraki</span>
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </div>
    </nav>
  );
}
