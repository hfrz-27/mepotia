"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase";

export default function AdminPage() {
  const [stats, setStats] = useState({ products: 0, featured: 0, views: 0, offers: 0 });
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [msg, setMsg] = useState("");
  const [tab, setTab] = useState("offers");
  const [offersReady, setOffersReady] = useState(true);

  const load = async () => {
    const supabase = createClient();
    const { data: all } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    const rows = all || [];
    setProducts(rows);

    const { data: offerRows, error: offerErr } = await supabase
      .from("sell_offers")
      .select("*")
      .order("created_at", { ascending: false });
    if (offerErr) {
      setOffersReady(false);
      setOffers([]);
    } else {
      setOffersReady(true);
    }
    const offersList = offerRows || [];
    setOffers(offersList);

    setStats({
      products: rows.length,
      featured: rows.filter((p) => p.is_featured).length,
      views: rows.reduce((s, p) => s + (p.views || 0), 0),
      offers: offersList.filter((o) => o.status === "new").length,
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

  const setOfferStatus = async (id, status) => {
    await createClient().from("sell_offers").update({ status }).eq("id", id);
    setMsg("Teklif güncellendi.");
    load();
  };

  const removeOffer = async (id) => {
    if (!confirm("Teklif silinsin mi?")) return;
    await createClient().from("sell_offers").delete().eq("id", id);
    load();
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Yönetim</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-wide text-bw-950">
            Stüdyo
          </h1>
        </div>
        <Link
          href="/ilan-ver"
          className="rounded-2xl bg-bw-950 px-5 py-3 text-sm font-semibold text-white hover:bg-bw-800"
        >
          Yeni paylaşım
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["Yeni teklif", stats.offers],
          ["Ürün", stats.products],
          ["Öne çıkan", stats.featured],
          ["Görüntülenme", stats.views],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-3xl border border-bw-200 bg-white p-5 shadow-sm"
          >
            <p className="text-3xl font-semibold text-bw-950">{value}</p>
            <p className="mt-1 text-xs text-bw-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-2">
        <button
          type="button"
          onClick={() => setTab("offers")}
          className={`rounded-xl px-4 py-2 text-sm font-semibold ${
            tab === "offers"
              ? "bg-bw-950 text-white"
              : "border border-bw-200 text-bw-600"
          }`}
        >
          Satış teklifleri ({offers.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("products")}
          className={`rounded-xl px-4 py-2 text-sm font-semibold ${
            tab === "products"
              ? "bg-bw-950 text-white"
              : "border border-bw-200 text-bw-600"
          }`}
        >
          Vitrin ürünleri
        </button>
      </div>

      {msg ? <p className="mt-4 text-sm text-bw-500">{msg}</p> : null}

      {tab === "offers" ? (
        <div className="mt-6 space-y-4">
          {!offersReady ? (
            <div className="rounded-3xl border border-bw-300 bg-bw-50 px-5 py-5 text-sm leading-relaxed text-bw-700">
              <p className="font-semibold text-bw-950">
                sell_offers tablosu henüz yok
              </p>
              <p className="mt-2">
                Supabase Dashboard → SQL Editor →{" "}
                <code className="rounded bg-white px-1.5 py-0.5 text-xs">
                  supabase/sell_offers.sql
                </code>{" "}
                dosyasının tamamını yapıştır → Run. Sonra bu sayfayı yenile.
              </p>
            </div>
          ) : null}
          {offersReady && !offers.length ? (
            <div className="rounded-3xl border border-dashed border-bw-300 bg-white px-6 py-16 text-center text-sm text-bw-500">
              Henüz satış teklifi yok. Müşteriler /bana-sat formundan gönderince
              burada görünür.
            </div>
          ) : null}
          {offers.length ? (
            offers.map((o) => (
              <article
                key={o.id}
                className="rounded-3xl border border-bw-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs tracking-wide text-bw-400 uppercase">
                      {o.status === "new" ? "Yeni" : o.status}
                    </p>
                    <h2 className="mt-1 font-display text-xl font-semibold text-bw-950">
                      {o.title}
                    </h2>
                    <p className="mt-1 text-sm text-bw-500">
                      {o.contact_name} · {o.phone}
                      {o.city ? ` · ${o.city}` : ""}
                      {o.price != null ? ` · ${Number(o.price).toLocaleString("tr-TR")} ₺` : ""}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`https://wa.me/${String(o.phone).replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-bw-200 px-3 py-2 text-xs font-semibold text-bw-800"
                    >
                      WhatsApp
                    </a>
                    {o.status !== "accepted" ? (
                      <button
                        type="button"
                        onClick={() => setOfferStatus(o.id, "accepted")}
                        className="rounded-xl bg-bw-950 px-3 py-2 text-xs font-semibold text-white"
                      >
                        Kabul
                      </button>
                    ) : null}
                    {o.status !== "rejected" ? (
                      <button
                        type="button"
                        onClick={() => setOfferStatus(o.id, "rejected")}
                        className="rounded-xl border border-bw-200 px-3 py-2 text-xs font-semibold text-bw-600"
                      >
                        Reddet
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => removeOffer(o.id)}
                      className="rounded-xl px-3 py-2 text-xs text-bw-400 underline"
                    >
                      Sil
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-sm text-bw-600">
                  {[o.brand, o.model].filter(Boolean).join(" · ") || "Marka/model yok"}
                  {" · "}
                  {o.condition === "new" ? "Sıfır / az kullanılmış" : "İkinci el"}
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-bw-500">
                  {o.description}
                </p>
                {Array.isArray(o.image_urls) && o.image_urls.length ? (
                  <div className="mt-4 flex gap-2 overflow-x-auto">
                    {o.image_urls.map((url) => (
                      <a
                        key={url}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-bw-200"
                      >
                        <Image
                          src={url}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </a>
                    ))}
                  </div>
                ) : null}
                <p className="mt-3 text-xs text-bw-400">
                  {o.created_at
                    ? new Date(o.created_at).toLocaleString("tr-TR")
                    : ""}
                </p>
              </article>
            ))
          ) : null}
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-3xl border border-bw-200 bg-white shadow-sm">
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
                    <Link
                      href={`/urun/${p.id}`}
                      className="font-medium text-bw-950 hover:underline"
                    >
                      {p.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-bw-500">{p.status}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="underline"
                      onClick={() => toggle(p.id, "is_featured", !p.is_featured)}
                    >
                      {p.is_featured ? "Evet" : "Hayır"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="underline"
                      onClick={() => toggle(p.id, "is_premium", !p.is_premium)}
                    >
                      {p.is_premium ? "Evet" : "Hayır"}
                    </button>
                  </td>
                  <td className="space-x-3 px-4 py-3">
                    {p.status !== "published" ? (
                      <button
                        type="button"
                        onClick={() => setStatus(p.id, "published")}
                        className="underline"
                      >
                        Yayınla
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setStatus(p.id, "removed")}
                        className="underline"
                      >
                        Kaldır
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => remove(p.id)}
                      className="text-bw-400 underline"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
