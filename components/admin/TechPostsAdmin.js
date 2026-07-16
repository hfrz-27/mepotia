"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Camera, ImagePlus, Sparkles, Trash2, Upload, X } from "lucide-react";
import ShareTechPostButtons from "@/components/ShareTechPostButtons";
import TechNewsSyncBox from "@/components/admin/TechNewsSyncBox";
import { createClient } from "@/lib/supabase";
import { absoluteUrl } from "@/lib/site";

const EMPTY = {
  title: "",
  excerpt: "",
  body: "",
  is_featured: false,
  published: true,
};

export default function TechPostsAdmin({ posts, onReload, sqlMissing }) {
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [existingCover, setExistingCover] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [shareId, setShareId] = useState(null);
  const [userId, setUserId] = useState(null);
  const fileRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data: { user } }) => setUserId(user?.id ?? null));
  }, []);

  useEffect(() => {
    return () => {
      if (coverPreview.startsWith("blob:")) URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const setCover = (file) => {
    if (!file?.type?.startsWith("image/")) return;
    if (coverPreview.startsWith("blob:")) URL.revokeObjectURL(coverPreview);
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const clearCover = () => {
    if (coverPreview.startsWith("blob:")) URL.revokeObjectURL(coverPreview);
    setCoverFile(null);
    setCoverPreview("");
    setExistingCover("");
  };

  const reset = () => {
    setForm(EMPTY);
    setEditId(null);
    clearCover();
  };

  const uploadCover = async (supabase, uid) => {
    if (!coverFile) return existingCover || null;
    const path = `tech/${uid}/${Date.now()}-${coverFile.name.replace(/[^\w.-]+/g, "_")}`;
    const { error } = await supabase.storage.from("product-images").upload(path, coverFile, {
      cacheControl: "31536000",
      upsert: false,
      contentType: coverFile.type || "image/jpeg",
    });
    if (error) throw error;
    const { data: pub } = supabase.storage.from("product-images").getPublicUrl(path);
    return pub.publicUrl;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setMsg("Başlık zorunlu.");
      return;
    }
    if (!coverFile && !existingCover) {
      setMsg("Kapak fotoğrafı ekle.");
      return;
    }

    setLoading(true);
    setMsg("");
    const supabase = createClient();

    try {
      const cover_url = await uploadCover(supabase, userId || "admin");
      const payload = {
        title: form.title.trim(),
        excerpt: form.excerpt.trim(),
        body: form.body.trim(),
        cover_url,
        source_url: null,
        is_featured: form.is_featured,
        published: form.published,
        updated_at: new Date().toISOString(),
      };

      if (form.is_featured) {
        const { error: clearError } = await supabase
          .from("tech_posts")
          .update({ is_featured: false })
          .eq("is_featured", true);
        if (clearError) throw clearError;
      }

      const { error } = editId
        ? await supabase.from("tech_posts").update(payload).eq("id", editId)
        : await supabase.from("tech_posts").insert([payload]);

      if (error) throw error;

      setMsg(editId ? "Güncellendi." : "Yayınlandı.");
      reset();
      onReload();
      try {
        await fetch("/api/revalidate", { method: "POST" });
      } catch {
        // ignore
      }
    } catch (err) {
      setMsg(err?.message || "Kaydedilemedi.");
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (post) => {
    setEditId(post.id);
    setForm({
      title: post.title || "",
      excerpt: post.excerpt || "",
      body: post.body || "",
      is_featured: Boolean(post.is_featured),
      published: post.published !== false,
    });
    setCoverFile(null);
    setExistingCover(post.cover_url || "");
    setCoverPreview(post.cover_url || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = async (id) => {
    if (!confirm("Silinsin mi?")) return;
    await createClient().from("tech_posts").delete().eq("id", id);
    if (editId === id) reset();
    onReload();
  };

  const field =
    "w-full rounded-xl border border-bw-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-bw-500 focus:ring-2 focus:ring-bw-950/5";
  const label = "mb-1.5 block text-[10px] font-semibold tracking-[0.18em] text-bw-500 uppercase";

  if (sqlMissing) {
    return (
      <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 px-5 py-5 text-sm text-amber-950">
        <p className="font-semibold">tech_posts tablosu yok</p>
        <p className="mt-2">
          Supabase SQL Editor&apos;da{" "}
          <code className="rounded bg-white px-1.5 py-0.5 text-xs">supabase/tech_posts.sql</code>{" "}
          çalıştır.
        </p>
      </div>
    );
  }

  const previewCover = coverPreview || existingCover;

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-[1.75rem] border border-amber-200/80 bg-gradient-to-r from-bw-950 via-bw-900 to-bw-950 p-5 shadow-[0_32px_80px_-48px_rgba(0,0,0,0.55)] sm:p-6">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-amber-200/90 uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            Haber kaynağı
          </p>
          <p className="mt-2 text-lg font-semibold text-white">Site linkinden haber çek</p>
          <p className="mt-1 text-sm text-bw-300">
            Normal site linki yapıştır — RSS gerekmez. Son 100 haber Mepotia markasıyla eklenir.
          </p>
        </div>
        <div className="mt-5">
          <TechNewsSyncBox variant="banner" onSynced={onReload} />
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="overflow-hidden rounded-[2rem] border border-bw-200 bg-gradient-to-b from-white to-bw-50 shadow-[0_32px_80px_-48px_rgba(0,0,0,0.45)]"
      >
        <div className="border-b border-bw-200 bg-bw-950 px-6 py-5 sm:px-8">
          <p className="inline-flex items-center gap-2 text-[10px] tracking-[0.22em] text-bw-400 uppercase">
            <Sparkles className="h-3 w-3 text-amber-300/80" />
            Teknoloji editörü
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-white">
            {editId ? "Yazıyı düzenle" : "Yeni paylaşım"}
          </h2>
          <p className="mt-1 text-sm text-bw-400">
            Fotoğraf yükle ve yayınla. Her haber 7 gün sonra otomatik silinir.
          </p>
        </div>

        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
          {/* Kapak fotoğrafı */}
          <div>
            <p className={label}>Kapak fotoğrafı *</p>
            <div className="relative overflow-hidden rounded-2xl border border-bw-200 bg-bw-100">
              {previewCover ? (
                <div className="relative aspect-[16/10]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewCover} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={clearCover}
                    className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-bw-950/80 text-white"
                    aria-label="Fotoğrafı kaldır"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 bg-bw-50 px-4 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-bw-950 text-white">
                    <Upload className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-semibold text-bw-800">Kapak fotoğrafı ekle</p>
                  <p className="text-xs text-bw-500">Galeriden seç veya kamera ile çek</p>
                </div>
              )}
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => {
                setCover(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
            <input
              ref={cameraRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="sr-only"
              onChange={(e) => {
                setCover(e.target.files?.[0]);
                e.target.value = "";
              }}
            />

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-bw-950 py-2.5 text-sm font-semibold text-white hover:bg-bw-800"
              >
                <ImagePlus className="h-4 w-4" />
                Galeri
              </button>
              <button
                type="button"
                onClick={() => cameraRef.current?.click()}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-bw-300 bg-white py-2.5 text-sm font-semibold text-bw-900 hover:border-bw-950"
              >
                <Camera className="h-4 w-4" />
                Kamera
              </button>
            </div>
          </div>

          {/* Metin alanları */}
          <div className="space-y-4">
            <div>
              <label className={label} htmlFor="tech-title">Başlık</label>
              <input id="tech-title" name="title" value={form.title} onChange={onChange} required className={field} placeholder="Örn. iPhone 17 özellikleri sızdı" />
            </div>
            <div>
              <label className={label} htmlFor="tech-excerpt">Kısa özet</label>
              <input id="tech-excerpt" name="excerpt" value={form.excerpt} onChange={onChange} className={field} placeholder="Ana sayfada görünecek 1-2 cümle" />
            </div>
            <div>
              <label className={label} htmlFor="tech-body">İçerik</label>
              <textarea id="tech-body" name="body" value={form.body} onChange={onChange} rows={7} className={field} placeholder="Haberin tam metni..." />
            </div>
            <label className="flex items-center gap-2 text-sm text-bw-700">
              <input type="checkbox" name="published" checked={form.published} onChange={onChange} />
              Ana sayfada yayınla
            </label>
            <label className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm font-semibold text-amber-950">
              <input type="checkbox" name="is_featured" checked={form.is_featured} onChange={onChange} />
              Haber sayfasında büyük öne çıkan haber yap
            </label>
          </div>
        </div>

        {msg ? (
          <p className="mx-6 mb-0 rounded-xl bg-bw-100 px-4 py-2.5 text-sm text-bw-700 sm:mx-8">{msg}</p>
        ) : null}

        <div className="flex flex-wrap gap-3 border-t border-bw-200 px-6 py-5 sm:px-8">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-bw-950 px-6 py-3 text-sm font-semibold text-white hover:bg-bw-800 disabled:opacity-50"
          >
            {loading ? "Yayınlanıyor..." : editId ? "Güncelle" : "Yayınla"}
          </button>
          {editId ? (
            <button type="button" onClick={reset} className="rounded-xl border border-bw-300 px-6 py-3 text-sm font-semibold text-bw-700">
              İptal
            </button>
          ) : null}
        </div>
      </form>

      {/* Liste */}
      <div className="space-y-4">
        <h3 className="font-display text-xl font-semibold text-bw-950">Yayınlanan yazılar</h3>
        {!posts.length ? (
          <p className="rounded-2xl border border-dashed border-bw-300 bg-white px-6 py-12 text-center text-sm text-bw-500">
            Henüz teknoloji yazısı yok.
          </p>
        ) : (
          posts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-2xl border border-bw-200 bg-white shadow-sm"
            >
              <div className="flex gap-4 p-4">
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-bw-100">
                {post.cover_url ? (
                  <Image src={post.cover_url} alt="" fill className="object-cover" sizes="112px" unoptimized />
                ) : (
                  <div className="flex h-full items-center justify-center bg-bw-950 text-[10px] text-bw-500">Yok</div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold tracking-wide text-bw-400 uppercase">
                  {post.is_featured ? "Öne çıkan büyük haber · " : ""}{post.published ? "Yayında" : "Taslak"} ·{" "}
                  {post.created_at ? new Date(post.created_at).toLocaleDateString("tr-TR") : ""}
                </p>
                <h4 className="mt-0.5 truncate font-semibold text-bw-950">{post.title}</h4>
                {post.excerpt ? <p className="mt-1 line-clamp-2 text-sm text-bw-500">{post.excerpt}</p> : null}
                <div className="mt-2 flex flex-wrap gap-2">
                  <button type="button" onClick={() => onEdit(post)} className="text-xs font-semibold text-bw-800 underline">
                    Düzenle
                  </button>
                  {!post.is_featured ? (
                    <button
                      type="button"
                      onClick={async () => {
                        const supabase = createClient();
                        await supabase.from("tech_posts").update({ is_featured: false }).eq("is_featured", true);
                        await supabase.from("tech_posts").update({ is_featured: true }).eq("id", post.id);
                        onReload();
                      }}
                      className="text-xs font-semibold text-amber-700 underline"
                    >
                      Büyük haber yap
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setShareId(shareId === post.id ? null : post.id)}
                    className="text-xs font-semibold text-bw-800 underline"
                  >
                    {shareId === post.id ? "Reklamı kapat" : "Hikaye reklamı"}
                  </button>
                  <button type="button" onClick={() => onDelete(post.id)} className="inline-flex items-center gap-1 text-xs text-red-600">
                    <Trash2 className="h-3 w-3" />
                    Sil
                  </button>
                </div>
              </div>
              </div>
              {shareId === post.id ? (
                <div className="border-t border-bw-200 bg-bw-950 p-4 sm:p-6">
                  <ShareTechPostButtons
                    storyMode
                    title={post.title}
                    excerpt={post.excerpt || ""}
                    url={absoluteUrl(`/teknoloji/${post.id}`)}
                    imageUrl={post.cover_url || ""}
                  />
                </div>
              ) : null}
            </article>
          ))
        )}
      </div>
    </div>
  );
}
