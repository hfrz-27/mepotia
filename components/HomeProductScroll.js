"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CarouselRail from "@/components/CarouselRail";
import ProductCard from "@/components/ProductCard";
import { appleTextLinkClass } from "@/lib/appleUi";

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
            className="w-[min(74vw,248px)] shrink-0 sm:w-[260px] md:w-[272px] lg:w-[280px]"
          >
            <ProductCard product={product} prefetch={index < prefetchCount} />
          </div>
        ))}
      </CarouselRail>

      {href ? (
        <div className="mt-6 flex justify-center px-4">
          <Link href={href} prefetch className={appleTextLinkClass}>
            {linkLabel}
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
