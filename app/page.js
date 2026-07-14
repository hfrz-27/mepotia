import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BuySellAccordion from "@/components/BuySellAccordion";
import ProductCard from "@/components/ProductCard";
import HeroSection from "@/components/HeroSection";
import TechNewsSection from "@/components/TechNewsSection";
import { getPublishedProducts } from "@/lib/products";
import { getSiteSettings } from "@/lib/categories";
import { fillFeatured, fillProducts } from "@/lib/homeDemoData";
import { CustomerReviews, HomeReviewsProvider } from "@/components/HomeReviews";

const WA = "https://wa.me/905059574122";
const PRODUCT_LIMIT = 8;

export const revalidate = 60;

function MoreButton({ href, label = "Daha fazla göster" }) {
  return (
    <div className="mt-8 flex justify-center sm:mt-10">
      <Link
        href={href}
        prefetch
        className="inline-flex items-center gap-2 rounded-xl bg-bw-950 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_32px_-20px_rgba(0,0,0,0.35)] transition hover:bg-bw-800"
      >
        {label}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export default async function HomePage() {
  const [settings, latestRes, featuredRes, popularRes] = await Promise.all([
    getSiteSettings(),
    getPublishedProducts({ limit: PRODUCT_LIMIT, orderBy: "created_at" }),
    getPublishedProducts({ limit: PRODUCT_LIMIT, featured: true }),
    getPublishedProducts({ limit: PRODUCT_LIMIT, orderBy: "views" }),
  ]);
  const latest = fillProducts(latestRes.data, PRODUCT_LIMIT);
  const featured = fillFeatured(featuredRes.data, PRODUCT_LIMIT);
  const popular = fillProducts(popularRes.data, PRODUCT_LIMIT);
  const vitrinError = latestRes.error;

  const wa = settings?.whatsapp
    ? `https://wa.me/${String(settings.whatsapp).replace(/\D/g, "")}`
    : WA;

  return (
    <HomeReviewsProvider>
      <main>
        <HeroSection
          heroVideo={settings?.hero_video || ""}
          heroImages={[settings?.hero_bg_1, settings?.hero_bg_2, settings?.hero_bg_3].filter(Boolean)}
        />

        <BuySellAccordion />

        <TechNewsSection />

        {featured.length ? (
          <section className="border-b border-bw-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
                <div>
                  <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Özenle Seçilenler</p>
                  <h2 className="mt-2 font-display text-2xl font-semibold tracking-wide text-bw-950 sm:text-4xl">
                    Yeni Sahibini Bekleyenler
                  </h2>
                </div>
                <Link
                  href="/ara"
                  className="hidden items-center gap-2 text-sm font-medium text-bw-600 hover:text-bw-950 sm:inline-flex"
                >
                  Tümü
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
                {featured.slice(0, PRODUCT_LIMIT).map((p, idx) => (
                  <ProductCard key={p.id} product={p} prefetch={idx < 2} />
                ))}
              </div>
              <MoreButton href="/ara" />
            </div>
          </section>
        ) : null}

        <section id="vitrin" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mb-6 flex items-end justify-between gap-4 sm:mb-10">
            <div>
              <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Vitrin</p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-wide text-bw-950 sm:text-4xl">
                Özenle seçilmiş ürünler
              </h2>
              <p className="mt-2 hidden max-w-xl text-sm leading-relaxed text-bw-500 sm:block">
                Güvenle sunulan, özenle seçilmiş ikinci el ürünleri keşfedin.
              </p>
            </div>
            <Link href="/ara" className="hidden text-sm font-medium text-bw-600 hover:text-bw-950 sm:inline">
              Tümü
            </Link>
          </div>

          {!latest.length ? (
            <div className="rounded-[2rem] border border-dashed border-bw-300 bg-white px-6 py-20 text-center">
              <p className="font-display text-2xl text-bw-900">
                {vitrinError ? "Vitrin yüklenemedi" : "Henüz ürün yok"}
              </p>
              <p className="mt-2 text-sm text-bw-500">
                {vitrinError
                  ? "Bağlantı sorunu olabilir. Sayfayı yenile veya biraz sonra tekrar dene."
                  : "Yakında vitrin dolacak. Şimdilik WhatsApp'tan yazabilirsin."}
              </p>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-2xl bg-bw-950 px-5 py-3 text-sm font-semibold text-white"
              >
                WhatsApp
              </a>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
                {latest.slice(0, PRODUCT_LIMIT).map((p, idx) => (
                  <ProductCard key={p.id} product={p} prefetch={idx < 4} />
                ))}
              </div>
              <MoreButton href="/ara" />
            </>
          )}
        </section>

        {popular.length ? (
          <section className="border-t border-bw-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
                <div>
                  <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Popüler</p>
                  <h2 className="mt-2 font-display text-2xl font-semibold tracking-wide text-bw-950 sm:text-3xl lg:text-4xl">
                    En çok bakılanlar
                  </h2>
                </div>
                <Link
                  href="/en-cok-bakilanlar"
                  className="hidden items-center gap-2 text-sm font-medium text-bw-600 hover:text-bw-950 sm:inline-flex"
                >
                  Tümü
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
                {popular.slice(0, PRODUCT_LIMIT).map((p, idx) => (
                  <ProductCard key={p.id} product={p} prefetch={idx < 2} />
                ))}
              </div>
              <MoreButton href="/en-cok-bakilanlar" />
            </div>
          </section>
        ) : null}

        <CustomerReviews />
      </main>
    </HomeReviewsProvider>
  );
}
