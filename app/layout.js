import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Outfit, Cinzel } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata = {
  title: "Mepotia — Kişisel Vitrin",
  description:
    "Mepotia kişisel vitrin. Seçilmiş ürünler, profesyonel sunum.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body
        className={`${outfit.variable} ${cinzel.variable} flex min-h-screen flex-col bg-bw-50 text-bw-900 antialiased`}
      >
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
