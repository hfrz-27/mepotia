import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import ShareProductButtons from "@/components/ShareProductButtons";
import {
  formatPrice,
  getPrimaryImage,
  getProductById,
  getSimilarProducts,
  incrementViews,
  whatsappLink,
} from "@/lib/products";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { data: product } = await getProductById(id);
  if (!product || product.status !== "published") {
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
  if (!product || product.status !== "published") notFound();

  await incrementViews(id);
  const similar = await getSimilarProducts(product);
  const images = [...(product.product_images || [])].sort(
    (a, b) => a.sort_order - b.sort_order,
  );
  const fallback = getPrimaryImage(product);
  const galleryImages = images.length ? images : [{ url: fallback, id: "main" }];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mepotia.com";
  const productUrl = `${siteUrl}/urun/${product.id}`;
  const wa = whatsappLink(
    product.whatsapp || product.phone || "905059574122",
    product.title,
    productUrl,
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm text-bw-500">
        <Link href="/" className="hover:text-bw-950">
          Vitrin
        </Link>
        {product.categories ? (
          <>
            {" / "}
            <Link
              href={`/kategori/${product.categories.slug}`}
              className="hover:text-bw-950"
            >
              {product.categories.name}
            </Link>
          </>
        ) : null}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery images={galleryImages} title={product.title} />

        <div>
          <div className="flex flex-wrap gap-2">
            {product.is_premium ? (
              <span className="rounded-lg bg-bw-950 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
                Premium
              </span>
            ) : null}
            <span className="rounded-lg border border-bw-200 bg-white px-2.5 py-1 text-[10px] tracking-wide text-bw-600 uppercase">
              {product.condition === "new" ? "Sıfır" : "İkinci El"}
            </span>
          </div>

          <h1 className="mt-5 font-display text-4xl font-semibold tracking-wide text-bw-950 sm:text-5xl">
            {product.title}
          </h1>
          <p className="mt-5 text-4xl font-semibold tracking-tight text-bw-950">
            {formatPrice(product.price)}
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm text-bw-500">
            <MapPin className="h-4 w-4" />
            {[product.district, product.city].filter(Boolean).join(", ") || "—"}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-bw-950 px-5 py-3.5 text-sm font-semibold text-white hover:bg-bw-800"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp ile Yaz
              </a>
            ) : null}
            {product.phone ? (
              <a
                href={`tel:${product.phone}`}
                className="inline-flex items-center gap-2 rounded-2xl border border-bw-300 bg-white px-5 py-3.5 text-sm font-medium text-bw-800"
              >
                <Phone className="h-4 w-4" />
                Ara
              </a>
            ) : null}
          </div>

          <div className="mt-6">
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

          <div className="mt-8 rounded-3xl border border-bw-200 bg-white p-6 sm:p-8">
            <h2 className="text-xs font-semibold tracking-[0.2em] text-bw-500 uppercase">
              Açıklama
            </h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-bw-700 sm:text-base">
              {product.description}
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-bw-100 pt-6 text-sm">
              {product.brand ? (
                <>
                  <dt className="text-bw-400">Marka</dt>
                  <dd className="text-bw-900">{product.brand}</dd>
                </>
              ) : null}
              {product.model ? (
                <>
                  <dt className="text-bw-400">Model</dt>
                  <dd className="text-bw-900">{product.model}</dd>
                </>
              ) : null}
              <dt className="text-bw-400">Görüntülenme</dt>
              <dd className="text-bw-900">{product.views}</dd>
            </dl>
          </div>
        </div>
      </div>

      {similar.length ? (
        <section className="mt-20">
          <h2 className="font-display text-3xl font-semibold tracking-wide text-bw-950">
            Benzer ürünler
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
