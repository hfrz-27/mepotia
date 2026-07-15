"use client";

import { useState } from "react";
import { ChevronDown, MessageSquare, Send, Star } from "lucide-react";
import { createClient } from "@/lib/supabase";

const TYPES = [
  { id: "satisfaction", label: "Memnuniyet" },
  { id: "problem", label: "Sorun" },
  { id: "suggestion", label: "Öneri" },
];

export default function FooterSurvey() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("satisfaction");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (type === "satisfaction" && !rating) {
      setError("Yıldız seç.");
      return;
    }
    if (!message.trim() || message.trim().length < 5) {
      setError("En az 5 karakter yaz.");
      return;
    }

    setSending(true);
    const { error: err } = await createClient().from("site_feedback").insert([
      {
        category: type,
        rating: type === "satisfaction" ? rating : null,
        message: message.trim(),
      },
    ]);
    setSending(false);

    if (err) {
      console.error(err);
      setError("Gönderilemedi.");
      return;
    }

    setMessage("");
    setRating(0);
    setDone(true);
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-bw-200/80 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-bw-50 sm:px-5"
      >
        <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-bw-800 uppercase">
          <MessageSquare className="h-3.5 w-3.5" />
          Şikayet & Öneri
        </p>
        <ChevronDown className={`h-4 w-4 text-bw-400 transition ${open ? "rotate-180" : ""}`} />
      </button>

      <div className={`grid transition-[grid-template-rows] duration-200 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <form onSubmit={onSubmit} className="space-y-3 border-t border-bw-100 px-4 py-3 sm:px-5 sm:py-4">
            <div className="flex flex-wrap gap-2">
              {TYPES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setType(item.id)}
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                    type === item.id
                      ? "bg-bw-950 text-white"
                      : "border border-bw-200 text-bw-600 hover:border-bw-300"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {type === "satisfaction" ? (
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => {
                  const n = i + 1;
                  return (
                    <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} yıldız`}>
                      <Star
                        className={`h-4 w-4 ${n <= rating ? "fill-amber-400 text-amber-400" : "text-bw-300"}`}
                      />
                    </button>
                  );
                })}
              </div>
            ) : null}

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={2}
              maxLength={600}
              placeholder="Kısaca yaz..."
              className="w-full resize-none rounded-lg border border-bw-200 px-3 py-2 text-sm outline-none focus:border-bw-400"
            />
            {error ? <p className="text-xs text-red-600">{error}</p> : null}
            {done ? <p className="text-xs text-emerald-700">Teşekkürler!</p> : null}
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 rounded-lg bg-bw-950 px-4 py-2 text-xs font-semibold text-white hover:bg-bw-800 disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              {sending ? "Gönderiliyor..." : "Gönder"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
