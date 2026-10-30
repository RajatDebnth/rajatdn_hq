import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { blogMdxComponents } from "@/components/blog/mdx-components";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
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
  return { ...metadata, alternates: { canonical }, openGraph: { ...metadata.openGraph, type: "article", url: canonical, publishedTime: data.date, modifiedTime: data.updatedDate ?? data.date, authors: [data.author], tags: [...data.tags], ...(data.image ? { images: [{ url: data.image.src, width: data.image.width, height: data.image.height, alt: data.image.alt }] } : {}) }, twitter: { ...metadata.twitter, ...(data.image ? { images: [data.image.src] } : {}) } };
}

export default async function ArticlePage({ params }: BlogPageProps) {
  const article = getPublishedArticleBySlug((await params).slug);
  if (!article) notFound();
  const data = article.metadata;
  const path = `/blog/${data.slug}` as const;
  const date = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${data.date}T00:00:00Z`));
  const updatedDate = data.updatedDate ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${data.updatedDate}T00:00:00Z`)) : null;
  const adjacent = getAdjacentArticles(data.slug);
  const related = getRelatedArticles(article);
  return <>
    <JsonLd data={createWebPageStructuredData({ name: data.title, description: data.description, path })} />
    <JsonLd data={createArticleStructuredData({ name: data.title, description: data.description, path, publishedAt: data.date, updatedAt: data.updatedDate, topics: data.tags })} />
    <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: data.title, path }])} />
    <article>
      <Container className="reading-width py-12 sm:py-16">
        <header>
          <h1 className="text-3xl sm:text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-[var(--foreground)]">{data.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]"><span>By {data.author}</span><span aria-hidden="true">·</span><time className="font-mono text-xs" dateTime={data.date}>{date}</time>{updatedDate ? <><span aria-hidden="true">·</span><span>Updated <time className="font-mono text-xs" dateTime={data.updatedDate}>{updatedDate}</time></span></> : null}<span aria-hidden="true">·</span><span className="tag">{data.category}</span><span aria-hidden="true">·</span><span className="text-xs">{data.readingTime} min read</span></div>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{data.description}</p>
          {data.tags.length ? <ul aria-label="Article topics" className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-[var(--muted)]">{data.tags.map((tag) => <li key={tag}>#{tag.toLowerCase().replace(/\s+/g, "-")}</li>)}</ul> : null}
        </header>
        {data.image ? <figure className="mt-8"><Image alt={data.image.alt} className="h-auto w-full border border-[var(--line)]" fetchPriority="high" height={data.image.height} sizes="(max-width: 672px) 100vw, 672px" src={data.image.src} width={data.image.width} /><figcaption className="mt-2 text-sm text-[var(--muted)]">{data.image.alt}</figcaption></figure> : null}
        <div className="article-body mt-10"><MDXRemote source={article.body} components={blogMdxComponents} options={{ blockJS: true, blockDangerousJS: true, mdxOptions: { useDynamicImport: false, remarkPlugins: [rejectUnsafeMdx] } }} /></div>
        {data.faq?.length ? <section aria-labelledby="faq-title" className="mt-12 border-t border-[var(--line)] pt-8"><h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]" id="faq-title">Questions and answers</h2><dl className="mt-5 space-y-6">{data.faq.map((item) => <div key={item.question}><dt className="font-semibold">{item.question}</dt><dd className="mt-1 text-[var(--muted)]">{item.answer}</dd></div>)}</dl></section> : null}
        {related.length ? <aside aria-labelledby="related-title" className="mt-12 border-t border-[var(--line)] pt-8"><h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]" id="related-title">Related writing</h2><ul className="mt-4 space-y-2">{related.map(({ metadata }) => <li key={metadata.slug}><Link className="underline underline-offset-4 hover:text-[var(--foreground)]" href={`/blog/${metadata.slug}`}>{metadata.title}</Link></li>)}</ul></aside> : null}
        {(adjacent.previous || adjacent.next) ? <nav aria-label="Article navigation" className="mt-10 grid gap-4 border-t border-[var(--line)] pt-8 text-sm sm:grid-cols-2">{adjacent.previous ? <Link className="underline underline-offset-4" href={`/blog/${adjacent.previous.metadata.slug}`}>← Newer: {adjacent.previous.metadata.title}</Link> : <span />}{adjacent.next ? <Link className="underline underline-offset-4 sm:text-right" href={`/blog/${adjacent.next.metadata.slug}`}>Older: {adjacent.next.metadata.title} →</Link> : null}</nav> : null}
        <p className="mt-10 border-t border-[var(--line)] pt-8 text-sm"><Link className="underline underline-offset-4" href="/blog">← Back to all writing</Link></p>
      </Container>
    </article>
  </>;
}
