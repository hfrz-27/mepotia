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
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);

  const items = [];
  let previous = 0;
  for (let page = 1; page <= total; page += 1) {
    const isEdge = page === 1 || page === total;
    const isNear = page >= current - 1 && page <= current + 1;
    if (!isEdge && !isNear) continue;
    if (previous && page - previous > 1) items.push("…");
    items.push(page);
    previous = page;
  }
  return items;
}

export default function PremiumPagination({
  basePath,
  page,
  totalPages,
  query = {},
}) {
  if (totalPages <= 1) return null;

  const safePage = Math.min(Math.max(page, 1), totalPages);
  const pageItems = getPageItems(safePage, totalPages);

  const pageClass = (active) =>
    active
      ? "inline-flex h-10 min-w-10 items-center justify-center rounded-xl bg-bw-950 px-3 text-sm font-semibold text-white shadow-[0_10px_24px_-16px_rgba(0,0,0,0.55)]"
      : "inline-flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-medium text-bw-600 transition hover:bg-bw-100 hover:text-bw-950";

  return (
    <nav aria-label="Sayfalar" className="mt-12 border-t border-bw-200 pt-8 sm:mt-14 sm:pt-10">
      <div className="mx-auto flex max-w-full items-center justify-center gap-1.5 sm:gap-2">
        {safePage > 1 ? (
          <Link
            href={buildHref(basePath, safePage - 1, query)}
            prefetch
            scroll
            className="inline-flex h-10 items-center gap-1 rounded-xl border border-bw-200 bg-white px-3 text-sm font-semibold text-bw-700 transition hover:border-bw-300 hover:bg-bw-50 hover:text-bw-950"
            aria-label="Önceki sayfa"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Önceki</span>
          </Link>
        ) : null}

        <div className="flex items-center gap-0.5 rounded-2xl border border-bw-200 bg-white p-1 shadow-[0_20px_48px_-38px_rgba(0,0,0,0.35)]">
          {pageItems.map((item, index) =>
            item === "…" ? (
              <span
                key={`ellipsis-${index}`}
                className="inline-flex h-10 w-6 items-center justify-center text-sm text-bw-400"
                aria-hidden
              >
                …
              </span>
            ) : (
              <Link
                key={item}
                href={buildHref(basePath, item, query)}
                prefetch
                scroll
                className={pageClass(item === safePage)}
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
            prefetch
            scroll
            className="inline-flex h-10 items-center gap-1 rounded-xl border border-bw-200 bg-white px-3 text-sm font-semibold text-bw-700 transition hover:border-bw-300 hover:bg-bw-50 hover:text-bw-950"
            aria-label="Sonraki sayfa"
          >
            <span className="hidden sm:inline">Sonraki</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
