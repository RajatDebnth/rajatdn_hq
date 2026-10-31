import type { Metadata } from "next";
import Link from "next/link";

import { ArticleCard } from "@/components/cards/article-card";
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
  const categories = [...new Set(articles.map(({ metadata }) => metadata.category))];
  return <>
    <JsonLd data={createWebPageStructuredData({ name: "Blogs", description, path: "/blog" })} />
    <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Blogs", path: "/blog" }])} />
    <Container className="reading-width py-12 sm:py-16">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">Blogs</h1>
        <p className="mt-2 text-sm sm:text-[0.9375rem] text-[var(--muted)] leading-relaxed">Five-minute technical breakdowns, behind-the-scenes engineering notes, and practical AI case studies focused on what businesses need to understand and apply.</p>
        {categories.length ? <div aria-label="Article categories" className="mt-6 flex flex-wrap gap-2">{categories.map((category) => <span className="tag text-sm text-[var(--muted)]" key={category}>{category}</span>)}</div> : null}
      </header>
      {articles.length ? <section aria-labelledby="all-writing-title" className="mt-10"><h2 className="sr-only" id="all-writing-title">All technical writing</h2><div className="divide-y divide-[var(--line)]">{articles.map(({ metadata: article }) => <ArticleCard article={article} headingLevel={2} key={article.slug} />)}</div></section> : <p className="mt-10 text-[var(--muted)]">No articles have been published yet.</p>}
      <p className="mt-10 border-t border-[var(--line)] pt-8 text-sm">
        <Link className="underline underline-offset-4 hover:text-[var(--foreground)]" href="/works">
          Explore My Works →
        </Link>
      </p>
    </Container>
  </>;
}
