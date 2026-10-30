import { siteConfig } from "@/config/site";
import { getAbsoluteUrl } from "@/lib/metadata/create-page-metadata";
import type {
  JsonLdValue,
  ProfessionalServiceInput,
  StructuredDataArticleInput,
  StructuredDataPageInput,
} from "@/types/seo";

const schemaContext = "https://schema.org";
const personId = `${siteConfig.url}/#person`;
const websiteId = `${siteConfig.url}/#website`;

export function createPersonStructuredData(): JsonLdValue {
  return {
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    givenName: siteConfig.givenName,
    familyName: siteConfig.familyName,
    jobTitle: siteConfig.professionalTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    knowsAbout: siteConfig.topics,
  };
}

export function createWebsiteStructuredData(): JsonLdValue {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.locale,
    author: { "@id": personId },
  };
}

export function createSiteStructuredData(): JsonLdValue {
  return {
    "@context": schemaContext,
    "@graph": [createPersonStructuredData(), createWebsiteStructuredData()],
  };
}

export function createWebPageStructuredData({
  description,
  name,
  path,
}: StructuredDataPageInput): JsonLdValue {
  const url = getAbsoluteUrl(path);

  return {
    "@context": schemaContext,
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: siteConfig.locale,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
  };
}

export function createArticleStructuredData({
  description,
  name,
  path,
  publishedAt,
  topics = [],
  updatedAt,
}: StructuredDataArticleInput): JsonLdValue {
  const url = getAbsoluteUrl(path);

  return {
    "@context": schemaContext,
    "@type": "Article",
    "@id": `${url}#article`,
    headline: name,
    description,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    author: { "@id": personId },
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    keywords: topics,
  };
}

// Use only on a page that describes a genuine professional service offering.
export function createProfessionalServiceStructuredData({
  areaServed,
  description,
  name,
  path,
  serviceType,
}: ProfessionalServiceInput): JsonLdValue {
  const url = getAbsoluteUrl(path);

  return {
    "@context": schemaContext,
    "@type": "ProfessionalService",
    "@id": `${url}#service`,
    name,
    description,
    url,
    serviceType,
    ...(areaServed ? { areaServed } : {}),
    founder: { "@id": personId },
  };
}

export function createBreadcrumbStructuredData(
  items: readonly { name: string; path: `/${string}` | "/" }[],
): JsonLdValue {
  return {
    "@context": schemaContext,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.path),
    })),
  };
}
