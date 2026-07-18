"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronDown, PenLine, Send, Star, X } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { ReviewThinStrip, useReviews } from "@/components/ReviewsContext";
import ReviewsAllPanel from "@/components/ReviewsAllPanel";

const PILLARS = ["Kökler", "Dürüstlük", "Özen"];

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

export default function CustomerReviews() {
  const { tableMissing, load } = useReviews();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ name: "", stars: 0, text: "" });

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
    <section className="border-t border-bw-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="flex flex-wrap items-start justify-between gap-6 lg:gap-10">
          <div className="max-w-2xl">
            <p className="text-[10px] tracking-[0.28em] text-bw-500 uppercase">Hikâye</p>
            <h2 className="mt-1.5 font-display text-xl font-semibold tracking-wide text-bw-950 sm:text-3xl lg:text-4xl">
              Geçmişten Gelen Güven
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-bw-600">
              <strong className="text-bw-950">Mepotia</strong>, Mezopotamya&apos;dan ilham alır. Emek,
              sabır ve şeffaflıkla büyüyen kişisel bir ikinci el vitrin.
            </p>

            <div className="news-touch-scroll hide-scrollbar mt-3 flex gap-2 overflow-x-auto">
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
              className="mt-5 inline-flex items-center gap-2.5 rounded-2xl bg-bw-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_36px_-14px_rgba(0,0,0,0.45)] transition hover:bg-bw-800"
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
            <form onSubmit={onSubmit} className="rounded-2xl border border-bw-200 bg-bw-50 p-4">
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

        <ReviewThinStrip variant="light" className="mt-6" showLabel duration={34} mobileStatic />
        <ReviewsAllPanel />
      </div>
    </section>
  );
}
