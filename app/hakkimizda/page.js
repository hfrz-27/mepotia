import StaticPage from "@/components/StaticPage";

export default function Page() {
  return (
    <StaticPage title="Hakkında">
      <p className="text-base font-medium text-bw-800">
        Mepotia, adını Mezopotamya&apos;dan alır — yazının, tekerleğin ve ilk
        şehir yaşamının doğduğu kadim topraklardan.
      </p>
      <p>
        Bugün Mepotia bir kişisel ikinci el vitrindir. Değerini koruyan
        ürünleri tek tek seçer, dürüstçe anlatır ve doğrudan iletişimle
        buluştururum. Büyük vaatler değil; emek, şeffaflık ve güven.
      </p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        Kuruluş hikâyesi
      </h2>
      <p>
        Fikir, girişimci <strong>Hayder Firas Zuhair</strong> tarafından 17
        yaşında ortaya çıktı. Sınırlı imkânlarla, uzun geceler ve sürekli
        öğrenmeyle büyüdü. 18 yaşında e-ticaret alanında somut bir adıma
        dönüştü.
      </p>
      <p>
        Yol kolay olmadı. Güven sorunu, düzensiz satış deneyimleri ve eksik
        bilgi — ikinci el dünyasında herkesin bildiği engeller. Mepotia tam
        da bu yüzden doğdu: kalabalık bir pazar yerine, tek elden seçilmiş,
        net anlatılmış bir vitrin.
      </p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        Şu an ne yapıyoruz?
      </h2>
      <p>
        Şimdilik odak net: <strong>ikinci el ürün satışı</strong>. Her ürün
        özenle kontrol edilir, gerçek görsellerle ve anlaşılır açıklamalarla
        listelenir. Beğendiğin üründe WhatsApp ile doğrudan yazabilirsin.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Tek satıcı — sadece ben paylaşıyorum</li>
        <li>Şeffaf ürün durumu ve fiyat</li>
        <li>Hızlı ve kişisel iletişim</li>
      </ul>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        Vizyon
      </h2>
      <p>
        Uzun vadede hayatı daha kolay, daha hızlı ve daha verimli kılan dijital
        bir ekosistem hayali var. Ama her büyük yol küçük, dürüst adımlarla
        başlar. Bugünün adımı: güvenilir ikinci el vitrin.
      </p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        Misyon
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Kaliteli ikinci el ürünleri güvenle buluşturmak</li>
        <li>Doğru bilgi ve gerçek görsellerle sunmak</li>
        <li>Şeffaf, dürüst ve insan odaklı hizmet vermek</li>
        <li>Adım adım büyüyen bir marka olmak</li>
      </ul>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        Neden Mepotia?
      </h2>
      <p>
        Tıpkı tekerleğin tarihte yarattığı dönüşüm gibi, biz de küçük ama
        anlamlı bir değişim istiyoruz: ikinci el alışverişte güvenin yeniden
        inşa edilmesi. Bugün buradayız — yarının ekosistemi için sağlam bir
        temel atıyoruz.
      </p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        İletişim
      </h2>
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
