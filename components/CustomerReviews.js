import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Mehmet A.",
    stars: 5,
    text: "Ürün tam tarif edildiği gibiydi. Hızlı iletişim, güvenilir alışveriş — tekrar tercih ederim.",
  },
  {
    name: "Ayşe K.",
    stars: 5,
    text: "Fotoğraflar gerçek, fiyat şeffaf. WhatsApp üzerinden her soruma anında dönüş aldım.",
  },
  {
    name: "Can D.",
    stars: 4,
    text: "Laptop tertemiz geldi, paketleme özenliydi. Mepotia'da alışveriş yapmak keyifli.",
  },
  {
    name: "Zeynep Y.",
    stars: 5,
    text: "İkinci el alışverişte güven arıyordum, burada buldum. Ürün beklentimin üzerindeydi.",
  },
];

function Stars({ count }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} yıldız`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < count ? "fill-amber-400 text-amber-400" : "text-bw-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function CustomerReviews() {
  return (
    <section className="border-t border-bw-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Müşteri yorumları</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-wide text-bw-950 sm:text-4xl">
            Güvenle alışveriş yapanlar
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-bw-500">
            Gerçek alıcılardan geri bildirimler — şeffaflık ve dürüstlük Mepotia&apos;nın temeli.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((review) => (
            <article
              key={review.name}
              className="flex flex-col rounded-3xl border border-bw-200 bg-bw-50/60 p-6 transition hover:border-bw-300 hover:shadow-[0_20px_40px_-28px_rgba(0,0,0,0.35)]"
            >
              <Stars count={review.stars} />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-bw-600">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="mt-5 text-sm font-semibold text-bw-950">{review.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
