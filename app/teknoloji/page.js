import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu } from "lucide-react";
import ShareTechPostButtons from "@/components/ShareTechPostButtons";
import { formatTechDate, getTechPosts } from "@/lib/techPosts";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function TeknolojiPage() {
  const { data: posts, error } = await getTechPosts({ limit: 48 });

  return (
    <main className="min-h-screen bg-bw-50">
      <section className="relative overflow-hidden border-b border-bw-200 bg-bw-950">
        <div className="story-band-grid absolute inset-0 opacity-20" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-2 text-[10px] tracking-[0.28em] text-bw-400 uppercase">
            <Cpu className="h-3.5 w-3.5" />
            Güncel Haberler
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-wide text-white sm:text-5xl">
            Teknoloji Dünyasından Son Gelişmeler
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-bw-400 sm:text-base">
            Yapay zekâdan akıllı telefonlara, oyunlardan yazılıma kadar en güncel haberler.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {error ? (
          <p className="rounded-2xl border border-dashed border-bw-300 bg-white px-6 py-12 text-center text-sm text-bw-500">
            Supabase&apos;de <code>tech_posts.sql</code> çalıştır.
          </p>
        ) : !posts.length ? (
          <p className="rounded-2xl border border-dashed border-bw-300 bg-white px-6 py-12 text-center text-sm text-bw-500">
            Henüz paylaşım yok.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col overflow-hidden rounded-[1.75rem] border border-bw-200 bg-white shadow-[0_20px_50px_-40px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:border-bw-300"
              >
                <Link href={`/teknoloji/${post.id}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-bw-100">
                    {post.cover_url ? (
                      <Image
                        src={post.cover_url}
                        alt={post.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        sizes="33vw"
                        unoptimized={post.cover_url.includes("supabase.co")}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-bw-950">
                        <Cpu className="h-8 w-8 text-white/25" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-bw-950/50 to-transparent opacity-0 transition group-hover:opacity-100" />
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-semibold tracking-[0.18em] text-bw-400 uppercase">
                      {formatTechDate(post.created_at)}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold text-bw-950 group-hover:text-bw-700">{post.title}</h2>
                    {post.excerpt ? (
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-bw-500">{post.excerpt}</p>
                    ) : null}
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-bw-950">
                      Devamını oku
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
                <div className="border-t border-bw-100 px-5 pb-5">
                  <ShareTechPostButtons
                    compact
                    title={post.title}
                    excerpt={post.excerpt || ""}
                    url={absoluteUrl(`/teknoloji/${post.id}`)}
                    imageUrl={post.cover_url || ""}
                  />
                </div>
              </article>
            ))}
          </div>
        )}

        <Link href="/" className="mt-12 inline-block text-sm font-medium text-bw-600 hover:text-bw-950">
          ← Ana sayfa
        </Link>
      </div>
    </main>
  );
}
