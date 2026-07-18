"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ARROW_BASE =
  "absolute top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1d1d1f] shadow-[0_4px_16px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06] backdrop-blur-md transition hover:bg-white hover:shadow-[0_6px_20px_rgba(0,0,0,0.14)] disabled:cursor-default disabled:opacity-25 sm:flex";

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
  scrollerClassName = "news-touch-scroll hide-scrollbar flex gap-4 overflow-x-auto pb-1 sm:gap-5",
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
        className={`${ARROW_BASE} left-2 sm:left-4`}
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
      </button>

      <button
        type="button"
        onClick={() => scrollBy(1)}
        disabled={!canNext}
        aria-label={nextLabel}
        className={`${ARROW_BASE} right-2 sm:right-4`}
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
      </button>

      <div
        ref={scrollerRef}
        role="region"
        aria-label={ariaLabel}
        className={scrollerClassName}
      >
        {children}
      </div>
    </div>
  );
}
