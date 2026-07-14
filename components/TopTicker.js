"use client";

const ITEMS = [
  "Güvenle al · Güvenle sat",
  "Şeffaf fiyat · Net sunum",
  "Özenle seçilmiş ikinci el teknoloji",
  "Mepotia — güvenin buluşma noktası",
  "Dürüst iletişim · Hızlı dönüş",
];

export default function TopTicker() {
  const loop = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden border-b border-white/10 bg-bw-950 py-2">
      <div className="review-marquee-track review-marquee-continuous gap-8 px-4" style={{ "--marquee-duration": "32s" }}>
        {loop.map((text, i) => (
          <span
            key={`${text}-${i}`}
            className="shrink-0 text-[10px] font-medium tracking-[0.18em] text-white/55 uppercase"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
