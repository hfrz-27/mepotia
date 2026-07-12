import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-4 text-center">
      <p className="font-display text-5xl font-semibold text-navy-900">404</p>
      <p className="text-navy-600">Sayfa bulunamadı.</p>
      <Link
        href="/"
        className="rounded-xl bg-navy-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-navy-800"
      >
        Ana sayfaya dön
      </Link>
    </div>
  );
}
