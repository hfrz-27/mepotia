import Link from "next/link";
import dynamic from "next/dynamic";
import { after } from "next/server";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import BackHomeLink, { PremiumBreadcrumb } from "@/components/BackHomeLink";
import ProductGallery from "@/components/ProductGallery";
import ProductDetailsBlock from "@/components/ProductDetailsBlock";
import { createClient } from "@/lib/supabase-server";
import {
  formatPrice,
  getPrimaryImage,
  getProductById,
  getSimilarProducts,
  hasDiscount,
  incrementViews,
  isPublicProduct,
  isSold,
  phoneLink,
  whatsappLink,
} from "@/lib/products";

const ShareProductButtons = dynamic(() => import("@/components/ShareProductButtons"), {
  loading: () => null,
});
const ProductMarketCompare = dynamic(() => import("@/components/ProductMarketCompare"), {
  loading: () => null,
});

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { data: product } = await getProductById(id);
  if (!product || !isPublicProduct(product)) {
    return { title: "Ürün bulunamadı — Mepotia" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mepotia.com";
  const image = getPrimaryImage(product);
  const title = `${product.title} — Mepotia`;
  const description =
    product.description?.slice(0, 160) ||
    `${product.title} · ${formatPrice(product.price)} · Mepotia`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/urun/${product.id}`,
      siteName: "Mepotia",
      type: "website",
      locale: "tr_TR",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const { data: product } = await getProductById(id);
  if (!product || !isPublicProduct(product)) notFound();

  const sold = isSold(product);
  const discount = hasDiscount(product);
  const supabase = await createClient();

  after(() => {
    void incrementViews(id, supabase);
  });

  const similar = await getSimilarProducts(product);
  const images = [...(product.product_images || [])].sort(
    (a, b) => a.sort_order - b.sort_order,
  );
  const fallback = getPrimaryImage(product);
  const galleryImages = images.length ? images : [{ url: fallback, id: "main" }];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mepotia.com";
  const productUrl = `${siteUrl}/urun/${product.id}`;
  const contactPhone = product.phone || product.whatsapp || "905059574122";
  const wa = whatsappLink(contactPhone, product.title, productUrl);
  const tel = phoneLink(contactPhone);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <PremiumBreadcrumb
        items={
          product.categories
            ? [
                {
                  href: `/kategori/${product.categories.slug}`,
                  label: product.categories.name,
                },
                { href: `/urun/${product.id}`, label: "Ürün detayı", current: true },
              ]
            : [{ href: `/urun/${product.id}`, label: "Ürün detayı", current: true }]
        }
        className="mb-4"
      />

      <div className="mt-5 grid grid-cols-1 gap-6 lg:mt-8 lg:grid-cols-2 lg:gap-10">
        <ProductGallery images={galleryImages} title={product.title} />

        <div className="lg:pt-1">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {product.is_premium ? (
              <span className="rounded-lg bg-bw-950 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
                Premium
              </span>
            ) : null}
            {discount ? (
              <span className="rounded-lg bg-bw-950 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
                İndirim
              </span>
            ) : null}
            {sold ? (
              <span className="rounded-lg border border-bw-300 bg-bw-100 px-2.5 py-1 text-[10px] font-bold tracking-wide text-bw-700 uppercase">
                Satıldı
              </span>
            ) : null}
            <span className="rounded-lg border border-bw-200 bg-white px-2.5 py-1 text-[10px] tracking-wide text-bw-600 uppercase">
              {product.condition === "new" ? "Sıfır" : "İkinci El"}
            </span>
          </div>

          <div className="mt-4 rounded-2xl border border-bw-200 bg-gradient-to-b from-white to-bw-50 p-4 sm:mt-5 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0">
            <h1 className="font-display text-xl font-semibold leading-snug tracking-wide text-bw-950 sm:text-3xl sm:leading-tight lg:text-4xl xl:text-5xl">
              {product.title}
            </h1>
            {discount ? (
              <p className="mt-3 text-base text-bw-400 line-through sm:mt-5 sm:text-xl">
                {formatPrice(product.original_price)}
              </p>
            ) : null}
            <p
              className={`font-semibold tracking-tight text-bw-950 ${
                discount ? "mt-1 text-2xl sm:text-3xl" : "mt-3 text-2xl sm:mt-5 sm:text-4xl"
              }`}
            >
              {formatPrice(product.price)}
            </p>
            {sold ? (
              <p className="mt-3 rounded-xl border border-bw-200 bg-bw-50 px-3 py-2.5 text-sm text-bw-600 sm:mt-4 sm:rounded-2xl sm:px-4 sm:py-3">
                Bu ürün satıldı. Benzer ürünler için vitrine göz atabilirsin.
              </p>
            ) : null}
            <p className="mt-3 flex items-center gap-2 text-xs text-bw-500 sm:mt-4 sm:text-sm">
              <MapPin className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
              {[product.district, product.city].filter(Boolean).join(", ") || "—"}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            <BackHomeLink
              href="/#vitrin"
              label="Vitrine dön"
              variant="minimal"
              className="flex-1 justify-center sm:flex-none"
            />
            {!sold && wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-bw-950 px-5 py-3.5 text-sm font-semibold text-white hover:bg-bw-800 sm:flex-none"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp ile Yaz
              </a>
            ) : null}
            {!sold && tel ? (
              <a
                href={tel}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-bw-950 bg-white px-5 py-3.5 text-sm font-semibold text-bw-950 hover:bg-bw-50 sm:flex-none"
              >
                <Phone className="h-4 w-4" />
                Hemen Ara
              </a>
            ) : null}
          </div>

          <div className="mt-5 sm:mt-6">
            <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-bw-500 uppercase">
              Bu ürünü paylaş
            </p>
            <ShareProductButtons
              title={product.title}
              url={productUrl}
              imageUrl={fallback}
              price={formatPrice(product.price)}
            />
          </div>

          {/* Mobil — açıklama paylaşımın hemen altında */}
          <div className="lg:hidden">
            <ProductDetailsBlock product={product} variant="mobile" />
          </div>
        </div>
      </div>

      {/* Masaüstü — tam genişlik premium açıklama */}
      <div className="mt-12 hidden lg:block">
        <ProductDetailsBlock product={product} variant="desktop" />
      </div>

      <ProductMarketCompare
        query={[product.brand, product.model, product.title].filter(Boolean).join(" ")}
        referencePrice={Number(product.price)}
        condition={product.condition}
      />

      {similar.length ? (
        <section className="mt-10 sm:mt-14 lg:mt-16">
          <h2 className="font-display text-2xl font-semibold tracking-wide text-bw-950 sm:text-3xl">
            Benzer ürünler
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
