import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import BuySellAccordion from "@/components/BuySellAccordion";
import ProductCard from "@/components/ProductCard";
import HeroSection from "@/components/HeroSection";
import TechNewsSection from "@/components/TechNewsSection";
import StoryBand from "@/components/StoryBand";
import { getPublishedProducts } from "@/lib/products";
import { getSiteSettings } from "@/lib/categories";
import CustomerReviews from "@/components/CustomerReviews";

const WA = "https://wa.me/905059574122";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, latestRes, featuredRes, popularRes] = await Promise.all([
    getSiteSettings(),
    getPublishedProducts({ limit: 8, orderBy: "created_at" }),
    getPublishedProducts({ limit: 2, featured: true }),
    getPublishedProducts({ limit: 4, orderBy: "views" }),
  ]);
  const latest = latestRes.data;
  const featured = featuredRes.data;
  const popular = popularRes.data;
  const vitrinError = latestRes.error;

  const wa = settings?.whatsapp
    ? `https://wa.me/${String(settings.whatsapp).replace(/\D/g, "")}`
    : WA;

  return (
    <main>
      <HeroSection />

      <TechNewsSection />

      <BuySellAccordion />

      {/* Featured */}
      {featured?.length ? (
        <section className="border-b border-bw-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8">
              <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Özenle Seçilenler</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-wide text-bw-950 sm:text-4xl">
                Yeni Sahibini Bekleyenler
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {featured.map((p, idx) => (
                <ProductCard key={p.id} product={p} prefetch={idx < 2} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Latest vitrin */}
      <section id="vitrin" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Vitrin</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-wide text-bw-950 sm:text-4xl">
              Özenle seçilmiş ürünler
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-bw-500">
              Güvenle sunulan, özenle seçilmiş ikinci el ürünleri keşfedin.
            </p>
          </div>
          <Link href="/ara" className="text-sm font-medium text-bw-600 hover:text-bw-950">
            Tümü
          </Link>
        </div>

        {!latest?.length ? (
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
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {latest.map((p, idx) => (
              <ProductCard key={p.id} product={p} prefetch={idx < 4} />
            ))}
          </div>
        )}
      </section>

      {/* Popular */}
      {popular?.length ? (
        <section className="border-t border-bw-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Popüler</p>
                <h2 className="mt-2 font-display text-3xl font-semibold tracking-wide text-bw-950">
                  En çok bakılanlar
                </h2>
              </div>
              <Link
                href="/en-cok-bakilanlar"
                className="inline-flex items-center gap-2 text-sm font-medium text-bw-600 hover:text-bw-950"
              >
                Tümü
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {popular.map((p, idx) => (
                <ProductCard key={p.id} product={p} prefetch={idx < 2} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CustomerReviews />

      <StoryBand />

      {/* Contact CTA */}
      <section className="border-t border-bw-200 bg-bw-50">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-16 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">İletişim</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-wide text-bw-950">
              Gözünü bir ürün mü aldı?
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-bw-500">
              Ürün hakkında konuşmak için bana doğrudan WhatsApp&apos;tan ulaşabilirsin.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-bw-950 px-6 py-3.5 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <Link
              href="/hakkimizda"
              className="inline-flex items-center gap-2 rounded-2xl border border-bw-300 bg-white px-6 py-3.5 text-sm font-semibold text-bw-900"
            >
              Hakkında
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
