import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

function isPrivateIpv4(ip) {
  const [a, b] = ip.split(".").map(Number);
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    a >= 224 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168)
  );
}

function isPrivateIp(ip) {
  if (isIP(ip) === 4) return isPrivateIpv4(ip);
  const normalized = ip.toLowerCase();
  const mappedV4 = normalized.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/)?.[1];
  return (
    normalized === "::1" ||
    normalized === "::" ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd") ||
    normalized.startsWith("fe80:") ||
    Boolean(mappedV4 && isPrivateIpv4(mappedV4))
  );
}

/** Reject non-HTTP(S), loopback, link-local, and private-network targets before server fetches. */
export async function assertSafeExternalUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error("Geçersiz bağlantı.");
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("Yalnızca HTTP(S) bağlantıları kullanılabilir.");
  }
  if (url.username || url.password || url.hostname === "localhost") {
    throw new Error("Yerel ağ bağlantılarına izin verilmiyor.");
  }

  const addresses = await lookup(url.hostname, { all: true, verbatim: true });
  if (!addresses.length || addresses.some(({ address }) => isPrivateIp(address))) {
    throw new Error("Yerel ağ bağlantılarına izin verilmiyor.");
  }
  return url;
}
