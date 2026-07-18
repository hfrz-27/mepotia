import Link from "next/link";
import TechPriceLookupSection from "@/components/TechPriceLookupSection";
import PriceCompareFeatured from "@/components/PriceCompareFeatured";
import { ArrowRight, ArrowLeftRight, BookOpenCheck, GitCompareArrows, Sparkles } from "lucide-react";
import { getPublishedProducts } from "@/lib/products";
import { getSiteSettings } from "@/lib/categories";

export const metadata = {
  title: "Fiyat Karşılaştır | Mepotia",
  description: "Mepotia vitrin fiyatlarını güncel piyasa mağaza fiyatlarıyla karşılaştır.",
};

export default async function PriceComparisonPage({ searchParams }) {
  const sp = await searchParams;
  const initialQuery = typeof sp?.q === "string" ? sp.q : "";

  const [settings, { data: featuredProducts }] = await Promise.all([
    getSiteSettings(),
    getPublishedProducts({
      limit: 8,
      featured: true,
      orderBy: "created_at",
    }),
  ]);

  return (
    <main className="min-h-screen bg-[#f4f4f5]">
      <TechPriceLookupSection
        initialQuery={initialQuery}
        heroVideo={settings?.price_compare_video || ""}
        heroImages={[
          settings?.price_compare_bg_1,
          settings?.price_compare_bg_2,
          settings?.price_compare_bg_3,
        ].filter(Boolean)}
      />

      <section className="relative -mt-2 border-t border-bw-200/50 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/urun-karsilastir"
            className="group relative flex items-center gap-4 overflow-hidden rounded-[1.35rem] border border-bw-900/90 bg-bw-950 px-5 py-5 text-white shadow-[0_24px_60px_-36px_rgba(0,0,0,0.5)] transition hover:-translate-y-0.5 hover:shadow-[0_32px_70px_-32px_rgba(0,0,0,0.55)] sm:px-6"
          >
            <div className="pointer-events-none absolute -top-16 right-0 h-40 w-40 rounded-full bg-violet-400/25 blur-3xl" aria-hidden />
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-violet-400 via-fuchsia-300 to-pink-400" aria-hidden />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-bw-950 shadow-lg">
              <GitCompareArrows className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div className="relative min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                Diğer araç
              </p>
              <p className="mt-0.5 text-base font-semibold text-white">Özellik karşılaştırması</p>
              <p className="mt-0.5 text-xs text-white/50">2–3 model · ekran, RAM, batarya tablosu</p>
            </div>
            <ArrowRight className="relative h-4 w-4 text-white/50 transition group-hover:translate-x-0.5 group-hover:text-white" />
          </Link>
        </div>
      </section>

      <section className="border-t border-bw-200/70">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] text-bw-400 uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                Vitrinden
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-bw-950 sm:text-3xl">
                Fırsat ürünler
              </h2>
              <p className="mt-1.5 text-sm text-bw-500">
                Karşılaştırmaya değer seçilmiş ilanlar.
              </p>
            </div>
            <Link
              href="/ara"
              className="inline-flex items-center gap-1.5 rounded-full border border-bw-200 bg-white px-3.5 py-2 text-xs font-semibold text-bw-700 shadow-sm transition hover:border-bw-300 hover:text-bw-950"
            >
              Tüm vitrin
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <PriceCompareFeatured products={featuredProducts || []} />
        </div>
      </section>

      <section className="border-t border-bw-200/70 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/bana-sat"
              className="group flex items-center gap-4 rounded-2xl border border-bw-200 bg-[#fafafa] p-5 transition hover:border-bw-300 hover:bg-white hover:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.35)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bw-950 text-white">
                <ArrowLeftRight className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-bw-950">Ürününü sat</p>
                <p className="mt-0.5 text-xs text-bw-500">Teklif gönder, hızlı değerlendirme al.</p>
              </div>
              <ArrowRight className="h-4 w-4 text-bw-400 transition group-hover:translate-x-0.5 group-hover:text-bw-950" />
            </Link>
            <Link
              href="/rehber"
              className="group flex items-center gap-4 rounded-2xl border border-bw-200 bg-[#fafafa] p-5 transition hover:border-bw-300 hover:bg-white hover:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.35)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bw-950 text-white">
                <BookOpenCheck className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-bw-950">Satın alma rehberi</p>
                <p className="mt-0.5 text-xs text-bw-500">Almadan önce kontrol listesine bak.</p>
              </div>
              <ArrowRight className="h-4 w-4 text-bw-400 transition group-hover:translate-x-0.5 group-hover:text-bw-950" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
