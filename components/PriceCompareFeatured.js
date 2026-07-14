import ProductCard from "@/components/ProductCard";
import PremiumScrollRow from "@/components/PremiumScrollRow";
import { fillFeatured } from "@/lib/homeDemoData";

export default function PriceCompareFeatured({ products = [] }) {
  const items = fillFeatured(products, 4);

  if (!items.length) {
    return (
      <p className="mt-5 rounded-2xl border border-dashed border-bw-300 bg-white/60 px-5 py-7 text-sm text-bw-500">
        Henüz örnek ürün yok. İlan verirken &quot;Fırsat ürünü&quot; işaretlediğin ürünler burada
        görünür.
      </p>
    );
  }

  return (
    <div className="mt-5">
      <PremiumScrollRow ariaLabel="Örnek ürünler" fadeFrom="from-bw-50/35" gap="gap-3">
        {items.map((product, index) => (
          <div key={product.id} className="w-[min(72vw,260px)] shrink-0 snap-start">
            <ProductCard
              product={product}
              prefetch={index === 0}
              neutralBadges
              showCompareLink={false}
            />
          </div>
        ))}
      </PremiumScrollRow>
    </div>
  );
}
