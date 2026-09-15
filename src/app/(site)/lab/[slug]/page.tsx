import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/content/page-header";
import { ExperimentSection } from "@/components/lab/experiment-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag-list";
import { getLabExperimentBySlug, getLabExperimentSlugs, getLabRelationships } from "@/lib/content/lab";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata";
import { createBreadcrumbStructuredData, createWebPageStructuredData } from "@/lib/seo/structured-data";
import type { LabExperimentMetadata } from "@/types/content";

type LabPageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return getLabExperimentSlugs(); }

export async function generateMetadata({ params }: LabPageProps): Promise<Metadata> {
  const experiment = getLabExperimentBySlug((await params).slug);
  if (!experiment) return {};
  return createPageMetadata({ title: experiment.seoTitle ?? experiment.title, description: experiment.seoDescription ?? experiment.description, path: `/lab/${experiment.slug}`, noIndex: experiment.placeholder });
}

const sections: readonly [keyof LabExperimentMetadata, string][] = [
  ["question", "Question"], ["hypothesis", "Hypothesis"], ["setup", "Setup"], ["dataset", "Dataset"], ["methodology", "Methodology"], ["implementation", "Implementation"], ["results", "Results"], ["observations", "Observations"], ["limitations", "Limitations"], ["conclusion", "Conclusion"],
];

export default async function LabExperimentPage({ params }: LabPageProps) {
  const experiment = getLabExperimentBySlug((await params).slug);
  if (!experiment) notFound();
  const path = `/lab/${experiment.slug}` as const;
  const related = getLabRelationships(experiment);

  return <>
    <JsonLd data={createWebPageStructuredData({ name: experiment.title, description: experiment.description, path })} />
    <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Lab", path: "/lab" }, { name: experiment.title, path }])} />
    <article>
      <Section spacing="wide"><Container>
        <PageHeader breadcrumb={[{ href: "/", label: "Home" }, { href: "/lab", label: "Lab" }, { label: experiment.title }]} eyebrow="Engineering experiment" status={experiment.status} title={experiment.title} summary={experiment.description} />
        {experiment.placeholder ? <div className="mt-8 max-w-[var(--article-width)] border-l-2 border-[var(--accent)] bg-[var(--surface)] p-5" role="note"><div className="flex flex-wrap items-center gap-3"><Badge>placeholder</Badge><strong>Planned experiment—not experimental evidence</strong></div><p className="mt-3 text-sm leading-6 text-[var(--muted)]">No setup has been executed and no dataset, benchmark, result, observation, or conclusion is claimed. Those sections will appear only after evidence is available and reviewed.</p></div> : null}
      </Container></Section>
      <Container>
        {experiment.date || experiment.repositoryUrl ? <dl className="grid gap-px border-y border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">{experiment.date ? <div className="bg-[var(--background)] p-5"><dt className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">Experiment date</dt><dd className="mt-2"><time dateTime={experiment.date}>{experiment.date}</time></dd></div> : null}{experiment.repositoryUrl ? <div className="bg-[var(--background)] p-5"><dt className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">Repository</dt><dd className="mt-2"><a className="text-[var(--accent)] hover:underline" href={experiment.repositoryUrl} rel="noopener noreferrer" target="_blank">View repository<span className="sr-only"> (opens in a new tab)</span></a></dd></div> : null}</dl> : null}
        {sections.map(([field, title]) => { const value = experiment[field]; return typeof value === "string" ? <ExperimentSection id={String(field)} key={field} title={title}>{value}</ExperimentSection> : null; })}
        {experiment.technologies?.length ? <ExperimentSection id="technologies" title="Technologies"><TagList label="Experiment technologies" tags={experiment.technologies} /></ExperimentSection> : null}
        {related.projects.length || related.articles.length ? <aside aria-labelledby="related-lab-title" className="border-t border-[var(--line)] py-10"><h2 className="text-xl font-semibold" id="related-lab-title">Related content</h2><ul className="mt-5 space-y-3">{related.projects.map((project) => <li key={project.slug}><Link className="text-[var(--accent)] hover:underline" href={`/projects/${project.slug}`}>{project.title} ({project.status})</Link></li>)}{related.articles.map((article) => <li key={article.slug}><Link className="text-[var(--accent)] hover:underline" href={`/blog/${article.slug}`}>{article.title}</Link></li>)}</ul></aside> : null}
      </Container>
    </article>
  </>;
}
