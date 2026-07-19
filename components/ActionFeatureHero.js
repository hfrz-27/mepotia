import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ActionFeatureHero({
  eyebrow,
  title,
  description,
  href,
  actionLabel,
  imageSrc = "/brand/actions/mepotia-action-studio-v2.png",
}) {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 pt-5 sm:px-6 sm:pt-8">
      <div className="grid min-h-[520px] overflow-hidden rounded-[30px] bg-black text-white shadow-[0_28px_80px_-55px_rgba(0,0,0,.65)] lg:grid-cols-2 lg:rounded-[36px]">
        <div className="flex min-h-[430px] flex-col justify-center px-7 py-12 sm:px-12 lg:min-h-[620px] lg:px-16">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-white/42 uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-xl text-[3rem] font-semibold leading-[0.94] tracking-[-0.065em] sm:text-[4.4rem] lg:text-[5rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/52 sm:text-[17px]">
            {description}
          </p>
          {href && actionLabel ? (
            <Link
              href={href}
              className="mt-8 inline-flex h-12 w-fit items-center gap-2 rounded-full bg-[#0071e3] px-6 text-[14px] font-semibold text-white transition hover:bg-[#0077ed]"
            >
              {actionLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>

        <div className="relative min-h-[360px] bg-[#ececef] lg:min-h-[620px]">
          <Image
            src={imageSrc}
            alt="Mepotia teknoloji ürünleri"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
