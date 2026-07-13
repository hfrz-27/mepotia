"use client";

import { useEffect, useState } from "react";
import { ChevronDown, MessageSquareQuote, PenLine, Send, Star, X } from "lucide-react";
import { createClient } from "@/lib/supabase";

function Stars({ count, size = "sm" }) {
  const cls = size === "lg" ? "h-4 w-4" : "h-3 w-3";
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} yıldız`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${cls} ${
            i < count ? "fill-amber-400 text-amber-400" : "text-bw-200"
          }`}
        />
      ))}
    </div>
  );
}

function StarPicker({ value, onChange, compact = false }) {
  const [hover, setHover] = useState(0);
  const starCls = compact ? "h-5 w-5" : "h-6 w-6";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const n = i + 1;
        const active = n <= (hover || value);
        return (
          <button
            key={n}
            type="button"
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(n)}
            className="rounded p-0.5 transition hover:scale-110"
            aria-label={`${n} yıldız`}
          >
            <Star
              className={`${starCls} ${
                active ? "fill-amber-400 text-amber-400" : "text-bw-300"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
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

function ReviewCard({ review }) {
  return (
    <article className="flex w-[260px] shrink-0 flex-col rounded-2xl border border-bw-200/80 bg-white/90 p-4 shadow-[0_12px_32px_-24px_rgba(0,0,0,0.45)] backdrop-blur-sm transition hover:border-bw-300 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.35)] sm:w-[280px]">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bw-950 text-[10px] font-bold text-white">
          {initials(review.author_name)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-bw-950">{review.author_name}</p>
          <Stars count={review.stars} />
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-bw-600">
        &ldquo;{review.body}&rdquo;
      </p>
    </article>
  );
}

export default function CustomerReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [tableMissing, setTableMissing] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ name: "", stars: 0, text: "" });

  const load = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error: err } = await supabase
      .from("customer_reviews")
      .select("id, author_name, stars, body, created_at")
      .order("created_at", { ascending: false })
      .limit(16);

    if (err) {
      console.error(err);
      if (err.message?.includes("customer_reviews")) setTableMissing(true);
      setReviews([]);
    } else {
      setReviews(data || []);
      setTableMissing(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const avg =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1)
      : null;

  const marqueeItems = reviews.length > 1 ? [...reviews, ...reviews] : reviews;

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || form.name.trim().length < 2) {
      setError("İsmini yaz.");
      return;
    }
    if (!form.stars) {
      setError("Yıldız seç.");
      return;
    }
    if (!form.text.trim() || form.text.trim().length < 10) {
      setError("Yorum en az 10 karakter.");
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    const { error: err } = await supabase.from("customer_reviews").insert([
      {
        author_name: form.name.trim(),
        stars: form.stars,
        body: form.text.trim(),
      },
    ]);

    setSubmitting(false);
    if (err) {
      console.error(err);
      if (err.message?.includes("customer_reviews")) {
        setTableMissing(true);
        setError("Önce customer_reviews.sql çalıştır.");
      } else {
        setError("Gönderilemedi, tekrar dene.");
      }
      return;
    }

    setForm({ name: "", stars: 0, text: "" });
    setDone(true);
    setFormOpen(false);
    setTimeout(() => setDone(false), 3000);
    load();
  };

  return (
    <section className="relative overflow-hidden border-t border-bw-200 bg-bw-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full bg-white/5 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 left-0 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {/* Header — tek satır, kompakt */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <p className="flex items-center gap-1.5 text-[10px] tracking-[0.22em] text-bw-400 uppercase">
                <MessageSquareQuote className="h-3 w-3" />
                Müşteri yorumları
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold tracking-wide sm:text-3xl">
                Güvenenlerin sesi
              </h2>
            </div>
            {avg ? (
              <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 sm:flex">
                <span className="font-display text-2xl font-semibold">{avg}</span>
                <div>
                  <Stars count={Math.round(Number(avg))} size="lg" />
                  <p className="text-[10px] text-bw-400">{reviews.length} yorum</p>
                </div>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => setFormOpen((o) => !o)}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-bw-950 transition hover:bg-bw-100"
          >
            {formOpen ? <X className="h-4 w-4" /> : <PenLine className="h-4 w-4" />}
            {formOpen ? "Kapat" : "Yorum yaz"}
            {!formOpen ? <ChevronDown className="h-3.5 w-3.5 opacity-50" /> : null}
          </button>
        </div>

        {tableMissing ? (
          <p className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs text-amber-100">
            Supabase&apos;de <code className="text-amber-50">customer_reviews.sql</code> çalıştır.
          </p>
        ) : null}

        {done ? (
          <p className="animate-soft-in mt-4 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs text-emerald-100">
            Teşekkürler! Yorumun eklendi.
          </p>
        ) : null}

        {/* Açılır form — kompakt */}
        <div
          className={`grid transition-all duration-500 ease-out ${
            formOpen ? "mt-5 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:p-5"
            >
              <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="İsmin"
                    maxLength={80}
                    className="rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-sm text-white outline-none placeholder:text-bw-400 focus:border-white/30"
                  />
                  <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2">
                    <span className="text-[10px] font-semibold tracking-wide text-bw-400 uppercase">
                      Puan
                    </span>
                    <StarPicker
                      compact
                      value={form.stars}
                      onChange={(stars) => setForm((f) => ({ ...f, stars }))}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-bw-950 hover:bg-bw-100 disabled:opacity-50 sm:shrink-0"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? "..." : "Gönder"}
                </button>
              </div>
              <textarea
                value={form.text}
                onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                rows={2}
                maxLength={500}
                placeholder="Kısa yorumun..."
                className="mt-3 w-full resize-none rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-sm text-white outline-none placeholder:text-bw-400 focus:border-white/30"
              />
              {error ? <p className="mt-2 text-xs text-red-300">{error}</p> : null}
            </form>
          </div>
        </div>

        {/* Marquee — sabit yükseklik, büyümez */}
        <div className="relative mt-8">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-bw-950 to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-bw-950 to-transparent sm:w-20" />

          {loading ? (
            <div className="flex h-[120px] items-center justify-center">
              <p className="text-xs text-bw-400">Yükleniyor...</p>
            </div>
          ) : !reviews.length ? (
            <div className="flex h-[120px] flex-col items-center justify-center text-center">
              <MessageSquareQuote className="h-6 w-6 text-bw-600" />
              <p className="mt-2 text-xs text-bw-400">Henüz yorum yok — ilk sen yaz.</p>
            </div>
          ) : reviews.length === 1 ? (
            <div className="flex justify-center py-1">
              <ReviewCard review={reviews[0]} />
            </div>
          ) : (
            <div className="overflow-hidden py-1">
              <div className="review-marquee-track flex gap-4">
                {marqueeItems.map((review, i) => (
                  <ReviewCard key={`${review.id}-${i}`} review={review} />
                ))}
              </div>
            </div>
          )}
        </div>

        {avg ? (
          <p className="mt-4 text-center text-[10px] text-bw-500 sm:hidden">
            Ortalama {avg} · {reviews.length} yorum
          </p>
        ) : null}
      </div>
    </section>
  );
}
