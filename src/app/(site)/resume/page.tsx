import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/content/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { resumeAsset } from "@/config/resume";
import { siteConfig } from "@/config/site";
import { resumeContent } from "@/content/resume/resume";
import { getAllProjects } from "@/lib/content/projects";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata";
import { createBreadcrumbStructuredData, createWebPageStructuredData } from "@/lib/seo/structured-data";

const description = "Browser-readable professional resume overview for Rajat Nath, AI Systems & Infrastructure Engineer focused on production AI systems for advanced manufacturing.";
export const metadata: Metadata = {
  ...createPageMetadata({ title: "Rajat Nath — Resume", description, path: "/resume", noIndex: true }),
  robots: { index: false, follow: true },
};

export default function ResumePage() {
  const selectedProjects = getAllProjects().filter((project) => !project.placeholder && ["implemented", "tested", "completed", "deployed"].includes(project.status));

  return <>
    <JsonLd data={createWebPageStructuredData({ name: "Rajat Nath — Resume", description, path: "/resume" })} />
    <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Resume", path: "/resume" }])} />
    <Section spacing="wide"><Container>
      <PageHeader breadcrumb={[{ href: "/", label: "Home" }, { label: "Resume" }]} eyebrow="Professional overview" title={`${siteConfig.name} — Resume`} summary={resumeContent.summary} />
      <div className="mt-8 flex flex-wrap items-center gap-4"><Badge tone="warning">Information incomplete</Badge>{resumeAsset.published ? <ButtonLink href={resumeAsset.path}>Download PDF resume</ButtonLink> : <span className="text-sm text-[var(--muted)]">PDF download will appear after a real resume file is supplied.</span>}</div>
      <p className="mt-5 max-w-[var(--article-width)] text-sm leading-6 text-[var(--muted)]">This page currently documents positioning and technical focus. Employment, education, and project achievements are intentionally omitted until verified details are supplied. It is not yet a complete employment-history resume.</p>
    </Container></Section>
    <Container className="pb-20">
      <section aria-labelledby="positioning-title" className="grid gap-5 border-t border-[var(--line)] py-10 md:grid-cols-[12rem_1fr] md:gap-10"><h2 className="text-xl font-semibold" id="positioning-title">Current positioning</h2><p className="max-w-[var(--article-width)] leading-7 text-[var(--muted)]">{resumeContent.positioning}</p></section>
      <section aria-labelledby="capabilities-title" className="grid gap-5 border-t border-[var(--line)] py-10 md:grid-cols-[12rem_1fr] md:gap-10"><h2 className="text-xl font-semibold" id="capabilities-title">Technical capabilities</h2><div><p className="mb-5 text-sm leading-6 text-[var(--muted)]">These are areas of focus, not a claim of proficiency, deployment history, or certification.</p><dl className="divide-y divide-[var(--line)] border-y border-[var(--line)]">{resumeContent.capabilityFocus.map((item) => <div className="py-4" key={item.area}><dt className="font-semibold">{item.area}</dt><dd className="mt-1 leading-7 text-[var(--muted)]">{item.description}</dd></div>)}</dl><p className="mt-6 text-sm text-[var(--muted)]">More context: <Link className="text-[var(--accent)] hover:underline" href="/capabilities">capabilities overview</Link> and <Link className="text-[var(--accent)] hover:underline" href="/systems">systems overview</Link>.</p></div></section>
      <section aria-labelledby="projects-title" className="grid gap-5 border-t border-[var(--line)] py-10 md:grid-cols-[12rem_1fr] md:gap-10"><h2 className="text-xl font-semibold" id="projects-title">Selected projects</h2><div>{selectedProjects.length ? <ul className="space-y-4">{selectedProjects.map((project) => <li key={project.slug}><Link className="font-medium text-[var(--accent)] hover:underline" href={`/projects/${project.slug}`}>{project.title}</Link><p className="mt-1 text-[var(--muted)]">{project.shortDescription}</p></li>)}</ul> : <p className="max-w-[var(--article-width)] leading-7 text-[var(--muted)]"><Badge>Placeholder</Badge><span className="ml-3">No verified implemented project is ready to include on a resume. The current <Link className="text-[var(--accent)] hover:underline" href="/projects">project collection</Link> contains planned case-study placeholders only.</span></p>}</div></section>
      <section aria-labelledby="experience-title" className="grid gap-5 border-t border-[var(--line)] py-10 md:grid-cols-[12rem_1fr] md:gap-10"><h2 className="text-xl font-semibold" id="experience-title">Experience</h2>{resumeContent.experience.length ? <ol className="space-y-6">{resumeContent.experience.map((entry) => <li key={`${entry.organization}-${entry.role}`}><h3 className="font-semibold">{entry.role} — {entry.organization}</h3><p className="text-sm text-[var(--muted)]">{entry.startDate}{entry.endDate ? ` – ${entry.endDate}` : " – Present"}{entry.location ? ` · ${entry.location}` : ""}</p>{entry.summary ? <p className="mt-2 leading-7 text-[var(--muted)]">{entry.summary}</p> : null}</li>)}</ol> : <p className="max-w-[var(--article-width)] leading-7 text-[var(--muted)]"><Badge>Placeholder</Badge><span className="ml-3">Employment history has not been supplied or verified. No roles, organizations, dates, or achievements are claimed here.</span></p>}</section>
      <section aria-labelledby="education-title" className="grid gap-5 border-t border-[var(--line)] py-10 md:grid-cols-[12rem_1fr] md:gap-10"><h2 className="text-xl font-semibold" id="education-title">Education</h2>{resumeContent.education.length ? <ol className="space-y-6">{resumeContent.education.map((entry) => <li key={`${entry.institution}-${entry.credential}`}><h3 className="font-semibold">{entry.credential} — {entry.institution}</h3>{entry.field ? <p className="text-[var(--muted)]">{entry.field}</p> : null}{entry.startDate || entry.endDate ? <p className="text-sm text-[var(--muted)]">{entry.startDate}{entry.endDate ? ` – ${entry.endDate}` : ""}</p> : null}</li>)}</ol> : <p className="max-w-[var(--article-width)] leading-7 text-[var(--muted)]"><Badge>Placeholder</Badge><span className="ml-3">Institution, credential, field, and dates have not been confirmed for this site. No degree or certification is claimed.</span></p>}</section>
      <section aria-labelledby="links-title" className="grid gap-5 border-t border-[var(--line)] py-10 md:grid-cols-[12rem_1fr] md:gap-10"><h2 className="text-xl font-semibold" id="links-title">Links</h2><ul className="space-y-3"><li><Link className="text-[var(--accent)] hover:underline" href="/about">About and engineering approach</Link></li><li><Link className="text-[var(--accent)] hover:underline" href="/architecture">Architecture knowledge library</Link></li><li><Link className="text-[var(--accent)] hover:underline" href="/blog">Technical writing</Link></li><li><Link className="text-[var(--accent)] hover:underline" href="/contact">Contact page</Link></li></ul></section>
    </Container>
  </>;
}
