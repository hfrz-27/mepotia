"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell, ShoppingBag, Search } from "lucide-react";
import { createClient } from "@/lib/supabase";

export default function AdminPage() {
  const [stats, setStats] = useState({
    products: 0,
    featured: 0,
    views: 0,
    offers: 0,
    requests: 0,
  });
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [msg, setMsg] = useState("");
  const [tab, setTab] = useState("inbox");
  const [sqlHint, setSqlHint] = useState("");

  const load = async () => {
    const supabase = createClient();
    const { data: all } = await supabase
      .from("products")
      .select("id, title, status, is_featured, is_premium, views, created_at")
      .order("created_at", { ascending: false });
    const rows = all || [];
    setProducts(rows);

    const { data: offerRows, error: offerErr } = await supabase
      .from("sell_offers")
      .select("*")
      .order("created_at", { ascending: false });
    const offersList = offerErr ? [] : offerRows || [];
    setOffers(offersList);

    const { data: reqRows, error: reqErr } = await supabase
      .from("product_requests")
      .select("*")
      .order("created_at", { ascending: false });
    const reqList = reqErr ? [] : reqRows || [];
    setRequests(reqList);

    const hints = [];
    if (offerErr) hints.push("sell_offers.sql");
    if (reqErr) hints.push("product_requests.sql");
    setSqlHint(hints.join(" + "));

    setStats({
      products: rows.length,
      featured: rows.filter((p) => p.is_featured).length,
      views: rows.reduce((s, p) => s + (p.views || 0), 0),
      offers: offersList.filter((o) => o.status === "new").length,
      requests: reqList.filter((r) => r.status === "new").length,
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
    setMsg("Bildirim güncellendi.");
    load();
  };

  const removeOffer = async (id) => {
    if (!confirm("Silinsin mi?")) return;
    await createClient().from("sell_offers").delete().eq("id", id);
    load();
  };

  const setRequestStatus = async (id, status) => {
    await createClient().from("product_requests").update({ status }).eq("id", id);
    setMsg("Bildirim güncellendi.");
    load();
  };

  const removeRequest = async (id) => {
    if (!confirm("Silinsin mi?")) return;
    await createClient().from("product_requests").delete().eq("id", id);
    load();
  };

  const newCount = stats.offers + stats.requests;

  const inboxItems = [
    ...offers.map((o) => ({
      kind: "sell",
      id: o.id,
      title: o.title,
      meta: `${o.contact_name} · ${o.phone}${o.city ? ` · ${o.city}` : ""}${
        o.price != null ? ` · ${Number(o.price).toLocaleString("tr-TR")} ₺` : ""
      }`,
      description: o.description,
      status: o.status,
      created_at: o.created_at,
      phone: o.phone,
      images: o.image_urls,
      raw: o,
    })),
    ...requests.map((r) => ({
      kind: "request",
      id: r.id,
      title: r.title,
      meta: `${r.phone}${
        r.price_min != null || r.price_max != null
          ? ` · ${r.price_min ?? "?"}–${r.price_max ?? "?"} ₺`
          : ""
      }`,
      description: r.description,
      status: r.status,
      created_at: r.created_at,
      phone: r.phone,
      images: null,
      raw: r,
    })),
  ].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

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

      {/* Bildirim kutusu */}
      <button
        type="button"
        onClick={() => setTab("inbox")}
        className="mt-8 flex w-full items-start gap-4 rounded-[1.75rem] border border-bw-200 bg-white p-5 text-left shadow-sm transition hover:border-bw-400 sm:p-6"
      >
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-bw-950 text-white">
          <Bell className="h-5 w-5" />
          {newCount > 0 ? (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-bw-950 ring-2 ring-bw-950">
              {newCount}
            </span>
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-bw-950">Bildirimler</p>
          <p className="mt-1 text-sm text-bw-500">
            {newCount > 0
              ? `${stats.offers} satış teklifi · ${stats.requests} ürün isteği`
              : "Yeni bildirim yok"}
          </p>
        </div>
      </button>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
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
          onClick={() => setTab("inbox")}
          className={`rounded-xl px-4 py-2 text-sm font-semibold ${
            tab === "inbox"
              ? "bg-bw-950 text-white"
              : "border border-bw-200 text-bw-600"
          }`}
        >
          Bildirimler ({inboxItems.length})
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

      {tab === "inbox" ? (
        <div className="mt-6 space-y-3">
          {sqlHint ? (
            <div className="rounded-3xl border border-bw-300 bg-bw-50 px-5 py-5 text-sm leading-relaxed text-bw-700">
              <p className="font-semibold text-bw-950">SQL eksik</p>
              <p className="mt-2">
                Supabase SQL Editor’da{" "}
                <code className="rounded bg-white px-1.5 py-0.5 text-xs">
                  supabase/{sqlHint}
                </code>{" "}
                çalıştır.
              </p>
            </div>
          ) : null}

          {!inboxItems.length && !sqlHint ? (
            <div className="rounded-3xl border border-dashed border-bw-300 bg-white px-6 py-16 text-center text-sm text-bw-500">
              Henüz bildirim yok. Satış teklifi ve ürün istekleri buraya düşer.
            </div>
          ) : null}

          {inboxItems.map((item) => (
            <article
              key={`${item.kind}-${item.id}`}
              className={`rounded-3xl border bg-white p-5 shadow-sm sm:p-6 ${
                item.status === "new"
                  ? "border-bw-900"
                  : "border-bw-200 opacity-80"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-xs tracking-wide text-bw-400 uppercase">
                    {item.kind === "sell" ? (
                      <ShoppingBag className="h-3.5 w-3.5" />
                    ) : (
                      <Search className="h-3.5 w-3.5" />
                    )}
                    {item.kind === "sell" ? "Satış teklifi" : "Ürün isteği"}
                    {item.status === "new" ? " · Yeni" : ` · ${item.status}`}
                  </p>
                  <h2 className="mt-1 font-display text-xl font-semibold text-bw-950">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm text-bw-500">{item.meta}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`https://wa.me/${String(item.phone).replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-bw-200 px-3 py-2 text-xs font-semibold text-bw-800"
                  >
                    WhatsApp
                  </a>
                  {item.kind === "sell" ? (
                    <>
                      {item.status !== "accepted" ? (
                        <button
                          type="button"
                          onClick={() => setOfferStatus(item.id, "accepted")}
                          className="rounded-xl bg-bw-950 px-3 py-2 text-xs font-semibold text-white"
                        >
                          Okundu
                        </button>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => removeOffer(item.id)}
                        className="rounded-xl px-3 py-2 text-xs text-bw-400 underline"
                      >
                        Sil
                      </button>
                    </>
                  ) : (
                    <>
                      {item.status !== "done" ? (
                        <button
                          type="button"
                          onClick={() => setRequestStatus(item.id, "done")}
                          className="rounded-xl bg-bw-950 px-3 py-2 text-xs font-semibold text-white"
                        >
                          Okundu
                        </button>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => removeRequest(item.id)}
                        className="rounded-xl px-3 py-2 text-xs text-bw-400 underline"
                      >
                        Sil
                      </button>
                    </>
                  )}
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-bw-500">
                {item.description}
              </p>
              {Array.isArray(item.images) && item.images.length ? (
                <div className="mt-4 flex gap-2 overflow-x-auto">
                  {item.images.map((url) => (
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
                {item.created_at
                  ? new Date(item.created_at).toLocaleString("tr-TR")
                  : ""}
              </p>
            </article>
          ))}
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
