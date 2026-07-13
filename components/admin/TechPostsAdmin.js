"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";

const EMPTY = {
  title: "",
  excerpt: "",
  body: "",
  cover_url: "",
  source_url: "",
  published: true,
};

export default function TechPostsAdmin({ posts, onReload, sqlMissing }) {
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const reset = () => {
    setForm(EMPTY);
    setEditId(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setMsg("Başlık zorunlu.");
      return;
    }
    setLoading(true);
    setMsg("");
    const supabase = createClient();
    const payload = {
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      body: form.body.trim(),
      cover_url: form.cover_url.trim() || null,
      source_url: form.source_url.trim() || null,
      published: form.published,
      updated_at: new Date().toISOString(),
    };

    const { error } = editId
      ? await supabase.from("tech_posts").update(payload).eq("id", editId)
      : await supabase.from("tech_posts").insert([payload]);

    setLoading(false);
    if (error) {
      setMsg(error.message);
      return;
    }
    setMsg(editId ? "Güncellendi." : "Yayınlandı.");
    reset();
    onReload();
    try {
      await fetch("/api/revalidate", { method: "POST" });
    } catch {
      // ignore
    }
  };

  const onEdit = (post) => {
    setEditId(post.id);
    setForm({
      title: post.title || "",
      excerpt: post.excerpt || "",
      body: post.body || "",
      cover_url: post.cover_url || "",
      source_url: post.source_url || "",
      published: post.published !== false,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = async (id) => {
    if (!confirm("Silinsin mi?")) return;
    await createClient().from("tech_posts").delete().eq("id", id);
    if (editId === id) reset();
    onReload();
  };

  const field =
    "w-full rounded-xl border border-bw-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-bw-500";

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

  return (
    <div className="mt-6 space-y-6">
      <form onSubmit={onSubmit} className="rounded-3xl border border-bw-200 bg-white p-6 shadow-sm">
        <h2 className="font-display text-xl font-semibold text-bw-950">
          {editId ? "Yazıyı düzenle" : "Yeni teknoloji yazısı"}
        </h2>
        <p className="mt-1 text-sm text-bw-500">Ana sayfadaki teknoloji köşesine düşer.</p>

        <div className="mt-5 space-y-4">
          <input name="title" value={form.title} onChange={onChange} placeholder="Başlık *" required className={field} />
          <input name="excerpt" value={form.excerpt} onChange={onChange} placeholder="Kısa özet (vitrinde görünür)" className={field} />
          <textarea name="body" value={form.body} onChange={onChange} rows={8} placeholder="Tam içerik..." className={field} />
          <input name="cover_url" value={form.cover_url} onChange={onChange} placeholder="Kapak görseli URL (opsiyonel)" className={field} />
          <input name="source_url" value={form.source_url} onChange={onChange} placeholder="Kaynak linki (opsiyonel)" className={field} />
          <label className="flex items-center gap-2 text-sm text-bw-700">
            <input type="checkbox" name="published" checked={form.published} onChange={onChange} />
            Yayında
          </label>
        </div>

        {msg ? <p className="mt-4 text-sm text-bw-600">{msg}</p> : null}

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-bw-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-bw-800 disabled:opacity-50"
          >
            {loading ? "Kaydediliyor..." : editId ? "Güncelle" : "Yayınla"}
          </button>
          {editId ? (
            <button type="button" onClick={reset} className="rounded-xl border border-bw-200 px-5 py-2.5 text-sm font-semibold text-bw-700">
              İptal
            </button>
          ) : null}
        </div>
      </form>

      <div className="space-y-3">
        {!posts.length ? (
          <p className="rounded-2xl border border-dashed border-bw-300 bg-white px-6 py-12 text-center text-sm text-bw-500">
            Henüz teknoloji yazısı yok.
          </p>
        ) : (
          posts.map((post) => (
            <article key={post.id} className="rounded-2xl border border-bw-200 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-bw-400">
                    {post.published ? "Yayında" : "Taslak"} ·{" "}
                    {post.created_at ? new Date(post.created_at).toLocaleString("tr-TR") : ""}
                  </p>
                  <h3 className="mt-1 font-semibold text-bw-950">{post.title}</h3>
                  {post.excerpt ? <p className="mt-1 line-clamp-2 text-sm text-bw-500">{post.excerpt}</p> : null}
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => onEdit(post)} className="rounded-lg border border-bw-200 px-3 py-1.5 text-xs font-semibold text-bw-800">
                    Düzenle
                  </button>
                  <button type="button" onClick={() => onDelete(post.id)} className="rounded-lg px-3 py-1.5 text-xs text-bw-400 underline">
                    Sil
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
