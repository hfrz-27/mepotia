"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

export default function CategoryFilters({ slug, defaults = {}, taxonomy = {} }) {
  const [advancedOpen, setAdvancedOpen] = useState(Boolean(defaults.city || defaults.condition || defaults.minPrice || defaults.maxPrice || defaults.brand || defaults.model));
  const field = "w-full rounded-xl border border-bw-200 bg-white px-3 py-2.5 text-sm text-bw-900 outline-none transition focus:border-bw-500";
  const selectOptions = (items) => items?.map((item) => <option key={item} value={item}>{item}</option>);

  return (
    <form action={`/kategori/${slug}`} className="mt-6 rounded-[1.5rem] border border-bw-200 bg-white p-4 shadow-[0_14px_34px_-28px_rgba(0,0,0,0.28)] sm:p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs font-semibold text-bw-600">Sırala<select name="sort" defaultValue={defaults.sort || "newest"} className={`${field} mt-1.5`}><option value="newest">En yeni</option><option value="oldest">En eski</option><option value="price_asc">Fiyat: düşükten yükseğe</option><option value="price_desc">Fiyat: yüksekten düşüğe</option><option value="views">En çok incelenen</option></select></label>
        <button type="submit" className="self-end rounded-xl bg-bw-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-bw-800">Uygula</button>
      </div>
      <button type="button" onClick={() => setAdvancedOpen((open) => !open)} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-bw-700 hover:text-bw-950" aria-expanded={advancedOpen}><SlidersHorizontal className="h-3.5 w-3.5" /> Gelişmiş filtre <ChevronDown className={`h-3.5 w-3.5 transition ${advancedOpen ? "rotate-180" : ""}`} /></button>
      {advancedOpen ? <div className="mt-3 grid gap-3 border-t border-bw-100 pt-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-xs font-semibold text-bw-600">Minimum fiyat<input name="min" type="number" min="0" defaultValue={defaults.minPrice || ""} placeholder="Örn. 10.000" className={`${field} mt-1.5`} /></label>
        <label className="text-xs font-semibold text-bw-600">Maksimum fiyat<input name="max" type="number" min="0" defaultValue={defaults.maxPrice || ""} placeholder="Örn. 50.000" className={`${field} mt-1.5`} /></label>
        <label className="text-xs font-semibold text-bw-600">Marka{taxonomy.brands?.length ? <select name="brand" defaultValue={defaults.brand || ""} className={`${field} mt-1.5`}><option value="">Tümü</option>{selectOptions(taxonomy.brands)}</select> : <input name="brand" defaultValue={defaults.brand || ""} placeholder="Marka" className={`${field} mt-1.5`} />}</label>
        <label className="text-xs font-semibold text-bw-600">Model{taxonomy.models?.length ? <select name="model" defaultValue={defaults.model || ""} className={`${field} mt-1.5`}><option value="">Tümü</option>{selectOptions(taxonomy.models)}</select> : <input name="model" defaultValue={defaults.model || ""} placeholder="Model" className={`${field} mt-1.5`} />}</label>
        <label className="text-xs font-semibold text-bw-600">Şehir<input name="city" defaultValue={defaults.city || ""} placeholder="İstanbul" className={`${field} mt-1.5`} /></label>
        <label className="text-xs font-semibold text-bw-600">Durum<select name="condition" defaultValue={defaults.condition || ""} className={`${field} mt-1.5`}><option value="">Tümü</option><option value="new">Sıfır</option><option value="used">İkinci el</option></select></label>
      </div> : null}
    </form>
  );
}
