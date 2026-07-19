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
    <footer className="mt-auto bg-[#f5f5f7] text-[#1d1d1f]">
      <div className="mx-auto max-w-[1200px] px-5 pt-10 sm:px-6 sm:pt-12">
        <div className="border-t border-black/15 pt-5">
          <Link href="/" className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#424245] transition hover:text-black">
            <span className="font-serif text-[16px] tracking-[-.04em]">MEPOTIA</span>
            <ChevronRight className="h-3.5 w-3.5 text-[#86868b]" />
            <span className="font-normal">Online Store</span>
          </Link>
        </div>

        <nav className="grid border-b border-black/15 py-5 lg:grid-cols-4 lg:gap-12 lg:py-7" aria-label="Alt menü">
          {COLUMNS.map((column) => (
            <details key={column.title} className="group border-t border-black/10 first:border-t-0 lg:border-0">
              <summary className="flex h-10 cursor-pointer list-none items-center justify-between text-[12px] font-semibold text-[#1d1d1f] lg:h-auto lg:cursor-default">{column.title}<ChevronDown className="h-3.5 w-3.5 text-[#6e6e73] transition group-open:rotate-180 lg:hidden" /></summary>
              <ul className="space-y-2.5 pb-4 lg:mt-3 lg:!block lg:pb-0">
                {column.links.map(([href, label]) => <li key={href}><Link href={href} className="text-[12px] leading-relaxed text-[#424245] transition hover:text-black hover:underline">{label}</Link></li>)}
              </ul>
            </details>
          ))}
        </nav>

        <div className="border-b border-black/15 py-4 text-[11px] leading-relaxed text-[#6e6e73]">
          Teknoloji seçimin için desteğe mi ihtiyacın var? <a href={wa} target="_blank" rel="noreferrer" className="text-[#0066cc] underline">WhatsApp’tan yaz</a>, <a href={tel} className="text-[#0066cc] underline">telefonla ara</a> veya <a href={mail} className="text-[#0066cc] underline">e-posta gönder</a>.
        </div>

        <div className="flex flex-col gap-3 py-5 text-[11px] text-[#6e6e73] lg:flex-row lg:items-center">
          <p className="lg:mr-5">Telif Hakkı © {new Date().getFullYear()} Mepotia. Tüm hakları saklıdır.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/gizlilik" className="hover:text-black hover:underline">Gizlilik Politikası</Link>
            <Link href="/kvkk" className="hover:text-black hover:underline">KVKK</Link>
            <Link href="/kullanim-sartlari" className="hover:text-black hover:underline">Kullanım Şartları</Link>
            <Link href="/sss" className="hover:text-black hover:underline">Yardım</Link>
          </div>
          <p className="lg:ml-auto">Türkiye</p>
        </div>
      </div>
    </footer>
  );
}
