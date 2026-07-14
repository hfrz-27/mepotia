"use client";

import { useEffect, useRef } from "react";
import { TechNewsCardCompact } from "@/components/TechNewsCard";

export default function TechNewsMobileScroll({ posts }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle("marquee-paused", !entry.isIntersecting);
      },
      { rootMargin: "48px", threshold: 0.01 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const items = posts.slice(0, 6);
  const loop = [...items, ...items];

  return (
    <div ref={rootRef} className="marquee-touch-pause relative mt-5 sm:hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent"
        aria-hidden
      />
      <div className="overflow-hidden">
        <div
          className="review-marquee-track review-marquee-continuous gap-3 py-1"
          style={{ "--marquee-duration": "52s" }}
        >
          {loop.map((post, index) => (
            <TechNewsCardCompact
              key={`${post.id}-${index}`}
              post={post}
              index={index % items.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
