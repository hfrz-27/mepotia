"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

export default function SearchFiltersPanel({ categories = [], defaults = {} }) {
  const [open, setOpen] = useState(false);
  const {
    q = "",
    city = "",
    condition = "",
    minPrice = "",
    maxPrice = "",
    categoryId = "",
  } = defaults;

  const field =
    "w-full rounded-xl border border-bw-200 bg-white px-3.5 py-2.5 text-sm text-bw-900 outline-none focus:border-bw-400";

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-2xl border border-bw-200 bg-white px-4 py-3 text-sm font-semibold text-bw-900 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.12)] transition hover:border-bw-300 sm:w-auto sm:min-w-[220px]"
      >
        <span className="inline-flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Gelişmiş filtre
        </span>
        <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <form className="rounded-2xl border border-bw-200 bg-bw-50 p-4 shadow-[0_12px_32px_-20px_rgba(0,0,0,0.1)] sm:p-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <input name="q" defaultValue={q} placeholder="Kelime" className={field} />
              <select name="category" defaultValue={categoryId} className={field}>
                <option value="">Tüm kategoriler</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input name="city" defaultValue={city} placeholder="Şehir" className={field} />
              <select name="condition" defaultValue={condition} className={field}>
                <option value="">Durum</option>
                <option value="new">Sıfır</option>
                <option value="used">İkinci El</option>
              </select>
              <input
                name="min"
                type="number"
                defaultValue={minPrice}
                placeholder="Min fiyat"
                className={field}
              />
              <input
                name="max"
                type="number"
                defaultValue={maxPrice}
                placeholder="Max fiyat"
                className={field}
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-bw-950 py-3 text-sm font-semibold text-white transition hover:bg-bw-800 sm:w-auto sm:px-8"
            >
              Filtrele
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
