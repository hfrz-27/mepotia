"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);

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
      }

      setReady(true);
    })();
  }, [router, editId, isEdit]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
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
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Sadece sen</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-wide text-bw-950">
        {isEdit ? "Ürünü Düzenle" : "Paylaş"}
      </h1>
      <p className="mt-2 text-sm text-bw-500">
        {isEdit ? "Değişiklikler kaydedilince vitrinde güncellenir." : "Ürün anında vitrine düşer."}
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-[2rem] border border-bw-200 bg-white p-6 shadow-sm sm:p-8">
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
        <div>
          <label className="mb-1 block text-sm text-bw-600">
            {isEdit ? "Yeni fotoğraf ekle (isteğe bağlı)" : "Fotoğraflar"}
          </label>
          <input type="file" accept="image/*" multiple onChange={(e) => setFiles(Array.from(e.target.files || []))} className="block w-full text-sm" />
        </div>
        {error ? <p className="rounded-2xl bg-bw-100 px-3 py-2 text-sm text-bw-700">{error}</p> : null}
        <button type="submit" disabled={loading} className="w-full rounded-2xl bg-bw-950 py-3.5 text-sm font-semibold text-white hover:bg-bw-800 disabled:opacity-60">
          {loading ? "Kaydediliyor..." : isEdit ? "Güncelle" : "Vitrine koy"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm">
        <Link href={isEdit ? "/admin" : "/"} className="text-bw-500 hover:text-bw-950">
          {isEdit ? "Yönetim paneli" : "Ana sayfa"}
        </Link>
      </p>
    </main>
  );
}
