"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import WhatsAppHelpButton from "@/components/WhatsAppHelpButton";

const GlobalNewsDrawer = dynamic(() => import("@/components/GlobalNewsDrawer"), {
  ssr: false,
});

export default function AppShell({ children, footer }) {
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
          {footer}
          <WhatsAppHelpButton />
          <GlobalNewsDrawer />
        </>
      )}
    </>
  );
}
