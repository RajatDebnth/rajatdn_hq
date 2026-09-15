import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { blogMdxComponents } from "@/components/blog/mdx-components";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { PageHeader } from "@/components/content/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag-list";
import { getAdjacentArticles, getArticleCanonicalUrl, getPublishedArticleBySlug, getPublishedArticles, getRelatedArticles } from "@/lib/content/blog";
import { rejectUnsafeMdx } from "@/lib/content/mdx-security";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata";
import { createArticleStructuredData, createBreadcrumbStructuredData, createWebPageStructuredData } from "@/lib/seo/structured-data";

type BlogPageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return getPublishedArticles().map(({ metadata }) => ({ slug: metadata.slug })); }

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const article = getPublishedArticleBySlug((await params).slug);
  if (!article) return {};
  const data = article.metadata;
  const metadata = createPageMetadata({ title: data.seoTitle ?? data.title, description: data.seoDescription ?? data.description, path: `/blog/${data.slug}` });
  const canonical = getArticleCanonicalUrl(article);
  return {
    ...metadata,
    alternates: { canonical },
    openGraph: { ...metadata.openGraph, type: "article", url: canonical, publishedTime: data.date, modifiedTime: data.updatedDate ?? data.date, authors: [data.author], tags: [...data.tags],
      ...(data.image ? { images: [{ url: data.image.src, width: data.image.width, height: data.image.height, alt: data.image.alt }] } : {}) },
    twitter: { ...metadata.twitter, ...(data.image ? { images: [data.image.src] } : {}) },
  };
}

export default async function ArticlePage({ params }: BlogPageProps) {
  const article = getPublishedArticleBySlug((await params).slug);
  if (!article) notFound();
  const data = article.metadata;
  const path = `/blog/${data.slug}` as const;
  const adjacent = getAdjacentArticles(data.slug);
  const related = getRelatedArticles(article);
  return <>
    <JsonLd data={createWebPageStructuredData({ name: data.title, description: data.description, path })} />
    <JsonLd data={createArticleStructuredData({ name: data.title, description: data.description, path, publishedAt: data.date, updatedAt: data.updatedDate, topics: data.tags })} />
    <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: data.title, path }])} />
    <article><Section spacing="wide"><Container>
      <PageHeader breadcrumb={[{ href: "/", label: "Home" }, { href: "/blog", label: "Blog" }, { label: data.title }]} eyebrow={data.category} title={data.title} summary={data.description} />
      <div className="mt-7 flex flex-wrap items-center gap-4 font-mono text-xs text-[var(--muted)]"><span>By {data.author}</span><time dateTime={data.date}>{data.date}</time>{data.updatedDate ? <span>Updated <time dateTime={data.updatedDate}>{data.updatedDate}</time></span> : null}<span>{data.readingTime} min read</span>{data.featured ? <Badge>Featured</Badge> : null}</div>
      {data.image ? <figure className="mt-10 max-w-4xl"><Image alt={data.image.alt} className="h-auto w-full border border-[var(--line)]" fetchPriority="high" height={data.image.height} sizes="(max-width: 896px) 100vw, 896px" src={data.image.src} width={data.image.width} /><figcaption className="mt-3 text-sm text-[var(--muted)]">{data.image.alt}</figcaption></figure> : null}
    </Container></Section>
    <Container className="grid gap-10 border-t border-[var(--line)] py-12 lg:grid-cols-[minmax(0,var(--article-width))_16rem] lg:gap-16">
      <div className="min-w-0"><div className="article-body"><MDXRemote source={article.body} components={blogMdxComponents} options={{ blockJS: true, blockDangerousJS: true, mdxOptions: { useDynamicImport: false, remarkPlugins: [rejectUnsafeMdx] } }} /></div>
        {data.faq?.length ? <section aria-labelledby="faq-title" className="mt-12 border-t border-[var(--line)] pt-8"><h2 className="text-2xl font-semibold" id="faq-title">Frequently asked questions</h2><dl className="mt-6 space-y-6">{data.faq.map((item) => <div key={item.question}><dt className="font-semibold">{item.question}</dt><dd className="mt-2 leading-7 text-[var(--muted)]">{item.answer}</dd></div>)}</dl></section> : null}
        <div className="mt-10"><TagList label="Article tags" tags={data.tags} /></div>
        {related.length ? <aside className="mt-12 border-t border-[var(--line)] pt-8" aria-labelledby="related-articles-title"><h2 className="text-xl font-semibold" id="related-articles-title">Related articles</h2><ul className="mt-5 space-y-3">{related.map(({ metadata }) => <li key={metadata.slug}><Link className="text-[var(--accent)] hover:underline" href={`/blog/${metadata.slug}`}>{metadata.title}</Link></li>)}</ul></aside> : null}
        {(adjacent.previous || adjacent.next) ? <nav aria-label="Article navigation" className="mt-12 grid gap-6 border-t border-[var(--line)] pt-8 sm:grid-cols-2">{adjacent.previous ? <Link className="text-[var(--accent)] hover:underline" href={`/blog/${adjacent.previous.metadata.slug}`}>← Newer: {adjacent.previous.metadata.title}</Link> : <span />}{adjacent.next ? <Link className="text-[var(--accent)] hover:underline" href={`/blog/${adjacent.next.metadata.slug}`}>Older: {adjacent.next.metadata.title} →</Link> : null}</nav> : null}
      </div>
      <aside className="lg:sticky lg:top-24 lg:self-start"><TableOfContents headings={article.headings} /></aside>
    </Container></article>
  </>;
}
