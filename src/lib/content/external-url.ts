export function assertPublicHttpsUrl(value: string, field: string): void {
  let url: URL;
  try { url = new URL(value); } catch { throw new Error(`${field} must be an absolute HTTPS URL`); }

  if (url.protocol !== "https:" || url.username || url.password || ["localhost", "127.0.0.1", "::1"].includes(url.hostname)) {
    throw new Error(`${field} must be a public HTTPS URL without credentials`);
  }

  if ([...url.searchParams.keys()].some((key) => /(?:api.?key|token|secret|password|credential|signature)/i.test(key))) {
    throw new Error(`${field} must not put a credential in its query string`);
  }
}
