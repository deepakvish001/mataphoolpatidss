export const normalizePartnerName = (value: string) => value.trim().replace(/\s+/g, " ");
export const isValidPartnerWebsite = (value: string) => {
  try { const url = new URL(value); return url.protocol === "https:"; } catch { return false; }
};
