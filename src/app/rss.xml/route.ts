import { siteConfig } from "@/config/site";
import { getPublishedArticles } from "@/lib/content/blog";
import { getAbsoluteUrl } from "@/lib/metadata/create-page-metadata";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const articles = getPublishedArticles();
  const feedUrl = getAbsoluteUrl("/rss.xml");
  const blogUrl = getAbsoluteUrl("/blog");
  const latestDate = articles.length
    ? new Date(`${articles[0].metadata.date}T00:00:00Z`).toUTCString()
    : new Date().toUTCString();

  const items = articles
    .map(({ metadata }) => {
      const url = getAbsoluteUrl(`/blog/${metadata.slug}`);
      const pubDate = new Date(`${metadata.date}T00:00:00Z`).toUTCString();
      const categories = metadata.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join("\n");

      return `    <item>
      <title>${escapeXml(metadata.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(metadata.description)}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(metadata.author)}</author>
${categories}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet href="/rss-style.xsl" type="text/xsl"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} — Technical Blog</title>
    <link>${blogUrl}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>${siteConfig.locale}</language>
    <lastBuildDate>${latestDate}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
