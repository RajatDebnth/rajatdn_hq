import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import type { PageMetadataInput } from "@/types/seo";

export function getAbsoluteUrl(path: `/${string}` | "/" = "/") {
  if (path === "/") return siteConfig.url;
  return new URL(path, siteConfig.url).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonical = getAbsoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.openGraphLocale,
      images: [
        {
          url: siteConfig.socialImage.path,
          width: siteConfig.socialImage.width,
          height: siteConfig.socialImage.height,
          alt: siteConfig.socialImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.socialImage.path],
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}
