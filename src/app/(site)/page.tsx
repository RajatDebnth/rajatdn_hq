import type { Metadata } from "next";
import Link from "next/link";

import { ArticleCard } from "@/components/cards/article-card";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { getPublishedArticles } from "@/lib/content/blog";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata";
import { createWebPageStructuredData } from "@/lib/seo/structured-data";

const homepageDescription = "Rajat Debnath is an AI Engineer building AI products, software, websites and automations that turn operational data into clear action.";

export const metadata: Metadata = createPageMetadata({ title: "AI Engineer", description: homepageDescription, path: "/" });

export default function Home() {
  const articles = getPublishedArticles().slice(0, 5);
  return <>
    <JsonLd data={createWebPageStructuredData({ name: "Rajat Debnath — AI Engineer", description: homepageDescription, path: "/" })} />
    <Container className="reading-width py-12 sm:py-16">
      <section aria-labelledby="intro-title">
        <h1 className="text-3xl sm:text-4xl sm:text-[2.25rem] font-bold tracking-tight text-[var(--foreground)]" id="intro-title">
          Hi, myself Rajat 👋
        </h1>
        <div className="mt-6 space-y-5 text-[1.05rem] leading-[1.6]">
          <p className="text-[var(--foreground)]">
            I am an <span className="inline-pill">AI Engineer</span> based in Agartala, Tripura. I build <span className="inline-pill">AI products</span>, <span className="inline-pill">software</span>, <span className="inline-pill">websites</span> and <span className="inline-pill">automations</span> that turn operational data into clear action.
          </p>
          <p className="text-[var(--muted)]">
            My path started in software development, where I built a reusable component library at <span className="font-medium text-[var(--foreground)]">Yupcha</span>. I later worked with industrial smart-meter data at <span className="font-medium text-[var(--foreground)]">Techno Electric &amp; Engineering Co. Ltd.</span>, focusing on processing, analysis, and reliable operational reporting.
          </p>
          <p className="text-[var(--muted)]">
            Today, I work with <span className="font-medium text-[var(--foreground)]">Kyma AI Innovations</span>, contributing to production-oriented AI products, RAG pipelines, SaaS development, integration, and deployment.
          </p>
          <p className="text-[var(--muted)]">
            I am especially interested in the full journey from raw data to a dependable system: understanding the context, designing the pipeline, connecting models to software, and making the result useful to people.
          </p>
          <p className="text-[var(--muted)]">
            I write about production AI, data infrastructure, automation, and the engineering lessons I am learning along the way.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--muted)]">
          <a className="underline-offset-4 hover:text-[var(--foreground)] hover:underline" href={siteConfig.contact.linkedInUrl} rel="noopener noreferrer" target="_blank">LinkedIn<span className="sr-only"> (opens in a new tab)</span></a>
          <a className="underline-offset-4 hover:text-[var(--foreground)] hover:underline" href={siteConfig.contact.gitHubUrl} rel="noopener noreferrer" target="_blank">GitHub<span className="sr-only"> (opens in a new tab)</span></a>
          <Link className="underline-offset-4 hover:text-[var(--foreground)] hover:underline" href="/experiences">Experiences</Link>
        </div>
      </section>
      <section aria-labelledby="writing-title" className="mt-14 border-t border-[var(--line)] pt-10">
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]" id="writing-title">Recent writing</h2>
        <div className="mt-4 divide-y divide-[var(--line)]">{articles.map(({ metadata }) => <ArticleCard article={metadata} compact key={metadata.slug} />)}</div>
        <Link className="mt-6 inline-block text-sm font-medium underline underline-offset-4" href="/blog">All writing →</Link>
      </section>
    </Container>
  </>;
}
