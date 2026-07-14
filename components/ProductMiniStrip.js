"use client";

import HybridAutoScrollRow from "@/components/HybridAutoScrollRow";
import ProductMiniCard from "@/components/ProductMiniCard";
import { fillFeatured } from "@/lib/homeDemoData";

export default function ProductMiniStrip({ products = [], className = "" }) {
  const items = fillFeatured(products, 8);
  if (!items.length) return null;

  return (
    <div className={className}>
      <p className="mb-2 text-[9px] font-semibold tracking-[0.2em] text-bw-500 uppercase">
        Vitrinden öne çıkanlar
      </p>
      <HybridAutoScrollRow ariaLabel="Öne çıkan ürünler" gap="gap-2.5">
        {items.map((product, index) => (
          <ProductMiniCard key={product.id} product={product} prefetch={index === 0} />
        ))}
      </HybridAutoScrollRow>
    </div>
  );
}
