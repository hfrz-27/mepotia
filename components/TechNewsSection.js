import Link from "next/link";
import { ArrowRight, Cpu, Sparkles } from "lucide-react";
import TechNewsCard from "@/components/TechNewsCard";
import { getTechPosts } from "@/lib/techPosts";

export default async function TechNewsSection() {
  const { data: posts, error } = await getTechPosts({ limit: 3 });

  return (
    <section id="teknoloji" className="relative scroll-mt-28 overflow-hidden border-b border-white/10 bg-bw-950">
      <div className="story-band-grid absolute inset-0 opacity-20" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-bw-950 via-bw-900/95 to-bw-950" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.28em] text-bw-400 uppercase">
              <Sparkles className="h-3 w-3 text-amber-300/90" />
              Güncel Haberler
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-wide text-white sm:text-4xl lg:text-5xl">
              Teknoloji Dünyasından Son Gelişmeler
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-bw-400 sm:text-base">
              Yapay zekâdan akıllı telefonlara, oyunlardan yazılıma kadar en güncel haberler.
            </p>
          </div>
          <Link
            href="/teknoloji"
            className="hidden items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 sm:inline-flex"
          >
            Tüm haberler
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {error ? (
          <div className="mt-6 rounded-2xl border border-dashed border-white/20 bg-white/5 px-6 py-8 text-center text-sm text-bw-400">
            Supabase&apos;de <code className="text-bw-200">tech_posts.sql</code> çalıştır.
          </div>
        ) : !posts.length ? (
          <div className="mt-6 rounded-2xl border border-dashed border-white/20 bg-white/5 px-6 py-10 text-center">
            <Cpu className="mx-auto h-7 w-7 text-white/20" />
            <p className="mt-2 text-sm font-medium text-bw-300">Henüz paylaşım yok</p>
            <p className="mt-1 text-xs text-bw-500">Yönetim → Teknoloji yazıları</p>
          </div>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
              {posts.map((post, index) => (
                <TechNewsCard key={post.id} post={post} index={index} featured={index === 0} />
              ))}
            </div>

            <div className="mt-6 flex justify-center sm:hidden">
              <Link
                href="/teknoloji"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
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
