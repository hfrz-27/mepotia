"use client";

import { useEffect, useRef, useState } from "react";

const RESUME_DELAY_MS = 5000;

export default function HybridAutoScrollRow({
  children,
  className = "",
  gap = "gap-3",
  ariaLabel,
  autoScroll = true,
  scrollSpeed = 0.32,
}) {
  const scrollerRef = useRef(null);
  const loopWidthRef = useRef(0);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || !autoScroll) return;

    const measure = () => {
      loopWidthRef.current = Math.floor(el.scrollWidth / 2);
    };

    measure();

    const observer = new IntersectionObserver(
      ([entry]) => {
        pausedRef.current = !entry.isIntersecting;
      },
      { rootMargin: "48px", threshold: 0.01 },
    );
    observer.observe(el);

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(el);

    let frame = 0;
    const tick = () => {
      if (!pausedRef.current && loopWidthRef.current > 0) {
        el.scrollLeft += scrollSpeed;
        if (el.scrollLeft >= loopWidthRef.current) {
          el.scrollLeft -= loopWidthRef.current;
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
  }, [autoScroll, children, scrollSpeed]);

  const pause = () => {
    pausedRef.current = true;
    setPaused(true);
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
  };

  const scheduleResume = () => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
      setPaused(false);
    }, RESUME_DELAY_MS);
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={scrollerRef}
        role="region"
        aria-label={ariaLabel}
        className={`news-touch-scroll hide-scrollbar flex overflow-x-auto ${gap} py-1 ${
          paused ? "cursor-grab active:cursor-grabbing" : ""
        }`}
        onPointerDown={pause}
        onTouchStart={pause}
        onPointerUp={scheduleResume}
        onTouchEnd={scheduleResume}
        onPointerLeave={scheduleResume}
        onTouchCancel={scheduleResume}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
