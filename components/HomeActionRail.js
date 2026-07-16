import Link from "next/link";
import { ArrowUpRight, HandCoins, Search } from "lucide-react";

const actions = [
  { href: "/bana-sat", icon: HandCoins, eyebrow: "Ürünün var mı?", title: "Bana sat", text: "Hızlı teklif al" },
  { href: "/urun-iste", icon: Search, eyebrow: "Aradığını bulamadın mı?", title: "Ürün iste", text: "Modelini bize yaz" },
];

export default function HomeActionRail() {
  return (
    <section className="border-b border-bw-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <div className="flex gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:overflow-visible">
          {actions.map((action) => {
            const Icon = action.icon;
            return <Link key={action.href} href={action.href} className="group flex min-w-[17rem] flex-1 items-center gap-3 rounded-2xl border border-bw-200 bg-gradient-to-br from-white to-bw-50 px-4 py-3.5 transition hover:-translate-y-0.5 hover:border-bw-400 hover:shadow-[0_18px_35px_-25px_rgba(0,0,0,.35)] sm:min-w-0 sm:px-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bw-950 text-white"><Icon className="h-4 w-4" /></span>
              <span className="min-w-0 flex-1"><span className="block text-[10px] font-semibold tracking-[.14em] text-bw-500 uppercase">{action.eyebrow}</span><span className="mt-0.5 block font-display text-base font-semibold text-bw-950">{action.title}</span><span className="block text-xs text-bw-500">{action.text}</span></span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-bw-400 transition group-hover:text-bw-950" />
            </Link>;
          })}
        </div>
      </div>
    </section>
  );
}
