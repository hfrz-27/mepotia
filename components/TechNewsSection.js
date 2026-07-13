import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu, ExternalLink } from "lucide-react";
import { formatTechDate, getTechPosts } from "@/lib/techPosts";

export default async function TechNewsSection() {
  const { data: posts, error } = await getTechPosts({ limit: 4 });

  return (
    <section id="teknoloji" className="scroll-mt-28 border-b border-bw-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 text-[10px] tracking-[0.24em] text-bw-500 uppercase">
              <Cpu className="h-3.5 w-3.5" />
              Teknoloji köşesi
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-wide text-bw-950 sm:text-4xl">
              Son haberler &amp; bilgiler
            </h2>
            <p className="mt-2 max-w-xl text-sm text-bw-500">
              Teknoloji dünyasından güncel haberler, ipuçları ve yeni bilgiler.
            </p>
          </div>
          <Link
            href="/teknoloji"
            className="inline-flex items-center gap-2 text-sm font-semibold text-bw-700 hover:text-bw-950"
          >
            Tümünü gör
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {error ? (
          <div className="mt-8 rounded-2xl border border-dashed border-bw-300 bg-bw-50 px-6 py-10 text-center text-sm text-bw-500">
            Teknoloji bölümü için Supabase&apos;de{" "}
            <code className="text-xs">supabase/tech_posts.sql</code> çalıştır.
          </div>
        ) : !posts.length ? (
          <div className="mt-8 rounded-2xl border border-dashed border-bw-300 bg-bw-50 px-6 py-10 text-center">
            <Cpu className="mx-auto h-8 w-8 text-bw-300" />
            <p className="mt-3 text-sm font-medium text-bw-700">Henüz paylaşım yok</p>
            <p className="mt-1 text-xs text-bw-500">
              Yönetim panelinden teknoloji haberi ekleyebilirsin.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {posts.map((post, idx) => (
              <article
                key={post.id}
                className={`group flex flex-col overflow-hidden rounded-3xl border border-bw-200 bg-bw-50/40 transition hover:border-bw-300 hover:shadow-[0_24px_48px_-32px_rgba(0,0,0,0.35)] ${
                  idx === 0 ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                {post.cover_url ? (
                  <div className={`relative overflow-hidden bg-bw-100 ${idx === 0 ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
                    <Image
                      src={post.cover_url}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes={idx === 0 ? "50vw" : "25vw"}
                      unoptimized={post.cover_url.includes("supabase.co")}
                    />
                  </div>
                ) : (
                  <div
                    className={`flex items-center justify-center bg-bw-950 ${idx === 0 ? "aspect-[16/9]" : "aspect-[16/10]"}`}
                  >
                    <Cpu className="h-10 w-10 text-white/30" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-bw-400 uppercase">
                    {formatTechDate(post.created_at)}
                  </p>
                  <h3
                    className={`mt-2 font-semibold text-bw-950 group-hover:text-bw-700 ${
                      idx === 0 ? "text-xl sm:text-2xl" : "text-base line-clamp-2"
                    }`}
                  >
                    {post.title}
                  </h3>
                  {post.excerpt ? (
                    <p className={`mt-2 flex-1 text-sm leading-relaxed text-bw-500 ${idx === 0 ? "line-clamp-3" : "line-clamp-2"}`}>
                      {post.excerpt}
                    </p>
                  ) : null}
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/teknoloji/${post.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-bw-950"
                    >
                      Oku
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </Link>
                    {post.source_url ? (
                      <a
                        href={post.source_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-bw-500 hover:text-bw-800"
                      >
                        Kaynak
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
