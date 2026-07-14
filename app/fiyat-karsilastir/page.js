import TechPriceLookupSection from "@/components/TechPriceLookupSection";
import ProductCard from "@/components/ProductCard";
import { Sparkles } from "lucide-react";
import { getPublishedProducts } from "@/lib/products";

export const metadata = {
  title: "Fiyat Karşılaştır",
  description: "Mepotia vitrin fiyatlarını piyasa fiyatlarıyla karşılaştır.",
};

export default async function PriceComparisonPage() {
  const { data: featuredProducts } = await getPublishedProducts({
    limit: 4,
    featured: true,
    orderBy: "created_at",
  });

  return (
    <main className="min-h-screen bg-bw-50">
      <TechPriceLookupSection />
      <section className="border-b border-bw-200 bg-bw-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-bw-500 uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                Seçilmiş ilanlar
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-wide text-bw-950">
                Fırsat ürünler
              </h2>
              <p className="mt-2 text-sm text-bw-600">
                Vitrinde öne çıkarılan fırsatları incele.
              </p>
            </div>
          </div>

          {featuredProducts?.length ? (
            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="mt-7 rounded-2xl border border-dashed border-bw-300 bg-white px-5 py-7 text-sm text-bw-500">
              Henüz fırsat ürünü yok. İlan verirken “Fırsat ürünü olarak göster” seçeneğini
              işaretlediğin ürünler burada görünür.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
