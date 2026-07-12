import sharp from 'sharp';
import { readFileSync, writeFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const inputPath = join(root, 'public', 'mepotia-logo.png');
const outputPath = join(root, 'public', 'mepotia-logo-light.png');

const BLACK_THRESHOLD = 35; // near-black -> transparent

const image = sharp(inputPath);
const { data, info } = await image
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const out = Buffer.from(data);

for (let i = 0; i < out.length; i += channels) {
  const r = out[i];
  const g = out[i + 1];
  const b = out[i + 2];
  const a = channels === 4 ? out[i + 3] : 255;

  // Skip fully transparent pixels
  if (a === 0) continue;

  // Near-black background -> transparent
  if (r <= BLACK_THRESHOLD && g <= BLACK_THRESHOLD && b <= BLACK_THRESHOLD) {
    out[i] = 0;
    out[i + 1] = 0;
    out[i + 2] = 0;
    out[i + 3] = 0;
    continue;
  }

  // Brighten remaining grey toward white:
  // Map mid-greys up: treat luminance and push toward 255
  const lum = (r + g + b) / 3;
  // Scale: darker greys become lighter white; keep relative shape
  // Map [threshold..255] roughly to [180..255] then boost further toward white
  const t = Math.max(0, Math.min(1, (lum - BLACK_THRESHOLD) / (255 - BLACK_THRESHOLD)));
  // Non-linear brighten toward white
  const bright = Math.round(180 + t * 75); // 180..255
  const boosted = Math.min(255, Math.round(bright + (255 - bright) * 0.55));

  out[i] = boosted;
  out[i + 1] = boosted;
  out[i + 2] = boosted;
  out[i + 3] = a;
}

await sharp(out, { raw: { width, height, channels: 4 } })
  .png()
  .toFile(outputPath);

const st = statSync(outputPath);
console.log('OK', outputPath);
console.log('size_bytes', st.size);
