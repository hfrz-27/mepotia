"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function AdminPage() {
  const [stats, setStats] = useState({ products: 0, featured: 0, views: 0 });
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");

  const load = async () => {
    const supabase = createClient();
    const { data: all } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    const rows = all || [];
    setProducts(rows);
    setStats({
      products: rows.length,
      featured: rows.filter((p) => p.is_featured).length,
      views: rows.reduce((s, p) => s + (p.views || 0), 0),
    });
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = async (id, field, value) => {
    await createClient().from("products").update({ [field]: value }).eq("id", id);
    setMsg("Güncellendi.");
    load();
  };

  const remove = async (id) => {
    if (!confirm("Silinsin mi?")) return;
    await createClient().from("products").delete().eq("id", id);
    load();
  };

  const setStatus = async (id, status) => {
    await createClient().from("products").update({ status }).eq("id", id);
    load();
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Yönetim</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-wide text-bw-950">Stüdyo</h1>
        </div>
        <Link href="/ilan-ver" className="rounded-2xl bg-bw-950 px-5 py-3 text-sm font-semibold text-white hover:bg-bw-800">
          Yeni paylaşım
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3">
        {[
          ["Ürün", stats.products],
          ["Öne çıkan", stats.featured],
          ["Görüntülenme", stats.views],
        ].map(([label, value]) => (
          <div key={label} className="rounded-3xl border border-bw-200 bg-white p-5 shadow-sm">
            <p className="text-3xl font-semibold text-bw-950">{value}</p>
            <p className="mt-1 text-xs text-bw-500">{label}</p>
          </div>
        ))}
      </div>

      {msg ? <p className="mt-4 text-sm text-bw-500">{msg}</p> : null}

      <div className="mt-8 overflow-x-auto rounded-3xl border border-bw-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-bw-100 text-bw-500">
            <tr>
              <th className="px-4 py-3 font-medium">Başlık</th>
              <th className="px-4 py-3 font-medium">Durum</th>
              <th className="px-4 py-3 font-medium">Öne çıkan</th>
              <th className="px-4 py-3 font-medium">Premium</th>
              <th className="px-4 py-3 font-medium">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-bw-50">
                <td className="px-4 py-3">
                  <Link href={`/urun/${p.id}`} className="font-medium text-bw-950 hover:underline">{p.title}</Link>
                </td>
                <td className="px-4 py-3 text-bw-500">{p.status}</td>
                <td className="px-4 py-3">
                  <button type="button" className="underline" onClick={() => toggle(p.id, "is_featured", !p.is_featured)}>
                    {p.is_featured ? "Evet" : "Hayır"}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button type="button" className="underline" onClick={() => toggle(p.id, "is_premium", !p.is_premium)}>
                    {p.is_premium ? "Evet" : "Hayır"}
                  </button>
                </td>
                <td className="space-x-3 px-4 py-3">
                  {p.status !== "published" ? (
                    <button type="button" onClick={() => setStatus(p.id, "published")} className="underline">Yayınla</button>
                  ) : (
                    <button type="button" onClick={() => setStatus(p.id, "removed")} className="underline">Kaldır</button>
                  )}
                  <button type="button" onClick={() => remove(p.id)} className="text-bw-400 underline">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
