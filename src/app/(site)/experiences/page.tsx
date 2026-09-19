import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/content/page-header";
import { KymaAiLink } from "@/components/content/kyma-ai-link";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { resumeContent } from "@/content/resume/resume";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata";
import { createBreadcrumbStructuredData, createWebPageStructuredData } from "@/lib/seo/structured-data";

const description = "Professional experience and education of Rajat Debnath across AI systems, industrial data, software engineering, and community work.";

export const metadata: Metadata = createPageMetadata({
  title: "Experiences",
  description,
  path: "/experiences",
});

export default function ExperiencesPage() {
  return (
    <>
      <JsonLd data={createWebPageStructuredData({ name: "Experiences", description, path: "/experiences" })} />
      <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Experiences", path: "/experiences" }])} />
      <Section spacing="wide">
        <Container>
          <PageHeader
            breadcrumb={[{ href: "/", label: "Home" }, { label: "Experiences" }]}
            eyebrow="Career and education"
            title="Experience built across AI, industrial data, and software"
            summary="A factual timeline based on my supplied professional resume, connecting software engineering foundations with current AI systems work."
          />

          <ol className="mt-14 border-t border-[var(--line)]">
            {resumeContent.experience.map((entry) => (
              <li className="grid gap-5 border-b border-[var(--line)] py-9 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-10" key={`${entry.organization}-${entry.role}`}>
                <div className="font-mono text-sm text-[var(--muted)]">
                  <p>{entry.startDate} — {entry.endDate}</p>
                  {entry.location ? <p className="mt-2">{entry.location}</p> : null}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">{entry.role}</h2>
                  <p className="mt-1 font-medium text-[var(--accent)]">{entry.organization === "Kyma AI Innovations" ? <KymaAiLink className="underline-offset-4 hover:underline" /> : entry.organization}</p>
                  {entry.summary ? <p className="mt-4 max-w-[var(--article-width)] leading-7 text-[var(--muted)]">{entry.summary}</p> : null}
                  {entry.highlights?.length ? <ul className="mt-5 max-w-[var(--article-width)] space-y-2 text-[var(--muted)]">{entry.highlights.map((highlight) => <li className="flex gap-3" key={highlight}><span aria-hidden="true" className="text-[var(--contrast)]">—</span><span>{highlight}</span></li>)}</ul> : null}
                </div>
              </li>
            ))}
          </ol>

          <section aria-labelledby="education-title" className="py-14">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Education</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight" id="education-title">Academic background</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {resumeContent.education.map((entry) => (
                <article className="border border-[var(--line)] bg-[var(--surface)] p-6" key={`${entry.institution}-${entry.credential}`}>
                  <h3 className="text-xl font-semibold">{entry.credential}</h3>
                  <p className="mt-2 text-[var(--accent)]">{entry.institution}</p>
                  {entry.field ? <p className="mt-2 text-[var(--muted)]">{entry.field}</p> : null}
                  <p className="mt-4 font-mono text-sm text-[var(--muted)]">{entry.startDate} — {entry.endDate}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="border-t border-[var(--line)] py-10 text-[var(--muted)]">
            <p>Read my technical thinking and systems notes in <Link className="font-medium text-[var(--accent)] hover:underline" href="/blog">Blogs</Link>.</p>
          </section>
        </Container>
      </Section>
    </>
  );
}
