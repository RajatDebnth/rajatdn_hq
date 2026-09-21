import type { Metadata } from "next";
import Link from "next/link";

import { KymaAiLink } from "@/components/content/kyma-ai-link";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { resumeContent } from "@/content/resume/resume";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata";
import { createBreadcrumbStructuredData, createWebPageStructuredData } from "@/lib/seo/structured-data";

const description = "Professional experience and education of Rajat Debnath across AI, industrial data, software engineering, and community work.";
export const metadata: Metadata = createPageMetadata({ title: "Experiences", description, path: "/experiences" });

export default function ExperiencesPage() {
  return <>
    <JsonLd data={createWebPageStructuredData({ name: "Experiences", description, path: "/experiences" })} />
    <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Experiences", path: "/experiences" }])} />
    <Container className="reading-width py-12 sm:py-14">
      <header>
        <h1 className="font-serif text-4xl font-semibold tracking-tight">Experiences</h1>
        <p className="mt-3 text-[var(--muted)]">The work and education that shaped how I think about software, industrial data, and production AI.</p>
      </header>
      <section aria-labelledby="work-title" className="mt-10">
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]" id="work-title">Work</h2>
        <ol className="mt-3 divide-y divide-[var(--line)]">
          {resumeContent.experience.map((entry) => <li className="py-6" key={`${entry.organization}-${entry.role}`}>
            <h3 className="font-serif text-xl font-semibold">{entry.role}</h3>
            <p className="mt-1 text-sm text-[var(--muted)]">{entry.organization === "Kyma AI Innovations" ? <KymaAiLink className="underline underline-offset-4" /> : entry.organization} · {entry.startDate} — {entry.endDate}</p>
            {entry.location ? <p className="mt-1 text-sm text-[var(--muted)]">{entry.location}</p> : null}
            {entry.summary ? <p className="mt-3 leading-7">{entry.summary}</p> : null}
            {entry.highlights?.length ? <ul className="mt-3 list-disc space-y-1 pl-5 text-[var(--muted)]">{entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul> : null}
          </li>)}
        </ol>
      </section>
      <section aria-labelledby="education-title" className="mt-10 border-t border-[var(--line)] pt-10">
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]" id="education-title">Education</h2>
        <div className="mt-3 divide-y divide-[var(--line)]">{resumeContent.education.map((entry) => <article className="py-5" key={`${entry.institution}-${entry.credential}`}><h3 className="font-serif text-lg font-semibold">{entry.credential}{entry.field ? `, ${entry.field}` : ""}</h3><p className="mt-1 text-sm text-[var(--muted)]">{entry.institution} · {entry.startDate} — {entry.endDate}</p></article>)}</div>
      </section>
      <p className="mt-10 border-t border-[var(--line)] pt-8 text-sm"><Link className="underline underline-offset-4" href="/blog">Read my writing →</Link></p>
    </Container>
  </>;
}
