"use client";

import { useState } from "react";
import { MessageSquare, Send, Star } from "lucide-react";
import { createClient } from "@/lib/supabase";

const TYPES = [
  { id: "satisfaction", label: "Memnuniyet" },
  { id: "problem", label: "Sorun" },
  { id: "suggestion", label: "Öneri" },
];

export default function FooterSurvey() {
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
      setError("Gönderilemedi. site_feedback.sql çalıştırıldı mı?");
      return;
    }

    setMessage("");
    setRating(0);
    setDone(true);
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <div className="rounded-2xl border border-bw-200 bg-bw-50/80 p-4 sm:p-5">
      <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-bw-900 uppercase">
        <MessageSquare className="h-3.5 w-3.5" />
        Şikayet & Öneri
      </p>
      <p className="mt-1 text-xs text-bw-500">Görüşün admin paneline düşer.</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {TYPES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setType(item.id)}
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
              type === item.id
                ? "bg-bw-950 text-white"
                : "border border-bw-200 bg-white text-bw-600 hover:border-bw-300"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {type === "satisfaction" ? (
        <div className="mt-3 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => {
            const n = i + 1;
            return (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                className="rounded p-0.5"
                aria-label={`${n} yıldız`}
              >
                <Star
                  className={`h-5 w-5 ${
                    n <= rating ? "fill-amber-400 text-amber-400" : "text-bw-300"
                  }`}
                />
              </button>
            );
          })}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="mt-3 space-y-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={2}
          maxLength={600}
          placeholder={
            type === "satisfaction"
              ? "Deneyimini kısaca yaz..."
              : type === "problem"
                ? "Sorunu anlat..."
                : "Önerini yaz..."
          }
          className="w-full resize-none rounded-xl border border-bw-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-bw-400"
        />
        {error ? <p className="text-xs text-red-600">{error}</p> : null}
        {done ? (
          <p className="text-xs text-emerald-700">Teşekkürler! Görüşün alındı.</p>
        ) : null}
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center gap-2 rounded-xl bg-bw-950 px-4 py-2.5 text-xs font-semibold text-white hover:bg-bw-800 disabled:opacity-50"
        >
          <Send className="h-3.5 w-3.5" />
          {sending ? "Gönderiliyor..." : "Gönder"}
        </button>
      </form>
    </div>
  );
}
