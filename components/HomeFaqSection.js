import Link from "next/link";
import { ArrowUpRight, ChevronRight, Plus } from "lucide-react";
import { HOME_FAQ_DEFAULTS } from "@/lib/homeContent";

export default function HomeFaqSection({ content }) {
  const items = HOME_FAQ_DEFAULTS.map(([question, answer], index) => [content[`faq_${index + 1}_q`] || question, content[`faq_${index + 1}_a`] || answer]);
  return (
    <section className="mx-auto max-w-[1368px] px-4 py-14 sm:px-6 sm:py-20">
      <div className="overflow-hidden rounded-[32px] bg-white ring-1 ring-black/[.05] lg:grid lg:grid-cols-[.72fr_1.28fr] lg:rounded-[40px]">
        <div className="relative flex flex-col bg-[#1d1d1f] p-7 text-white sm:p-10 lg:min-h-[650px] lg:p-12">
          <div className="pointer-events-none absolute -left-16 top-1/3 h-64 w-64 rounded-full bg-[#0071e3]/20 blur-[80px]" />
          <div className="relative">
            <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#64d2ff]">{content.faq_eyebrow}</p>
            <h2 className="mt-5 text-[2.9rem] font-semibold leading-[.95] tracking-[-.06em] sm:text-[4.5rem]">{content.faq_title}<br /><span className="text-white/35">{content.faq_accent}</span></h2>
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-white/55">{content.faq_copy}</p>
          </div>
          <div className="relative mt-10 rounded-[22px] border border-white/10 bg-white/[.06] p-5 backdrop-blur-xl lg:mt-auto">
            <p className="text-[13px] font-semibold">{content.faq_support_title}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-white/45">{content.faq_support_copy}</p>
            <Link href="/iletisim" className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[#64d2ff] hover:underline">Destek al <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>

        <div className="px-6 py-4 sm:px-9 sm:py-7 lg:px-12 lg:py-9">
          {items.map(([question, answer], index) => (
            <details key={question} className="group border-b border-black/10 last:border-b-0">
              <summary className="flex min-h-[76px] cursor-pointer list-none items-center justify-between gap-5 py-5 text-left sm:min-h-[82px]">
                <span className="flex items-center gap-4"><span className="hidden text-[10px] font-semibold tracking-[.12em] text-[#a1a1a6] sm:inline">{String(index + 1).padStart(2, "0")}</span><span className="text-[15px] font-semibold leading-snug tracking-[-.025em] text-[#1d1d1f] sm:text-[17px]">{question}</span></span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f] transition duration-300 group-open:rotate-45 group-open:bg-[#1d1d1f] group-open:text-white"><Plus className="h-4 w-4" /></span>
              </summary>
              <div className="pb-6 pl-0 pr-12 sm:pl-9">
                <p className="max-w-2xl text-[13px] leading-relaxed text-[#6e6e73] sm:text-[14px]">{answer}</p>
                {index === items.length - 1 ? <Link href="/sss" className="mt-4 inline-flex items-center text-[12px] font-semibold text-[#0071e3]">Tüm yardım konuları <ChevronRight className="h-4 w-4" /></Link> : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
