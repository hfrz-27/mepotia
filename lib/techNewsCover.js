import sharp from "sharp";
import { createHash } from "crypto";

const WIDTH = 1200;
const HEIGHT = 675;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const VIGNETTE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <radialGradient id="v" cx="50%" cy="42%" r="78%">
      <stop offset="52%" stop-color="rgba(0,0,0,0)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.38)"/>
    </radialGradient>
    <linearGradient id="b" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="rgba(0,0,0,0.28)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#v)"/>
  <rect y="${HEIGHT * 0.72}" width="${WIDTH}" height="${HEIGHT * 0.28}" fill="url(#b)"/>
</svg>`;

export function coverStorageKey(title) {
  return createHash("sha256").update(title.trim().toLowerCase()).digest("hex").slice(0, 20);
}

export function isUsablePhotoUrl(url) {
  if (!url || !/^https?:\/\//i.test(url)) return false;
  const lower = url.toLowerCase();
  if (/logo|icon|favicon|avatar|banner-ad|reklam|ads\.|pixel|1x1|emoji|sprite|badge|watermark|filigran|imza|signature/.test(lower)) {
    return false;
  }
  if (/\.(svg|gif)(\?|$)/i.test(lower)) return false;
  return true;
}

export async function generateTechNewsFallbackCover() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a1a1e"/>
      <stop offset="50%" stop-color="#0b0b0d"/>
      <stop offset="100%" stop-color="#16140f"/>
    </linearGradient>
    <radialGradient id="g1" cx="78%" cy="22%" r="40%">
      <stop offset="0%" stop-color="rgba(201,169,98,0.14)"/>
      <stop offset="100%" stop-color="rgba(201,169,98,0)"/>
    </radialGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#g1)"/>
  <circle cx="900" cy="200" r="130" fill="rgba(255,255,255,0.025)"/>
  <circle cx="240" cy="500" r="100" fill="rgba(255,255,255,0.02)"/>
</svg>`;

  return sharp(Buffer.from(svg)).jpeg({ quality: 88 }).resize(WIDTH, HEIGHT).toBuffer();
}

/** Haber fotoğrafı — yazı yok, kaynak sitesinden farklı görünüm */
export async function generateTechNewsVisualCover(photoUrl) {
  if (!isUsablePhotoUrl(photoUrl)) return generateTechNewsFallbackCover();

  try {
    const res = await fetch(photoUrl, {
      headers: { "User-Agent": USER_AGENT, Accept: "image/*" },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return generateTechNewsFallbackCover();

    const input = Buffer.from(await res.arrayBuffer());
    const meta = await sharp(input).metadata();
    if (!meta.width || !meta.height || meta.width < 320 || meta.height < 180) {
      return generateTechNewsFallbackCover();
    }

    const padW = Math.round(WIDTH * 1.45);
    const padH = Math.round(HEIGHT * 1.45);
    const left = Math.round((padW - WIDTH) / 2);
    const top = Math.round((padH - HEIGHT) / 2);

    const photo = await sharp(input)
      .rotate()
      .resize(padW, padH, { fit: "cover", position: "attention" })
      .extract({ left, top, width: WIDTH, height: HEIGHT })
      .modulate({ saturation: 0.62, brightness: 0.84, hue: 12 })
      .linear(1.18, -22)
      .recomb([
        [1.06, 0.05, 0],
        [0.02, 0.94, 0.03],
        [0, 0.05, 1.05],
      ])
      .jpeg({ quality: 90 })
      .toBuffer();

    return sharp(photo)
      .composite([{ input: Buffer.from(VIGNETTE_SVG), blend: "multiply" }])
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer();
  } catch {
    return generateTechNewsFallbackCover();
  }
}
