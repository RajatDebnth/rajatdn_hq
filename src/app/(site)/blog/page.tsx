import type { Metadata } from "next";
import Link from "next/link";

import { BlogList } from "@/components/blog/blog-list";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { getPublishedArticles } from "@/lib/content/blog";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata";
import { createBreadcrumbStructuredData, createWebPageStructuredData } from "@/lib/seo/structured-data";

const description = "Short technical breakdowns, behind-the-scenes engineering notes, and practical AI case studies for businesses.";
const baseMetadata = createPageMetadata({ title: "Blogs", description, path: "/blog" });
export const metadata: Metadata = { ...baseMetadata, alternates: { ...baseMetadata.alternates, types: { "application/rss+xml": [{ url: "/rss.xml", title: "Rajat Debnath — Blog RSS" }] } } };

export default function BlogPage() {
  const articles = getPublishedArticles();
  const articleMetadataList = articles.map(({ metadata }) => metadata);
  const categories = [...new Set(articleMetadataList.map((meta) => meta.category))];

  return <>
    <JsonLd data={createWebPageStructuredData({ name: "Blogs", description, path: "/blog" })} />
    <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Blogs", path: "/blog" }])} />
    <Container className="reading-width py-12 sm:py-16">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">Blogs({articles.length})</h1>
        <p className="mt-2 text-sm sm:text-[0.9375rem] text-[var(--muted)] leading-relaxed">Five-minute technical breakdowns, behind-the-scenes engineering notes, and practical AI case studies focused on what businesses need to understand and apply.</p>
      </header>

      {articles.length ? (
        <BlogList articles={articleMetadataList} categories={categories} />
      ) : (
        <p className="mt-10 text-[var(--muted)]">No articles have been published yet.</p>
      )}

      <p className="mt-12 border-t border-[var(--line)] pt-8 text-sm">
        <Link className="underline underline-offset-4 hover:text-[var(--foreground)]" href="/works">
          Explore My Works →
        </Link>
      </p>
    </Container>
  </>;
}
