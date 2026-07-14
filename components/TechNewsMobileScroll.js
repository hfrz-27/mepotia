import TechNewsHybridScroll from "@/components/TechNewsHybridScroll";

export default function TechNewsMobileScroll({ posts }) {
  const items = posts.slice(0, 6);
  if (!items.length) return null;

  return (
    <div className="mt-5">
      <TechNewsHybridScroll posts={items} />
    </div>
  );
}
