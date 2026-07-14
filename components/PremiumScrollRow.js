"use client";

import { useCallback, useEffect, useRef } from "react";

export default function PremiumScrollRow({
  children,
  className = "",
  fadeFrom = "from-white",
  autoplay = true,
  speed = 0.45,
  gap = "gap-3",
  ariaLabel,
}) {
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
    if (!el || !autoplay) return;

    let resumeTimer;

    const onInteract = () => {
      pause();
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => resume(), 4500);
    };

    el.addEventListener("pointerdown", onInteract);
    el.addEventListener("touchstart", onInteract, { passive: true });
    el.addEventListener("wheel", onInteract, { passive: true });

    const tick = () => {
      if (!pausedRef.current && el) {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 0) {
          if (el.scrollLeft >= max - 1) {
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
    };
  }, [autoplay, speed, pause, resume]);

  return (
    <div className={`relative ${className}`}>
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r ${fadeFrom} to-transparent`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l ${fadeFrom} to-transparent`}
        aria-hidden
      />
      <div
        ref={ref}
        role="region"
        aria-label={ariaLabel}
        className={`news-touch-scroll hide-scrollbar flex overflow-x-auto ${gap} snap-x snap-proximity py-1`}
      >
        {children}
      </div>
    </div>
  );
}
