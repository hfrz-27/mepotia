"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";

const SORT_OPTIONS = [
  { value: "newest", label: "En yeni" },
  { value: "views", label: "Popüler" },
  { value: "price_asc", label: "Fiyat ↑" },
  { value: "price_desc", label: "Fiyat ↓" },
];

function buildQuery(params) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) q.set(key, String(value));
  });
  const s = q.toString();
  return s ? `?${s}` : "";
}

/**
 * Sıralama + filtre paneli.
 * basePath: "/kategori/telefon" | "/ara" | "/en-cok-bakilanlar" | "/urunler"
 */
export default function CategoryFilters({
  basePath,
  slug,
  defaults = {},
  taxonomy = {},
  showSearch = false,
}) {
  const path = basePath || (slug ? `/kategori/${slug}` : "/ara");
  const hasAdvanced = Boolean(
    defaults.q ||
      defaults.city ||
      defaults.condition ||
      defaults.minPrice ||
      defaults.maxPrice ||
      defaults.brand ||
      defaults.model
  );
  const [advancedOpen, setAdvancedOpen] = useState(hasAdvanced);
  const currentSort = defaults.sort || "newest";

  const field =
    "w-full rounded-xl border border-bw-200/90 bg-bw-50/60 px-3 py-2 text-sm text-bw-900 outline-none transition placeholder:text-bw-400 focus:border-bw-400 focus:bg-white";
  const selectOptions = (items) =>
    items?.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ));

  const activeChips = useMemo(() => {
    const chips = [];
    if (defaults.q) chips.push({ key: "q", label: `“${defaults.q}”` });
    if (defaults.brand) chips.push({ key: "brand", label: defaults.brand });
    if (defaults.model) chips.push({ key: "model", label: defaults.model });
    if (defaults.city) chips.push({ key: "city", label: defaults.city });
    if (defaults.condition) {
      chips.push({
        key: "condition",
        label: defaults.condition === "new" ? "Sıfır" : "İkinci el",
      });
    }
    if (defaults.minPrice) chips.push({ key: "min", label: `Min ₺${defaults.minPrice}` });
    if (defaults.maxPrice) chips.push({ key: "max", label: `Max ₺${defaults.maxPrice}` });
    return chips;
  }, [defaults]);

  const queryBase = {
    q: defaults.q,
    city: defaults.city,
    condition: defaults.condition,
    min: defaults.minPrice,
    max: defaults.maxPrice,
    brand: defaults.brand,
    model: defaults.model,
  };

  const clearHref = `${path}${buildQuery({
    sort: currentSort === "newest" ? "" : currentSort,
  })}`;

  return (
    <div className="mb-4 space-y-2.5 sm:mb-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div
          role="group"
          aria-label="Sıralama"
          className="inline-flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-bw-200/80 bg-white p-1 shadow-[0_8px_24px_-20px_rgba(0,0,0,0.35)]"
        >
          {SORT_OPTIONS.map((opt) => {
            const active = currentSort === opt.value;
            const href = `${path}${buildQuery({
              ...queryBase,
              sort: opt.value === "newest" ? "" : opt.value,
            })}`;
            return (
              <Link
                key={opt.value}
                href={href}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition sm:px-4 sm:text-[13px] ${
                  active
                    ? "bg-bw-950 text-white shadow-sm"
                    : "text-bw-600 hover:bg-bw-50 hover:text-bw-950"
                }`}
              >
                {opt.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setAdvancedOpen((open) => !open)}
          aria-expanded={advancedOpen}
          className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition sm:text-[13px] ${
            advancedOpen || hasAdvanced
              ? "border-bw-900 bg-bw-950 text-white"
              : "border-bw-200 bg-white text-bw-700 shadow-[0_8px_24px_-20px_rgba(0,0,0,0.35)] hover:border-bw-300 hover:text-bw-950"
          }`}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={2} />
          Filtrele
          {hasAdvanced ? (
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-white/20 px-1 text-[10px]">
              {activeChips.length}
            </span>
          ) : (
            <ChevronDown
              className={`h-3.5 w-3.5 transition ${advancedOpen ? "rotate-180" : ""}`}
            />
          )}
        </button>
      </div>

      {activeChips.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          {activeChips.map((chip) => (
            <span
              key={chip.key}
              className="inline-flex items-center gap-1.5 rounded-full border border-bw-200 bg-bw-50 px-2.5 py-1 text-[11px] font-medium text-bw-700"
            >
              {chip.label}
            </span>
          ))}
          <Link
            href={clearHref}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold text-bw-500 transition hover:text-bw-950"
          >
            <X className="h-3 w-3" />
            Temizle
          </Link>
        </div>
      ) : null}

      {advancedOpen ? (
        <form
          action={path}
          method="get"
          className="rounded-2xl border border-bw-200/90 bg-white p-3.5 shadow-[0_16px_40px_-32px_rgba(0,0,0,0.35)] sm:p-4"
        >
          <input type="hidden" name="sort" value={currentSort} />
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
            {showSearch ? (
              <label className="col-span-2 block sm:col-span-3 lg:col-span-2">
                <span className="mb-1 block text-[10px] font-semibold tracking-[0.14em] text-bw-400 uppercase">
                  Arama
                </span>
                <input
                  name="q"
                  defaultValue={defaults.q || ""}
                  placeholder="Ürün, marka, şehir…"
                  className={field}
                />
              </label>
            ) : null}
            <label className="block">
              <span className="mb-1 block text-[10px] font-semibold tracking-[0.14em] text-bw-400 uppercase">
                Min fiyat
              </span>
              <input
                name="min"
                type="number"
                min="0"
                defaultValue={defaults.minPrice || ""}
                placeholder="0"
                className={field}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[10px] font-semibold tracking-[0.14em] text-bw-400 uppercase">
                Max fiyat
              </span>
              <input
                name="max"
                type="number"
                min="0"
                defaultValue={defaults.maxPrice || ""}
                placeholder="∞"
                className={field}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[10px] font-semibold tracking-[0.14em] text-bw-400 uppercase">
                Marka
              </span>
              {taxonomy.brands?.length ? (
                <select name="brand" defaultValue={defaults.brand || ""} className={field}>
                  <option value="">Tümü</option>
                  {selectOptions(taxonomy.brands)}
                </select>
              ) : (
                <input
                  name="brand"
                  defaultValue={defaults.brand || ""}
                  placeholder="Marka"
                  className={field}
                />
              )}
            </label>
            <label className="block">
              <span className="mb-1 block text-[10px] font-semibold tracking-[0.14em] text-bw-400 uppercase">
                Model
              </span>
              {taxonomy.models?.length ? (
                <select name="model" defaultValue={defaults.model || ""} className={field}>
                  <option value="">Tümü</option>
                  {selectOptions(taxonomy.models)}
                </select>
              ) : (
                <input
                  name="model"
                  defaultValue={defaults.model || ""}
                  placeholder="Model"
                  className={field}
                />
              )}
            </label>
            <label className="block">
              <span className="mb-1 block text-[10px] font-semibold tracking-[0.14em] text-bw-400 uppercase">
                Şehir
              </span>
              <input
                name="city"
                defaultValue={defaults.city || ""}
                placeholder="İstanbul"
                className={field}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[10px] font-semibold tracking-[0.14em] text-bw-400 uppercase">
                Durum
              </span>
              <select name="condition" defaultValue={defaults.condition || ""} className={field}>
                <option value="">Tümü</option>
                <option value="new">Sıfır</option>
                <option value="used">İkinci el</option>
              </select>
            </label>
          </div>
          <div className="mt-3 flex items-center justify-end gap-2 border-t border-bw-100 pt-3">
            {hasAdvanced ? (
              <Link
                href={clearHref}
                className="rounded-full px-3.5 py-2 text-xs font-semibold text-bw-500 transition hover:text-bw-950"
              >
                Sıfırla
              </Link>
            ) : null}
            <button
              type="submit"
              className="rounded-full bg-bw-950 px-5 py-2 text-xs font-semibold text-white transition hover:bg-bw-800 sm:text-[13px]"
            >
              Uygula
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
