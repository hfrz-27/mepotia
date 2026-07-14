import BackHomeLink from "@/components/BackHomeLink";
import TechPriceLookupSection from "@/components/TechPriceLookupSection";
import PriceCompareFeatured from "@/components/PriceCompareFeatured";
import { Sparkles } from "lucide-react";
import { getPublishedProducts } from "@/lib/products";

export const metadata = {
  title: "Fiyat Karşılaştır",
  description: "Mepotia vitrin fiyatlarını piyasa fiyatlarıyla karşılaştır.",
};

export default async function PriceComparisonPage() {
  const { data: featuredProducts } = await getPublishedProducts({
    limit: 8,
    featured: true,
    orderBy: "created_at",
  });

  return (
    <main className="min-h-screen bg-bw-50">
      <section className="relative overflow-hidden bg-bw-50">
        <div className="story-band-grid absolute inset-0 opacity-[0.035]" aria-hidden />
        <div className="absolute -top-32 right-[-7rem] h-80 w-80 rounded-full bg-amber-200/40 blur-3xl" aria-hidden />
        <div className="absolute -left-24 top-28 h-56 w-56 rounded-full bg-bw-300/30 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <BackHomeLink variant="minimal" label="Anasayfaya dön" className="mb-6 text-bw-700" />

          <div>
            <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-bw-500 uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              Örnek ürünler
            </p>
            <h1 className="mt-2 font-display text-2xl font-semibold tracking-wide text-bw-950 sm:text-3xl">
              Fırsat ürünler
            </h1>
            <p className="mt-2 text-sm text-bw-600">
              Yana kaydırarak vitrindeki örnek ilanlara bak.
            </p>
          </div>

          <PriceCompareFeatured products={featuredProducts || []} />
        </div>
      </section>

      <TechPriceLookupSection />
    </main>
  );
}
