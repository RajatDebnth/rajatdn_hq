import type { Metadata } from "next";
import Link from "next/link";

import { ArticleCard } from "@/components/cards/article-card";
import { PageHeader } from "@/components/content/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getPublishedArticles } from "@/lib/content/blog";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata";
import { createBreadcrumbStructuredData, createWebPageStructuredData } from "@/lib/seo/structured-data";

const description = "Technical writing by Rajat Nath on production AI systems, industrial data, infrastructure, reliability, and advanced manufacturing.";
const baseMetadata = createPageMetadata({ title: "Technical Blog", description, path: "/blog" });
export const metadata: Metadata = {
  ...baseMetadata,
  alternates: { ...baseMetadata.alternates, types: { "application/rss+xml": [{ url: "/rss.xml", title: "Rajat Nath — Technical Blog RSS" }] } },
};

export default function BlogPage() {
  const articles = getPublishedArticles();
  return <>
    <JsonLd data={createWebPageStructuredData({ name: "Technical Blog", description, path: "/blog" })} />
    <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />
    <Section spacing="wide"><Container>
      <PageHeader breadcrumb={[{ href: "/", label: "Home" }, { label: "Blog" }]} eyebrow="Technical writing" title="Engineering notes and articles" summary="Author-controlled writing about architecture, deployment, observability, and reliability in production AI systems. Drafts are not published." />
      {articles.length ? <div className="mt-12 grid gap-4 md:grid-cols-2">{articles.map(({ metadata: article }) => <ArticleCard article={article} headingLevel={2} key={article.slug} />)}</div> : <p className="mt-12 max-w-[var(--article-width)] border-t border-[var(--line)] pt-8 leading-7 text-[var(--muted)]">No technical articles have been published yet. The blog architecture is ready; the first reviewed article will appear here when it is published.</p>}
      <p className="mt-8 text-sm text-[var(--muted)]">Prefer a feed? <Link className="text-[var(--accent)] underline-offset-4 hover:underline" href="/rss.xml">Subscribe via RSS</Link>.</p>
    </Container></Section>
  </>;
}
