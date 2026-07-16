import Link from "next/link";
import { Layers3 } from "lucide-react";
import { TECH_NEWS_CATEGORIES } from "@/lib/techNewsCategories";

export default function TechNewsCategoryNav({ activeCategory = "" }) {
  const hrefFor = (category) => (category ? `/teknoloji?category=${encodeURIComponent(category)}` : "/teknoloji");

  return (
    <nav aria-label="Haber kategorileri" className="border-y border-bw-200 bg-white/80 backdrop-blur-xl">
      <div className="hide-scrollbar mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-bw-950 text-white" aria-hidden><Layers3 className="h-4 w-4" /></span>
        <Link href={hrefFor("")} className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition ${!activeCategory ? "bg-bw-950 text-white shadow-[0_10px_22px_-14px_rgba(0,0,0,.55)]" : "border border-bw-200 text-bw-600 hover:border-bw-300 hover:bg-bw-50"}`}>Tümü</Link>
        {TECH_NEWS_CATEGORIES.map((category) => <Link key={category} href={hrefFor(category)} className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition ${activeCategory === category ? "bg-bw-950 text-white shadow-[0_10px_22px_-14px_rgba(0,0,0,.55)]" : "border border-bw-200 text-bw-600 hover:border-bw-300 hover:bg-bw-50"}`}>{category}</Link>)}
      </div>
    </nav>
  );
}
