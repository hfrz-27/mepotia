"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Camera, ImagePlus, X } from "lucide-react";
import { createClient } from "@/lib/supabase";

const INITIAL = {
  title: "",
  description: "",
  price: "",
  original_price: "",
  category_id: "",
  city: "",
  district: "",
  brand: "",
  model: "",
  condition: "used",
  phone: "",
  whatsapp: "",
  is_premium: false,
  is_featured: false,
  is_discount: false,
  negotiable: true,
};

export default function IlanVerClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("duzenle");
  const isEdit = Boolean(editId);

  const [form, setForm] = useState(INITIAL);
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const hasPhotos =
    files.length > 0 || (isEdit && existingImages.length > 0);
  const needsPhoto = !hasPhotos;

  useEffect(() => {
    const supabase = createClient();
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.replace(`/giris?next=/ilan-ver${isEdit ? `?duzenle=${editId}` : ""}`);
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      if (profile?.role !== "admin") {
        router.replace("/");
        return;
      }
      setUserId(user.id);
      const { data: cats } = await supabase.from("categories").select("*").order("sort_order");
      setCategories(cats || []);

      if (isEdit) {
        const { data: product, error: loadErr } = await supabase
          .from("products")
          .select("*")
          .eq("id", editId)
          .single();
        if (loadErr || !product) {
          setError("Ürün bulunamadı.");
          setReady(true);
          return;
        }
        setForm({
          title: product.title || "",
          description: product.description || "",
          price: product.price != null ? String(product.price) : "",
          original_price:
            product.original_price != null ? String(product.original_price) : "",
          category_id: product.category_id || "",
          city: product.city || "",
          district: product.district || "",
          brand: product.brand || "",
          model: product.model || "",
          condition: product.condition || "used",
          phone: product.phone || "",
          whatsapp: product.whatsapp || "",
          is_premium: Boolean(product.is_premium),
          is_featured: Boolean(product.is_featured),
          is_discount: Boolean(product.is_discount),
          negotiable: product.negotiable !== false,
        });

        const { data: imgs } = await supabase
          .from("product_images")
          .select("id, url, sort_order")
          .eq("product_id", editId)
          .order("sort_order");
        setExistingImages(imgs || []);
      }

      setReady(true);
    })();
  }, [router, editId, isEdit]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const addFiles = (incoming) => {
    const list = Array.from(incoming || []).filter((f) => f.type.startsWith("image/"));
    if (!list.length) return;
    setFiles((prev) => [...prev, ...list]);
    list.forEach((file) => {
      const url = URL.createObjectURL(file);
      setPreviews((prev) => [...prev, { url, name: file.name }]);
    });
  };

  const removeNewFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      const next = [...prev];
      const [removed] = next.splice(index, 1);
      if (removed?.url) URL.revokeObjectURL(removed.url);
      return next;
    });
  };

  const removeExistingImage = async (imageId) => {
    const supabase = createClient();
    await supabase.from("product_images").delete().eq("id", imageId);
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const uploadImages = async (supabase, productId, uid) => {
    if (!files.length) return;
    const { data: existing } = await supabase
      .from("product_images")
      .select("sort_order")
      .eq("product_id", productId)
      .order("sort_order", { ascending: false })
      .limit(1);
    let order = existing?.[0]?.sort_order ?? -1;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const path = `${uid}/${productId}/${Date.now()}-${file.name}`;
      const { error: upErr } = await supabase.storage.from("product-images").upload(path, file);
      if (upErr) {
        console.error(upErr);
        continue;
      }
      order += 1;
      const { data: pub } = supabase.storage.from("product-images").getPublicUrl(path);
      await supabase.from("product_images").insert({
        product_id: productId,
        url: pub.publicUrl,
        sort_order: order,
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title.trim() || !form.price) {
      setError("Başlık ve fiyat zorunlu.");
      return;
    }
    if (!isEdit && files.length === 0) {
      setError("En az bir ürün fotoğrafı ekle.");
      return;
    }
    if (isEdit && files.length === 0 && existingImages.length === 0) {
      setError("En az bir ürün fotoğrafı kalmalı.");
      return;
    }
    if (form.is_discount) {
      const original = Number(form.original_price);
      const price = Number(form.price);
      if (Number.isNaN(original) || original <= price) {
        setError("İndirim için eski fiyat, satış fiyatından büyük olmalı.");
        return;
      }
    }

    setLoading(true);
    const supabase = createClient();
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      condition: form.condition,
      brand: form.brand || null,
      model: form.model || null,
      city: form.city || null,
      district: form.district || null,
      negotiable: form.negotiable,
      category_id: form.category_id || null,
      phone: form.phone || null,
      whatsapp: form.whatsapp || form.phone || null,
      is_premium: form.is_premium,
      is_featured: form.is_featured,
      is_discount: form.is_discount,
      original_price: form.is_discount ? Number(form.original_price) : null,
      updated_at: new Date().toISOString(),
    };

    if (isEdit) {
      const { error: updateError } = await supabase
        .from("products")
        .update(payload)
        .eq("id", editId);
      if (updateError) {
        console.error(updateError);
        setError(updateError.message);
        setLoading(false);
        return;
      }
      await uploadImages(supabase, editId, userId);
      setLoading(false);
      router.push(`/urun/${editId}`);
      return;
    }

    const { data: product, error: insertError } = await supabase
      .from("products")
      .insert([
        {
          ...payload,
          status: "published",
          seller_id: userId,
          source: "admin",
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.error(insertError);
      setError(insertError.message);
      setLoading(false);
      return;
    }

    await uploadImages(supabase, product.id, userId);
    setLoading(false);
    router.push(`/urun/${product.id}`);
  };

  const field =
    "w-full rounded-2xl border border-bw-200 bg-white px-3.5 py-3 text-sm outline-none focus:border-bw-500";

  if (!ready) {
    return <main className="mx-auto max-w-2xl px-4 py-20 text-center text-bw-500">Kontrol ediliyor...</main>;
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 pb-28 sm:px-6 lg:px-8">
      <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Sadece sen</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-wide text-bw-950">
        {isEdit ? "İlanı düzenle" : "Yeni ilan paylaş"}
      </h1>
      <p className="mt-2 text-sm text-bw-500">
        {isEdit
          ? "Başlık, fiyat, fotoğraf ve açıklamayı buradan güncelle."
          : "Önce fotoğraf ekle, sonra bilgileri yaz."}
      </p>

      {/* ADIM 1 — Fotoğraf (formun DIŞINDA, en üstte) */}
      <section
        id="fotograf-alani"
        className={`mt-8 rounded-[2rem] border-4 p-5 shadow-lg transition sm:p-7 ${
          needsPhoto
            ? "border-bw-950 bg-bw-950 text-white ring-4 ring-bw-950/20"
            : "border-bw-200 bg-white"
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold ${
                needsPhoto ? "bg-white text-bw-950" : "bg-bw-950 text-white"
              }`}
            >
              1
            </span>
            <div>
              <p
                className={`text-xs font-semibold tracking-[0.2em] uppercase ${
                  needsPhoto ? "text-bw-300" : "text-bw-500"
                }`}
              >
                Adım 1 — Zorunlu
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">
                Ürün fotoğrafı ekle
              </h2>
              <p className={`mt-2 text-sm ${needsPhoto ? "text-bw-200" : "text-bw-500"}`}>
                Fotoğrafsız ilan yayınlanmaz. Galeriden seç veya kameradan çek.
              </p>
            </div>
          </div>
          <Camera className={`h-8 w-8 shrink-0 ${needsPhoto ? "text-white/70" : "text-bw-400"}`} />
        </div>

        {needsPhoto ? (
          <p className="mt-4 rounded-2xl bg-white/10 px-4 py-3 text-center text-sm font-semibold">
            Henüz fotoğraf yok — aşağıdaki büyük butona bas
          </p>
        ) : (
          <p
            className={`mt-4 rounded-2xl px-4 py-3 text-center text-sm font-semibold ${
              needsPhoto ? "" : "bg-bw-50 text-bw-800"
            }`}
          >
            {files.length + existingImages.length} fotoğraf hazır
          </p>
        )}

        {existingImages.length ? (
          <div className="mt-5">
            <p className={`mb-2 text-xs font-semibold ${needsPhoto ? "text-bw-200" : "text-bw-600"}`}>
              Mevcut fotoğraflar
            </p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {existingImages.map((img) => (
                <div
                  key={img.id}
                  className="relative aspect-square overflow-hidden rounded-xl border border-bw-200 bg-white"
                >
                  <Image src={img.url} alt="" fill className="object-cover" sizes="120px" />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(img.id)}
                    className="absolute top-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-bw-950/80 text-white"
                    aria-label="Fotoğrafı sil"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`flex min-h-[100px] flex-col items-center justify-center gap-2 rounded-2xl border-2 px-4 py-6 text-center transition ${
              needsPhoto
                ? "border-white bg-white text-bw-950 hover:bg-bw-100"
                : "border-bw-300 bg-bw-50 text-bw-950 hover:border-bw-950"
            }`}
          >
            <ImagePlus className="h-10 w-10" />
            <span className="text-base font-bold">Galeriden seç</span>
            <span className="text-xs opacity-70">Telefon galerisi</span>
          </button>
          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className={`flex min-h-[100px] flex-col items-center justify-center gap-2 rounded-2xl border-2 px-4 py-6 text-center transition ${
              needsPhoto
                ? "border-white/40 bg-white/10 text-white hover:bg-white/20"
                : "border-bw-300 bg-white text-bw-950 hover:border-bw-950"
            }`}
          >
            <Camera className="h-10 w-10" />
            <span className="text-base font-bold">Kamera ile çek</span>
            <span className={`text-xs ${needsPhoto ? "text-bw-200" : "opacity-70"}`}>
              Anında fotoğraf
            </span>
          </button>
        </div>

        {previews.length ? (
          <div className="mt-4">
            <p className={`mb-2 text-xs font-semibold ${needsPhoto ? "text-bw-200" : "text-bw-600"}`}>
              Yeni eklenecek ({previews.length})
            </p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {previews.map((preview, index) => (
                <div
                  key={`${preview.name}-${index}`}
                  className="relative aspect-square overflow-hidden rounded-xl border border-bw-200 bg-white"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview.url} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeNewFile(index)}
                    className="absolute top-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-bw-950/80 text-white"
                    aria-label="Kaldır"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {/* ADIM 2 — Bilgiler */}
      <p className="mt-8 text-xs font-semibold tracking-[0.2em] text-bw-500 uppercase">
        Adım 2 — Ürün bilgileri
      </p>

      <form onSubmit={onSubmit} className="mt-3 space-y-5 rounded-[2rem] border border-bw-200 bg-white p-6 shadow-sm sm:p-8">
        <input name="title" value={form.title} onChange={onChange} placeholder="Başlık *" required className={field} />
        <textarea name="description" value={form.description} onChange={onChange} rows={5} placeholder="Açıklama" className={field} />
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="price" type="number" min="0" value={form.price} onChange={onChange} placeholder="Satış fiyatı *" required className={field} />
          <select name="category_id" value={form.category_id} onChange={onChange} className={field}>
            <option value="">Kategori</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <input name="city" value={form.city} onChange={onChange} placeholder="Şehir" className={field} />
          <input name="district" value={form.district} onChange={onChange} placeholder="İlçe" className={field} />
          <input name="brand" value={form.brand} onChange={onChange} placeholder="Marka" className={field} />
          <input name="model" value={form.model} onChange={onChange} placeholder="Model" className={field} />
          <select name="condition" value={form.condition} onChange={onChange} className={field}>
            <option value="used">İkinci El</option>
            <option value="new">Sıfır</option>
          </select>
          <input name="whatsapp" value={form.whatsapp} onChange={onChange} placeholder="WhatsApp" className={field} />
          <input name="phone" value={form.phone} onChange={onChange} placeholder="Telefon" className={field} />
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-bw-700">
          <label className="flex items-center gap-2"><input type="checkbox" name="is_featured" checked={form.is_featured} onChange={onChange} />Öne çıkar</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="is_premium" checked={form.is_premium} onChange={onChange} />Premium</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="is_discount" checked={form.is_discount} onChange={onChange} />İndirimde</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="negotiable" checked={form.negotiable} onChange={onChange} />Pazarlık var</label>
        </div>
        {form.is_discount ? (
          <input
            name="original_price"
            type="number"
            min="0"
            value={form.original_price}
            onChange={onChange}
            placeholder="Eski fiyat (indirim öncesi) *"
            required
            className={field}
          />
        ) : null}
        {error ? <p className="rounded-2xl bg-bw-100 px-3 py-2 text-sm text-bw-700">{error}</p> : null}
        <button
          type="submit"
          disabled={loading || needsPhoto}
          className="w-full rounded-2xl bg-bw-950 py-4 text-base font-semibold text-white hover:bg-bw-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Kaydediliyor..." : needsPhoto ? "Önce fotoğraf ekle" : isEdit ? "İlanı güncelle" : "Vitrine koy"}
        </button>
      </form>

      {needsPhoto ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-bw-200 bg-white p-4 shadow-[0_-12px_40px_rgba(0,0,0,0.12)] sm:hidden">
          <button
            type="button"
            onClick={() => {
              document.getElementById("fotograf-alani")?.scrollIntoView({ behavior: "smooth" });
              setTimeout(() => fileInputRef.current?.click(), 400);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-bw-950 py-4 text-sm font-bold text-white"
          >
            <ImagePlus className="h-5 w-5" />
            Galeriden fotoğraf seç
          </button>
        </div>
      ) : null}
      <p className="mt-6 text-center text-sm">
        <Link href={isEdit ? "/admin" : "/"} className="text-bw-500 hover:text-bw-950">
          {isEdit ? "Yönetim paneli" : "Ana sayfa"}
        </Link>
      </p>
    </main>
  );
}
