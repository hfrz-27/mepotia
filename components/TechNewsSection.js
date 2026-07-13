import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu, Sparkles } from "lucide-react";
import { formatTechDate, getTechPosts } from "@/lib/techPosts";

function CoverImage({ src, alt, className, sizes, priority = false }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      className={className}
      sizes={sizes}
      unoptimized={src.includes("supabase.co")}
    />
  );
}

export default async function TechNewsSection() {
  const { data: posts, error } = await getTechPosts({ limit: 4 });
  const [featured, ...rest] = posts;

  return (
    <section id="teknoloji" className="relative scroll-mt-28 overflow-hidden border-b border-white/10 bg-bw-950">
      <div className="story-band-grid absolute inset-0 opacity-25" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-bw-950 via-bw-900/95 to-bw-950" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="inline-flex items-center gap-2 text-[10px] tracking-[0.28em] text-bw-400 uppercase">
              <Sparkles className="h-3 w-3 text-amber-300/90" />
              Teknoloji · Haberler
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-wide text-white sm:text-4xl lg:text-5xl">
              Son gelişmeler
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-bw-400 sm:text-base">
              Teknoloji dünyasından haberler, ipuçları ve yeni bilgiler — özenle seçilmiş paylaşımlar.
            </p>
          </div>
          <Link
            href="/teknoloji"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
          >
            Tüm yazılar
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {error ? (
          <div className="mt-10 rounded-2xl border border-dashed border-white/20 bg-white/5 px-6 py-10 text-center text-sm text-bw-400">
            Supabase&apos;de <code className="text-bw-200">tech_posts.sql</code> çalıştır.
          </div>
        ) : !posts.length ? (
          <div className="mt-10 rounded-2xl border border-dashed border-white/20 bg-white/5 px-6 py-12 text-center">
            <Cpu className="mx-auto h-8 w-8 text-white/20" />
            <p className="mt-3 text-sm font-medium text-bw-300">Henüz paylaşım yok</p>
            <p className="mt-1 text-xs text-bw-500">Yönetim → Teknoloji yazıları</p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-12">
            {featured ? (
              <Link
                href={`/teknoloji/${featured.id}`}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 lg:col-span-7 lg:row-span-2"
              >
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px]">
                  {featured.cover_url ? (
                    <CoverImage
                      src={featured.cover_url}
                      alt={featured.title}
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width:1024px) 100vw, 55vw"
                      priority
                    />
                  ) : (
                    <div className="flex h-full min-h-[240px] items-center justify-center bg-bw-900">
                      <Cpu className="h-12 w-12 text-white/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-bw-950 via-bw-950/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <p className="text-[10px] font-semibold tracking-[0.2em] text-bw-300 uppercase">
                      Öne çıkan · {formatTechDate(featured.created_at)}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
                      {featured.title}
                    </h3>
                    {featured.excerpt ? (
                      <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-relaxed text-bw-300 sm:text-base">
                        {featured.excerpt}
                      </p>
                    ) : null}
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                      Oku
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ) : null}

            <div className="flex flex-col gap-4 lg:col-span-5">
              {rest.map((post) => (
                <Link
                  key={post.id}
                  href={`/teknoloji/${post.id}`}
                  className="group flex gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:border-white/20 hover:bg-white/[0.08]"
                >
                  <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-bw-900">
                    {post.cover_url ? (
                      <CoverImage
                        src={post.cover_url}
                        alt={post.title}
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="112px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Cpu className="h-6 w-6 text-white/20" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 py-1">
                    <p className="text-[10px] font-semibold tracking-wide text-bw-500 uppercase">
                      {formatTechDate(post.created_at)}
                    </p>
                    <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-white group-hover:text-bw-200">
                      {post.title}
                    </h3>
                    {post.excerpt ? (
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-bw-400">{post.excerpt}</p>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
