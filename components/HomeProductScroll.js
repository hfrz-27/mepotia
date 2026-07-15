"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CarouselRail from "@/components/CarouselRail";
import ProductCard from "@/components/ProductCard";

export default function HomeProductScroll({
  products,
  href,
  linkLabel = "Devamını gör",
  prefetchCount = 2,
  ariaLabel = "Ürünler",
}) {
  if (!products.length) return null;

  return (
    <div>
      <CarouselRail
        ariaLabel={ariaLabel}
        edgeToEdge
        prevLabel="Önceki ürünler"
        nextLabel="Sonraki ürünler"
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            className="w-[min(72vw,240px)] shrink-0 first:ml-0 sm:w-[250px] md:w-[260px] lg:w-[272px]"
          >
            <ProductCard product={product} prefetch={index < prefetchCount} />
          </div>
        ))}
      </CarouselRail>

      {href ? (
        <div className="mt-5 flex justify-center px-4 sm:mt-6">
          <Link
            href={href}
            prefetch
            className="inline-flex items-center gap-2 rounded-xl bg-bw-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-bw-800"
          >
            {linkLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
