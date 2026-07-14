"use client";

import { TechNewsCardCompact } from "@/components/TechNewsCard";
import PremiumScrollRow from "@/components/PremiumScrollRow";

export default function TechNewsMobileScroll({ posts }) {
  return (
    <div className="mt-5 sm:hidden">
      <PremiumScrollRow ariaLabel="Teknoloji haberleri" gap="gap-3">
        {posts.map((post, index) => (
          <TechNewsCardCompact key={post.id} post={post} index={index} />
        ))}
      </PremiumScrollRow>
    </div>
  );
}
