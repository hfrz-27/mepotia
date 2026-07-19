import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * Mepotia 2.0 sayfa girişi.
 * Katalog, rehber, haber ve işlem sayfalarında aynı hiyerarşiyi sağlar.
 */
export default function MepotiaPageIntro({
  eyebrow = "Mepotia",
  title,
  description,
  actions = [],
  meta,
  align = "left",
  tone = "light",
}) {
  const dark = tone === "dark";
  const centered = align === "center";

  return (
    <header
      className={[
        "overflow-hidden rounded-[24px] px-5 py-9 sm:rounded-[32px] sm:px-10 sm:py-14 lg:px-14",
        dark ? "bg-[#101010] text-white" : "border border-black/[0.06] bg-white text-[#101010]",
        centered ? "text-center" : "",
      ].join(" ")}
    >
      <div className={centered ? "mx-auto max-w-3xl" : "max-w-3xl"}>
        <p className={["mp-eyebrow", dark ? "!text-white/45" : ""].join(" ")}>{eyebrow}</p>
        <h1
          className={[
            "mt-3 text-[2.45rem] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[4.25rem]",
            dark ? "text-white" : "text-[#101010]",
          ].join(" ")}
        >
          {title}
        </h1>
        {description ? (
          <p
            className={[
              "mt-4 max-w-2xl text-[14px] leading-relaxed sm:text-[17px]",
              centered ? "mx-auto" : "",
              dark ? "text-white/55" : "text-[#696969]",
            ].join(" ")}
          >
            {description}
          </p>
        ) : null}

        {actions.length ? (
          <div className={["mt-6 flex flex-wrap gap-2.5", centered ? "justify-center" : ""].join(" ")}>
            {actions.map((action, index) => (
              <Link
                key={`${action.href}-${action.label}`}
                href={action.href}
                className={[
                  "mp-focus inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-5 text-[13px] font-semibold transition active:scale-[0.98]",
                  index === 0
                    ? dark
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-black text-white hover:bg-black/85"
                    : dark
                      ? "border border-white/15 text-white hover:bg-white/10"
                      : "border border-black/10 bg-white text-black hover:bg-black/[0.04]",
                ].join(" ")}
              >
                {action.label}
                {action.arrow === false ? null : <ArrowUpRight className="h-4 w-4" />}
              </Link>
            ))}
          </div>
        ) : null}
      </div>

      {meta ? (
        <div className={["mt-7 border-t pt-4 text-[11px] font-medium", dark ? "border-white/10 text-white/40" : "border-black/[0.07] text-[#696969]"].join(" ")}>
          {meta}
        </div>
      ) : null}
    </header>
  );
}
