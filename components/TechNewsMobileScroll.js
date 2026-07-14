import PremiumScrollRow from "@/components/PremiumScrollRow";
import { TechNewsCardCompact } from "@/components/TechNewsCard";

export default function TechNewsMobileScroll({ posts }) {
  const items = posts.slice(0, 6);

  return (
    <div className="mt-5 sm:hidden">
      <PremiumScrollRow ariaLabel="Teknoloji haberleri" gap="gap-3">
        {items.map((post, index) => (
          <TechNewsCardCompact key={post.id} post={post} index={index} />
        ))}
      </PremiumScrollRow>
    </div>
  );
}
