import { Eye, Handshake, ShieldCheck, Sparkles } from "lucide-react";

const VALUES = [
  { icon: ShieldCheck, title: "Güvenle al, güvenle sat", text: "Şeffaf fiyat" },
  { icon: Eye, title: "Şeffaf vitrin", text: "Net açıklama" },
  { icon: Handshake, title: "Dürüst ticaret", text: "Köklü güven" },
  { icon: Sparkles, title: "Premium deneyim", text: "Sade arayüz" },
];

export default function HomeValueBand({ embedded = false }) {
  const content = (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      {VALUES.map((item) => (
        <div
          key={item.title}
          className="flex w-44 items-center gap-3 rounded-2xl border border-bw-200 bg-bw-50/80 px-4 py-3 sm:w-48"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bw-950 text-white">
            <item.icon className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <div className="min-w-0 text-left">
            <p className="text-xs font-semibold text-bw-950">{item.title}</p>
            <p className="text-[11px] text-bw-500">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );

  if (embedded) {
    return <div className="mt-6 border-t border-bw-100 pt-6">{content}</div>;
  }

  return (
    <section className="border-y border-bw-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{content}</div>
    </section>
  );
}
