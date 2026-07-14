"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, PenLine, Send, Star, X } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { fillReviews } from "@/lib/homeDemoData";
import PremiumScrollRow from "@/components/PremiumScrollRow";

const PILLARS = ["Kökler", "Dürüstlük", "Özen"];

function MiniStars({ count }) {
  return (
    <span className="inline-flex items-center gap-px" aria-label={`${count} yıldız`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-2.5 w-2.5 ${
            i < count ? "fill-amber-400 text-amber-400" : "text-bw-200"
          }`}
        />
      ))}
    </span>
  );
}

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
              className={`h-5 w-5 ${
                active ? "fill-amber-400 text-amber-400" : "text-bw-300"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

function ReviewChip({ review }) {
  return (
    <div className="flex shrink-0 snap-start items-center gap-2.5 rounded-full border border-bw-200 bg-bw-50 px-3 py-1.5 shadow-[0_4px_16px_-10px_rgba(0,0,0,0.12)]">
      <MiniStars count={review.stars} />
      <p className="max-w-[52vw] truncate text-[11px] text-bw-600 sm:max-w-xs">
        &ldquo;{review.body}&rdquo;
      </p>
      <span className="shrink-0 text-[10px] font-medium text-bw-400">— {review.author_name}</span>
    </div>
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
      setReviews(fillReviews([]));
    } else {
      setReviews(fillReviews(data || []));
      setTableMissing(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

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
    <section className="border-t border-bw-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-[10px] tracking-[0.28em] text-bw-500 uppercase">Hikâye</p>
            <h2 className="mt-1.5 font-display text-xl font-semibold tracking-wide text-bw-950 sm:text-2xl">
              Geçmişten Gelen Güven
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-bw-600">
              <strong className="text-bw-950">Mepotia</strong>, Mezopotamya&apos;dan ilham alır. Emek,
              sabır ve şeffaflıkla büyüyen kişisel bir ikinci el vitrin.
            </p>

            <div className="hide-scrollbar mt-3 flex gap-2 overflow-x-auto">
              {PILLARS.map((item) => (
                <span
                  key={item}
                  className="shrink-0 rounded-full border border-bw-200 bg-bw-50 px-3 py-1 text-[11px] font-medium text-bw-600"
                >
                  {item}
                </span>
              ))}
            </div>

            <Link
              href="/hakkimizda"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-bw-950 transition hover:text-bw-600"
            >
              Mepotia&apos;yı tanı
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setFormOpen((o) => !o)}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-bw-200 bg-white px-4 py-2 text-sm font-semibold text-bw-900 shadow-[0_8px_20px_-14px_rgba(0,0,0,0.2)] transition hover:border-bw-300"
          >
            {formOpen ? <X className="h-4 w-4" /> : <PenLine className="h-4 w-4" />}
            {formOpen ? "Kapat" : "Yorum yaz"}
            {!formOpen ? <ChevronDown className="h-3.5 w-3.5 opacity-50" /> : null}
          </button>
        </div>

        {tableMissing ? (
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800">
            Supabase&apos;de <code>customer_reviews.sql</code> çalıştır.
          </p>
        ) : null}

        {done ? (
          <p className="animate-soft-in mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs text-emerald-800">
            Teşekkürler! Yorumun eklendi.
          </p>
        ) : null}

        <div
          className={`grid transition-all duration-500 ease-out ${
            formOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-bw-200 bg-bw-50 p-4"
            >
              <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="İsmin"
                    maxLength={80}
                    className="rounded-xl border border-bw-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-bw-400"
                  />
                  <div className="flex items-center gap-2 rounded-xl border border-bw-200 bg-white px-3 py-2">
                    <span className="text-[10px] font-semibold tracking-wide text-bw-500 uppercase">
                      Puan
                    </span>
                    <StarPicker
                      value={form.stars}
                      onChange={(stars) => setForm((f) => ({ ...f, stars }))}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-bw-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-bw-800 disabled:opacity-50"
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
                className="mt-3 w-full resize-none rounded-xl border border-bw-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-bw-400"
              />
              {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
            </form>
          </div>
        </div>

        <div className="relative mt-5 overflow-hidden rounded-full border border-bw-100 bg-bw-50/80 py-2">
          {loading ? (
            <p className="px-4 text-center text-[11px] text-bw-400">Yükleniyor...</p>
          ) : (
            <PremiumScrollRow
              ariaLabel="Müşteri yorumları"
              fadeFrom="from-bw-50"
              gap="gap-2"
              speed={0.35}
              className="px-1"
            >
              {reviews.map((review) => (
                <ReviewChip key={review.id} review={review} />
              ))}
            </PremiumScrollRow>
          )}
        </div>
      </div>
    </section>
  );
}
