import BackHomeLink from "@/components/BackHomeLink";

export default function StaticPage({ title, children }) {
  return (
    <main className="min-h-screen bg-[#f5f5f7] pb-12 sm:pb-20">
      <section className="relative overflow-hidden bg-white text-[#1d1d1f]">
        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
          <BackHomeLink
            label="Ana sayfaya dön"
            className="mb-8"
          />
          <p className="text-[10px] font-semibold tracking-[0.2em] text-[#86868b] uppercase">
            Mepotia · Kurumsal
          </p>
          <h1 className="mt-3 max-w-3xl text-[2.7rem] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[4.7rem]">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-[#6e6e73] sm:text-[17px]">
            Açık bilgi, anlaşılır süreç ve doğrudan iletişim.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <article className="relative rounded-[24px] bg-white p-5 text-[15px] leading-[1.8] text-[#515154] ring-1 ring-black/[0.05] shadow-[0_30px_80px_-48px_rgba(0,0,0,0.5)] sm:rounded-[32px] sm:p-9 sm:text-[16px] lg:p-12 [&_a]:font-semibold [&_a]:text-[#1d1d1f] [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-10 [&_h2]:text-[1.55rem] [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:tracking-[-0.035em] [&_h2]:text-[#1d1d1f] [&_li]:pl-1 [&_p+p]:mt-4 [&_strong]:font-semibold [&_strong]:text-[#1d1d1f] [&_ul]:mt-4 [&_ul]:space-y-2 [&_ul]:rounded-[18px] [&_ul]:bg-[#f5f5f7] [&_ul]:p-5 [&_ul]:pl-9">
          {children}
        </article>
      </div>
    </main>
  );
}
