"use client";

import { useMemo, useState } from "react";
import {
  Camera,
  CheckCircle2,
  Clock3,
  HandCoins,
  ImagePlus,
  Mail,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase";
import PremiumActionPage from "@/components/PremiumActionPage";

const OWNER_EMAIL = "hay98dar@gmail.com";
const OWNER_WA = "905059574122";

const INITIAL = {
  name: "",
  phone: "",
  title: "",
  brand: "",
  model: "",
  condition: "used",
  price: "",
  city: "",
  description: "",
};

const field =
  "w-full rounded-2xl border border-bw-200 bg-[#fafafa] px-3.5 py-3 text-sm text-bw-950 outline-none transition placeholder:text-bw-400 focus:border-bw-900 focus:bg-white focus:ring-4 focus:ring-bw-950/8";
const labelCls =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-bw-400";

export default function BanaSatClient({ heroVideo = "", heroImages = [] }) {
  const [form, setForm] = useState(INITIAL);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [waLink, setWaLink] = useState("");
  const [mailLink, setMailLink] = useState("");
  const [savedToAdmin, setSavedToAdmin] = useState(false);

  const progress = useMemo(() => {
    let n = 0;
    if (form.name.trim()) n += 1;
    if (form.phone.trim()) n += 1;
    if (form.title.trim()) n += 1;
    if (form.description.trim()) n += 1;
    if (files.length) n += 1;
    return Math.round((n / 5) * 100);
  }, [form, files.length]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onFiles = (list) => {
    const next = Array.from(list || []).slice(0, 6);
    setFiles(next);
    setPreviews((prev) => {
      prev.forEach((url) => URL.revokeObjectURL(url));
      return next.map((f) => URL.createObjectURL(f));
    });
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      const copy = [...prev];
      if (copy[index]) URL.revokeObjectURL(copy[index]);
      copy.splice(index, 1);
      return copy;
    });
  };

  const buildMessage = (imageUrls = []) =>
    [
      "Mepotia — Satış teklifi",
      "",
      `İsim: ${form.name}`,
      `Telefon: ${form.phone}`,
      `Ürün: ${form.title}`,
      `Marka: ${form.brand || "-"}`,
      `Model: ${form.model || "-"}`,
      `Durum: ${form.condition === "new" ? "Sıfır" : "İkinci el"}`,
      `İstenen fiyat: ${form.price || "-"} ₺`,
      `Şehir: ${form.city || "-"}`,
      "",
      "Açıklama:",
      form.description || "-",
      "",
      imageUrls.length
        ? `Fotoğraflar:\n${imageUrls.join("\n")}`
        : files.length
          ? `Fotoğraf sayısı: ${files.length} (WhatsApp'tan da gönderebilirsin)`
          : "Fotoğraf yok",
    ].join("\n");

  const finishSuccess = async (imageUrls, adminOk) => {
    const message = buildMessage(imageUrls);
    const wa = `https://wa.me/${OWNER_WA}?text=${encodeURIComponent(message)}`;
    const mail = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(
      `Mepotia satış teklifi — ${form.title}`,
    )}&body=${encodeURIComponent(message)}`;

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("phone", form.phone);
      fd.append("title", form.title);
      fd.append("brand", form.brand);
      fd.append("model", form.model);
      fd.append("condition", form.condition);
      fd.append("price", form.price);
      fd.append("city", form.city);
      fd.append("description", form.description);
      fd.append("images", imageUrls.join("\n"));
      fd.append("_subject", `Mepotia satış teklifi — ${form.title}`);
      fd.append("_template", "table");
      fd.append("_captcha", "false");
      for (let i = 0; i < files.length; i++) {
        fd.append(`attachment${i + 1}`, files[i]);
      }
      await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
    } catch {
      // optional
    }

    setWaLink(wa);
    setMailLink(mail);
    setSavedToAdmin(adminOk);
    setDone(true);
    setLoading(false);
    window.open(wa, "_blank", "noopener,noreferrer");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.phone.trim() || !form.title.trim()) {
      setError("İsim, telefon ve ürün adı zorunlu.");
      return;
    }
    if (!form.description.trim()) {
      setError("Ürün açıklaması zorunlu.");
      return;
    }
    if (!files.length) {
      setError("En az 1 fotoğraf ekle.");
      return;
    }
    if (files.length > 6) {
      setError("En fazla 6 fotoğraf yükleyebilirsin.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const imageUrls = [];
    const folder = `offers/${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    let adminOk = false;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const path = `${folder}/${i + 1}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("sell-offers")
          .upload(path, file, { cacheControl: "3600", upsert: false });
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from("sell-offers").getPublicUrl(path);
        if (pub?.publicUrl) imageUrls.push(pub.publicUrl);
      }

      const { error: insertError } = await supabase.from("sell_offers").insert([
        {
          contact_name: form.name.trim(),
          phone: form.phone.trim(),
          title: form.title.trim(),
          brand: form.brand.trim() || null,
          model: form.model.trim() || null,
          condition: form.condition,
          price: form.price ? Number(form.price) : null,
          city: form.city.trim() || null,
          description: form.description.trim(),
          image_urls: imageUrls,
          status: "new",
        },
      ]);

      if (insertError) throw insertError;
      adminOk = true;
    } catch (err) {
      console.warn("sell_offers kaydı atlandı:", err?.message || err);
    }

    await finishSuccess(imageUrls, adminOk);
  };

  const shellProps = {
    accent: "sell",
    eyebrow: "Satış teklifi",
    title: "Ürününü bana sat",
    description: "Net fotoğraf + dürüst açıklama = hızlı ve adil teklif.",
    icon: HandCoins,
    imageSrc: "/brand/actions/mepotia-trade-premium-v3.png",
    heroVideo,
    heroImages,
    highlights: [
      { icon: Clock3, title: "Hızlı dönüş", text: "Uygun tekliflerde aynı gün yanıt." },
      { icon: ShieldCheck, title: "Şeffaf süreç", text: "Fiyat ve durum net konuşulur." },
      { icon: Camera, title: "Fotoğraf önemli", text: "1–6 net kare yeterli." },
    ],
    steps: ["İletişim bilgilerini yaz", "Ürünü ve fiyatı ekle", "Fotoğrafları yükle, gönder"],
    sideLinks: [
      { href: "/fiyat-karsilastir", label: "Fiyat karşılaştır" },
      { href: "/urun-iste", label: "Ürün iste" },
      { href: "/rehber", label: "Rehberler" },
    ],
  };

  if (done) {
    return (
      <PremiumActionPage {...shellProps} title="Teklifin alındı" description={savedToAdmin ? "Panel ve WhatsApp tarafına iletildi." : "WhatsApp / e-posta ile iletildi."}>
        <div className="text-center py-2">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-bw-950 to-bw-800 text-white shadow-xl shadow-black/20">
            <CheckCircle2 className="h-8 w-8" strokeWidth={1.6} />
          </span>
          <h2 className="mt-5 text-xl font-semibold tracking-tight text-bw-950">Teşekkürler</h2>
          <p className="mx-auto mt-2 max-w-xs text-sm text-bw-500">
            En kısa sürede dönüş yapılır. İstersen teklifi tekrar iletebilirsin.
          </p>
          <div className="mt-7 flex flex-col gap-2.5">
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-bw-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-bw-800"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp ile gönder
            </a>
            <a
              href={mailLink}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-bw-200 bg-bw-50 px-5 py-3.5 text-sm font-semibold text-bw-900 transition hover:bg-white"
            >
              <Mail className="h-4 w-4" />
              E-posta ile gönder
            </a>
          </div>
        </div>
      </PremiumActionPage>
    );
  }

  return (
    <PremiumActionPage {...shellProps}>
      {/* Progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-[11px] font-semibold">
          <span className="text-bw-500">Form tamamlanma</span>
          <span className="tabular-nums text-bw-950">{progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-bw-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-7">
        <section>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-bw-950 text-[11px] font-bold text-white">
              01
            </span>
            <h2 className="text-sm font-semibold text-bw-950">İletişim</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="name">
                Ad soyad
              </label>
              <input id="name" name="name" value={form.name} onChange={onChange} placeholder="Adın soyadın" className={field} required />
            </div>
            <div>
              <label className={labelCls} htmlFor="phone">
                WhatsApp
              </label>
              <input id="phone" name="phone" value={form.phone} onChange={onChange} placeholder="05xx xxx xx xx" className={field} required />
            </div>
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-bw-950 text-[11px] font-bold text-white">
              02
            </span>
            <h2 className="text-sm font-semibold text-bw-950">Ürün</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className={labelCls} htmlFor="title">
                Ürün adı
              </label>
              <input id="title" name="title" value={form.title} onChange={onChange} placeholder="Örn. iPhone 15 Pro 256GB" className={field} required />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor="brand">
                  Marka
                </label>
                <input id="brand" name="brand" value={form.brand} onChange={onChange} placeholder="Apple, Samsung..." className={field} />
              </div>
              <div>
                <label className={labelCls} htmlFor="model">
                  Model
                </label>
                <input id="model" name="model" value={form.model} onChange={onChange} placeholder="Model" className={field} />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className={labelCls} htmlFor="condition">
                  Durum
                </label>
                <select id="condition" name="condition" value={form.condition} onChange={onChange} className={field}>
                  <option value="used">İkinci el</option>
                  <option value="new">Sıfır / az kullanılmış</option>
                </select>
              </div>
              <div>
                <label className={labelCls} htmlFor="price">
                  Fiyat ₺
                </label>
                <input id="price" name="price" value={form.price} onChange={onChange} placeholder="0" type="number" min="0" className={field} />
              </div>
              <div>
                <label className={labelCls} htmlFor="city">
                  Şehir
                </label>
                <input id="city" name="city" value={form.city} onChange={onChange} placeholder="İstanbul" className={field} />
              </div>
            </div>
            <div>
              <label className={labelCls} htmlFor="description">
                Açıklama
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={onChange}
                placeholder="Durum, aksesuar, kutu, fatura, kullanım süresi..."
                rows={4}
                className={`${field} resize-none`}
                required
              />
            </div>
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-bw-950 text-[11px] font-bold text-white">
              03
            </span>
            <h2 className="text-sm font-semibold text-bw-950">
              Fotoğraflar <span className="font-medium text-bw-400">(1–6)</span>
            </h2>
          </div>

          <label className="group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[1.25rem] border border-dashed border-bw-300 bg-gradient-to-b from-[#fafafa] to-bw-50 px-4 py-9 text-center transition hover:border-bw-500 hover:from-white hover:to-bw-50">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-bw-950 text-white shadow-lg shadow-black/15 transition group-hover:scale-105">
              <ImagePlus className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <p className="mt-3 text-sm font-semibold text-bw-950">Fotoğraf ekle</p>
            <p className="mt-1 text-xs text-bw-500">Ön / arka / ekran / kutu — net çekimler</p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => onFiles(e.target.files)}
              className="sr-only"
            />
          </label>

          {previews.length ? (
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {previews.map((src, i) => (
                <div key={src} className="group relative aspect-square overflow-hidden rounded-xl border border-bw-200 bg-bw-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-bw-950/80 text-white opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100"
                    aria-label="Kaldır"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </section>

        {error ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-bw-950 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_-18px_rgba(0,0,0,0.55)] transition hover:bg-bw-800 disabled:opacity-70"
        >
          <Sparkles className="h-4 w-4 transition group-hover:rotate-12" />
          {loading ? "Gönderiliyor..." : "Teklifi gönder"}
        </button>
      </form>
    </PremiumActionPage>
  );
}
