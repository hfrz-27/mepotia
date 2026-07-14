import BackHomeLink from "@/components/BackHomeLink";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bw-50 px-4 text-center">
      <p className="font-display text-6xl font-semibold text-bw-950">404</p>
      <p className="max-w-sm text-bw-600">Aradığın sayfa bulunamadı veya taşınmış olabilir.</p>
      <BackHomeLink label="Ana sayfaya dön" variant="button" />
    </div>
  );
}
