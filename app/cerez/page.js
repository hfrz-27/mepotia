import StaticPage from "@/components/StaticPage";
import Link from "next/link";

export default function Page() {
  return (
    <StaticPage title="Çerez Politikası">
      <p className="text-sm text-bw-500">
        <strong>Son Güncelleme:</strong> 12 Temmuz 2026
      </p>
      <p>
        Mepotia, ziyaretçilere daha iyi bir kullanıcı deneyimi sunabilmek
        amacıyla çerezlerden (Cookies) yararlanabilir.
      </p>
      <p>Çerezler;</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Site performansını artırmak,</li>
        <li>Sayfa kullanım istatistiklerini analiz etmek,</li>
        <li>Kullanıcı deneyimini geliştirmek</li>
      </ul>
      <p>
        amacıyla kullanılabilir. Tarayıcınızın ayarlarından çerezleri istediğiniz
        zaman silebilir veya devre dışı bırakabilirsiniz.
      </p>
      <p>
        Daha fazla bilgi için{" "}
        <Link
          href="/gizlilik"
          className="font-medium text-bw-950 underline underline-offset-4"
        >
          Gizlilik Politikası
        </Link>{" "}
        sayfasını inceleyebilirsiniz.
      </p>
      <p>
        <strong>Mepotia</strong>
      </p>
      <p>
        E-posta:{" "}
        <a
          href="mailto:mepotiaa@gmail.com"
          className="font-medium text-bw-950 underline underline-offset-4"
        >
          mepotiaa@gmail.com
        </a>
      </p>
      <p>
        İletişim:{" "}
        <a
          href="https://wa.me/905059574122"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-bw-950 underline underline-offset-4"
        >
          WhatsApp ile ulaş
        </a>
      </p>
    </StaticPage>
  );
}
