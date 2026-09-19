import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArticleCard } from "@/components/cards/article-card";
import { KymaAiLink, TextWithKymaAiLink } from "@/components/content/kyma-ai-link";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag-list";
import { siteConfig } from "@/config/site";
import { resumeContent } from "@/content/resume/resume";
import { getPublishedArticles } from "@/lib/content/blog";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata";
import { createWebPageStructuredData } from "@/lib/seo/structured-data";

const skills = ["Machine Learning", "Python", "System Architecture", "RAG Pipelines", "Data Infrastructure", "Automation", "Industrial AI"] as const;
const homepageDescription = "Rajat Debnath is an AI Systems Engineer building data pipelines, automation, and infrastructure that turn operational data into clear action.";

export const metadata: Metadata = createPageMetadata({ title: "AI Systems Engineer", description: homepageDescription, path: "/" });

export default function Home() {
  const articles = getPublishedArticles().slice(0, 2);

  return <>
    <JsonLd data={createWebPageStructuredData({ name: "Rajat Debnath — AI Systems Engineer", description: homepageDescription, path: "/" })} />

    <Section aria-labelledby="hero-title" className="overflow-hidden bg-[var(--dark)] text-white" spacing="wide">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:gap-16">
        <div>
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-[var(--contrast)]">AI Systems Engineer · Agartala, India</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-7xl lg:text-8xl" id="hero-title">Rajat Debnath</h1>
          <p className="mt-6 text-2xl font-medium tracking-tight sm:text-3xl">Messy operational data to clear action.</p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--header-muted)]">I build AI systems, data pipelines, and automation that connect raw operational data to useful products and decisions.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/experiences">See the work behind the systems</ButtonLink>
            <ButtonLink className="border-white/35 text-white hover:border-white hover:bg-white/10" href="/blog" variant="secondary">Read technical writing</ButtonLink>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
            <a className="text-[var(--header-muted)] underline-offset-4 hover:text-[var(--contrast)] hover:underline" href={siteConfig.contact.linkedInUrl} rel="noopener noreferrer" target="_blank">LinkedIn<span className="sr-only"> (opens in a new tab)</span></a>
            <a className="text-[var(--header-muted)] underline-offset-4 hover:text-[var(--contrast)] hover:underline" href={siteConfig.contact.gitHubUrl} rel="noopener noreferrer" target="_blank">GitHub<span className="sr-only"> (opens in a new tab)</span></a>
          </div>
        </div>
        <figure className="mx-auto w-full max-w-md border border-white/15 bg-white/5 p-3 lg:justify-self-end">
          <Image alt="Portrait of Rajat Debnath" className="aspect-[3/4] h-auto w-full object-cover object-top" height={853} priority sizes="(max-width: 1024px) 448px, 32vw" src="/images/rajat-debnath.png" width={641} />
        </figure>
      </Container>
    </Section>

    <Section aria-labelledby="what-i-do-title">
      <Container className="grid gap-8 md:grid-cols-[0.75fr_1.25fr] md:gap-14">
        <div><p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">What I do</p><h2 className="mt-3 text-3xl font-semibold tracking-tight" id="what-i-do-title">Build the system around the model.</h2></div>
        <p className="max-w-[var(--article-width)] text-lg leading-8 text-[var(--muted)]">I work across data processing, AI product infrastructure, RAG pipelines, software integration, deployment, and automation. The goal is simple: make data and AI useful in real workflows.</p>
      </Container>
    </Section>

    <Section aria-labelledby="about-title" className="border-y border-[var(--line)] bg-[var(--surface)]" id="about">
      <Container className="grid gap-10 lg:grid-cols-[16rem_minmax(0,var(--article-width))] lg:gap-16">
        <div><p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">About</p><h2 className="mt-3 text-3xl font-semibold tracking-tight" id="about-title">Engineering from context to operation</h2><div className="mt-7"><TagList label="Core skills" tags={skills} /></div></div>
        <div className="space-y-6 text-[1.0625rem] leading-8 text-[var(--muted)]">{resumeContent.about.map((paragraph) => <p key={paragraph}><TextWithKymaAiLink>{paragraph}</TextWithKymaAiLink></p>)}<p><Link className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline" href="/experiences">View the full experience and education timeline →</Link></p></div>
      </Container>
    </Section>

    <Section aria-labelledby="experience-preview-title">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Experience</p><h2 className="mt-3 text-3xl font-semibold tracking-tight" id="experience-preview-title">Where the work has taken shape</h2></div><Link className="font-semibold text-[var(--accent)] hover:underline" href="/experiences">All experiences →</Link></div>
        <div className="mt-9 grid gap-px bg-[var(--line)] md:grid-cols-3">{resumeContent.experience.slice(0, 3).map((entry) => <article className="bg-[var(--background)] p-6" key={`${entry.organization}-${entry.role}`}><p className="font-mono text-xs text-[var(--muted)]">{entry.startDate} — {entry.endDate}</p><h3 className="mt-4 text-xl font-semibold">{entry.role}</h3><p className="mt-1 text-[var(--accent)]">{entry.organization === "Kyma AI Innovations" ? <KymaAiLink className="underline-offset-4 hover:underline" /> : entry.organization}</p><p className="mt-4 text-sm leading-6 text-[var(--muted)]">{entry.summary}</p></article>)}</div>
      </Container>
    </Section>

    <Section aria-labelledby="blogs-title" className="border-t border-[var(--line)] bg-[var(--surface)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Blogs</p><h2 className="mt-3 text-3xl font-semibold tracking-tight" id="blogs-title">Notes from the engineering path</h2></div><Link className="font-semibold text-[var(--accent)] hover:underline" href="/blog">All blogs →</Link></div>
        <div className="mt-9 grid gap-4 md:grid-cols-2">{articles.map(({ metadata: article }) => <ArticleCard article={article} key={article.slug} />)}</div>
      </Container>
    </Section>

    <section className="bg-[var(--contrast)] py-14 text-[var(--dark)]">
      <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div><p className="font-mono text-xs font-semibold uppercase tracking-[0.16em]">Let&apos;s connect</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">Have a data, AI, or automation problem?</h2></div>
        <a className="inline-flex min-h-11 items-center justify-center border border-[var(--dark)] bg-[var(--dark)] px-5 font-semibold text-white transition-colors hover:bg-transparent hover:text-[var(--dark)]" href={siteConfig.contact.linkedInUrl} rel="noopener noreferrer" target="_blank">Start a conversation on LinkedIn<span className="sr-only"> (opens in a new tab)</span></a>
      </Container>
    </section>
  </>;
}
