import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-bw-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Logo className="h-8" />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-bw-500">
            Mepotia adını Mezopotamya&apos;dan alır. Güvenin, emeğin ve ticaretin köklü
            geçmişinden ilham alan bu isim, bugün dürüst ve şeffaf bir ikinci el
            alışveriş anlayışını temsil eder.
          </p>          <p className="mt-3 text-sm text-bw-500">
            WhatsApp:{" "}
            <a
              href="https://wa.me/905059574122"
              className="font-medium text-bw-900 underline underline-offset-4"
            >
              0505 957 41 22
            </a>
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-bw-900 uppercase">
            Keşfet
          </p>
          <ul className="mt-4 space-y-2 text-sm text-bw-500">
            <li><Link href="/" className="hover:text-bw-950">Vitrin</Link></li>
            <li><Link href="/ara" className="hover:text-bw-950">Keşfet</Link></li>
            <li><Link href="/hakkimizda" className="hover:text-bw-950">Hakkında</Link></li>
            <li><Link href="/en-cok-bakilanlar" className="hover:text-bw-950">En çok bakılanlar</Link></li>
            <li><Link href="/bana-sat" className="hover:text-bw-950">Ürünümü sat</Link></li>
            <li><Link href="/urun-iste" className="hover:text-bw-950">Ürün iste</Link></li>
            <li><Link href="/iletisim" className="hover:text-bw-950">İletişim</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-bw-900 uppercase">
            Yasal
          </p>
          <ul className="mt-4 space-y-2 text-sm text-bw-500">
            <li><Link href="/gizlilik" className="hover:text-bw-950">Gizlilik</Link></li>
            <li><Link href="/kvkk" className="hover:text-bw-950">KVKK</Link></li>
            <li><Link href="/kullanim-sartlari" className="hover:text-bw-950">Kullanım Şartları</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-bw-100 text-center">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-bw-400 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Mepotia. Tüm hakları saklıdır.
        </p>
      </div>    </footer>
  );
}
