import Link from "next/link";
import { ArrowUpRight, Check, Database, Layers3 } from "lucide-react";
import { TECH_CATEGORY_CATALOG } from "@/lib/techCategories";

export default function ProductCategoriesAdmin({ categories = [] }) {
  const installed = new Set(categories.map((category) => category.slug));
  const missing = TECH_CATEGORY_CATALOG.filter((category) => !installed.has(category.slug));

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[1.75rem] border border-bw-200 bg-white shadow-[0_22px_50px_-42px_rgba(0,0,0,.4)]">
        <div className="border-b border-bw-200 bg-bw-950 px-6 py-5 text-white">
          <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.2em] text-white/60"><Layers3 className="h-3.5 w-3.5" /> Vitrin yapısı</p>
          <h3 className="mt-2 text-xl font-semibold">Ürün kategorileri</h3>
          <p className="mt-1 text-sm text-white/65">Ana sayfada, kategori sayfasında ve ilan verme formunda görünen teknoloji kategorileri.</p>
        </div>

        {missing.length ? (
          <div className="m-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
            <p className="font-semibold">{missing.length} kategori henüz veritabanına eklenmemiş.</p>
            <p className="mt-1">Supabase SQL Editor’da <code className="rounded bg-white px-1.5 py-0.5 text-xs">supabase/tech_categories.sql</code> dosyasını çalıştır. Sonrasında ilan formunda eski genel kategoriler yerine bu liste görünür.</p>
          </div>
        ) : null}

        <div className="grid gap-3 p-5 sm:grid-cols-2 xl:grid-cols-3">
          {TECH_CATEGORY_CATALOG.map((category) => {
            const Icon = category.icon;
            const ready = installed.has(category.slug);
            return (
              <article key={category.slug} className="rounded-2xl border border-bw-200 bg-bw-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-bw-800 shadow-sm"><Icon className="h-5 w-5" /></span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ${ready ? "bg-emerald-100 text-emerald-800" : "bg-bw-200 text-bw-500"}`}>
                    {ready ? <Check className="h-3 w-3" /> : <Database className="h-3 w-3" />}{ready ? "Aktif" : "Kurulum gerekli"}
                  </span>
                </div>
                <h4 className="mt-4 font-semibold text-bw-950">{category.name}</h4>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {category.subcategories.map((sub) => <span key={sub.slug} className="rounded-lg border border-bw-200 bg-white px-2 py-1 text-[10px] font-medium text-bw-600">{sub.name}</span>)}
                </div>
              </article>
            );
          })}
        </div>
        <div className="border-t border-bw-200 px-5 py-4">
          <Link href="/ilan-ver" className="inline-flex items-center gap-1.5 text-sm font-semibold text-bw-900 hover:underline">İlan verme formunu aç <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </div>
  );
}
