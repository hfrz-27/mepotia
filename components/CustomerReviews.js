"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, PenLine, Send, Star, X } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useReviews } from "@/components/ReviewsContext";
import ReviewsAllPanel from "@/components/ReviewsAllPanel";

function StarPicker({ value, onChange }) {
  const [hover, setHover] = useState(0);
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
            className="rounded p-0.5"
            aria-label={`${n} yıldız`}
          >
            <Star
              className={`h-4 w-4 sm:h-5 sm:w-5 ${
                active ? "fill-[#1d1d1f] text-[#1d1d1f]" : "text-[#d2d2d7]"
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
    <article className="flex h-full flex-col rounded-[18px] bg-white p-4 ring-1 ring-black/[0.05] sm:rounded-[20px] sm:p-5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1d1d1f] text-[10px] font-bold text-white">
          {initials(review.author_name)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-[#1d1d1f]">
            {review.author_name}
          </p>
          <div className="mt-0.5 flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < review.stars ? "fill-[#1d1d1f] text-[#1d1d1f]" : "text-[#e8e8ed]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 line-clamp-4 flex-1 text-[13px] leading-relaxed text-[#6e6e73]">
        “{review.body}”
      </p>
    </article>
  );
}

/**
 * Sade marka premium yorum + hikâye — pv-wrap, siyah/beyaz.
 */
export default function CustomerReviews() {
  const { reviews, tableMissing, load } = useReviews();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ name: "", stars: 0, text: "" });

  const preview = (reviews || []).slice(0, 3);

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
      setError("Gönderilemedi, tekrar dene.");
      return;
    }

    setForm({ name: "", stars: 0, text: "" });
    setDone(true);
    setFormOpen(false);
    setTimeout(() => setDone(false), 3000);
    load();
  };

  return (
    <section className="bg-[#f5f5f7] py-8 sm:py-12" aria-label="Yorumlar">
      <div className="pv-wrap">
        {/* Marka başlık */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-semibold tracking-[0.16em] text-[#86868b] uppercase sm:text-[11px]">
            Mepotia
          </p>
          <h2 className="mt-1.5 text-[1.5rem] font-semibold tracking-[-0.03em] text-[#1d1d1f] sm:text-[2rem]">
            Güvenle alışveriş.
          </h2>
          <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-[#6e6e73] sm:text-[15px]">
            Mezopotamya&apos;dan ilham alan dürüst vitrin. Şeffaf fiyat, özenli seçim, net süreç.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <Link
              href="/hakkimizda"
              className="inline-flex min-h-[44px] items-center gap-1 text-[14px] font-normal text-[#0066cc] transition hover:underline sm:text-[15px]"
            >
              Hakkımızda
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
            <button
              type="button"
              onClick={() => setFormOpen((o) => !o)}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-[#1d1d1f] ring-1 ring-black/[0.06] transition active:scale-[0.98] sm:text-[14px]"
            >
              {formOpen ? <X className="h-3.5 w-3.5" /> : <PenLine className="h-3.5 w-3.5" />}
              {formOpen ? "Kapat" : "Yorum yaz"}
            </button>
          </div>
        </div>

        {tableMissing ? (
          <p className="mx-auto mt-4 max-w-xl rounded-xl bg-white px-4 py-2.5 text-center text-xs text-[#6e6e73] ring-1 ring-black/[0.05]">
            Supabase&apos;de <code className="text-[#1d1d1f]">customer_reviews.sql</code> çalıştır.
          </p>
        ) : null}

        {done ? (
          <p className="mx-auto mt-4 max-w-xl rounded-xl bg-white px-4 py-2.5 text-center text-xs font-medium text-[#1d1d1f] ring-1 ring-black/[0.05]">
            Teşekkürler — yorumun eklendi.
          </p>
        ) : null}

        {/* Form */}
        {formOpen ? (
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-5 max-w-xl rounded-[20px] bg-white p-4 ring-1 ring-black/[0.05] sm:p-5"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="İsmin"
                maxLength={80}
                className="rounded-xl border-0 bg-[#f5f5f7] px-3.5 py-3 text-sm text-[#1d1d1f] outline-none ring-1 ring-black/[0.04] placeholder:text-[#a3a3a3] focus:ring-black/15"
              />
              <div className="flex items-center justify-between gap-2 rounded-xl bg-[#f5f5f7] px-3.5 py-2.5 ring-1 ring-black/[0.04]">
                <span className="text-[10px] font-semibold tracking-wide text-[#86868b] uppercase">
                  Puan
                </span>
                <StarPicker
                  value={form.stars}
                  onChange={(stars) => setForm((f) => ({ ...f, stars }))}
                />
              </div>
            </div>
            <textarea
              value={form.text}
              onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
              rows={3}
              maxLength={500}
              placeholder="Kısa yorumun..."
              className="mt-3 w-full resize-none rounded-xl border-0 bg-[#f5f5f7] px-3.5 py-3 text-sm text-[#1d1d1f] outline-none ring-1 ring-black/[0.04] placeholder:text-[#a3a3a3] focus:ring-black/15"
            />
            {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
            <button
              type="submit"
              disabled={submitting}
              className="mt-3 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition active:scale-[0.98] disabled:opacity-50 sm:w-auto"
            >
              <Send className="h-4 w-4" />
              {submitting ? "Gönderiliyor..." : "Gönder"}
            </button>
          </form>
        ) : null}

        {/* Yorum kartları — sabit grid, marquee yok */}
        {preview.length ? (
          <div className="mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-3">
            {preview.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : null}

        <div className="mt-4 text-center sm:mt-5">
          <ReviewsAllPanel />
        </div>
      </div>
    </section>
  );
}
