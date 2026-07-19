import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

const COLUMNS = [
  {
    title: "Keşfet",
    links: [["/teknoloji", "Haberler"], ["/urunler", "Tüm ürünler"], ["/kategoriler", "Kategoriler"], ["/rehber", "Satın alma rehberi"]],
  },
  {
    title: "Karşılaştır",
    links: [["/fiyat-karsilastir", "Fiyat karşılaştır"], ["/urun-karsilastir", "Özellik karşılaştır"], ["/ara", "Ürün ara"]],
  },
  {
    title: "Mepotia işlemleri",
    links: [["/bana-sat", "Cihazını sat"], ["/takas", "Takas teklifi"], ["/urun-iste", "Ürün iste"]],
  },
  {
    title: "Mepotia",
    links: [["/hakkimizda", "Hakkımızda"], ["/iletisim", "İletişim"], ["/sss", "Sık sorulan sorular"], ["/gizlilik", "Gizlilik"], ["/kvkk", "KVKK"]],
  },
];

export default function Footer({ whatsapp, phone, email }) {
  const wa = whatsapp ? `https://wa.me/${String(whatsapp).replace(/\D/g, "")}` : "https://wa.me/905059574122";
  const tel = phone ? `tel:${phone}` : "tel:05300000000";
  const mail = email ? `mailto:${email}` : "mailto:info@mepotia.com";

  return (
    <footer className="mt-auto overflow-x-clip bg-[#f5f5f7] text-[#1d1d1f]">
      <div className="mx-auto w-full max-w-[1368px] px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="border-t border-black/15 pt-5">
          <Link href="/" className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#424245] transition hover:text-black">
            <span className="font-serif text-[16px] tracking-[-.04em]">MEPOTIA</span>
            <ChevronRight className="h-3.5 w-3.5 text-[#86868b]" />
            <span className="font-normal">Online Store</span>
          </Link>
        </div>

        <nav className="border-b border-black/15 py-4 lg:hidden" aria-label="Mobil alt menü">
          {COLUMNS.map((column) => (
            <details key={column.title} className="group border-t border-black/10 first:border-t-0">
              <summary className="flex h-12 cursor-pointer list-none items-center justify-between text-[12px] font-semibold text-[#1d1d1f]">{column.title}<ChevronDown className="h-3.5 w-3.5 text-[#6e6e73] transition group-open:rotate-180" /></summary>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-3 pb-5">
                {column.links.map(([href, label]) => <li key={href}><Link href={href} className="text-[12px] leading-relaxed text-[#424245] transition hover:text-black hover:underline">{label}</Link></li>)}
              </ul>
            </details>
          ))}
        </nav>

        <nav className="hidden grid-cols-4 gap-12 border-b border-black/15 py-8 lg:grid" aria-label="Alt menü">
          {COLUMNS.map((column) => (
            <section key={column.title}>
              <h2 className="text-[12px] font-semibold text-[#1d1d1f]">{column.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map(([href, label]) => <li key={href}><Link href={href} className="text-[12px] leading-relaxed text-[#424245] transition hover:text-black hover:underline">{label}</Link></li>)}
              </ul>
            </section>
          ))}
        </nav>

        <div className="my-5 flex flex-col gap-4 rounded-[18px] bg-white/70 p-4 text-[11px] leading-relaxed text-[#6e6e73] ring-1 ring-black/[.04] sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p><span className="font-semibold text-[#1d1d1f]">Teknoloji seçimin için yanındayız.</span><br />Sorunu doğrudan Mepotia’ya iletebilirsin.</p>
          <div className="grid grid-cols-3 gap-2 sm:flex">
            <a href={wa} target="_blank" rel="noreferrer" className="rounded-full bg-[#0071e3] px-3 py-2 text-center font-semibold text-white transition hover:bg-[#0077ed]">WhatsApp</a>
            <a href={tel} className="rounded-full bg-white px-3 py-2 text-center font-semibold text-[#1d1d1f] ring-1 ring-black/[.06]">Telefon</a>
            <a href={mail} className="rounded-full bg-white px-3 py-2 text-center font-semibold text-[#1d1d1f] ring-1 ring-black/[.06]">E-posta</a>
          </div>
        </div>

        <div className="border-t border-black/15 py-6 text-center text-[11px] text-[#6e6e73]">
          <p>Telif Hakkı © {new Date().getFullYear()} Mepotia. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
