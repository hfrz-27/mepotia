import Link from "next/link";
import dynamic from "next/dynamic";
import { after } from "next/server";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { PremiumBreadcrumb } from "@/components/BackHomeLink";
import ProductGallery from "@/components/ProductGallery";
import ProductDetailsBlock from "@/components/ProductDetailsBlock";
import ProductOfferForm from "@/components/ProductOfferForm";
import ProductBuyingGuide from "@/components/ProductBuyingGuide";
import ProductStickyBar from "@/components/ProductStickyBar";
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
  const { data: settings } = await supabase
    .from("site_settings")
    .select("guide_hero")
    .eq("id", 1)
    .maybeSingle();

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

      {/* Sol galeri · sağ bilgi — premium vitrin layout */}
      <div className="mt-5 grid grid-cols-1 gap-8 lg:mt-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery images={galleryImages} title={product.title} />

        <div className="lg:pt-1">
          <div className="flex flex-wrap gap-1.5">
            {product.is_premium ? (
              <span className="rounded-full bg-[#0b0b0b] px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
                Premium
              </span>
            ) : null}
            {discount ? (
              <span className="rounded-full bg-[#0b0b0b] px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
                İndirim
              </span>
            ) : null}
            {sold ? (
              <span className="rounded-full border border-black/10 bg-[#f5f5f5] px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#525252] uppercase">
                Satıldı
              </span>
            ) : null}
            <span className="rounded-full border border-black/[0.08] bg-white px-2.5 py-1 text-[10px] tracking-wide text-[#737373] uppercase">
              {product.condition === "new" ? "Sıfır" : "İkinci El"}
            </span>
          </div>

          <div className="mt-5">
            <h1 className="pv-title text-2xl sm:text-3xl lg:text-4xl">{product.title}</h1>
            {discount ? (
              <p className="mt-3 text-base text-[#a3a3a3] line-through sm:text-xl">
                {formatPrice(product.original_price)}
              </p>
            ) : null}
            <p
              className={`font-semibold tracking-tight text-[#0b0b0b] tabular-nums ${
                discount ? "mt-1 text-2xl sm:text-3xl" : "mt-3 text-2xl sm:mt-4 sm:text-4xl"
              }`}
            >
              {formatPrice(product.price)}
            </p>
            {sold ? (
              <p className="mt-3 rounded-[12px] border border-black/[0.06] bg-[#f5f5f5] px-3 py-2.5 text-sm text-[#525252]">
                Bu ürün satıldı. Benzer ürünler için vitrine göz atabilirsin.
              </p>
            ) : null}
            <p className="mt-3 flex items-center gap-2 text-sm text-[#737373]">
              <MapPin className="h-4 w-4 shrink-0" />
              {[product.district, product.city].filter(Boolean).join(", ") || "—"}
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <ProductOfferForm
              productId={product.id}
              title={product.title}
              condition={product.condition}
            />
            {!sold && wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="pv-btn h-11 flex-1 sm:flex-none"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            ) : null}
            {!sold && tel ? (
              <a
                href={tel}
                className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full border border-[#0b0b0b] bg-white px-4 text-sm font-semibold text-[#0b0b0b] transition hover:bg-[#f5f5f5] sm:flex-none"
              >
                <Phone className="h-4 w-4" />
                Ara
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

      <ProductBuyingGuide
        categorySlug={product.categories?.slug}
        categoryName={product.categories?.name}
      />

      <ProductMarketCompare
        query={[product.brand, product.model, product.title].filter(Boolean).join(" ")}
        referencePrice={Number(product.price)}
        condition={product.condition}
      />

      {similar.length ? (
        <section className="mt-10 pb-4 sm:mt-14 lg:mt-16">
          <p className="pv-eyebrow">Senin için</p>
          <h2 className="pv-title mt-2 text-2xl sm:text-3xl">
            Bu ürüne bakanlar şunlara da baktı
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Mobil sticky CTA — sepet yerine güvenli iletişim */}
      <div className="h-24 lg:hidden" aria-hidden />
      <ProductStickyBar
        title={product.title}
        price={product.price}
        originalPrice={product.original_price}
        discount={discount}
        sold={sold}
        wa={wa}
        tel={tel}
      />
    </main>
  );
}
