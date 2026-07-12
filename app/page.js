import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, ShieldCheck, Eye, Heart } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import HeroSearch from "@/components/HeroSearch";
import { getPublishedProducts } from "@/lib/products";
import { getSiteSettings } from "@/lib/categories";

export const revalidate = 60;

const WA = "https://wa.me/905059574122";

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

  const wa = settings?.whatsapp
    ? `https://wa.me/${String(settings.whatsapp).replace(/\D/g, "")}`
    : WA;

  return (
    <main>
      {/* HERO + trust strip yukarı çekilmiş */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2400&q=80"
            alt=""
            fill
            priority
            className="object-cover object-center grayscale opacity-[0.28]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/80 to-bw-50" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-35"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(24,24,27,0.07) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative mx-auto flex min-h-[78vh] max-w-4xl flex-col items-center justify-center px-4 pb-28 pt-16 text-center sm:px-6 lg:px-8">
          <h1 className="animate-fade-up font-display text-5xl leading-[1.02] font-semibold tracking-[0.14em] text-bw-950 uppercase sm:text-6xl lg:text-7xl">
            Mepotia
          </h1>
          <p className="animate-fade-up-delay mt-6 max-w-2xl text-lg leading-relaxed text-bw-600 sm:text-xl">
            Mezopotamya&apos;dan ilham alan kişisel ikinci el vitrin. Her ürün
            tek tek seçilir — güven, şeffaflık ve emekle.
          </p>
          <HeroSearch />
          <div className="animate-fade-up-delay mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#vitrin"
              className="inline-flex items-center gap-2 rounded-2xl bg-bw-950 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-bw-800"
            >
              Vitrine bak
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-bw-300 bg-white/90 px-7 py-3.5 text-sm font-semibold text-bw-900 backdrop-blur transition hover:border-bw-950"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Trust strip — hero içine yukarı çekilmiş şerit */}
        <div className="relative z-10 mx-auto -mt-16 max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-bw-200 bg-white/95 px-5 py-5 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.4)] backdrop-blur sm:grid-cols-3 sm:gap-6 sm:px-8 sm:py-6">
            {[
              {
                icon: ShieldCheck,
                t: "Tek elden seçki",
                d: "Sadece ben paylaşıyorum",
              },
              {
                icon: Eye,
                t: "Şeffaf sunum",
                d: "Net fiyat, net açıklama",
              },
              {
                icon: Heart,
                t: "Zorlu yol",
                d: "17 yaşında başlayan vizyon",
              },
            ].map((item) => (
              <div key={item.t} className="flex items-center gap-3 text-left">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-bw-200 bg-bw-50 text-bw-900">
                  <item.icon className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-bw-950">{item.t}</p>
                  <p className="text-xs text-bw-500">{item.d}</p>
                </div>
              </div>
            ))}
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
            Tekerlekten ilham, ikinci elden güven
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-bw-300 sm:text-lg">
            Mepotia adını Mezopotamya&apos;dan alır — yazının, tekerleğin ve ilk
            şehirlerin doğduğu topraklardan. Bugün bu marka, genç yaşta başlayan
            zorlu bir yolculuğun ürünü: sınırlı imkânlarla, adım adım kurulan
            kişisel bir ikinci el vitrin.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-bw-400">
            Amacım şimdilik net: değerini koruyan ürünleri dürüstçe paylaşmak,
            alıcıyla doğrudan konuşmak ve güven veren bir alışveriş sunmak.
          </p>
          <Link
            href="/hakkimizda"
            className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-bw-950 transition hover:bg-bw-100"
          >
            Tüm hikâyeyi oku
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Ürününü sat */}
      <section className="border-b border-bw-200 bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
          <div>
            <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">
              Satış teklifi
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-wide text-bw-950 sm:text-4xl lg:text-5xl">
              Elindeki ürünü bana sat
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-bw-600">
              Kullanmadığın ama değeri olan bir ürün mü var? Formu doldur,
              fotoğraf ve açıklama ekle. Teklifin doğrudan bana ulaşır —
              WhatsApp veya e-posta ile dönüş yaparım.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-bw-500">
              <li>— Ürün adı, marka, model ve durum</li>
              <li>— Gerçek fotoğraflar</li>
              <li>— İstediğin fiyat ve şehir</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/bana-sat"
                className="inline-flex items-center gap-2 rounded-2xl bg-bw-950 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-bw-800"
              >
                Ürünümü sat
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/urun-iste"
                className="inline-flex items-center gap-2 rounded-2xl border border-bw-300 bg-white px-7 py-3.5 text-sm font-semibold text-bw-900 transition hover:border-bw-950"
              >
                Ürün iste
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-bw-200 bg-bw-50 p-8 sm:p-10">
            <p className="font-display text-2xl font-semibold tracking-wide text-bw-950">
              Nasıl çalışır?
            </p>
            <ol className="mt-6 space-y-5 text-sm leading-relaxed text-bw-600">
              <li>
                <span className="font-semibold text-bw-950">1.</span> Formu
                doldur, ürününü anlat.
              </li>
              <li>
                <span className="font-semibold text-bw-950">2.</span> Fotoğraf
                ekle — net ve gerçek olsun.
              </li>
              <li>
                <span className="font-semibold text-bw-950">3.</span> Gönder;
                WhatsApp (0505 957 41 22) üzerinden konuşalım.
              </li>
            </ol>
            <p className="mt-8 text-xs leading-relaxed text-bw-400">
              Her teklif değerlendirilir. Uygun olanlar vitrine alınır.
            </p>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured?.length ? (
        <section className="border-b border-bw-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8">
              <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Öne çıkan</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-wide text-bw-950 sm:text-4xl">
                Seçtiklerim
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
              Son paylaşılanlar
            </h2>
          </div>
          <Link href="/ara" className="text-sm font-medium text-bw-600 hover:text-bw-950">
            Tümü
          </Link>
        </div>

        {!latest?.length ? (
          <div className="rounded-[2rem] border border-dashed border-bw-300 bg-white px-6 py-20 text-center">
            <p className="font-display text-2xl text-bw-900">Henüz ürün yok</p>
            <p className="mt-2 text-sm text-bw-500">
              Yakında vitrin dolacak. Şimdilik WhatsApp&apos;tan yazabilirsin.
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

      {/* Contact CTA */}
      <section className="border-t border-bw-200 bg-bw-50">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-16 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">İletişim</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-wide text-bw-950">
              Bir ürün beğendin mi?
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-bw-500">
              Doğrudan yaz. WhatsApp: 0505 957 41 22
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
