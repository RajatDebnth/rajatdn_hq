import { siteConfig } from "@/config/site";
import { getPublishedArticles } from "@/lib/content/blog";
import { getAbsoluteUrl } from "@/lib/metadata/create-page-metadata";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export function GET() {
  const items = getPublishedArticles().map(({ metadata }) => {
    const url = getAbsoluteUrl(`/blog/${metadata.slug}`);
    return `<item><title>${escapeXml(metadata.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(metadata.description)}</description><pubDate>${new Date(`${metadata.date}T00:00:00Z`).toUTCString()}</pubDate><author>${escapeXml(metadata.author)}</author>${metadata.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("")}</item>`;
  }).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(siteConfig.name)} — Technical Blog</title><link>${getAbsoluteUrl("/blog")}</link><description>${escapeXml(siteConfig.description)}</description><language>${siteConfig.locale}</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
