"use client";

import HybridAutoScrollRow from "@/components/HybridAutoScrollRow";
import { TechNewsCardCompact } from "@/components/TechNewsCard";

export default function TechNewsHybridScroll({ posts, limit }) {
  const items = posts.slice(0, limit ?? posts.length);

  return (
    <HybridAutoScrollRow ariaLabel="Teknoloji haberleri" gap="gap-3">
      {items.map((post, index) => (
        <TechNewsCardCompact key={post.id} post={post} index={index} />
      ))}
    </HybridAutoScrollRow>
  );
}
