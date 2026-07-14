import Link from "next/link";
import { ArrowRight, Cpu, Sparkles } from "lucide-react";
import TechNewsMobileScroll from "@/components/TechNewsMobileScroll";
import { getTechPosts } from "@/lib/techPosts";

export default async function TechNewsSection() {
  const { data: posts, error } = await getTechPosts({ limit: 8 });

  return (
    <section id="teknoloji" className="relative scroll-mt-28 overflow-hidden border-y border-bw-200 bg-white">
      <div className="story-band-grid absolute inset-0 opacity-[0.035]" aria-hidden />
      <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-bw-100 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.28em] text-bw-500 uppercase">
            <Sparkles className="h-3 w-3 text-bw-700" />
            Güncel Haberler
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-wide text-bw-950">
            Teknoloji Dünyasından Son Gelişmeler
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-bw-600">
            Yapay zekâdan akıllı telefonlara, oyunlardan yazılıma kadar en güncel haberler.
          </p>
        </div>

        {error ? (
          <div className="mt-6 rounded-2xl border border-dashed border-bw-300 bg-bw-50 px-6 py-8 text-center text-sm text-bw-600">
            Supabase&apos;de <code className="text-bw-950">tech_posts.sql</code> çalıştır.
          </div>
        ) : !posts.length ? (
          <div className="mt-6 rounded-2xl border border-dashed border-bw-300 bg-bw-50 px-6 py-10 text-center">
            <Cpu className="mx-auto h-7 w-7 text-bw-300" />
            <p className="mt-2 text-sm font-medium text-bw-700">Henüz paylaşım yok</p>
            <p className="mt-1 text-xs text-bw-500">Yönetim → Teknoloji yazıları</p>
          </div>
        ) : (
          <>
            <TechNewsMobileScroll posts={posts} />

            <div className="mt-6 flex justify-center">
              <Link
                href="/teknoloji"
                prefetch
                className="inline-flex items-center gap-2 rounded-xl bg-bw-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-bw-800"
              >
                Daha fazla gör
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
