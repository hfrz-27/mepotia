import TechNewsHybridScroll from "@/components/TechNewsHybridScroll";

export default function TechNewsMobileScroll({ posts }) {
  const items = posts.slice(0, 6);
  if (!items.length) return null;

  return (
    <div className="mt-5 sm:hidden">
      <TechNewsHybridScroll posts={items} />
    </div>
  );
}
