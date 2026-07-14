import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const runtime = "edge";
export const alt = "Mepotia — Güvenin ve Değerin Buluşma Noktası";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoUrl = `${SITE_URL}/mepotia-logo.png`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #050505 0%, #121212 42%, #0a0a0a 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.18,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 36,
            left: 48,
            right: 48,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 13,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            Teknoloji · İkinci El · Güven
          </div>
          <div
            style={{
              padding: "8px 18px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "#ffffff",
              textTransform: "uppercase",
            }}
          >
            Premium Vitrin
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
          width={520}
          height={116}
          alt={SITE_NAME}
          style={{ objectFit: "contain", marginBottom: 28 }}
        />

        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 34,
            fontWeight: 600,
            letterSpacing: "0.06em",
            color: "#ffffff",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.25,
          }}
        >
          Güvenin ve Değerin Buluşma Noktası
        </div>

        <div
          style={{
            width: 120,
            height: 2,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
            marginTop: 22,
            marginBottom: 22,
          }}
        />

        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.72)",
            textAlign: "center",
            maxWidth: 820,
            lineHeight: 1.45,
          }}
        >
          Özenle seçilmiş ikinci el ürünler · Şeffaf fiyat · Doğrudan iletişim
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 48,
            right: 48,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "0.04em",
            }}
          >
            mepotia.com
          </div>
          <div
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Al · Sat · Keşfet
          </div>
        </div>
      </div>
    ),
    size,
  );
}
