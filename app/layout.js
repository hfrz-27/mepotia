import AppShell from "@/components/AppShell";
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
  title: "Mepotia | Güvenin ve Değerin Buluşma Noktası",
  description:
    "Mepotia — güvenin ve değerin buluşma noktası. Kişisel ikinci el vitrin.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body
        className={`${outfit.variable} ${cinzel.variable} flex min-h-screen flex-col bg-bw-50 text-bw-900 antialiased`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
