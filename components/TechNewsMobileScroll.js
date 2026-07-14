"use client";

import { useCallback, useEffect, useRef } from "react";
import { TechNewsCardCompact } from "@/components/TechNewsCard";

export default function TechNewsMobileScroll({ posts, speed = 0.18 }) {
  const ref = useRef(null);
  const pausedRef = useRef(false);
  const rafRef = useRef(null);

  const pause = useCallback(() => {
    pausedRef.current = true;
  }, []);

  const resume = useCallback(() => {
    pausedRef.current = false;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let resumeTimer;

    const onInteract = () => {
      pause();
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => resume(), 2200);
    };

    el.addEventListener("pointerdown", onInteract);
    el.addEventListener("touchstart", onInteract, { passive: true });
    el.addEventListener("wheel", onInteract, { passive: true });
    el.addEventListener("scroll", onInteract, { passive: true });

    const tick = () => {
      if (!pausedRef.current && el) {
        const max = el.scrollWidth - el.clientWidth;
        const half = max / 2;
        if (half > 0) {
          if (el.scrollLeft >= half) {
            el.scrollLeft = 0;
          } else {
            el.scrollLeft += speed;
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resumeTimer);
      el.removeEventListener("pointerdown", onInteract);
      el.removeEventListener("touchstart", onInteract);
      el.removeEventListener("wheel", onInteract);
      el.removeEventListener("scroll", onInteract);
    };
  }, [speed, pause, resume]);

  const loop = [...posts, ...posts];

  return (
    <div className="relative mt-5 sm:hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent"
        aria-hidden
      />
      <div
        ref={ref}
        role="region"
        aria-label="Teknoloji haberleri"
        className="news-touch-scroll hide-scrollbar flex gap-3 overflow-x-auto py-1"
      >
        {loop.map((post, index) => (
          <TechNewsCardCompact
            key={`${post.id}-${index}`}
            post={post}
            index={index % posts.length}
          />
        ))}
      </div>
    </div>
  );
}
