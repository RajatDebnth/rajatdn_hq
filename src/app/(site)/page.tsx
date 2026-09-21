import type { Metadata } from "next";
import Link from "next/link";

import { ArticleCard } from "@/components/cards/article-card";
import { KymaAiLink } from "@/components/content/kyma-ai-link";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { getPublishedArticles } from "@/lib/content/blog";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata";
import { createWebPageStructuredData } from "@/lib/seo/structured-data";

const homepageDescription = "Rajat Debnath is an AI Engineer building data pipelines, automation, and infrastructure that turn operational data into clear action.";

export const metadata: Metadata = createPageMetadata({ title: "AI Engineer", description: homepageDescription, path: "/" });

export default function Home() {
  const articles = getPublishedArticles().slice(0, 5);
  return <>
    <JsonLd data={createWebPageStructuredData({ name: "Rajat Debnath — AI Engineer", description: homepageDescription, path: "/" })} />
    <Container className="reading-width py-12 sm:py-14">
      <section aria-labelledby="intro-title">
        <h1 className="font-serif text-2xl font-semibold" id="intro-title">Hi, myself Rajat 👋</h1>
        <div className="mt-6 space-y-5 text-[1.0625rem] leading-8">
          <p>I am an AI Engineer based in Agartala, Tripura. I build data pipelines, AI products, automation, and the infrastructure that turns operational data into clear action.</p>
          <p>My path started in software development, where I built a reusable component library at Yupcha. I later worked with industrial smart-meter data at Techno Electric &amp; Engineering Co. Ltd., focusing on processing, analysis, and reliable operational reporting.</p>
          <p>Today, I work with <KymaAiLink className="underline underline-offset-4" />, contributing to production-oriented AI products, RAG pipelines, SaaS development, integration, and deployment.</p>
          <p>I am especially interested in the full journey from raw data to a dependable system: understanding the context, designing the pipeline, connecting models to software, and making the result useful to people.</p>
          <p>I write about production AI, data infrastructure, automation, and the engineering lessons I am learning along the way.</p>
        </div>
        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--muted)]">
          <a className="underline-offset-4 hover:text-[var(--foreground)] hover:underline" href={siteConfig.contact.linkedInUrl} rel="noopener noreferrer" target="_blank">LinkedIn<span className="sr-only"> (opens in a new tab)</span></a>
          <a className="underline-offset-4 hover:text-[var(--foreground)] hover:underline" href={siteConfig.contact.gitHubUrl} rel="noopener noreferrer" target="_blank">GitHub<span className="sr-only"> (opens in a new tab)</span></a>
          <Link className="underline-offset-4 hover:text-[var(--foreground)] hover:underline" href="/experiences">Experiences</Link>
        </div>
      </section>
      <section aria-labelledby="writing-title" className="mt-14 border-t border-[var(--line)] pt-10">
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]" id="writing-title">Recent writing</h2>
        <div className="mt-4 divide-y divide-[var(--line)]">{articles.map(({ metadata }) => <ArticleCard article={metadata} key={metadata.slug} />)}</div>
        <Link className="mt-6 inline-block text-sm underline underline-offset-4" href="/blog">All writing →</Link>
      </section>
    </Container>
  </>;
}
