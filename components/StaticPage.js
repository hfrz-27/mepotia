import BackHomeLink from "@/components/BackHomeLink";

export default function StaticPage({ title, children }) {
  return (
    <main className="min-h-screen bg-[#f5f5f7] pb-12 sm:pb-20">
      <section className="relative overflow-hidden bg-[#09090c] text-white">
        <span className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-blue-500/25 blur-[100px]" />
        <span className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-violet-600/20 blur-[100px]" />
        <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <BackHomeLink
            label="Ana sayfaya dön"
            className="mb-8 !border-white/15 !bg-white/10 !text-white/75 hover:!bg-white/15"
          />
          <p className="text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase">
            Mepotia · Kurumsal
          </p>
          <h1 className="mt-3 max-w-3xl text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.05em] sm:text-[4rem]">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-white/52 sm:text-[16px]">
            Açık bilgi, anlaşılır süreç ve doğrudan iletişim.
          </p>
        </div>
      </section>

      <div className="mx-auto -mt-5 max-w-4xl px-4 sm:-mt-8 sm:px-6 lg:px-8">
        <article className="relative rounded-[24px] bg-white p-5 text-[15px] leading-[1.8] text-[#515154] ring-1 ring-black/[0.05] shadow-[0_30px_80px_-48px_rgba(0,0,0,0.5)] sm:rounded-[32px] sm:p-9 sm:text-[16px] lg:p-12 [&_a]:font-semibold [&_a]:text-[#1d1d1f] [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-10 [&_h2]:text-[1.55rem] [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:tracking-[-0.035em] [&_h2]:text-[#1d1d1f] [&_li]:pl-1 [&_p+p]:mt-4 [&_strong]:font-semibold [&_strong]:text-[#1d1d1f] [&_ul]:mt-4 [&_ul]:space-y-2 [&_ul]:rounded-[18px] [&_ul]:bg-[#f5f5f7] [&_ul]:p-5 [&_ul]:pl-9">
          {children}
        </article>
      </div>
    </main>
  );
}
