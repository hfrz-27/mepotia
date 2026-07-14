"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/** Mobilde sunucuya 10 haber/sayfa söylemek için URL'e view=mobile ekler. */
export default function TechNewsViewSync() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sync = () => {
      const mobile = window.matchMedia("(max-width: 639px)").matches;
      const current = searchParams.get("view");
      const shouldBeMobile = mobile && current !== "mobile";
      const shouldBeDesktop = !mobile && current === "mobile";

      if (!shouldBeMobile && !shouldBeDesktop) return;

      const params = new URLSearchParams(searchParams.toString());
      if (mobile) params.set("view", "mobile");
      else params.delete("view");

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    };

    sync();
    const mq = window.matchMedia("(max-width: 639px)");
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [pathname, router, searchParams]);

  return null;
}
