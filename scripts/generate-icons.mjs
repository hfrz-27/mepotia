import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

const sourceIcon = readFileSync(join(publicDir, "apple-touch-icon.png"));

async function writePng(name, size) {
  const out = join(publicDir, name);
  await sharp(sourceIcon)
    .resize(size, size, { fit: "cover" })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log("OK", name, size);
}

async function writeIco() {
  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map((size) =>
      sharp(sourceIcon).resize(size, size, { fit: "cover" }).png().toBuffer(),
    ),
  );

  const out = join(publicDir, "favicon.ico");
  const ico = buildIco(pngBuffers, sizes);
  writeFileSync(out, ico);
  console.log("OK favicon.ico", sizes.join(","));
}

function buildIco(buffers, sizes) {
  const count = buffers.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const parts = buffers.map((buf, i) => {
    const size = sizes[i];
    const part = { size, buf, offset };
    offset += buf.length;
    return part;
  });

  const total = offset;
  const out = Buffer.alloc(total);
  out.writeUInt16LE(0, 0);
  out.writeUInt16LE(1, 2);
  out.writeUInt16LE(count, 4);

  parts.forEach((part, i) => {
    const base = 6 + i * 16;
    out.writeUInt8(part.size === 256 ? 0 : part.size, base);
    out.writeUInt8(part.size === 256 ? 0 : part.size, base + 1);
    out.writeUInt8(0, base + 2);
    out.writeUInt8(0, base + 3);
    out.writeUInt16LE(1, base + 4);
    out.writeUInt16LE(32, base + 6);
    out.writeUInt32LE(part.buf.length, base + 8);
    out.writeUInt32LE(part.offset, base + 12);
  });

  parts.forEach((part) => part.buf.copy(out, part.offset));
  return out;
}

await writePng("favicon.png", 192);
await writePng("favicon-48.png", 48);
await writePng("icon-512.png", 512);
await writeIco();
