const ITEMS = [
  "Şeffaf fiyat",
  "Özenli seçim",
  "Hızlı dönüş",
  "Adil teklif",
  "Güvenli süreç",
  "Piyasa radar",
  "Dürüst vitrin",
  "İnsan odaklı",
];

export default function HomeStripV3() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <section className="overflow-hidden border-y border-lime-400 bg-lime-400 py-3.5 text-black">
      <div className="home-v3-marquee flex w-max gap-10 px-4">
        {loop.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="text-sm font-black tracking-[0.2em] whitespace-nowrap uppercase"
          >
            {t} ·
          </span>
        ))}
      </div>
    </section>
  );
}
