import Link from "next/link";
import Image from "next/image";
import { formatTechDate } from "@/lib/techPostUtils";

export default function HomeNewsV3({ posts = [] }) {
  if (!posts.length) return null;
  const [a, b, c, ...rest] = posts;

  return (
    <section className="border-t border-white/10 bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:px-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold tracking-[0.3em] text-lime-400 uppercase">Feed</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">Sinyal akışı</h2>
          </div>
          <Link
            href="/teknoloji"
            className="border border-white/20 px-5 py-3 text-xs font-black tracking-wider uppercase hover:border-lime-400 hover:text-lime-400"
          >
            Tüm feed
          </Link>
        </div>

        <div className="grid gap-3 lg:grid-cols-3">
          {[a, b, c].filter(Boolean).map((post, i) => (
            <Link
              key={post.id}
              href={`/teknoloji/${post.id}`}
              className={[
                "group relative overflow-hidden border border-white/10 bg-zinc-950",
                i === 0 ? "min-h-[420px] lg:col-span-2 lg:row-span-2 lg:min-h-full" : "min-h-[200px]",
              ].join(" ")}
            >
              {post.cover_url ? (
                <Image
                  src={post.cover_url}
                  alt={post.title}
                  fill
                  className="object-cover opacity-60 transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                  sizes={i === 0 ? "66vw" : "33vw"}
                />
              ) : (
                <div className="absolute inset-0 bg-zinc-900" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="text-[10px] font-bold tracking-widest text-lime-400 uppercase">
                  {formatTechDate(post.created_at)}
                </p>
                <h3
                  className={[
                    "mt-2 font-black leading-tight",
                    i === 0 ? "text-2xl sm:text-4xl" : "text-lg",
                  ].join(" ")}
                >
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {rest.length ? (
          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {rest.slice(0, 4).map((post) => (
              <Link
                key={post.id}
                href={`/teknoloji/${post.id}`}
                className="border border-white/10 bg-zinc-950 p-4 transition hover:border-lime-400/40"
              >
                <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
                  {formatTechDate(post.created_at)}
                </p>
                <h3 className="mt-2 line-clamp-3 text-sm font-bold leading-snug">{post.title}</h3>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
