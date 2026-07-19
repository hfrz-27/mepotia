import Link from "next/link";
import { ChevronDown, ChevronRight, Mail, MessageCircleMore, Phone } from "lucide-react";

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
    <footer className="mt-auto bg-[#f5f5f7] text-[#1d1d1f]">
      <div className="mx-auto max-w-[1200px] px-4 pt-12 sm:px-6 sm:pt-16">
        <section className="grid overflow-hidden rounded-[28px] bg-black text-white lg:grid-cols-[1.35fr_.65fr] lg:rounded-[32px]">
          <div className="px-7 py-9 sm:px-10 sm:py-11">
            <p className="text-[11px] font-semibold tracking-[0.17em] text-white/42 uppercase">Mepotia destek</p>
            <h2 className="mt-3 max-w-2xl text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[3.3rem]">Teknoloji kararlarında yalnız değilsin.</h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/52">Ürün, fiyat, takas veya satış süreci hakkında Mepotia ile doğrudan iletişime geç.</p>
          </div>
          <div className="flex flex-col justify-center gap-2 border-t border-white/10 p-6 sm:p-8 lg:border-t-0 lg:border-l">
            <a href={wa} target="_blank" rel="noreferrer" className="flex h-11 items-center justify-between rounded-full bg-[#0071e3] px-5 text-[13px] font-semibold text-white hover:bg-[#0077ed]">
              <span className="inline-flex items-center gap-2"><MessageCircleMore className="h-4 w-4" /> WhatsApp</span><ChevronRight className="h-4 w-4" />
            </a>
            <a href={tel} className="flex h-11 items-center justify-between rounded-full bg-white/10 px-5 text-[13px] font-semibold text-white hover:bg-white/15"><span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> Telefon</span><ChevronRight className="h-4 w-4" /></a>
            <a href={mail} className="flex h-11 items-center justify-between rounded-full bg-white/10 px-5 text-[13px] font-semibold text-white hover:bg-white/15"><span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" /> E-posta</span><ChevronRight className="h-4 w-4" /></a>
          </div>
        </section>

        <nav className="grid gap-2 border-b border-black/10 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5" aria-label="Alt menü">
          {COLUMNS.map((column) => (
            <details key={column.title} className="group rounded-[16px] bg-white/65 px-4 py-3 ring-1 ring-black/[.04] open:bg-white" open>
              <summary className="flex cursor-pointer list-none items-center justify-between text-[12px] font-semibold text-[#1d1d1f]">{column.title}<ChevronDown className="h-4 w-4 text-[#86868b] transition group-open:rotate-180" /></summary>
              <ul className="mt-4 space-y-2.5">
                {column.links.map(([href, label]) => <li key={href}><Link href={href} className="text-[12px] text-[#6e6e73] transition hover:text-[#1d1d1f] hover:underline">{label}</Link></li>)}
              </ul>
            </details>
          ))}
        </nav>

        <div className="flex flex-col gap-2 py-5 text-[11px] text-[#86868b] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Mepotia. Tüm hakları saklıdır.</p>
          <p>Güven · Şeffaflık · Doğrudan iletişim</p>
        </div>
      </div>
    </footer>
  );
}
