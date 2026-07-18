"use client";

import { useState } from "react";
import { MessageSquareQuote, Star, X } from "lucide-react";
import { useReviews } from "@/components/ReviewsContext";

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

function FullReviewCard({ review }) {
  return (
    <article className="rounded-2xl border border-bw-200 bg-white p-4 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bw-950 text-[10px] font-bold text-white">
          {initials(review.author_name)}
        </span>
        <div>
          <p className="text-sm font-semibold text-bw-950">{review.author_name}</p>
          <div className="mt-0.5 flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < review.stars ? "fill-amber-400 text-amber-400" : "text-bw-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-bw-600">&ldquo;{review.body}&rdquo;</p>
    </article>
  );
}

export default function ReviewsAllPanel() {
  const { reviews, loading } = useReviews();
  const [open, setOpen] = useState(false);

  if (loading || !reviews.length) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-[13px] font-semibold text-[#1d1d1f] underline-offset-4 transition hover:underline"
      >
        Tüm yorumları oku ({reviews.length})
      </button>

      {open ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-bw-950/50 p-4 sm:items-center">
          <div className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-bw-200 bg-white shadow-[0_32px_80px_-24px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between border-b border-bw-100 px-4 py-3">
              <p className="flex items-center gap-2 text-sm font-semibold text-bw-950">
                <MessageSquareQuote className="h-4 w-4" />
                Tüm yorumlar
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-bw-200 text-bw-600"
                aria-label="Kapat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="hide-scrollbar flex-1 space-y-3 overflow-y-auto p-4">
              {reviews.map((review) => (
                <FullReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
