"use client";

import CarouselRail from "@/components/CarouselRail";
import { TechNewsHomeCard } from "@/components/TechNewsCard";

export default function TechNewsHomeRow({ posts }) {
  const items = posts.slice(0, 8);
  if (!items.length) return null;

  return (
    <CarouselRail
      ariaLabel="Teknoloji haberleri"
      edgeToEdge
      prevLabel="Önceki haberler"
      nextLabel="Sonraki haberler"
      scrollerClassName="news-touch-scroll hide-scrollbar flex gap-4 overflow-x-auto pb-1 sm:gap-5"
    >
      {items.map((post, index) => (
        <TechNewsHomeCard key={post.id} post={post} index={index} />
      ))}
    </CarouselRail>
  );
}
