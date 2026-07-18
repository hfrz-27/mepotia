"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ARROW =
  "absolute top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/[0.06] bg-white text-[#0b0b0b] shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] disabled:cursor-default disabled:opacity-25 sm:flex";

export function useCarouselNav(scrollerRef) {
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, [scrollerRef]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [scrollerRef, update]);

  const scrollBy = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(280, Math.floor(el.clientWidth * 0.75));
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return { canPrev, canNext, scrollBy };
}

export default function CarouselRail({
  children,
  ariaLabel,
  className = "",
  scrollerClassName = "news-touch-scroll hide-scrollbar flex gap-3 overflow-x-auto px-4 pb-1 sm:gap-3.5 sm:px-5 lg:px-6",
  fadeFrom,
  edgeToEdge = false,
  prevLabel = "Önceki",
  nextLabel = "Sonraki",
}) {
  const scrollerRef = useRef(null);
  const { canPrev, canNext, scrollBy } = useCarouselNav(scrollerRef);
  const showFade = fadeFrom && !edgeToEdge;

  return (
    <div className={`relative w-full ${className}`}>
      {showFade ? (
        <>
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-4 bg-gradient-to-r sm:block ${fadeFrom} to-transparent opacity-25`}
            aria-hidden
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-4 bg-gradient-to-l sm:block ${fadeFrom} to-transparent opacity-25`}
            aria-hidden
          />
        </>
      ) : null}

      <button
        type="button"
        onClick={() => scrollBy(-1)}
        disabled={!canPrev}
        aria-label={prevLabel}
        className={`${ARROW} left-2 sm:left-4`}
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        onClick={() => scrollBy(1)}
        disabled={!canNext}
        aria-label={nextLabel}
        className={`${ARROW} right-2 sm:right-4`}
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
      </button>

      <div ref={scrollerRef} role="region" aria-label={ariaLabel} className={scrollerClassName}>
        {children}
      </div>
    </div>
  );
}
