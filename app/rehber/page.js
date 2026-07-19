import Link from "next/link";
import {
  ArrowUpRight,
  BookOpenCheck,
  Cable,
  Gamepad2,
  GraduationCap,
  Headphones,
  Laptop,
  ListChecks,
  Package,
  Scale,
  Shield,
  Smartphone,
  Tablet,
  Watch,
} from "lucide-react";
import { BUYING_GUIDE_LIST } from "@/lib/buyingGuides";

export const metadata = {
  title: "Satın alma rehberleri | Mepotia",
  description:
    "Mepotia'da doğru ürünü seçmene yardımcı premium satın alma rehberleri — adım adım anlatım, kontrol listeleri ve kategori vitrinleri.",
};

const ICONS = {
  "telefon-alma-rehberi": Smartphone,
  "bilgisayar-alma-rehberi": Laptop,
  "tablet-alma-rehberi": Tablet,
  "kulaklik-alma-rehberi": Headphones,
  "kilif-alma-rehberi": Shield,
  "sarj-alma-rehberi": Cable,
  "aksesuar-alma-rehberi": Package,
  "akilli-saat-alma-rehberi": Watch,
  "oyun-alma-rehberi": Gamepad2,
};

const APPROACH = [
  {
    icon: GraduationCap,
    title: "Öğren",
    text: "Her kategori için sade, uzman adımlarla neye dikkat edeceğini öğren.",
  },
  {
    icon: ListChecks,
    title: "Kontrol et",
    text: "İkinci elde ürünü teslim almadan önce kullanacağın net kontrol listeleri.",
  },
  {
    icon: Scale,
    title: "Karşılaştır & al",
    text: "Doğru modeli seç, fiyatı karşılaştır ve güvenle satın al.",
  },
];

export default function RehberPage() {
  const totalSteps = BUYING_GUIDE_LIST.reduce(
    (sum, g) => sum + (g.steps?.length || 0),
    0,
  );

  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      {/* Editöryel başlık — hero yok */}
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-bw-950 text-white shadow-[0_8px_20px_-10px_rgba(0,0,0,.6)]">
              <BookOpenCheck className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-bw-400">
                Mepotia · Rehber
              </p>
              <p className="text-sm font-medium text-bw-600">
                Uzman satın alma rehberleri ve kontrol listeleri
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-bw-500">
            <span className="rounded-full border border-bw-200 bg-white px-3 py-1.5">
              {BUYING_GUIDE_LIST.length} rehber
            </span>
            <span className="rounded-full border border-bw-200 bg-white px-3 py-1.5">
              {totalSteps} adım
            </span>
          </div>
        </div>

        <div className="mt-8 max-w-3xl">
          <h1 className="font-display text-3xl font-semibold leading-[1.05] tracking-tight text-bw-950 sm:text-5xl">
            Doğru ürünü, daha güvenle seç.
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-bw-600 sm:text-base">
            Kısa adımlar, net kontrol listeleri ve kategori vitrinleriyle ihtiyacına uygun
            teknolojiyi bul — ikinci elde bile içiniz rahat olsun.
          </p>
        </div>

        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-bw-200 to-transparent" />
      </section>

      {/* Nasıl çalışır — öğretici yaklaşım */}
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-12 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {APPROACH.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="relative overflow-hidden rounded-[1.35rem] border border-bw-200 bg-white p-5 shadow-[0_16px_40px_-36px_rgba(0,0,0,0.4)] sm:p-6"
              >
                <span className="absolute right-5 top-5 font-display text-3xl font-semibold text-bw-100">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-bw-50 text-bw-900">
                  <Icon className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <h2 className="mt-4 text-base font-semibold tracking-tight text-bw-950 sm:text-lg">
                  {item.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-bw-500">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Rehber kartları */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-6 w-[3px] rounded-full bg-gradient-to-b from-bw-300 to-bw-950" />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bw-500">
              Kategoriler
            </p>
            <h2 className="mt-0.5 font-display text-2xl font-semibold tracking-tight text-bw-950 sm:text-3xl">
              Tüm rehberler
            </h2>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
          {BUYING_GUIDE_LIST.map((guide) => {
            const Icon = ICONS[guide.slug] || BookOpenCheck;
            const stepCount = guide.steps?.length || 0;
            const checkCount = guide.checklist?.length || 0;
            return (
              <Link
                key={guide.slug}
                href={`/rehber/${guide.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-[1.35rem] border border-bw-200 bg-white p-5 shadow-[0_16px_40px_-36px_rgba(0,0,0,0.4)] transition duration-300 hover:-translate-y-1 hover:border-bw-300 hover:shadow-[0_30px_60px_-34px_rgba(0,0,0,0.4)] sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-bw-950 text-white transition group-hover:scale-105">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="rounded-full bg-bw-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-bw-500">
                    {guide.shortLabel}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-bw-950 sm:text-xl">
                  {guide.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-bw-500">
                  {guide.description}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-medium text-bw-500">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-bw-200 px-2.5 py-1">
                    <GraduationCap className="h-3.5 w-3.5" /> {stepCount} adım
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-bw-200 px-2.5 py-1">
                    <ListChecks className="h-3.5 w-3.5" /> {checkCount} kontrol
                  </span>
                </div>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-bw-950">
                  <span className="relative">
                    Rehberi oku
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-500 group-hover:w-full" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
