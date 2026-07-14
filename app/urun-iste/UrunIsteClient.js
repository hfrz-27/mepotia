"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { createClient } from "@/lib/supabase";
import BackHomeLink from "@/components/BackHomeLink";

const OWNER_WA = "905059574122";

const INITIAL = {
  phone: "",
  title: "",
  priceMin: "",
  priceMax: "",
  description: "",
};

export default function UrunIsteClient() {
  const [form, setForm] = useState(INITIAL);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [waLink, setWaLink] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.phone.trim() || !form.title.trim()) {
      setError("Telefon ve istediğin ürün zorunlu.");
      return;
    }
    if (!form.description.trim()) {
      setError("Kısa bir açıklama yaz.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const payload = {
      phone: form.phone.trim(),
      title: form.title.trim(),
      price_min: form.priceMin ? Number(form.priceMin) : null,
      price_max: form.priceMax ? Number(form.priceMax) : null,
      description: form.description.trim(),
      status: "new",
    };

    try {
      const { error: insertError } = await supabase
        .from("product_requests")
        .insert([payload]);
      if (insertError) throw insertError;
    } catch (err) {
      console.warn("product_requests:", err?.message || err);
    }

    const range =
      form.priceMin || form.priceMax
        ? `${form.priceMin || "?"} – ${form.priceMax || "?"} ₺`
        : "belirtilmedi";
    const message = [
      "Mepotia — Ürün isteği",
      "",
      `Telefon: ${form.phone}`,
      `Ürün: ${form.title}`,
      `Fiyat aralığı: ${range}`,
      "",
      form.description,
    ].join("\n");
    const wa = `https://wa.me/${OWNER_WA}?text=${encodeURIComponent(message)}`;

    setWaLink(wa);
    setDone(true);
    setLoading(false);
    window.open(wa, "_blank", "noopener,noreferrer");
  };

  const field =
    "w-full rounded-2xl border border-bw-200 bg-white px-4 py-3 text-sm outline-none focus:border-bw-500";

  if (done) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16 sm:px-6">
        <div className="rounded-[2rem] border border-bw-200 bg-white p-8 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-bw-900" />
          <h1 className="mt-4 font-display text-2xl font-semibold text-bw-950">
            İsteğin alındı
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-bw-500">
            Uygun ürün bulursam sana dönerim.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-bw-950 px-5 py-3.5 text-sm font-semibold text-white"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp ile gönder
          </a>
          <div className="mt-4 flex justify-center">
            <BackHomeLink label="Vitrine dön" variant="minimal" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Talep</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-wide text-bw-950 sm:text-4xl">
        Ürün iste
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-bw-500">
        Aradığın ürünü yaz. Uygun bulursam haber veririm.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-4 rounded-[2rem] border border-bw-200 bg-white p-6 sm:p-8"
      >
        <input
          name="phone"
          value={form.phone}
          onChange={onChange}
          placeholder="Telefon / WhatsApp *"
          className={field}
          required
        />
        <input
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="İstediğin ürün *"
          className={field}
          required
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            name="priceMin"
            value={form.priceMin}
            onChange={onChange}
            placeholder="Min fiyat ₺"
            type="number"
            min="0"
            className={field}
          />
          <input
            name="priceMax"
            value={form.priceMax}
            onChange={onChange}
            placeholder="Max fiyat ₺"
            type="number"
            min="0"
            className={field}
          />
        </div>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="Kısa açıklama (marka, model, durum...) *"
          rows={4}
          className={field}
          required
        />

        {error ? (
          <p className="rounded-2xl bg-bw-100 px-3 py-2 text-sm text-bw-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-bw-950 py-3.5 text-sm font-semibold text-white hover:bg-bw-800 disabled:opacity-70"
        >
          {loading ? "Gönderiliyor..." : "İsteği gönder"}
        </button>
      </form>
    </main>
  );
}
