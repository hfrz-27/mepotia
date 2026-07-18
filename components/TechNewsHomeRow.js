"use client";

import { TechNewsHomeCard } from "@/components/TechNewsCard";

export default function TechNewsHomeRow({ posts }) {
  const items = posts.slice(0, 7);
  if (!items.length) return null;

  const [first, ...rest] = items;

  return (
    <div className="mx-auto max-w-6xl space-y-px bg-[#2a2a30] px-0">
      <div className="bg-[#070708]">
        <TechNewsHomeCard post={first} index={0} featured />
      </div>
      {rest.length ? (
        <div className="grid gap-px bg-[#2a2a30] sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, index) => (
            <div key={post.id} className="bg-[#070708]">
              <TechNewsHomeCard post={post} index={index + 1} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
