"use client";

import {
  BadgeCheck,
  BadgeDollarSign,
  Handshake,
  ShieldCheck,
} from "lucide-react";

const VALUES = [
  { icon: ShieldCheck, title: "Güven", text: "Şeffaf süreç, net fiyat." },
  { icon: Handshake, title: "Dürüstlük", text: "Abartısız ürün açıklaması." },
  { icon: BadgeDollarSign, title: "Adil değer", text: "Piyasa ile hizalı teklif." },
  { icon: BadgeCheck, title: "Özen", text: "Seçilmiş vitrin, temiz cihaz." },
];

export default function HomeValueBand({ embedded = false }) {
  const grid = (
    <div className="grid gap-px bg-[#2a2a30] sm:grid-cols-2 lg:grid-cols-4">
      {VALUES.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.title} className="bg-[#111114] p-6 sm:p-7">
            <Icon className="h-6 w-6 text-[#ff4d1a]" strokeWidth={1.75} />
            <p className="sx-title mt-4 text-xl">{item.title}</p>
            <p className="mt-2 text-sm text-zinc-400">{item.text}</p>
          </div>
        );
      })}
    </div>
  );

  if (embedded) {
    return <div className="mt-6">{grid}</div>;
  }

  return (
    <section className="sx-section">
      <div className="sx-wrap pb-6">
        <p className="sx-kicker">Neden Mepotia</p>
        <h2 className="sx-title mt-2 text-3xl sm:text-4xl">Dört net söz</h2>
      </div>
      <div className="pb-0">{grid}</div>
    </section>
  );
}
