"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import Link from "next/link";
import Image from "next/image";
import {
  Camera,
  Check,
  ChevronRight,
  ImagePlus,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
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

async function refreshVitrin() {
  try {
    await fetch("/api/revalidate", { method: "POST" });
  } catch {
    // vitrin yenileme isteği başarısız olsa da devam et
  }
}

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
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const photoCount = files.length + existingImages.length;
  const hasPhotos = photoCount > 0;
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
    if (!files.length) return { ok: true, uploaded: 0, errors: [] };

    const { data: existing } = await supabase
      .from("product_images")
      .select("sort_order")
      .eq("product_id", productId)
      .order("sort_order", { ascending: false })
      .limit(1);
    let order = existing?.[0]?.sort_order ?? -1;

    const errors = [];
    let uploaded = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const body = new FormData();
      body.append("file", file);
      body.append("productId", productId);

      const res = await fetch("/api/upload-product-image", {
        method: "POST",
        body,
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        errors.push(`${file.name}: ${data.error || res.statusText}`);
        continue;
      }

      uploaded += 1;
      order += 1;
    }

    return { ok: errors.length === 0, uploaded, errors };
  };

  const insertProduct = async (supabase, payload, uid) => {
    const full = {
      ...payload,
      status: "published",
      seller_id: uid,
      source: "admin",
    };
    let result = await supabase.from("products").insert([full]).select().single();
    if (result.error?.message?.includes("is_discount")) {
      const { is_discount, original_price, ...rest } = full;
      result = await supabase.from("products").insert([rest]).select().single();
    }
    return result;
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
      const uploadResult = await uploadImages(supabase, editId, userId);
      if (uploadResult.errors.length) {
        setError(uploadResult.errors.join(" "));
        setLoading(false);
        return;
      }
      await refreshVitrin();
      setLoading(false);
      router.push(`/urun/${editId}`);
      return;
    }

    const { data: product, error: insertError } = await insertProduct(supabase, payload, userId);

    if (insertError) {
      console.error(insertError);
      setError(insertError.message);
      setLoading(false);
      return;
    }

    const uploadResult = await uploadImages(supabase, product.id, userId);
    if (uploadResult.errors.length) {
      setError(uploadResult.errors.join(" "));
      setLoading(false);
      return;
    }
    await refreshVitrin();
    setLoading(false);
    router.push(`/urun/${product.id}`);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const field =
    "w-full rounded-xl border border-bw-200 bg-white px-4 py-3 text-sm text-bw-900 outline-none transition placeholder:text-bw-400 focus:border-bw-500 focus:ring-2 focus:ring-bw-950/5";
  const label = "mb-1.5 block text-xs font-semibold tracking-wide text-bw-600 uppercase";

  if (!ready) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-bw-50 px-4">
        <p className="text-sm text-bw-500">Kontrol ediliyor...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-bw-50 via-white to-bw-50 pb-32">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
        {/* Header */}
        <div className="text-center">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-bw-200 bg-white px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-bw-500 uppercase">
            <Sparkles className="h-3 w-3" />
            Yönetim
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-wide text-bw-950 sm:text-5xl">
            {isEdit ? "İlanı düzenle" : "Yeni ilan"}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-bw-500">
            {isEdit
              ? "Fotoğraf ve bilgileri güncelle, vitrin anında yenilensin."
              : "Önce görselleri ekle, ardından ürün detaylarını tamamla."}
          </p>
        </div>

        {/* Steps */}
        <div className="mt-10 flex items-center justify-center gap-3">
          {[
            { n: 1, t: "Fotoğraf", done: hasPhotos },
            { n: 2, t: "Bilgiler", done: Boolean(form.title && form.price) },
          ].map((step, i) => (
            <div key={step.n} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                    step.done
                      ? "bg-bw-950 text-white"
                      : "border border-bw-300 bg-white text-bw-500"
                  }`}
                >
                  {step.done ? <Check className="h-4 w-4" /> : step.n}
                </span>
                <span className="text-xs font-medium text-bw-600">{step.t}</span>
              </div>
              {i === 0 ? (
                <ChevronRight className="h-4 w-4 text-bw-300" />
              ) : null}
            </div>
          ))}
        </div>

        {/* Photos */}
        <section
          id="fotograf-alani"
          className={`mt-8 overflow-hidden rounded-[2rem] border bg-white shadow-[0_24px_60px_-40px_rgba(0,0,0,0.35)] transition ${
            needsPhoto ? "border-amber-200/80 ring-1 ring-amber-100" : "border-bw-200"
          }`}
        >
          <div className="border-b border-bw-100 px-6 py-5 sm:px-8">
            <h2 className="font-display text-xl font-semibold text-bw-950">Ürün görselleri</h2>
            <p className="mt-1 text-sm text-bw-500">
              En az 1 fotoğraf zorunlu. İlk görsel vitrinde kapak olur.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              className={`relative rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
                dragOver
                  ? "border-bw-950 bg-bw-50"
                  : needsPhoto
                    ? "border-bw-300 bg-bw-50/50"
                    : "border-bw-200 bg-white"
              }`}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-bw-950 text-white">
                <Upload className="h-6 w-6" />
              </div>
              <p className="mt-4 text-sm font-semibold text-bw-900">
                {hasPhotos ? `${photoCount} fotoğraf seçildi` : "Fotoğraf ekle"}
              </p>
              <p className="mt-1 text-xs text-bw-500">
                Sürükle bırak veya aşağıdaki seçenekleri kullan
              </p>

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

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-xl bg-bw-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-bw-800"
                >
                  <ImagePlus className="h-4 w-4" />
                  Galeriden seç
                </button>
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-xl border border-bw-300 bg-white px-5 py-2.5 text-sm font-semibold text-bw-900 transition hover:border-bw-950"
                >
                  <Camera className="h-4 w-4" />
                  Kamera
                </button>
              </div>
            </div>

            {(existingImages.length > 0 || previews.length > 0) && (
              <div className="mt-6">
                <p className="mb-3 text-xs font-semibold tracking-wide text-bw-500 uppercase">
                  Önizleme
                </p>
                <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
                  {existingImages.map((img) => (
                    <div
                      key={img.id}
                      className="relative h-28 w-28 shrink-0 snap-start overflow-hidden rounded-2xl border border-bw-200 bg-bw-100"
                    >
                      <ProductImage src={img.url} alt="" fill className="object-cover" sizes="112px" />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(img.id)}
                        className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-bw-950/75 text-white"
                        aria-label="Fotoğrafı sil"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {previews.map((preview, index) => (
                    <div
                      key={`${preview.name}-${index}`}
                      className="relative h-28 w-28 shrink-0 snap-start overflow-hidden rounded-2xl border border-bw-200 bg-bw-100"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={preview.url} alt="" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeNewFile(index)}
                        className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-bw-950/75 text-white"
                        aria-label="Kaldır"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="mt-6 space-y-6 rounded-[2rem] border border-bw-200 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.25)] sm:p-8"
        >
          <div>
            <h2 className="font-display text-xl font-semibold text-bw-950">Ürün bilgileri</h2>
            <p className="mt-1 text-sm text-bw-500">Vitrinde görünecek başlık ve açıklama</p>
          </div>

          <div>
            <label className={label} htmlFor="title">Başlık *</label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={onChange}
              placeholder="Örn. iPhone 15 Pro 256GB"
              required
              className={field}
            />
          </div>

          <div>
            <label className={label} htmlFor="description">Açıklama</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={onChange}
              rows={5}
              placeholder="Ürün durumu, aksesuarlar, garanti bilgisi..."
              className={field}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="price">Satış fiyatı *</label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={onChange}
                placeholder="0"
                required
                className={field}
              />
            </div>
            <div>
              <label className={label} htmlFor="category_id">Kategori</label>
              <select
                id="category_id"
                name="category_id"
                value={form.category_id}
                onChange={onChange}
                className={field}
              >
                <option value="">Seç</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={label} htmlFor="city">Şehir</label>
              <input id="city" name="city" value={form.city} onChange={onChange} className={field} />
            </div>
            <div>
              <label className={label} htmlFor="district">İlçe</label>
              <input id="district" name="district" value={form.district} onChange={onChange} className={field} />
            </div>
            <div>
              <label className={label} htmlFor="brand">Marka</label>
              <input id="brand" name="brand" value={form.brand} onChange={onChange} className={field} />
            </div>
            <div>
              <label className={label} htmlFor="model">Model</label>
              <input id="model" name="model" value={form.model} onChange={onChange} className={field} />
            </div>
            <div>
              <label className={label} htmlFor="condition">Durum</label>
              <select id="condition" name="condition" value={form.condition} onChange={onChange} className={field}>
                <option value="used">İkinci el</option>
                <option value="new">Sıfır</option>
              </select>
            </div>
            <div>
              <label className={label} htmlFor="whatsapp">WhatsApp</label>
              <input id="whatsapp" name="whatsapp" value={form.whatsapp} onChange={onChange} className={field} />
            </div>
          </div>

          <div className="rounded-2xl border border-bw-100 bg-bw-50/60 p-4">
            <p className="text-xs font-semibold tracking-wide text-bw-600 uppercase">Vitrin ayarları</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-bw-700">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="is_featured" checked={form.is_featured} onChange={onChange} />
                Öne çıkar
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="is_premium" checked={form.is_premium} onChange={onChange} />
                Premium
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="is_discount" checked={form.is_discount} onChange={onChange} />
                İndirimde
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="negotiable" checked={form.negotiable} onChange={onChange} />
                Pazarlık var
              </label>
            </div>
          </div>

          {form.is_discount ? (
            <div>
              <label className={label} htmlFor="original_price">Eski fiyat *</label>
              <input
                id="original_price"
                name="original_price"
                type="number"
                min="0"
                value={form.original_price}
                onChange={onChange}
                required
                className={field}
              />
            </div>
          ) : null}

          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading || needsPhoto}
            className="w-full rounded-2xl bg-bw-950 py-4 text-sm font-semibold text-white transition hover:bg-bw-800 disabled:cursor-not-allowed disabled:opacity-45"
          >
            {loading ? "Kaydediliyor..." : needsPhoto ? "Önce fotoğraf ekle" : isEdit ? "İlanı güncelle" : "Vitrine yayınla"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm">
          <Link href={isEdit ? "/admin?tab=products" : "/"} className="text-bw-500 hover:text-bw-950">
            {isEdit ? "← Yönetim paneli" : "← Ana sayfa"}
          </Link>
        </p>
      </div>

      {needsPhoto ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-bw-200/80 bg-white/95 p-4 backdrop-blur sm:hidden">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-bw-950 py-3.5 text-sm font-semibold text-white"
          >
            <ImagePlus className="h-4 w-4" />
            Galeriden fotoğraf seç
          </button>
        </div>
      ) : null}
    </main>
  );
}
