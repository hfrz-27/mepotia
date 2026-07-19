import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, Search, Sparkles, TrendingUp } from "lucide-react";
import { PremiumBreadcrumb } from "@/components/BackHomeLink";
import SearchFocusInput from "@/components/SearchFocusInput";
import ProductCard from "@/components/ProductCard";
import { getPublishedProducts } from "@/lib/products";
import { fillFeatured } from "@/lib/homeDemoData";
import { TECH_CATEGORY_CATALOG } from "@/lib/techCategories";

export const metadata = {
  title: "Ara — Mepotia",
  description: "Ürün, marka veya şehir ara. Popüler aramalar, kategoriler ve öne çıkan ürünler.",
};

const POPULAR_SEARCHES = [
  "iPhone 15 Pro",
  "MacBook",
  "PlayStation 5",
  "Galaxy S24",
  "AirPods",
  "iPad",
  "RTX 4070",
  "Apple Watch",
];

const POPULAR_CATEGORIES = TECH_CATEGORY_CATALOG.slice(0, 8);

export default async function SearchLandingPage({ searchParams }) {
  const sp = await searchParams;
  const q = (sp?.q || "").trim();

  // Eski /ara?q=… linkleri → ürün sonuçları
  if (q) {
    const params = new URLSearchParams();
    params.set("q", q);
    if (sp?.sort) params.set("sort", sp.sort);
    if (sp?.city) params.set("city", sp.city);
    if (sp?.condition) params.set("condition", sp.condition);
    if (sp?.min) params.set("min", sp.min);
    if (sp?.max) params.set("max", sp.max);
    if (sp?.brand) params.set("brand", sp.brand);
    if (sp?.model) params.set("model", sp.model);
    redirect(`/urunler?${params.toString()}`);
  }

  const { data: rawFeatured } = await getPublishedProducts({
    limit: 8,
    homeCollection: "featured",
  });
  const featured = fillFeatured(rawFeatured, 8);

  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      {/* Arama alanı */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-3xl px-4 pt-6 pb-4 sm:px-6 sm:pt-10">
          <PremiumBreadcrumb
            className="mb-10"
            items={[{ href: "/ara", label: "Ara", current: true }]}
          />

          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white/70 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6e6e73] shadow-[0_1px_2px_rgba(0,0,0,.04)] backdrop-blur">
              Mepotia · Arama
            </span>
            <h1 className="mt-5 font-display text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[#1d1d1f] sm:text-[2.75rem]">
              Ne arıyorsun?
            </h1>
            <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-[#6e6e73] sm:text-[15px]">
              Ürün, marka veya şehir yaz — vitrindeki seçeneklere hızlıca ulaş.
            </p>

            <form
              id="arama"
              action="/urunler"
              method="get"
              className="mt-8 w-full scroll-mt-24"
            >
              <div className="group flex items-center gap-2 rounded-2xl border border-black/[0.08] bg-white p-2 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)] transition focus-within:border-black/20 focus-within:shadow-[0_28px_70px_-26px_rgba(0,0,0,0.42)] sm:rounded-full sm:p-2.5 sm:pl-5">
                <Search className="ml-2 h-5 w-5 shrink-0 text-[#86868b] sm:ml-0" strokeWidth={1.7} />
                <SearchFocusInput defaultValue={q} />
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-black px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[#1d1d1f] active:scale-[0.98] sm:rounded-full"
                >
                  Ara
                </button>
              </div>
            </form>

            {/* Popüler aramalar */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#86868b]">
                <TrendingUp className="h-3.5 w-3.5" strokeWidth={1.8} />
                Popüler:
              </span>
              {POPULAR_SEARCHES.map((term) => (
                <Link
                  key={term}
                  href={`/urunler?q=${encodeURIComponent(term)}`}
                  className="rounded-full border border-black/[0.07] bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#424245] transition hover:border-black/20 hover:bg-black hover:text-white"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popüler kategoriler */}
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="h-6 w-[3px] rounded-full bg-gradient-to-b from-bw-300 to-bw-950" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#86868b]">Keşfet</p>
              <h2 className="mt-0.5 font-display text-[1.4rem] font-semibold tracking-[-0.02em] text-[#1d1d1f] sm:text-[1.7rem]">
                Popüler kategoriler
              </h2>
            </div>
          </div>
          <Link
            href="/kategoriler"
            className="hidden shrink-0 items-center gap-1 text-[13px] font-semibold text-[#1d1d1f] transition hover:opacity-70 sm:inline-flex"
          >
            Tümü <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {POPULAR_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/kategori/${cat.slug}`}
                className="group flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-black/[0.05] transition hover:-translate-y-0.5 hover:ring-black/10 active:scale-[0.99] sm:flex-col sm:items-start sm:gap-0 sm:rounded-[20px] sm:p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1d1d1f] text-white transition group-hover:scale-105 sm:h-11 sm:w-11">
                  <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.7} />
                </span>
                <p className="text-[13px] font-semibold tracking-[-0.02em] text-[#1d1d1f] sm:mt-3 sm:text-[16px]">
                  {cat.name}
                </p>
                <p className="mt-1 hidden line-clamp-2 text-[11px] leading-snug text-[#6e6e73] sm:block sm:text-[12px]">
                  {cat.description}
                </p>
                <span className="mt-3 hidden items-center gap-0.5 text-[12px] font-semibold text-[#1d1d1f] opacity-60 transition group-hover:opacity-100 sm:inline-flex">
                  Gör <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-[#c7c7cc] sm:hidden" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Öne çıkan ürünler */}
      {featured.length ? (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="h-6 w-[3px] rounded-full bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700" />
              <div>
                <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700">
                  <Sparkles className="h-3.5 w-3.5" /> Seçki
                </p>
                <h2 className="mt-0.5 font-display text-[1.4rem] font-semibold tracking-[-0.02em] text-[#1d1d1f] sm:text-[1.7rem]">
                  Öne çıkan ürünler
                </h2>
              </div>
            </div>
            <Link
              href="/urunler"
              className="hidden shrink-0 items-center gap-1 text-[13px] font-semibold text-[#1d1d1f] transition hover:opacity-70 sm:inline-flex"
            >
              Tümü <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} showCompareLink={false} />
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href="/urunler"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-black px-6 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#1d1d1f] sm:text-[14px]"
            >
              Tüm ürünler
            </Link>
            <Link
              href="/kategoriler"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-black/[0.08] bg-white px-6 py-2.5 text-[13px] font-semibold text-[#1d1d1f] transition hover:border-black/20 sm:text-[14px]"
            >
              Kategoriler
            </Link>
          </div>
        </section>
      ) : null}
    </main>
  );
}
