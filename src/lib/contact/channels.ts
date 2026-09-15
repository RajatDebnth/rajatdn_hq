import { siteConfig } from "@/config/site";

function httpsUrl(value: string | null, name: string, expectedHost?: string): string | null {
  if (!value) return null;
  let url: URL;
  try { url = new URL(value); } catch { throw new Error(`${name} must be an absolute HTTPS URL`); }
  if (url.protocol !== "https:" || url.username || url.password) throw new Error(`${name} must be an HTTPS URL without credentials`);
  if (expectedHost && url.hostname !== expectedHost && url.hostname !== `www.${expectedHost}`) throw new Error(`${name} must point to ${expectedHost}`);
  return url.toString();
}

function emailAddress(value: string | null): string | null {
  if (!value) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) throw new Error("CONTACT_EMAIL must be a valid public email address");
  return value;
}

export function getContactChannels() {
  return {
    formEndpoint: httpsUrl(siteConfig.contact.formEndpoint, "CONTACT_FORM_ENDPOINT"),
    email: emailAddress(siteConfig.contact.email),
    linkedInUrl: httpsUrl(siteConfig.contact.linkedInUrl, "CONTACT_LINKEDIN_URL", "linkedin.com"),
    gitHubUrl: httpsUrl(siteConfig.contact.gitHubUrl, "CONTACT_GITHUB_URL", "github.com"),
  };
}
