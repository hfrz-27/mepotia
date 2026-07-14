import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const runtime = "edge";
export const alt = "Mepotia — Güvenin ve Değerin Buluşma Noktası";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const HERO_BG =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=70";

async function loadGoogleFont(family, weight) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko",
      },
    },
  ).then((res) => res.text());

  const ttf = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.ttf)\)/);
  if (ttf) return fetch(ttf[1]).then((res) => res.arrayBuffer());

  const woff = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff)\)/);
  if (woff) return fetch(woff[1]).then((res) => res.arrayBuffer());

  return null;
}

export default async function Image() {
  const [inter, cinzel, outfit] = await Promise.all([
    loadGoogleFont("Inter", 600),
    loadGoogleFont("Cinzel", 600),
    loadGoogleFont("Outfit", 500),
  ]);

  const fonts = [];
  const interData = inter || outfit || cinzel;
  if (interData) {
    fonts.push({ name: "Inter", data: interData, weight: 600, style: "normal" });
  }
  if (cinzel) fonts.push({ name: "Cinzel", data: cinzel, weight: 600, style: "normal" });
  if (outfit) fonts.push({ name: "Outfit", data: outfit, weight: 500, style: "normal" });

  if (!fonts.length) {
    throw new Error("OG image fonts could not be loaded");
  }

  const display = cinzel ? "Cinzel" : "Inter";
  const sans = outfit ? "Outfit" : "Inter";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#09090b",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_BG}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.32,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(9,9,11,0.94) 0%, rgba(24,24,27,0.88) 45%, rgba(9,9,11,0.96) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.22,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 18,
            border: "1px solid rgba(201,169,98,0.35)",
            borderRadius: 4,
            display: "flex",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "52px 72px 48px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              maxWidth: 980,
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 28,
            }}
          >
            <div
              style={{
                fontFamily: sans,
                fontSize: 11,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Teknoloji · İkinci El · Güven
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 16px",
                borderRadius: 999,
                border: "1px solid rgba(201,169,98,0.45)",
                background: "rgba(201,169,98,0.12)",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#c9a962",
                }}
              />
              <div
                style={{
                  fontFamily: sans,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#e8d5a8",
                }}
              >
                Premium Vitrin
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: 980,
              padding: "44px 56px 40px",
              borderRadius: 32,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.07)",
              boxShadow: "0 40px 100px -40px rgba(0,0,0,0.85)",
            }}
          >
            <div
              style={{
                fontFamily: display,
                fontSize: 72,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#ffffff",
                lineHeight: 1,
              }}
            >
              {SITE_NAME.toUpperCase()}
            </div>

            <div
              style={{
                width: 64,
                height: 3,
                marginTop: 22,
                marginBottom: 22,
                background: "linear-gradient(90deg, transparent, #c9a962, transparent)",
              }}
            />

            <div
              style={{
                fontFamily: display,
                fontSize: 30,
                fontWeight: 600,
                letterSpacing: "0.04em",
                color: "#ffffff",
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              Güvenin ve Değerin Buluşma Noktası
            </div>

            <div
              style={{
                fontFamily: sans,
                fontSize: 20,
                color: "rgba(255,255,255,0.72)",
                textAlign: "center",
                marginTop: 16,
                maxWidth: 760,
                lineHeight: 1.45,
              }}
            >
              Özenle seçilmiş ikinci el teknoloji · Şeffaf fiyat · Doğrudan iletişim
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              <div
                style={{
                  display: "flex",
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.06)",
                  fontFamily: sans,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.88)",
                }}
              >
                Güvenilir
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.06)",
                  fontFamily: sans,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.88)",
                }}
              >
                Şeffaf
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.06)",
                  fontFamily: sans,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.88)",
                }}
              >
                Premium
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              maxWidth: 980,
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 28,
              paddingTop: 20,
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div
              style={{
                fontFamily: sans,
                fontSize: 22,
                fontWeight: 600,
                color: "#ffffff",
                letterSpacing: "0.06em",
              }}
            >
              mepotia.com
            </div>
            <div
              style={{
                fontFamily: sans,
                fontSize: 14,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              Al · Sat · Keşfet
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    },
  );
}
