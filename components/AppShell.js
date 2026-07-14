"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppHelpButton from "@/components/WhatsAppHelpButton";

const GlobalNewsDrawer = dynamic(() => import("@/components/GlobalNewsDrawer"), {
  ssr: false,
});

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname?.startsWith("/admin/");
  const bare =
    pathname === "/giris" ||
    pathname?.startsWith("/giris/") ||
    isAdmin;

  return (
    <>
      {isAdmin ? null : <Navbar />}
      <div className="flex-1">{children}</div>
      {bare ? null : (
        <>
          <Footer />
          <WhatsAppHelpButton />
          <GlobalNewsDrawer />
        </>
      )}
    </>
  );
}
