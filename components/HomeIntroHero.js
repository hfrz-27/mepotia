"use client";

import HeroSearch from "@/components/HeroSearch";

/**
 * Apple tarzı manşet + arama.
 */
export default function HomeIntroHero() {
  return (
    <section className="bg-[#f5f5f7] pt-8 pb-6 sm:pt-12 sm:pb-10" aria-label="Giriş">
      <div className="pv-wrap">
        {/* En üst — Apple manşet dilinde Mepotia */}
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="text-[1.85rem] font-semibold leading-[1.12] tracking-[-0.04em] text-[#1d1d1f] sm:text-[2.75rem] md:text-[3.25rem]">
            Mepotia deneyimi.
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-[15px] font-normal leading-snug tracking-[-0.015em] text-[#6e6e73] sm:mt-3 sm:text-[19px] md:text-[21px]">
            Güvenilir ikinci el teknolojiyle daha da fazlasını yapın.
          </p>
        </header>

        <div className="mx-auto mt-6 max-w-md sm:mt-8">
          <HeroSearch variant="light" />
        </div>
      </div>
    </section>
  );
}
