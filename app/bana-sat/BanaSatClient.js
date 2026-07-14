"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Mail, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase";
import BackHomeLink from "@/components/BackHomeLink";

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

export default function BanaSatClient() {
  const [form, setForm] = useState(INITIAL);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [waLink, setWaLink] = useState("");
  const [mailLink, setMailLink] = useState("");
  const [savedToAdmin, setSavedToAdmin] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const buildMessage = (imageUrls = []) => {
    return [
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
  };

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
      // e-posta opsiyonel
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
      // SQL henüz çalıştırılmamış olabilir — WhatsApp / e-posta ile devam
    }

    await finishSuccess(imageUrls, adminOk);
  };

  const field =
    "w-full rounded-2xl border border-bw-200 bg-white px-4 py-3 text-sm outline-none focus:border-bw-500";

  if (done) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16 sm:px-6">
        <div className="rounded-[2rem] border border-bw-200 bg-white p-8 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-bw-900" />
          <h1 className="mt-4 font-display text-2xl font-semibold text-bw-950">
            Teklifin alındı
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-bw-500">
            {savedToAdmin
              ? "Teklif admin paneline düştü. WhatsApp ile de iletebilirsin."
              : "Teklif WhatsApp / e-posta ile gönderildi. Admin paneli için Supabase’de sell_offers SQL’ini bir kez çalıştırman gerekiyor."}
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-bw-950 px-5 py-3.5 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp ile gönder
            </a>
            <a
              href={mailLink}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-bw-300 px-5 py-3.5 text-sm font-semibold text-bw-900"
            >
              <Mail className="h-4 w-4" />
              E-posta ile gönder
            </a>
            <BackHomeLink label="Vitrine dön" variant="minimal" className="mt-4" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Satış teklifi</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-wide text-bw-950 sm:text-4xl">
        Ürününü bana sat
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-bw-500">
        Formu doldur. Teklif WhatsApp / e-posta ile bana ulaşır; SQL kurulunca
        admin paneline de düşer.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-4 rounded-[2rem] border border-bw-200 bg-white p-6 sm:p-8"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Adın Soyadın *"
            className={field}
            required
          />
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="Telefon / WhatsApp *"
            className={field}
            required
          />
        </div>
        <input
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="Ürün adı *"
          className={field}
          required
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            name="brand"
            value={form.brand}
            onChange={onChange}
            placeholder="Marka"
            className={field}
          />
          <input
            name="model"
            value={form.model}
            onChange={onChange}
            placeholder="Model"
            className={field}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <select
            name="condition"
            value={form.condition}
            onChange={onChange}
            className={field}
          >
            <option value="used">İkinci el</option>
            <option value="new">Sıfır / az kullanılmış</option>
          </select>
          <input
            name="price"
            value={form.price}
            onChange={onChange}
            placeholder="İstediğin fiyat (₺)"
            type="number"
            min="0"
            className={field}
          />
          <input
            name="city"
            value={form.city}
            onChange={onChange}
            placeholder="Şehir"
            className={field}
          />
        </div>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="Ürün açıklaması, durumu, aksesuarlar... *"
          rows={5}
          className={field}
          required
        />
        <div>
          <label className="mb-2 block text-sm font-medium text-bw-700">
            Fotoğraflar * (1–6 adet)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              setFiles(Array.from(e.target.files || []).slice(0, 6))
            }
            className="w-full text-sm text-bw-600 file:mr-3 file:rounded-xl file:border-0 file:bg-bw-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
          />
          {files.length ? (
            <p className="mt-2 text-xs text-bw-500">
              {files.length} fotoğraf seçildi
            </p>
          ) : null}
        </div>

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
          {loading ? "Gönderiliyor..." : "Teklifi gönder"}
        </button>
      </form>
    </main>
  );
}
