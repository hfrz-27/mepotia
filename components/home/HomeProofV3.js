"use client";

import Link from "next/link";
import { useState } from "react";
import { Send, Star } from "lucide-react";
import { createClient } from "@/lib/supabase";
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

export default function HomeProofV3() {
  const { reviews, load } = useReviews();
  const [form, setForm] = useState({ name: "", stars: 5, text: "" });
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (form.name.trim().length < 2 || form.text.trim().length < 10) {
      setMsg("İsim ve en az 10 karakter yorum gerekli.");
      return;
    }
    setBusy(true);
    const supabase = createClient();
    const { error } = await supabase.from("customer_reviews").insert([
      {
        author_name: form.name.trim(),
        stars: form.stars,
        body: form.text.trim(),
      },
    ]);
    setBusy(false);
    if (error) {
      setMsg("Gönderilemedi.");
      return;
    }
    setForm({ name: "", stars: 5, text: "" });
    setMsg("Teşekkürler — yorum eklendi.");
    load();
  };

  return (
    <section className="border-t border-white/10 bg-[#050505] text-white">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-12">
        <div>
          <p className="text-[11px] font-bold tracking-[0.3em] text-lime-400 uppercase">Proof</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
            Güven
            <br />
            mezopotamya’dan
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/50">
            Mepotia; emek, sabır ve şeffaflıkla büyüyen kişisel ikinci el teknoloji vitrini.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Kökler", "Dürüstlük", "Özen"].map((t) => (
              <span key={t} className="border border-white/15 px-3 py-1.5 text-xs font-bold tracking-wider uppercase">
                {t}
              </span>
            ))}
          </div>
          <Link
            href="/hakkimizda"
            className="mt-8 inline-flex border border-lime-400 bg-lime-400 px-5 py-3 text-xs font-black tracking-wider text-black uppercase"
          >
            Hikâyeyi oku
          </Link>

          <form onSubmit={submit} className="mt-10 space-y-3 border border-white/10 bg-zinc-950 p-5">
            <p className="text-xs font-bold tracking-widest text-white/40 uppercase">Yorum bırak</p>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="İsim"
              className="w-full border border-white/10 bg-black px-3 py-3 text-sm outline-none focus:border-lime-400"
            />
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, stars: i + 1 }))}
                  className="p-0.5"
                >
                  <Star
                    className={`h-5 w-5 ${
                      i < form.stars ? "fill-lime-400 text-lime-400" : "text-white/20"
                    }`}
                  />
                </button>
              ))}
            </div>
            <textarea
              value={form.text}
              onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
              rows={3}
              placeholder="Deneyimini yaz..."
              className="w-full resize-none border border-white/10 bg-black px-3 py-3 text-sm outline-none focus:border-lime-400"
            />
            {msg ? <p className="text-xs text-lime-400">{msg}</p> : null}
            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center gap-2 bg-white px-4 py-3 text-xs font-black tracking-wider text-black uppercase disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              Gönder
            </button>
          </form>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {(reviews || []).slice(0, 6).map((r) => (
            <article key={r.id} className="border border-white/10 bg-zinc-950 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center bg-lime-400 text-xs font-black text-black">
                  {initials(r.author_name)}
                </span>
                <div>
                  <p className="text-sm font-bold">{r.author_name}</p>
                  <div className="mt-0.5 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < r.stars ? "fill-lime-400 text-lime-400" : "text-white/15"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/55">&ldquo;{r.body}&rdquo;</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
