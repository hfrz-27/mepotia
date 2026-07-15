import Link from "next/link";
import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";
import HomeSectionHeader from "@/components/HomeSectionHeader";

export default function HomeContactBand({ whatsapp, phone, email }) {
  const wa = whatsapp ? `https://wa.me/${String(whatsapp).replace(/\D/g, "")}` : "https://wa.me/905059574122";
  const tel = phone ? `tel:${phone}` : null;
  const mail = email ? `mailto:${email}` : "mailto:info@mepotia.com";

  const tiles = [
    { href: wa, external: true, icon: MessageCircle, title: "WhatsApp", cta: "Mesaj gönder" },
    tel ? { href: tel, icon: Phone, title: "Telefon", cta: "Ara" } : null,
    { href: mail, icon: Mail, title: "E-posta", cta: "Mail at" },
    { href: "/iletisim", icon: ArrowRight, title: "İletişim", cta: "Sayfaya git" },
  ].filter(Boolean);

  return (
    <section className="border-y border-bw-200 bg-bw-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <HomeSectionHeader
          eyebrow="Yardım"
          title="Bize ulaş"
          description="WhatsApp, telefon veya e-posta ile doğrudan ulaşabilirsin."
          href="/iletisim"
          linkLabel="İletişim sayfası"
        />

        <div className="flex flex-wrap items-stretch justify-center gap-3 sm:gap-4">
          {tiles.map((tile) => {
            const Icon = tile.icon;
            const className =
              "flex w-36 flex-col items-center rounded-2xl border border-bw-200 bg-white px-4 py-5 text-center transition hover:border-bw-400 hover:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.14)] sm:w-40 sm:py-6";

            const inner = (
              <>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bw-950 text-white">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <p className="mt-3 text-sm font-semibold text-bw-950">{tile.title}</p>
                <span className="mt-1 text-xs text-bw-500">{tile.cta}</span>
              </>
            );

            if (tile.external) {
              return (
                <a key={tile.title} href={tile.href} target="_blank" rel="noreferrer" className={className}>
                  {inner}
                </a>
              );
            }

            return (
              <Link key={tile.title} href={tile.href} className={className}>
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
