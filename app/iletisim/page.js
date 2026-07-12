import StaticPage from "@/components/StaticPage";

export default function Page() {
  return (
    <StaticPage title="İletişim">
      <p>
        Ürünler veya Mepotia hakkında soruların için doğrudan yaz. Kişisel
        vitrin — hızlı ve net dönüş.
      </p>
      <p>
        <strong>Mepotia</strong>
      </p>
      <p>
        WhatsApp / Telefon:{" "}
        <a
          href="https://wa.me/905059574122"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-bw-950 underline underline-offset-4"
        >
          0505 957 41 22
        </a>
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
    </StaticPage>
  );
}
