import Link from "next/link";
import { ArrowRight, MessageCircle, Package, Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import HeroSection from "@/components/HeroSection";
import { getPublishedProducts } from "@/lib/products";
import { getSiteSettings } from "@/lib/categories";
import CustomerReviews from "@/components/CustomerReviews";

const WA = "https://wa.me/905059574122";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, latestRes, featuredRes, popularRes] = await Promise.all([
    getSiteSettings(),
    getPublishedProducts({ limit: 8, orderBy: "created_at" }),
    getPublishedProducts({ limit: 4, featured: true }),
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

      {/* Ürün sat + Ürün iste — ana ekran */}
      <section
        id="al-sat"
        className="scroll-mt-28 border-b border-bw-200 bg-bw-50"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">
              Senin için
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-wide text-bw-950 sm:text-4xl">
              Ürününü Sat, Aradığını Bul
            </h2>
            <p className="mt-3 text-base leading-relaxed text-bw-600">
              Satmak istediğin ürünü birlikte değerlendirelim. Aradığın ürünü yaz,
              bulduğum anda seninle iletişime geçeyim.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
            {/* Sat */}
            <Link
              href="/bana-sat"
              className="group relative overflow-hidden rounded-[2rem] bg-bw-950 px-7 py-9 text-white transition duration-500 hover:-translate-y-1 sm:px-10 sm:py-11"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-20 transition duration-500 group-hover:opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.45) 1px, transparent 0)",
                  backgroundSize: "22px 22px",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl transition duration-700 group-hover:scale-125"
              />
              <div className="relative">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                  <Package className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <p className="mt-6 text-[10px] font-semibold tracking-[0.22em] text-bw-400 uppercase">
                  Satış teklifi
                </p>
                <h3 className="mt-3 font-display text-3xl font-semibold tracking-wide sm:text-4xl">
                  Ürününü Değerlendir
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-bw-300">
                  Kullanmadığın ürünler değerini kaybetmesin. Fotoğraflarını paylaş,
                  ürününü değerlendirelim ve doğru alıcıyla buluşturalım.
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Satış Talebi Oluştur
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>

            {/* İste */}
            <Link
              href="/urun-iste"
              className="group relative overflow-hidden rounded-[2rem] border border-bw-200 bg-white px-7 py-9 text-bw-950 transition duration-500 hover:-translate-y-1 hover:border-bw-400 sm:px-10 sm:py-11"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-bw-100 blur-2xl transition duration-700 group-hover:scale-125"
              />
              <div className="relative">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-bw-200 bg-bw-50 text-bw-900">
                  <Search className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <p className="mt-6 text-[10px] font-semibold tracking-[0.22em] text-bw-400 uppercase">
                  Aradığını Bulalım
                </p>
                <h3 className="mt-3 font-display text-3xl font-semibold tracking-wide sm:text-4xl">
                  Ürün Talebi Oluştur
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-bw-500">
                  Aradığın ürünü bulmak bazen zaman alabilir. Talebini bırak; sana uygun
                  bir seçenek bulduğumda ilk seni haberdar edeyim.
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-bw-950">
                  İstek gönder
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Story band */}
      <section className="relative overflow-hidden border-b border-bw-200">
        <div className="absolute inset-0 bg-bw-950" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-xs tracking-[0.25em] text-bw-400 uppercase">Hikâye</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold tracking-wide text-white sm:text-4xl lg:text-5xl">
            Geçmişten Gelen Güven
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-bw-300 sm:text-lg">
            <strong className="font-semibold text-white">Mepotia</strong>, adını insanlık
            tarihinin en köklü medeniyetlerinden biri olan{" "}
            <strong className="font-semibold text-white">Mezopotamya</strong>&apos;dan alır.
            Güvenin, emeğin ve ticaretin temellerinin atıldığı bu topraklardan ilham alan
            Mepotia; bugün dürüstlük, şeffaflık ve güven üzerine kurulan kişisel bir
            ikinci el vitrindir.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-bw-300 sm:text-lg">
            Bu marka, büyük imkânlarla değil; genç yaşta kurulan hayaller, sabır ve emekle
            adım adım inşa edildi. Burada yer alan her ürün özenle seçilir, tüm detayları
            açıkça paylaşılır ve güvenle yeni sahibine ulaşması hedeflenir.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-bw-300 sm:text-lg">
            Mepotia için ikinci el sadece bir alışveriş değil; değerlere sahip çıkmanın,
            israfı azaltmanın ve güvene dayalı bir topluluk oluşturmanın bir yoludur.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-bw-400">
            Amacım sadece ürün satmak değil; her alışverişte güven oluşturmak. Değerini
            koruyan ürünleri şeffaf bir şekilde sunuyor, alıcılarla doğrudan iletişim
            kurarak güvenilir ve samimi bir alışveriş deneyimi sunuyorum.
          </p>
          <Link
            href="/hakkimizda"
            className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-bw-950 transition hover:bg-bw-100"
          >
            Mepotia&apos;yı Tanı
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

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
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p, idx) => (
                <ProductCard key={p.id} product={p} large={idx === 0} />
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
            {latest.map((p) => (
              <ProductCard key={p.id} product={p} />
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
              {popular.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CustomerReviews />

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
