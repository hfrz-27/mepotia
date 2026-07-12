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
        Telefon:{" "}
        <a
          href="tel:+905059574122"
          className="font-medium text-bw-950 underline underline-offset-4"
        >
          0505 957 41 22
        </a>
      </p>
    </StaticPage>
  );
}
