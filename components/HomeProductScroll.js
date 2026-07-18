"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";

/** GRID product wall — not the old horizontal carousel. */
export default function HomeProductScroll({
  products,
  href,
  linkLabel = "Devamını gör",
  prefetchCount = 2,
  ariaLabel = "Ürünler",
}) {
  if (!products.length) return null;

  return (
    <div aria-label={ariaLabel}>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-[#2a2a30] sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <div key={product.id} className="bg-[#070708]">
            <ProductCard product={product} prefetch={index < prefetchCount} />
          </div>
        ))}
      </div>

      {href ? (
        <div className="mt-8 flex justify-center px-4">
          <Link href={href} prefetch className="sx-btn">
            {linkLabel}
            <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
