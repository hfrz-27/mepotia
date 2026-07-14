"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppHelpButton from "@/components/WhatsAppHelpButton";
import GlobalNewsDrawer from "@/components/GlobalNewsDrawer";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const bare = pathname === "/giris" || pathname?.startsWith("/giris/");

  return (
    <>
      <Navbar />
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
