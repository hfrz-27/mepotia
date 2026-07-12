"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Search } from "lucide-react";
import { createClient } from "@/lib/supabase";
import ShareProductButtons from "@/components/ShareProductButtons";

function productImage(p) {
  const images = p?.product_images;
  if (Array.isArray(images) && images.length) {
    const sorted = [...images].sort((a, b) => a.sort_order - b.sort_order);
    return sorted[0].url;
  }
  return "";
}

function formatPrice(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return "";
  return `${num.toLocaleString("tr-TR")} ₺`;
}

export default function AdminPage() {
  const [stats, setStats] = useState({
    products: 0,
    featured: 0,
    views: 0,
    offersNew: 0,
    requestsNew: 0,
    offersAll: 0,
    requestsAll: 0,
  });
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [msg, setMsg] = useState("");
  const [tab, setTab] = useState("offers");
  const [shareId, setShareId] = useState(null);
  const [sqlHint, setSqlHint] = useState("");

  const load = async () => {
    const supabase = createClient();
    const { data: all } = await supabase
      .from("products")
      .select(
        "id, title, status, is_featured, is_premium, is_discount, original_price, views, created_at, product_images(url, sort_order), price",
      )
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
      offersNew: offersList.filter((o) => o.status === "new").length,
      requestsNew: reqList.filter((r) => r.status === "new").length,
      offersAll: offersList.length,
      requestsAll: reqList.length,
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
    setMsg("Satış teklifi güncellendi.");
    load();
  };

  const removeOffer = async (id) => {
    if (!confirm("Silinsin mi?")) return;
    await createClient().from("sell_offers").delete().eq("id", id);
    load();
  };

  const setRequestStatus = async (id, status) => {
    await createClient().from("product_requests").update({ status }).eq("id", id);
    setMsg("Ürün isteği güncellendi.");
    load();
  };

  const toggleSold = async (product) => {
    const next = product.status === "sold" ? "published" : "sold";
    await createClient().from("products").update({ status: next }).eq("id", product.id);
    setMsg(next === "sold" ? "Satıldı olarak işaretlendi." : "Ürün tekrar vitrine alındı.");
    load();
  };

  const toggleDiscount = async (product) => {
    if (product.is_discount) {
      await createClient()
        .from("products")
        .update({ is_discount: false, original_price: null })
        .eq("id", product.id);
      setMsg("İndirim kaldırıldı.");
      load();
      return;
    }

    const input = window.prompt(
      "Eski fiyat (indirim öncesi) ₺",
      String(product.original_price || product.price || ""),
    );
    if (input == null) return;
    const original = Number(input);
    if (Number.isNaN(original) || original <= 0) {
      setMsg("Geçerli bir eski fiyat gir.");
      return;
    }
    await createClient()
      .from("products")
      .update({ is_discount: true, original_price: original })
      .eq("id", product.id);
    setMsg("İndirim işaretlendi.");
    load();
  };

  const removeRequest = async (id) => {
    if (!confirm("Silinsin mi?")) return;
    await createClient().from("product_requests").delete().eq("id", id);
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

      {/* Üst sayılar — net ayrım */}
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setTab("offers")}
          className={`rounded-[1.75rem] border p-5 text-left transition sm:p-6 ${
            tab === "offers"
              ? "border-bw-950 bg-bw-950 text-white"
              : "border-bw-200 bg-white text-bw-950 hover:border-bw-400"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                  tab === "offers" ? "bg-white/10" : "bg-bw-50"
                }`}
              >
                <ShoppingBag className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">Satış teklifleri</p>
                <p
                  className={`mt-0.5 text-xs ${
                    tab === "offers" ? "text-bw-300" : "text-bw-500"
                  }`}
                >
                  Bana sat formundan
                </p>
              </div>
            </div>
            <p className="font-display text-4xl font-semibold tabular-nums">
              {stats.offersNew}
            </p>
          </div>
          <p
            className={`mt-3 text-xs ${
              tab === "offers" ? "text-bw-400" : "text-bw-400"
            }`}
          >
            {stats.offersNew} yeni · toplam {stats.offersAll}
          </p>
        </button>

        <button
          type="button"
          onClick={() => setTab("requests")}
          className={`rounded-[1.75rem] border p-5 text-left transition sm:p-6 ${
            tab === "requests"
              ? "border-bw-950 bg-bw-950 text-white"
              : "border-bw-200 bg-white text-bw-950 hover:border-bw-400"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                  tab === "requests" ? "bg-white/10" : "bg-bw-50"
                }`}
              >
                <Search className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">Ürün istekleri</p>
                <p
                  className={`mt-0.5 text-xs ${
                    tab === "requests" ? "text-bw-300" : "text-bw-500"
                  }`}
                >
                  Ürün iste formundan
                </p>
              </div>
            </div>
            <p className="font-display text-4xl font-semibold tabular-nums">
              {stats.requestsNew}
            </p>
          </div>
          <p
            className={`mt-3 text-xs ${
              tab === "requests" ? "text-bw-400" : "text-bw-400"
            }`}
          >
            {stats.requestsNew} yeni · toplam {stats.requestsAll}
          </p>
        </button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          ["Ürün", stats.products],
          ["Öne çıkan", stats.featured],
          ["Görüntülenme", stats.views],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-3xl border border-bw-200 bg-white p-4 shadow-sm sm:p-5"
          >
            <p className="text-2xl font-semibold text-bw-950 sm:text-3xl">{value}</p>
            <p className="mt-1 text-xs text-bw-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTab("offers")}
          className={`rounded-xl px-4 py-2 text-sm font-semibold ${
            tab === "offers"
              ? "bg-bw-950 text-white"
              : "border border-bw-200 text-bw-600"
          }`}
        >
          Satış teklifleri ({stats.offersNew})
        </button>
        <button
          type="button"
          onClick={() => setTab("requests")}
          className={`rounded-xl px-4 py-2 text-sm font-semibold ${
            tab === "requests"
              ? "bg-bw-950 text-white"
              : "border border-bw-200 text-bw-600"
          }`}
        >
          Ürün istekleri ({stats.requestsNew})
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

      {sqlHint && (tab === "offers" || tab === "requests") ? (
        <div className="mt-6 rounded-3xl border border-bw-300 bg-bw-50 px-5 py-5 text-sm leading-relaxed text-bw-700">
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

      {tab === "offers" ? (
        <div className="mt-6 space-y-3">
          {!offers.length ? (
            <div className="rounded-3xl border border-dashed border-bw-300 bg-white px-6 py-16 text-center text-sm text-bw-500">
              Henüz satış teklifi yok.
            </div>
          ) : (
            offers.map((o) => (
              <article
                key={o.id}
                className={`rounded-3xl border bg-white p-5 shadow-sm sm:p-6 ${
                  o.status === "new" ? "border-bw-900" : "border-bw-200 opacity-80"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs tracking-wide text-bw-400 uppercase">
                      Satış teklifi
                      {o.status === "new" ? " · Yeni" : ` · ${o.status}`}
                    </p>
                    <h2 className="mt-1 font-display text-xl font-semibold text-bw-950">
                      {o.title}
                    </h2>
                    <p className="mt-1 text-sm text-bw-500">
                      {o.contact_name} · {o.phone}
                      {o.city ? ` · ${o.city}` : ""}
                      {o.price != null
                        ? ` · ${Number(o.price).toLocaleString("tr-TR")} ₺`
                        : ""}
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
                    {o.status === "new" ? (
                      <button
                        type="button"
                        onClick={() => setOfferStatus(o.id, "accepted")}
                        className="rounded-xl bg-bw-950 px-3 py-2 text-xs font-semibold text-white"
                      >
                        Okundu
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
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-bw-500">
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
          )}
        </div>
      ) : null}

      {tab === "requests" ? (
        <div className="mt-6 space-y-3">
          {!requests.length ? (
            <div className="rounded-3xl border border-dashed border-bw-300 bg-white px-6 py-16 text-center text-sm text-bw-500">
              Henüz ürün isteği yok.
            </div>
          ) : (
            requests.map((r) => (
              <article
                key={r.id}
                className={`rounded-3xl border bg-white p-5 shadow-sm sm:p-6 ${
                  r.status === "new" ? "border-bw-900" : "border-bw-200 opacity-80"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs tracking-wide text-bw-400 uppercase">
                      Ürün isteği
                      {r.status === "new" ? " · Yeni" : ` · ${r.status}`}
                    </p>
                    <h2 className="mt-1 font-display text-xl font-semibold text-bw-950">
                      {r.title}
                    </h2>
                    <p className="mt-1 text-sm text-bw-500">
                      {r.phone}
                      {r.price_min != null || r.price_max != null
                        ? ` · ${r.price_min ?? "?"}–${r.price_max ?? "?"} ₺`
                        : ""}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`https://wa.me/${String(r.phone).replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-bw-200 px-3 py-2 text-xs font-semibold text-bw-800"
                    >
                      WhatsApp
                    </a>
                    {r.status === "new" ? (
                      <button
                        type="button"
                        onClick={() => setRequestStatus(r.id, "done")}
                        className="rounded-xl bg-bw-950 px-3 py-2 text-xs font-semibold text-white"
                      >
                        Okundu
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => removeRequest(r.id)}
                      className="rounded-xl px-3 py-2 text-xs text-bw-400 underline"
                    >
                      Sil
                    </button>
                  </div>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-bw-500">
                  {r.description}
                </p>
                <p className="mt-3 text-xs text-bw-400">
                  {r.created_at
                    ? new Date(r.created_at).toLocaleString("tr-TR")
                    : ""}
                </p>
              </article>
            ))
          )}
        </div>
      ) : null}

      {tab === "products" ? (
        <div className="mt-6 space-y-4">
          {!products.length ? (
            <div className="rounded-3xl border border-dashed border-bw-300 bg-white px-6 py-16 text-center text-sm text-bw-500">
              Henüz vitrin ürünü yok.
            </div>
          ) : (
            products.map((p) => (
              <article
                key={p.id}
                className="rounded-3xl border border-bw-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-bw-200 bg-bw-50">
                    {productImage(p) ? (
                      <Image
                        src={productImage(p)}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-bw-400">
                        Görsel yok
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/urun/${p.id}`}
                      className="font-display text-lg font-semibold text-bw-950 hover:underline"
                    >
                      {p.title}
                    </Link>
                    <p className="mt-1 text-sm text-bw-500">
                      {formatPrice(p.price)}
                      {p.is_discount && p.original_price
                        ? ` · eski ${formatPrice(p.original_price)}`
                        : ""}
                      {" · "}
                      {p.status === "sold" ? "satıldı" : p.status}
                      {" · "}
                      {p.views || 0} görüntülenme
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/ilan-ver?duzenle=${p.id}`}
                    className="rounded-xl border border-bw-200 px-3 py-2 text-xs font-semibold text-bw-700 hover:border-bw-950"
                  >
                    Düzenle
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleSold(p)}
                    className={`rounded-xl px-3 py-2 text-xs font-semibold ${
                      p.status === "sold"
                        ? "bg-bw-950 text-white"
                        : "border border-bw-200 text-bw-700"
                    }`}
                  >
                    {p.status === "sold" ? "Satıldı ✓" : "Satıldı işaretle"}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleDiscount(p)}
                    className={`rounded-xl px-3 py-2 text-xs font-semibold ${
                      p.is_discount
                        ? "bg-bw-950 text-white"
                        : "border border-bw-200 text-bw-700"
                    }`}
                  >
                    {p.is_discount ? "İndirim ✓" : "İndirim işaretle"}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggle(p.id, "is_featured", !p.is_featured)}
                    className={`rounded-xl px-3 py-2 text-xs font-semibold ${
                      p.is_featured
                        ? "bg-bw-950 text-white"
                        : "border border-bw-200 text-bw-700"
                    }`}
                  >
                    Öne çıkan: {p.is_featured ? "Evet" : "Hayır"}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggle(p.id, "is_premium", !p.is_premium)}
                    className={`rounded-xl px-3 py-2 text-xs font-semibold ${
                      p.is_premium
                        ? "bg-bw-950 text-white"
                        : "border border-bw-200 text-bw-700"
                    }`}
                  >
                    Premium: {p.is_premium ? "Evet" : "Hayır"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShareId(shareId === p.id ? null : p.id)}
                    className={`rounded-xl px-3 py-2 text-xs font-semibold ${
                      shareId === p.id
                        ? "bg-bw-950 text-white"
                        : "border border-bw-200 text-bw-700"
                    }`}
                  >
                    {shareId === p.id ? "Reklamı kapat" : "Hikaye reklamı"}
                  </button>
                  {p.status !== "published" ? (
                    <button
                      type="button"
                      onClick={() => setStatus(p.id, "published")}
                      className="rounded-xl border border-bw-200 px-3 py-2 text-xs font-semibold text-bw-700"
                    >
                      Yayınla
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setStatus(p.id, "removed")}
                      className="rounded-xl border border-bw-200 px-3 py-2 text-xs font-semibold text-bw-700"
                    >
                      Kaldır
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(p.id)}
                    className="rounded-xl px-3 py-2 text-xs font-semibold text-bw-400 underline"
                  >
                    Sil
                  </button>
                </div>

                {shareId === p.id ? (
                  <div className="mt-5 rounded-2xl border border-bw-200 bg-bw-50 p-4">
                    <ShareProductButtons
                      title={p.title}
                      url={`https://mepotia.com/urun/${p.id}`}
                      imageUrl={productImage(p)}
                      price={formatPrice(p.price)}
                      storyMode
                    />
                  </div>
                ) : null}
              </article>
            ))
          )}
        </div>
      ) : null}
    </main>
  );
}
