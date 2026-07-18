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
            className="w-[min(74vw,252px)] shrink-0 first:ml-0 sm:w-[262px] md:w-[274px] lg:w-[286px]"
          >
            <ProductCard product={product} prefetch={index < prefetchCount} />
          </div>
        ))}
      </CarouselRail>

      {href ? (
        <div className="mt-6 flex justify-center px-4 sm:mt-7">
          <Link
            href={href}
            prefetch
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-bold tracking-[0.06em] text-[#1d1d1f] uppercase transition hover:brightness-105"
            style={{
              background: "linear-gradient(135deg, #f5e6b8, #d4af37)",
              boxShadow: "0 12px 32px -12px rgba(212,175,55,0.45)",
            }}
          >
            {linkLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
