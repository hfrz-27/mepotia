import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Eye,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Logo from "@/components/Logo";
import { getPublishedProducts } from "@/lib/products";
import { getCategoriesWithSubs, getSiteSettings } from "@/lib/categories";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const categories = await getCategoriesWithSubs();
  const settings = await getSiteSettings();
  const { data: latest } = await getPublishedProducts({
    limit: 8,
    orderBy: "created_at",
  });
  const { data: featured } = await getPublishedProducts({
    limit: 4,
    featured: true,
  });
  const { data: popular } = await getPublishedProducts({
    limit: 4,
    orderBy: "views",
  });
  const { count } = await getPublishedProducts({ limit: 1 });

  const wa = settings?.whatsapp
    ? `https://wa.me/${String(settings.whatsapp).replace(/\D/g, "")}`
    : null;

  const heroFeatured = featured?.[0] || latest?.[0] || null;

  return (
    <main>
      {/* HERO — big, brand-first, light B&W */}
      <section className="relative overflow-hidden border-b border-bw-200">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=80"
            alt=""
            fill
            priority
            className="object-cover object-center grayscale opacity-[0.22]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/85 to-bw-50" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(24,24,27,0.06) 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        <div className="relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-20">
          <div className="lg:col-span-7">
            <div className="animate-fade-up">
              <Logo className="h-11 sm:h-14" priority />
            </div>
            <h1 className="animate-fade-up-delay mt-8 font-display text-5xl leading-[1.05] font-semibold tracking-[0.12em] text-bw-950 uppercase sm:text-6xl lg:text-7xl">
              Mepotia
            </h1>
            <p className="animate-fade-up-delay mt-6 max-w-xl text-lg leading-relaxed text-bw-600 sm:text-xl">
              Kişisel vitrin. Seçtiğim ürünleri burada paylaşıyorum — sade,
              siyah-beyaz, profesyonel.
            </p>
            <div className="animate-fade-up-delay mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#vitrin"
                className="inline-flex items-center gap-2 rounded-2xl bg-bw-950 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-bw-800"
              >
                Vitrine bak
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/ara"
                className="inline-flex items-center gap-2 rounded-2xl border border-bw-300 bg-white px-7 py-3.5 text-sm font-semibold text-bw-900 transition hover:border-bw-500"
              >
                Keşfet
              </Link>
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-medium text-bw-600 transition hover:text-bw-950"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              ) : null}
            </div>
            <div className="mt-12 flex flex-wrap gap-8 border-t border-bw-200/80 pt-8">
              {[
                { label: "Seçilmiş ürün", value: (count || 0).toLocaleString("tr-TR") },
                { label: "Kategori", value: String(categories.length || 0) },
                { label: "Sunum", value: "Siyah · Beyaz" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-semibold text-bw-950">{s.value}</p>
                  <p className="mt-1 text-xs tracking-[0.18em] text-bw-500 uppercase">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            {heroFeatured ? (
              <div className="animate-fade-up relative overflow-hidden rounded-[2rem] border border-bw-200 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={
                      heroFeatured.product_images?.[0]?.url ||
                      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"
                    }
                    alt={heroFeatured.title}
                    fill
                    className="object-cover"
                    sizes="40vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bw-950/90 via-bw-950/40 to-transparent p-6 pt-24">
                    <p className="text-[10px] tracking-[0.2em] text-bw-300 uppercase">Öne çıkan</p>
                    <p className="mt-2 font-display text-xl font-semibold text-white">
                      {heroFeatured.title}
                    </p>
                    <p className="mt-1 text-sm text-bw-200">
                      {Number(heroFeatured.price).toLocaleString("tr-TR")} ₺
                    </p>
                    <Link
                      href={`/urun/${heroFeatured.id}`}
                      className="mt-4 inline-flex text-sm font-medium text-white underline underline-offset-4"
                    >
                      İncele
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex aspect-[4/5] items-center justify-center rounded-[2rem] border border-dashed border-bw-300 bg-white/70">
                <div className="px-8 text-center">
                  <Sparkles className="mx-auto h-8 w-8 text-bw-400" />
                  <p className="mt-4 font-display text-lg text-bw-800">Vitrin boş</p>
                  <p className="mt-2 text-sm text-bw-500">İlk ürününü Paylaş ile ekle.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-bw-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { icon: ShieldCheck, t: "Kişisel seçki", d: "Sadece ben paylaşıyorum" },
            { icon: Eye, t: "Şeffaf vitrin", d: "Net fiyat, net açıklama" },
            { icon: MessageCircle, t: "Hızlı iletişim", d: "WhatsApp ile doğrudan yaz" },
          ].map((item) => (
            <div key={item.t} className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-bw-200 bg-bw-50 text-bw-900">
                <item.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <p className="font-semibold text-bw-950">{item.t}</p>
                <p className="mt-1 text-sm text-bw-500">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      {categories.length ? (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Kategoriler</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-wide text-bw-950 sm:text-4xl">
                Ne bakıyorsun?
              </h2>
            </div>
            <Link href="/ara" className="text-sm font-medium text-bw-600 hover:text-bw-950">
              Tümünü gör
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/kategori/${cat.slug}`}
                className="group rounded-3xl border border-bw-200 bg-white px-5 py-7 text-center shadow-sm transition hover:-translate-y-1 hover:border-bw-900 hover:shadow-lg"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <p className="font-display text-lg font-semibold text-bw-950 group-hover:tracking-wide transition-all">
                  {cat.name}
                </p>
                <p className="mt-2 text-xs text-bw-400">
                  {(cat.subcategories || []).length} alt kategori
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Featured grid */}
      {featured?.length ? (
        <section className="border-y border-bw-200 bg-white">
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

      {/* Campaign band */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-bw-950 px-8 py-12 text-white sm:px-12">
          <p className="text-xs tracking-[0.25em] text-bw-400 uppercase">Mepotia</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-wide sm:text-4xl">
            Her ürün tek tek seçilir, vitrine öyle çıkar.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-bw-300 sm:text-base">
            Kalabalık marketplace değil — kişisel seçki. Beğendiğin üründe WhatsApp
            ile doğrudan yazabilirsin.
          </p>
          <Link
            href="/hakkimizda"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-bw-950"
          >
            Hikâyeyi oku
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Latest */}
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
              Giriş yap → Paylaş ile ilk ürününü vitrine koy.
            </p>
            <Link
              href="/giris"
              className="mt-6 inline-flex rounded-2xl bg-bw-950 px-5 py-3 text-sm font-semibold text-white"
            >
              Giriş
            </Link>
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
            <div className="mb-8">
              <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Popüler</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-wide text-bw-950">
                En çok bakılanlar
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {popular.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* About + contact teaser */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <Link
            href="/hakkimizda"
            className="rounded-[2rem] border border-bw-200 bg-white p-8 transition hover:border-bw-900 sm:p-10"
          >
            <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Hakkında</p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-bw-950">
              Neden Mepotia?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-bw-500">
              Kalabalık değil, seçki. Profesyonel sunum, tek elden paylaşım.
            </p>
          </Link>
          <Link
            href="/iletisim"
            className="rounded-[2rem] border border-bw-200 bg-bw-950 p-8 text-white transition hover:bg-bw-900 sm:p-10"
          >
            <p className="text-xs tracking-[0.22em] text-bw-400 uppercase">İletişim</p>
            <h3 className="mt-3 font-display text-2xl font-semibold">Konuşalım</h3>
            <p className="mt-3 text-sm leading-relaxed text-bw-300">
              Ürün detayında WhatsApp veya iletişim sayfasından yaz.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
