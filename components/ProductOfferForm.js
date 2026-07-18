"use client";

import { useState } from "react";
import { ImagePlus, Loader2, Repeat2, X } from "lucide-react";
import { createClient } from "@/lib/supabase";

const INITIAL_FORM = { name: "", phone: "", title: "", brand: "", model: "", condition: "used", price: "", city: "", description: "" };

export default function ProductOfferForm({ productId, title: requestedProductTitle }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [files, setFiles] = useState([]);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  const updateForm = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const close = () => {
    setOpen(false);
    setStatus("");
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.title.trim() || !form.description.trim()) {
      setStatus("Ad, telefon, takas ürünü ve açıklama zorunlu.");
      return;
    }
    if (!files.length) {
      setStatus("Takas edeceğin ürüne ait en az 1 fotoğraf ekle.");
      return;
    }

    setSending(true);
    setStatus("");
    const supabase = createClient();
    const imageUrls = [];

    try {
      const folder = `trade-offers/${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const path = `${folder}/${index + 1}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("sell-offers")
          .upload(path, file, { cacheControl: "3600", upsert: false });
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("sell-offers").getPublicUrl(path);
        if (data?.publicUrl) imageUrls.push(data.publicUrl);
      }

      const { error } = await supabase.from("sell_offers").insert({
        contact_name: form.name.trim(),
        phone: form.phone.trim(),
        title: form.title.trim(),
        brand: form.brand.trim() || null,
        model: form.model.trim() || null,
        condition: form.condition,
        price: form.price ? Number(form.price) : null,
        city: form.city.trim() || null,
        description: [
          "TAKAS TEKLİFİ",
          `İstenen ürün: ${requestedProductTitle} (ID: ${productId})`,
          form.price ? `Tahmini değer: ${form.price} ₺` : "Tahmini değer: Belirtilmedi",
          "",
          "Takas ürünü açıklaması:",
          form.description.trim(),
        ].join("\n"),
        image_urls: imageUrls,
        status: "new",
      });
      if (error) throw error;
    } catch (error) {
      setSending(false);
      setStatus(`Teklif gönderilemedi: ${error.message || "Lütfen tekrar dene."}`);
      return;
    }

    setSending(false);
    setForm(INITIAL_FORM);
    setFiles([]);
    setOpen(false);
    setStatus("Takas teklifin yönetim paneline iletildi.");
  };

  const field = "w-full rounded-xl border border-bw-200 bg-bw-50 px-3 py-2.5 text-sm outline-none transition focus:border-bw-500";

  return (
    <div className="relative flex-1 sm:flex-none">
      <button type="button" onClick={() => { setOpen(true); setStatus(""); }} className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-xl border border-bw-950 bg-white px-3 text-xs font-semibold text-bw-950 transition hover:bg-bw-50 sm:w-auto">
        <Repeat2 className="h-3.5 w-3.5" />
        Takas Et
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-end bg-bw-950/40 p-3 sm:items-center sm:justify-center sm:p-6">
          <button type="button" onClick={close} className="absolute inset-0" aria-label="Takas formunu kapat" />
          <form onSubmit={submit} className="relative z-10 max-h-[calc(100vh-1.5rem)] w-full max-w-xl overflow-y-auto rounded-[1.5rem] border border-bw-200 bg-white p-4 shadow-2xl sm:max-h-[90vh] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-bw-950">Takas teklifi ver</p>
                <p className="mt-1 text-sm text-bw-600"><strong>{requestedProductTitle}</strong> için vereceğin ürünü anlat.</p>
              </div>
              <button type="button" onClick={close} className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-bw-200 text-bw-600 hover:bg-bw-50" aria-label="Kapat"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <input name="name" value={form.name} onChange={updateForm} placeholder="Adın Soyadın *" className={field} required />
              <input name="phone" value={form.phone} onChange={updateForm} placeholder="Telefon / WhatsApp *" type="tel" className={field} required />
            </div>
            <input name="title" value={form.title} onChange={updateForm} placeholder="Takas edeceğin ürün *" className={`mt-3 ${field}`} required />
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input name="brand" value={form.brand} onChange={updateForm} placeholder="Marka" className={field} />
              <input name="model" value={form.model} onChange={updateForm} placeholder="Model" className={field} />
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <select name="condition" value={form.condition} onChange={updateForm} className={field}><option value="used">İkinci el</option><option value="new">Sıfır / az kullanılmış</option></select>
              <input name="price" value={form.price} onChange={updateForm} placeholder="Tahmini değer (₺)" type="number" min="0" className={field} />
              <input name="city" value={form.city} onChange={updateForm} placeholder="Şehir" className={field} />
            </div>
            <textarea name="description" value={form.description} onChange={updateForm} placeholder="Ürünün durumu, kutu/aksesuar, kusurlar ve varsa üstüne vereceğin tutar... *" rows={4} className={`mt-3 ${field}`} required />
            <div className="mt-4 overflow-hidden rounded-2xl border border-bw-200 bg-gradient-to-br from-bw-50 via-white to-bw-100/70 p-1 shadow-[0_12px_30px_-24px_rgba(0,0,0,0.45)]">
              <label className="group flex cursor-pointer items-center gap-3 rounded-[0.9rem] border border-dashed border-bw-300 px-4 py-3.5 transition hover:border-bw-950 hover:bg-white">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bw-950 text-white shadow-lg shadow-bw-950/20 transition group-hover:scale-105">
                  <ImagePlus className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-bw-900">Takas ürününün fotoğrafları *</span>
                  <span className="mt-0.5 block text-xs text-bw-500">1–6 adet JPEG, PNG veya WebP ekleyebilirsin.</span>
                </span>
                <span className="rounded-lg border border-bw-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-bw-700 transition group-hover:border-bw-950 group-hover:text-bw-950">Fotoğraf seç</span>
                <input type="file" accept="image/jpeg,image/png,image/webp" multiple required onChange={(event) => setFiles(Array.from(event.target.files || []).slice(0, 6))} className="sr-only" />
              </label>
              {files.length ? <p className="mx-3 mb-3 mt-2 rounded-lg bg-bw-950 px-3 py-2 text-xs font-semibold text-white">{files.length} fotoğraf seçildi ✓</p> : null}
            </div>
            {status ? <p className="mt-3 rounded-xl bg-bw-100 px-3 py-2 text-sm text-bw-700">{status}</p> : null}
            <button type="submit" disabled={sending} className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-bw-950 px-4 text-sm font-semibold text-white hover:bg-bw-800 disabled:opacity-60">
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Repeat2 className="h-4 w-4" />}
              {sending ? "Gönderiliyor..." : "Takas teklifini gönder"}
            </button>
          </form>
        </div>
      ) : null}
      {status ? <p className="mt-1 text-xs text-bw-600">{status}</p> : null}
    </div>
  );
}
