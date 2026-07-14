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
    <main className="min-h-screen bg-bw-100">
      <TechPriceLookupSection />

      <section className="border-t border-bw-200 bg-bw-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-bw-500 uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            Örnek ürünler
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-wide text-bw-950 sm:text-3xl">
            Fırsat ürünler
          </h2>
          <p className="mt-2 text-sm text-bw-600">
            Yana kaydırarak vitrindeki örnek ilanlara bak.
          </p>

          <PriceCompareFeatured products={featuredProducts || []} />
        </div>
      </section>
    </main>
  );
}
