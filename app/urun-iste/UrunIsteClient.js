"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  MessageCircle,
  Search,
  Sparkles,
  Target,
  Wallet,
  Zap,
} from "lucide-react";
import { createClient } from "@/lib/supabase";
import PremiumActionPage from "@/components/PremiumActionPage";

const OWNER_WA = "905059574122";

const INITIAL = {
  phone: "",
  title: "",
  priceMin: "",
  priceMax: "",
  description: "",
};

const SUGGESTIONS = [
  "iPhone 15 128GB",
  "Samsung S24 Ultra",
  "MacBook Air M2",
  "PlayStation 5",
  "AirPods Pro 2",
  "iPad Air",
];

const field =
  "w-full rounded-2xl border border-bw-200 bg-[#fafafa] px-3.5 py-3 text-sm text-bw-950 outline-none transition placeholder:text-bw-400 focus:border-bw-900 focus:bg-white focus:ring-4 focus:ring-bw-950/8";
const labelCls =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-bw-400";

export default function UrunIsteClient({ heroVideo = "", heroImages = [] }) {
  const [form, setForm] = useState(INITIAL);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [waLink, setWaLink] = useState("");

  const progress = useMemo(() => {
    let n = 0;
    if (form.phone.trim()) n += 1;
    if (form.title.trim()) n += 1;
    if (form.priceMin || form.priceMax) n += 1;
    if (form.description.trim()) n += 1;
    return Math.round((n / 4) * 100);
  }, [form]);

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
      const { error: insertError } = await supabase.from("product_requests").insert([payload]);
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

  const shellProps = {
    accent: "request",
    eyebrow: "Ürün talebi",
    title: "Aradığın ürünü iste",
    description: "Modeli ve bütçeni yaz — uygun ilan çıkınca haber veririm.",
    icon: Search,
    heroVideo,
    heroImages,
    highlights: [
      { icon: Target, title: "Net talep", text: "Marka / model ne kadar netse o kadar hızlı." },
      { icon: Wallet, title: "Bütçe aralığı", text: "Min–max fiyatla filtreleriz." },
      { icon: Zap, title: "Eşleşince haber", text: "Uygun ürün bulununca dönüş." },
    ],
    steps: ["WhatsApp numaranı yaz", "Ürünü ve bütçeyi belirt", "Detayı gönder"],
    sideLinks: [
      { href: "/bana-sat", label: "Ürün sat" },
      { href: "/fiyat-karsilastir", label: "Karşılaştır" },
      { href: "/ara", label: "Vitrin" },
    ],
  };

  if (done) {
    return (
      <PremiumActionPage
        {...shellProps}
        title="İsteğin alındı"
        description="Uygun ürün bulursam sana dönerim."
      >
        <div className="py-2 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-violet-600 to-bw-950 text-white shadow-xl shadow-violet-900/30">
            <CheckCircle2 className="h-8 w-8" strokeWidth={1.6} />
          </span>
          <h2 className="mt-5 text-xl font-semibold tracking-tight text-bw-950">Talebin kaydedildi</h2>
          <p className="mx-auto mt-2 max-w-xs text-sm text-bw-500">
            WhatsApp ile de iletebilirsin; eşleşme olunca yazacağım.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-bw-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-bw-800"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp ile gönder
          </a>
        </div>
      </PremiumActionPage>
    );
  }

  return (
    <PremiumActionPage {...shellProps}>
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-[11px] font-semibold">
          <span className="text-bw-500">Form tamamlanma</span>
          <span className="tabular-nums text-bw-950">{progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-bw-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-sky-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="rounded-[1.25rem] border border-violet-100 bg-gradient-to-br from-violet-50/80 to-sky-50/40 p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-bw-950">
            <Search className="h-4 w-4 text-violet-600" />
            Ne arıyorsun?
          </p>
          <p className="mt-1 text-xs leading-relaxed text-bw-500">
            Popüler seçimlerden birine basabilir veya kendi modelini yazabilirsin.
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, title: s }))}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold transition ${
                  form.title === s
                    ? "border-bw-950 bg-bw-950 text-white"
                    : "border-bw-200 bg-white text-bw-600 hover:border-bw-300 hover:text-bw-950"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelCls} htmlFor="phone">
            WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="05xx xxx xx xx"
            className={field}
            required
          />
        </div>

        <div>
          <label className={labelCls} htmlFor="title">
            İstediğin ürün
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="Marka + model + depolama"
            className={field}
            required
          />
        </div>

        <div>
          <label className={labelCls}>Bütçe aralığı (₺)</label>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-xs font-semibold text-bw-400">
                Min
              </span>
              <input
                name="priceMin"
                value={form.priceMin}
                onChange={onChange}
                placeholder="0"
                type="number"
                min="0"
                className={`${field} pl-12`}
              />
            </div>
            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-xs font-semibold text-bw-400">
                Max
              </span>
              <input
                name="priceMax"
                value={form.priceMax}
                onChange={onChange}
                placeholder="∞"
                type="number"
                min="0"
                className={`${field} pl-12`}
              />
            </div>
          </div>
        </div>

        <div>
          <label className={labelCls} htmlFor="description">
            Detay
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={onChange}
            placeholder="Renk, durum tercihi, şehir, aciliyet..."
            rows={4}
            className={`${field} resize-none`}
            required
          />
        </div>

        {error ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-bw-950 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_-18px_rgba(0,0,0,0.55)] transition hover:bg-bw-800 disabled:opacity-70"
        >
          <Sparkles className="h-4 w-4 transition group-hover:rotate-12" />
          {loading ? "Gönderiliyor..." : "İsteği gönder"}
        </button>
      </form>
    </PremiumActionPage>
  );
}
