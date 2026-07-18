"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, PenLine, Send, Star, X } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useReviews } from "@/components/ReviewsContext";
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
            className="p-0.5"
            aria-label={`${n} yıldız`}
          >
            <Star className={`h-5 w-5 ${active ? "fill-[#ff4d1a] text-[#ff4d1a]" : "text-zinc-600"}`} />
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

export default function CustomerReviews() {
  const { reviews, tableMissing, load } = useReviews();
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
      setError("Gönderilemedi.");
      return;
    }
    setForm({ name: "", stars: 0, text: "" });
    setDone(true);
    setFormOpen(false);
    setTimeout(() => setDone(false), 3000);
    load();
  };

  return (
    <section className="sx-section sx-section-alt">
      <div className="sx-wrap">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="sx-kicker">Hikâye</p>
            <h2 className="sx-title mt-2 text-3xl sm:text-4xl">
              Geçmişten
              <br />
              gelen güven
            </h2>
            <p className="sx-sub mt-4">
              Mepotia, Mezopotamya&apos;dan ilham alır. Emek, sabır ve şeffaflıkla büyüyen ikinci el
              vitrin.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {PILLARS.map((p) => (
                <span key={p} className="sx-chip">
                  {p}
                </span>
              ))}
            </div>
            <Link href="/hakkimizda" className="sx-btn mt-7">
              Hikâyeyi oku
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="lg:col-span-8">
            <div className="mb-5 flex items-center justify-between gap-3">
              <p className="sx-kicker">Yorumlar</p>
              <button type="button" onClick={() => setFormOpen((o) => !o)} className="sx-btn-ghost !py-2">
                {formOpen ? <X className="h-4 w-4" /> : <PenLine className="h-4 w-4" />}
                {formOpen ? "Kapat" : "Yaz"}
              </button>
            </div>

            {tableMissing ? (
              <p className="mb-4 border border-amber-900/50 bg-amber-950/30 px-3 py-2 text-xs text-amber-200">
                customer_reviews.sql gerekli.
              </p>
            ) : null}
            {done ? (
              <p className="mb-4 border border-emerald-900/50 bg-emerald-950/30 px-3 py-2 text-xs text-emerald-200">
                Teşekkürler — yorum eklendi.
              </p>
            ) : null}

            {formOpen ? (
              <form onSubmit={onSubmit} className="sx-card mb-6 p-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="İsim"
                    className="border border-[#2a2a30] bg-[#0c0c0f] px-3 py-2.5 text-sm text-white outline-none focus:border-[#ff4d1a]"
                  />
                  <div className="flex items-center gap-2 border border-[#2a2a30] bg-[#0c0c0f] px-3 py-2">
                    <span className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
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
                  placeholder="Yorumun..."
                  className="mt-3 w-full resize-none border border-[#2a2a30] bg-[#0c0c0f] px-3 py-2.5 text-sm text-white outline-none focus:border-[#ff4d1a]"
                />
                {error ? <p className="mt-2 text-xs text-red-400">{error}</p> : null}
                <button type="submit" disabled={submitting} className="sx-btn mt-3 disabled:opacity-50">
                  <Send className="h-4 w-4" />
                  {submitting ? "..." : "Gönder"}
                </button>
              </form>
            ) : null}

            <div className="grid gap-px bg-[#2a2a30] sm:grid-cols-2">
              {(reviews || []).slice(0, 6).map((review) => (
                <article key={review.id} className="bg-[#111114] p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center bg-[#ff4d1a] text-xs font-bold text-white">
                      {initials(review.author_name)}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-zinc-50">{review.author_name}</p>
                      <div className="mt-0.5 flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.stars ? "fill-[#ff4d1a] text-[#ff4d1a]" : "text-zinc-700"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    &ldquo;{review.body}&rdquo;
                  </p>
                </article>
              ))}
            </div>
            <ReviewsAllPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
