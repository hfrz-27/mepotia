"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { MessageSquareQuote, Star } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { fillReviews } from "@/lib/homeDemoData";

const ReviewsContext = createContext(null);

export function ReviewsProvider({ children }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableMissing, setTableMissing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error: err } = await supabase
      .from("customer_reviews")
      .select("id, author_name, stars, body, created_at")
      .order("created_at", { ascending: false })
      .limit(8);

    if (err) {
      console.error(err);
      if (err.message?.includes("customer_reviews")) setTableMissing(true);
      setReviews(fillReviews([]));
    } else {
      setReviews(fillReviews(data || []));
      setTableMissing(false);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <ReviewsContext.Provider value={{ reviews, loading, tableMissing, load }}>
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const ctx = useContext(ReviewsContext);
  if (!ctx) throw new Error("useReviews must be used within ReviewsProvider");
  return ctx;
}

function initials(name) {
  return (
    String(name || "?")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() || "")
      .join("") || "?"
  );
}

function MiniStars({ count, variant }) {
  const empty = variant === "dark" ? "text-white/20" : "text-bw-200";
  return (
    <span className="inline-flex items-center gap-px" aria-label={`${count} yıldız`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-2.5 w-2.5 ${
            i < count ? "fill-amber-400 text-amber-400" : empty
          }`}
        />
      ))}
    </span>
  );
}

function ReviewChip({ review, variant = "light" }) {
  const dark = variant === "dark";
  return (
    <div
      className={`flex shrink-0 items-center gap-2.5 rounded-2xl px-3 py-2 ${
        dark
          ? "border border-white/12 bg-white/10 shadow-[0_8px_28px_-12px_rgba(0,0,0,0.55)]"
          : "border border-bw-200 bg-white shadow-[0_8px_24px_-14px_rgba(0,0,0,0.12)]"
      }`}
    >
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
          dark ? "bg-white/15 text-white" : "bg-bw-950 text-white"
        }`}
      >
        {initials(review.author_name)}
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <span
            className={`text-[10px] font-semibold ${dark ? "text-white/90" : "text-bw-950"}`}
          >
            {review.author_name}
          </span>
          <MiniStars count={review.stars} variant={variant} />
        </div>
        <p
          className={`mt-0.5 max-w-[58vw] truncate text-[11px] leading-snug sm:max-w-[240px] ${
            dark ? "text-white/65" : "text-bw-500"
          }`}
        >
          &ldquo;{review.body}&rdquo;
        </p>
      </div>
    </div>
  );
}

function ReviewMarquee({ reviews, variant, duration = 36, pauseOnHover = true, mobileStatic = false }) {
  const rootRef = useRef(null);
  const items = reviews.slice(0, 8);
  const loop = [...items, ...items];

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.querySelectorAll(".review-marquee-track").forEach((track) => {
          track.classList.toggle("marquee-paused", !entry.isIntersecting);
        });
      },
      { rootMargin: "64px", threshold: 0.01 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const chips = (list, prefix) =>
    list.map((review, index) => (
      <ReviewChip
        key={`${prefix}-${variant}-${review.id}-${index}`}
        review={review}
        variant={variant}
      />
    ));

  if (mobileStatic) {
    return (
      <div ref={rootRef} className="overflow-hidden">
        <div className="news-touch-scroll hide-scrollbar flex gap-3 py-0.5">
          {chips(items, "m")}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={`overflow-hidden ${pauseOnHover ? "marquee-touch-pause" : ""}`}
    >
      <div
        className={`review-marquee-track gap-3 py-0.5 ${pauseOnHover ? "" : "review-marquee-continuous"}`}
        style={{ "--marquee-duration": `${duration}s` }}
      >
        {chips(loop, "a")}
      </div>
    </div>
  );
}

export function ReviewThinStrip({
  variant = "light",
  className = "",
  duration,
  showLabel = false,
  pauseOnHover = true,
  mobileStatic = true,
}) {
  const { reviews, loading } = useReviews();
  const dark = variant === "dark";
  const marqueeDuration = duration ?? (dark ? 28 : 38);

  return (
    <div
      className={`relative overflow-hidden ${
        dark
          ? "bg-bw-950/80 py-3"
          : "rounded-2xl border border-bw-200 bg-gradient-to-r from-bw-50 via-white to-bw-50 py-3 shadow-[0_12px_32px_-20px_rgba(0,0,0,0.1)]"
      } ${className}`}
    >
      {dark ? (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
          aria-hidden
        />
      ) : null}

      {showLabel ? (
        <p
          className={`relative mb-2 flex items-center justify-center gap-1.5 text-[9px] font-semibold tracking-[0.22em] uppercase ${
            dark ? "text-white/40" : "text-bw-400"
          }`}
        >
          <MessageSquareQuote className="h-3 w-3" />
          Güvenenlerin sesi
        </p>
      ) : null}

      <div className="relative">
        {loading ? (
          <p
            className={`px-4 text-center text-[11px] ${dark ? "text-white/40" : "text-bw-400"}`}
          >
            Yükleniyor...
          </p>
        ) : (
          <>
            <div
              className={`pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-5 bg-gradient-to-r ${
                dark ? "from-bw-950/40" : "from-white/35"
              } to-transparent`}
              aria-hidden
            />
            <div
              className={`pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-5 bg-gradient-to-l ${
                dark ? "from-bw-950/40" : "from-white/35"
              } to-transparent`}
              aria-hidden
            />
            <ReviewMarquee
              reviews={reviews}
              variant={variant}
              duration={marqueeDuration}
              pauseOnHover={pauseOnHover}
              mobileStatic={mobileStatic}
            />
          </>
        )}
      </div>
    </div>
  );
}
