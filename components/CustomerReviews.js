"use client";

import { useEffect, useState } from "react";
import { MessageSquareQuote, Send, Star } from "lucide-react";
import { createClient } from "@/lib/supabase";

function Stars({ count, size = "sm" }) {
  const cls = size === "lg" ? "h-5 w-5" : "h-3.5 w-3.5";
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

function StarPicker({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
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
              className={`h-7 w-7 ${
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
  return String(name || "?")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || "")
    .join("") || "?";
}

export default function CustomerReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [tableMissing, setTableMissing] = useState(false);
  const [form, setForm] = useState({ name: "", stars: 0, text: "" });

  const load = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error: err } = await supabase
      .from("customer_reviews")
      .select("id, author_name, stars, body, created_at")
      .order("created_at", { ascending: false })
      .limit(24);

    if (err) {
      console.error(err);
      if (err.message?.includes("customer_reviews")) {
        setTableMissing(true);
      }
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

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || form.name.trim().length < 2) {
      setError("İsmini yaz (en az 2 karakter).");
      return;
    }
    if (!form.stars) {
      setError("Yıldız seç.");
      return;
    }
    if (!form.text.trim() || form.text.trim().length < 10) {
      setError("Yorum en az 10 karakter olsun.");
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
        setError("Yorum sistemi henüz kurulmamış. Supabase'de customer_reviews.sql çalıştır.");
      } else {
        setError("Yorum gönderilemedi. Tekrar dene.");
      }
      return;
    }

    setForm({ name: "", stars: 0, text: "" });
    setDone(true);
    setTimeout(() => setDone(false), 4000);
    load();
  };

  return (
    <section className="relative overflow-hidden border-t border-bw-200 bg-gradient-to-b from-bw-50 via-white to-bw-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(24,24,27,0.06) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs tracking-[0.22em] text-bw-500 uppercase">
              <MessageSquareQuote className="h-3.5 w-3.5" />
              Müşteri yorumları
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-wide text-bw-950 sm:text-4xl lg:text-5xl">
              Deneyimini paylaş
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-bw-500 sm:text-base">
              Alışveriş deneyimini yaz — sadece ismin yeterli. Gerçek yorumlar Mepotia&apos;nın
              güvenini büyütür.
            </p>
          </div>

          {avg ? (
            <div className="shrink-0 rounded-3xl border border-bw-200 bg-white px-6 py-5 text-center shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)]">
              <p className="font-display text-4xl font-semibold text-bw-950">{avg}</p>
              <Stars count={Math.round(Number(avg))} size="lg" />
              <p className="mt-2 text-xs text-bw-500">{reviews.length} yorum</p>
            </div>
          ) : null}
        </div>

        {tableMissing ? (
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
            Yorumlar için Supabase SQL Editor&apos;da{" "}
            <code className="rounded bg-white px-1.5 py-0.5 text-xs">supabase/customer_reviews.sql</code>{" "}
            dosyasını bir kez çalıştır.
          </div>
        ) : null}

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Form */}
          <div className="lg:col-span-5">
            <form
              onSubmit={onSubmit}
              className="rounded-[2rem] border border-bw-200 bg-white p-6 shadow-[0_28px_70px_-40px_rgba(0,0,0,0.45)] sm:p-8"
            >
              <h3 className="font-display text-xl font-semibold text-bw-950">Yorum yaz</h3>
              <p className="mt-1 text-sm text-bw-500">İsmini belirt, yıldız ver, deneyimini anlat.</p>

              <div className="mt-6">
                <label className="mb-1.5 block text-xs font-semibold tracking-wide text-bw-600 uppercase">
                  İsim *
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Adın Soyadın"
                  maxLength={80}
                  className="w-full rounded-xl border border-bw-200 px-4 py-3 text-sm outline-none transition focus:border-bw-500 focus:ring-2 focus:ring-bw-950/5"
                />
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-xs font-semibold tracking-wide text-bw-600 uppercase">
                  Puan *
                </label>
                <StarPicker
                  value={form.stars}
                  onChange={(stars) => setForm((f) => ({ ...f, stars }))}
                />
              </div>

              <div className="mt-5">
                <label className="mb-1.5 block text-xs font-semibold tracking-wide text-bw-600 uppercase">
                  Yorum *
                </label>
                <textarea
                  value={form.text}
                  onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                  rows={4}
                  maxLength={500}
                  placeholder="Alışveriş deneyimin nasıldı?"
                  className="w-full resize-none rounded-xl border border-bw-200 px-4 py-3 text-sm outline-none transition focus:border-bw-500 focus:ring-2 focus:ring-bw-950/5"
                />
              </div>

              {error ? (
                <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
              ) : null}
              {done ? (
                <p className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                  Teşekkürler! Yorumun yayınlandı.
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-bw-950 py-3.5 text-sm font-semibold text-white transition hover:bg-bw-800 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                {submitting ? "Gönderiliyor..." : "Yorumu gönder"}
              </button>
            </form>
          </div>

          {/* List */}
          <div className="lg:col-span-7">
            {loading ? (
              <div className="flex h-48 items-center justify-center rounded-[2rem] border border-dashed border-bw-300 bg-white/60">
                <p className="text-sm text-bw-500">Yorumlar yükleniyor...</p>
              </div>
            ) : !reviews.length ? (
              <div className="flex h-48 flex-col items-center justify-center rounded-[2rem] border border-dashed border-bw-300 bg-white/60 px-6 text-center">
                <MessageSquareQuote className="h-8 w-8 text-bw-300" />
                <p className="mt-3 text-sm font-medium text-bw-700">Henüz yorum yok</p>
                <p className="mt-1 text-xs text-bw-500">İlk yorumu sen yaz.</p>
              </div>
            ) : (
              <div className="grid max-h-[520px] grid-cols-1 gap-4 overflow-y-auto pr-1 sm:grid-cols-2">
                {reviews.map((review) => (
                  <article
                    key={review.id}
                    className="flex flex-col rounded-3xl border border-bw-200/80 bg-white p-5 shadow-[0_16px_40px_-32px_rgba(0,0,0,0.4)] transition hover:border-bw-300"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bw-950 text-xs font-bold text-white">
                        {initials(review.author_name)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-bw-950">
                          {review.author_name}
                        </p>
                        <Stars count={review.stars} />
                      </div>
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-bw-600">
                      &ldquo;{review.body}&rdquo;
                    </p>
                    {review.created_at ? (
                      <p className="mt-4 text-[11px] text-bw-400">
                        {new Date(review.created_at).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
