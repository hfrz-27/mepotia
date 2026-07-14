export const TECH_FEED_STORAGE_KEY = "mepotia-tech-feed-urls";

export function parseFeedInput(text) {
  return (text || "")
    .split(/[\n,]+/)
    .map((part) => normalizeInputUrl(part))
    .filter(Boolean);
}

export function normalizeInputUrl(raw) {
  let trimmed = (raw || "").trim();
  if (!trimmed) return "";
  if (!/^https?:\/\//i.test(trimmed)) trimmed = `https://${trimmed}`;
  return trimmed;
}

export function loadSavedFeedInput() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(TECH_FEED_STORAGE_KEY) || "";
}

export function saveFeedInput(text) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TECH_FEED_STORAGE_KEY, text.trim());
}
