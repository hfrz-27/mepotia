"use client";

import { useEffect, useState } from "react";
import ProductImage from "@/components/ProductImage";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Search, Pencil, Trash2, ChevronDown, AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { recoverPhotosFromStorage } from "@/lib/recoverPhotos";
import { deleteProductFully } from "@/lib/deleteProduct";
import ShareProductButtons from "@/components/ShareProductButtons";
import TechPostsAdmin from "@/components/admin/TechPostsAdmin";
import { purgeSiteFromBrowser } from "@/lib/sitePurgeClient";

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
  const [techPosts, setTechPosts] = useState([]);
  const [techSqlMissing, setTechSqlMissing] = useState(false);
  const [msg, setMsg] = useState("");
  const [tab, setTab] = useState("offers");
  const [shareId, setShareId] = useState(null);
  const [sqlHint, setSqlHint] = useState("");
  const [productSqlHint, setProductSqlHint] = useState("");
  const [recovering, setRecovering] = useState(false);
  const [purging, setPurging] = useState(false);
  const [purgeMsg, setPurgeMsg] = useState("");
  const [purgeOpen, setPurgeOpen] = useState(false);
  const [deployOutdated, setDeployOutdated] = useState(false);

  useEffect(() => {
    fetch("/api/sync-tech-news", { method: "GET" })
      .then((res) => setDeployOutdated(res.status === 404))
      .catch(() => setDeployOutdated(true));
  }, []);

  const load = async () => {
    const supabase = createClient();

    const fullSelect =
      "id, title, status, is_featured, is_premium, is_discount, original_price, views, created_at, product_images(url, sort_order), price";
    const minSelect =
      "id, title, status, is_featured, is_premium, views, created_at, product_images(url, sort_order), price";

    let { data: all, error: prodErr } = await supabase
      .from("products")
      .select(fullSelect)
      .order("created_at", { ascending: false });

    if (prodErr) {
      console.error("admin products (full):", prodErr);
      const fallback = await supabase
        .from("products")
        .select(minSelect)
        .order("created_at", { ascending: false });
      all = fallback.data;
      prodErr = fallback.error;
      if (prodErr) {
        console.error("admin products (min):", prodErr);
      } else {
        setProductSqlHint("product_discount.sql");
      }
    } else {
      setProductSqlHint("");
    }

    const rows = (all || []).map((p) => ({
      ...p,
      is_discount: p.is_discount ?? false,
      original_price: p.original_price ?? null,
    }));
    setProducts(rows);

    if (prodErr && !rows.length) {
      setMsg(`Ürünler yüklenemedi: ${prodErr.message}`);
    }

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

    const { data: techRows, error: techErr } = await supabase
      .from("tech_posts")
      .select("id, title, excerpt, body, cover_url, source_url, published, created_at")
      .order("created_at", { ascending: false });
    if (techErr) {
      setTechPosts([]);
      setTechSqlMissing(techErr.message?.includes("tech_posts") ?? true);
    } else {
      setTechPosts(techRows || []);
      setTechSqlMissing(false);
    }

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
    const params = new URLSearchParams(window.location.search);
    const t = params.get("tab");
    if (t === "products" || t === "offers" || t === "requests" || t === "tech") {
      setTab(t);
    }
  }, []);

  const runPhotoRecovery = async (silent = false) => {
    setRecovering(true);
    try {
      const supabase = createClient();
      const { linked } = await recoverPhotosFromStorage(supabase);
      if (linked > 0) {
        setMsg(`${linked} fotoğraf geri bağlandı.`);
        await load();
      } else if (!silent) {
        setMsg("Tüm fotoğraflar zaten bağlı.");
      }
    } catch (err) {
      if (!silent) setMsg(err.message || "Fotoğraf geri yükleme başarısız.");
      console.error(err);
    } finally {
      setRecovering(false);
    }
  };

  const toggle = async (id, field, value) => {
    await createClient().from("products").update({ [field]: value }).eq("id", id);
    setMsg("Güncellendi.");
    load();
  };

  const remove = async (id) => {
    if (!confirm("Bu ilan kalıcı olarak silinsin mi? Fotoğrafları da kaldırılır.")) return;
    try {
      const supabase = createClient();
      await deleteProductFully(supabase, id);
      setMsg("İlan silindi.");
      load();
    } catch (err) {
      setMsg(err?.message || "Silinemedi.");
    }
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
    if (productSqlHint) {
      setMsg("Önce Supabase'de product_discount.sql çalıştır.");
      return;
    }
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

  const purgeSite = async () => {
    if (
      !confirm(
        "Sitedeki TÜM ürünler, haberler, teklifler, istekler ve yorumlar silinecek. Geri alınamaz. Emin misin?",
      )
    ) {
      return;
    }

    setPurging(true);
    setPurgeMsg("");

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Admin oturumu gerekli. Önce giriş yap.");

      const result = await purgeSiteFromBrowser(supabase);

      try {
        await fetch("/api/revalidate", { method: "POST" });
      } catch {
        // ignore
      }

      setPurgeMsg(
        `${result.deletedProducts} ürün, ${result.deletedNews} haber, ${result.deletedOffers} teklif, ${result.deletedRequests} istek, ${result.deletedReviews} yorum silindi. Sayfa sıfırlandı.`,
      );
      await load();
    } catch (err) {
      setPurgeMsg(err?.message || "Silme başarısız. Supabase SQL Editor'da reset_site_content.sql çalıştır.");
    } finally {
      setPurging(false);
    }
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
        <div className="flex flex-wrap gap-2">
          <Link
            href="/ilan-ver"
            className="rounded-2xl bg-bw-950 px-5 py-3 text-sm font-semibold text-white hover:bg-bw-800"
          >
            + Yeni ilan
          </Link>
          <Link
            href="/admin?tab=products"
            className="rounded-2xl border border-bw-300 bg-white px-5 py-3 text-sm font-semibold text-bw-900 hover:border-bw-950"
          >
            İlanları düzenle
          </Link>
        </div>
      </div>

      {deployOutdated ? (
        <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-950">
          <p className="font-semibold">Canlı site güncel değil</p>
          <p className="mt-1">
            Kod GitHub&apos;da hazır ama canli site eski surumu gosteriyor. Hosting panelinden
            yeni deploy al veya birkaç dakika bekle.
          </p>
        </div>
      ) : null}

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
          onClick={() => {
            setTab("products");
            window.history.replaceState(null, "", "/admin?tab=products");
          }}
          className={`rounded-xl px-4 py-2 text-sm font-semibold ${
            tab === "products"
              ? "bg-bw-950 text-white"
              : "border border-bw-200 text-bw-600"
          }`}
        >
          Vitrin / ilan düzenle
        </button>
        <button
          type="button"
          onClick={() => {
            setTab("tech");
            window.history.replaceState(null, "", "/admin?tab=tech");
          }}
          className={`rounded-xl px-4 py-2 text-sm font-semibold ${
            tab === "tech"
              ? "bg-bw-950 text-white"
              : "border border-bw-200 text-bw-600"
          }`}
        >
          Teknoloji yazıları
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
          {productSqlHint ? (
            <div className="rounded-3xl border border-amber-200 bg-amber-50 px-5 py-5 text-sm leading-relaxed text-amber-950">
              <p className="font-semibold">İndirim alanları eksik</p>
              <p className="mt-2">
                Supabase SQL Editor&apos;da{" "}
                <code className="rounded bg-white px-1.5 py-0.5 text-xs">
                  supabase/{productSqlHint}
                </code>{" "}
                çalıştır. Ürünler şimdilik indirim özelliği olmadan listeleniyor.
              </p>
            </div>
          ) : null}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="rounded-2xl border border-bw-200 bg-bw-50 px-5 py-4 text-sm text-bw-600">
              <strong className="text-bw-950">İlan düzenle:</strong> Ürünün altındaki siyah{" "}
              <strong>İlanı düzenle</strong> butonuna bas. Başlık, fiyat, fotoğraf ve açıklama
              değişir.
            </div>
            <button
              type="button"
              disabled={recovering}
              onClick={() => runPhotoRecovery(false)}
              className="shrink-0 rounded-xl border border-bw-300 bg-white px-5 py-3 text-sm font-semibold text-bw-800 hover:border-bw-950 disabled:opacity-60"
            >
              {recovering ? "Fotoğraflar yükleniyor…" : "Kayıp fotoğrafları geri yükle"}
            </button>
          </div>
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
                      <ProductImage
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
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-bw-950 px-4 py-3 text-sm font-semibold text-white hover:bg-bw-800 sm:w-auto"
                  >
                    <Pencil className="h-4 w-4" />
                    İlanı düzenle
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

      {tab === "tech" ? (
        <TechPostsAdmin posts={techPosts} onReload={load} sqlMissing={techSqlMissing} />
      ) : null}

      <section className="mt-16 overflow-hidden rounded-[1.75rem] border border-bw-200 bg-white shadow-[0_24px_60px_-48px_rgba(0,0,0,0.35)]">
        <button
          type="button"
          onClick={() => setPurgeOpen((open) => !open)}
          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-bw-50 sm:px-6"
          aria-expanded={purgeOpen}
        >
          <div className="flex min-w-0 items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-red-600">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-bw-950">Tehlikeli bölge</p>
              <p className="mt-0.5 text-xs text-bw-500">
                Tüm siteyi sıfırla — kapalı tut, yanlışlıkla basma
              </p>
            </div>
          </div>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-bw-400 transition ${purgeOpen ? "rotate-180" : ""}`}
          />
        </button>

        {purgeOpen ? (
          <div className="border-t border-red-100 bg-gradient-to-b from-red-50/80 to-white px-5 py-5 sm:px-6 sm:py-6">
            <p className="text-sm leading-relaxed text-red-900/90">
              Bu işlem geri alınamaz. Tüm ürünler, haberler, bana-sat teklifleri, ürün istekleri
              ve müşteri yorumları kalıcı olarak silinir.
            </p>
            {purgeMsg ? (
              <p className="mt-3 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-medium text-red-900">
                {purgeMsg}
              </p>
            ) : null}
            <button
              type="button"
              onClick={purgeSite}
              disabled={purging}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl border border-red-300 bg-white px-6 py-3.5 text-sm font-semibold text-red-700 shadow-sm transition hover:bg-red-50 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              {purging ? "Siliniyor..." : "Her şeyi sil — sıfırla"}
            </button>
          </div>
        ) : null}
      </section>
    </main>
  );
}
