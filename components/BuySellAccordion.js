import Link from "next/link";
import { ArrowRight, ChevronDown, Package, Search } from "lucide-react";

const ACTIONS = [
  {
    href: "/bana-sat",
    icon: Package,
    eyebrow: "Satış teklifi",
    title: "Ürününü Değerlendir",
    text: "Kullanmadığın ürünleri paylaş, doğru değerini birlikte bulalım.",
    cta: "Satış talebi oluştur",
  },
  {
    href: "/urun-iste",
    icon: Search,
    eyebrow: "Aradığını bulalım",
    title: "Ürün Talebi Oluştur",
    text: "Aradığın ürünü yaz; uygun bir seçenek bulduğumda seni haberdar edeyim.",
    cta: "İstek gönder",
  },
];

export default function BuySellAccordion() {
  return (
    <section id="al-sat" className="scroll-mt-28 border-y border-bw-200 bg-bw-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <details className="group overflow-hidden rounded-[1.75rem] border border-bw-200 bg-white shadow-[0_24px_60px_-42px_rgba(0,0,0,0.35)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-7 sm:py-6">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.22em] text-bw-500 uppercase">
                Senin için
              </p>
              <h2 className="mt-1 font-display text-xl font-semibold tracking-wide text-bw-950 sm:text-2xl">
                Ürününü Sat, Aradığını Bul
              </h2>
              <p className="mt-1 text-sm text-bw-500">
                Satış veya ürün isteği için seçenekleri aç.
              </p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bw-950 text-white transition group-open:rotate-180">
              <ChevronDown className="h-4 w-4" />
            </span>
          </summary>

          <div className="grid gap-3 border-t border-bw-100 p-4 sm:grid-cols-2 sm:p-5">
            {ACTIONS.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="group/item rounded-2xl border border-bw-200 bg-bw-50 p-5 transition hover:border-bw-400 hover:bg-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-bw-950 text-white">
                  <action.icon className="h-4 w-4" />
                </span>
                <p className="mt-4 text-[10px] font-semibold tracking-[0.18em] text-bw-500 uppercase">
                  {action.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-wide text-bw-950">
                  {action.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-bw-600">{action.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-bw-950">
                  {action.cta}
                  <ArrowRight className="h-4 w-4 transition group-hover/item:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
