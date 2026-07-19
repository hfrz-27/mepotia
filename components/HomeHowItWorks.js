import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Camera,
  HandCoins,
  MessageCircleMore,
  PackageSearch,
  ScanSearch,
} from "lucide-react";

const BUY_STEPS = [
  {
    icon: ScanSearch,
    title: "Ürünü keşfet",
    text: "Kategori, arama ve karşılaştırma araçlarıyla doğru modeli bul.",
  },
  {
    icon: BadgeCheck,
    title: "Detayları incele",
    text: "Fiyatı, kondisyonu ve ürün açıklamasını tek ekranda gör.",
  },
  {
    icon: MessageCircleMore,
    title: "Doğrudan iletişime geç",
    text: "Sorunu sor, ürünü netleştir ve WhatsApp üzerinden iletişim kur.",
  },
];

const SELL_STEPS = [
  {
    icon: Camera,
    title: "Cihazını anlat",
    text: "Model, kondisyon ve fotoğrafları kısa form üzerinden gönder.",
  },
  {
    icon: PackageSearch,
    title: "Değerlendirelim",
    text: "Ürünün bilgileri ve piyasa durumu Mepotia tarafından incelensin.",
  },
  {
    icon: HandCoins,
    title: "Teklifini al",
    text: "Uygunsa doğrudan iletişimle hızlı ve anlaşılır teklif sürecine geç.",
  },
];

function JourneyCard({ eyebrow, title, text, steps, href, cta, dark = false }) {
  return (
    <article
      className={[
        "relative overflow-hidden rounded-[24px] p-5 sm:rounded-[30px] sm:p-8",
        dark
          ? "bg-[#0b0b0f] text-white shadow-[0_30px_70px_-35px_rgba(0,0,0,0.9)]"
          : "bg-white text-[#1d1d1f] ring-1 ring-black/[0.05] shadow-[0_24px_60px_-40px_rgba(0,0,0,0.4)]",
      ].join(" ")}
    >
      {dark ? (
        <>
          <span className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-violet-600/25 blur-3xl" />
          <span className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        </>
      ) : null}

      <div className="relative">
        <p
          className={[
            "text-[10px] font-semibold tracking-[0.15em] uppercase sm:text-[11px]",
            dark ? "text-white/45" : "text-[#86868b]",
          ].join(" ")}
        >
          {eyebrow}
        </p>
        <h3 className="mt-2 text-[1.5rem] font-semibold tracking-[-0.035em] sm:text-[2rem]">
          {title}
        </h3>
        <p
          className={[
            "mt-2 max-w-lg text-[13px] leading-relaxed sm:text-[15px]",
            dark ? "text-white/58" : "text-[#6e6e73]",
          ].join(" ")}
        >
          {text}
        </p>

        <ol className="mt-6 space-y-2.5 sm:mt-7">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li
                key={step.title}
                className={[
                  "grid grid-cols-[auto_1fr] items-start gap-3 rounded-[17px] p-3.5 sm:p-4",
                  dark ? "bg-white/[0.065] ring-1 ring-white/10" : "bg-[#f5f5f7]",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-xl",
                    dark ? "bg-white text-black" : "bg-black text-white",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-[13px] font-semibold sm:text-[14px]">
                    <span className={dark ? "text-white/35" : "text-[#86868b]"}>
                      {index + 1}.{" "}
                    </span>
                    {step.title}
                  </p>
                  <p
                    className={[
                      "mt-0.5 text-[11px] leading-relaxed sm:text-[12px]",
                      dark ? "text-white/48" : "text-[#6e6e73]",
                    ].join(" ")}
                  >
                    {step.text}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <Link
          href={href}
          className={[
            "mt-5 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full px-5 text-[13px] font-semibold transition active:scale-[0.98] sm:mt-6 sm:w-auto sm:text-[14px]",
            dark ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/85",
          ].join(" ")}
        >
          {cta}
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
        </Link>
      </div>
    </article>
  );
}

export default function HomeHowItWorks() {
  return (
    <section className="bg-[#f5f5f7] py-6 sm:py-10" aria-labelledby="home-flow-title">
      <div className="pv-wrap">
        <header className="mx-auto mb-5 max-w-2xl text-center sm:mb-8">
          <p className="text-[10px] font-semibold tracking-[0.15em] text-[#86868b] uppercase sm:text-[11px]">
            Nasıl çalışır?
          </p>
          <h2
            id="home-flow-title"
            className="mt-2 text-[1.6rem] font-semibold tracking-[-0.04em] text-[#1d1d1f] sm:text-[2.5rem]"
          >
            İki yol, tek net süreç.
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[13px] leading-relaxed text-[#6e6e73] sm:text-[16px]">
            Ürün arıyorsan da cihazını satmak istiyorsan da ne olacağı baştan belli.
          </p>
        </header>

        <div className="grid gap-3.5 lg:grid-cols-2 lg:gap-5">
          <JourneyCard
            eyebrow="Alıcı yolculuğu"
            title="Ürünü bul, detayını gör, iletişime geç."
            text="Kalabalık ilanlar arasında kaybolmadan ihtiyacın olan teknolojiye ulaş."
            steps={BUY_STEPS}
            href="/urunler"
            cta="Vitrini keşfet"
          />
          <JourneyCard
            eyebrow="Satıcı yolculuğu"
            title="Cihazını anlat, değerini birlikte bulalım."
            text="İlan açmakla uğraşmadan ürününü doğrudan Mepotia'ya ilet."
            steps={SELL_STEPS}
            href="/bana-sat"
            cta="Cihazını değerlendirmeye gönder"
            dark
          />
        </div>
      </div>
    </section>
  );
}
