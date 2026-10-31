import type { MetadataRoute } from "next";

import { getAbsoluteUrl } from "@/lib/metadata/create-page-metadata";
import { getPublishedArticles } from "@/lib/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1 },
    { path: "/works", priority: 0.9 },
    { path: "/blog", priority: 0.8 },
    { path: "/experiences", priority: 0.9 },
  ] as const;

  const blogRoutes = getPublishedArticles().map(({ metadata }) => ({
    url: getAbsoluteUrl(`/blog/${metadata.slug}`),
    lastModified: metadata.updatedDate ?? metadata.date,
    changeFrequency: "monthly" as const,
    priority: metadata.featured ? 0.8 : 0.7,
  }));

  return [...routes.map(({ path, priority }) => ({
    url: getAbsoluteUrl(path),
    changeFrequency: "monthly" as const,
    priority,
  })), ...blogRoutes];
}
