import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArchitectureSection } from "@/components/architecture/architecture-section";
import { ComponentTable, FailureModeTable, TradeoffTable } from "@/components/architecture/architecture-tables";
import { TechnicalFlowDiagram } from "@/components/architecture/technical-flow-diagram";
import { PageHeader } from "@/components/content/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag-list";
import { getArchitectureNoteBySlug, getArchitectureNoteSlugs, getArchitectureRelationships } from "@/lib/content/architecture";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata";
import { createArticleStructuredData, createBreadcrumbStructuredData, createWebPageStructuredData } from "@/lib/seo/structured-data";

type ArchitecturePageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return getArchitectureNoteSlugs(); }

export async function generateMetadata({ params }: ArchitecturePageProps): Promise<Metadata> {
  const note = getArchitectureNoteBySlug((await params).slug);
  if (!note) return {};
  return createPageMetadata({ title: note.seoTitle ?? note.title, description: note.seoDescription ?? note.description, path: `/architecture/${note.slug}` });
}

export default async function ArchitectureNotePage({ params }: ArchitecturePageProps) {
  const note = getArchitectureNoteBySlug((await params).slug);
  if (!note) notFound();
  const path = `/architecture/${note.slug}` as const;
  const related = getArchitectureRelationships(note);

  return <>
    <JsonLd data={createWebPageStructuredData({ name: note.title, description: note.description, path })} />
    {note.date && note.author ? <JsonLd data={createArticleStructuredData({ name: note.title, description: note.description, path, publishedAt: note.date, topics: note.topics })} /> : null}
    <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Architecture", path: "/architecture" }, { name: note.title, path }])} />
    <article>
      <Section spacing="wide"><Container>
        <PageHeader breadcrumb={[{ href: "/", label: "Home" }, { href: "/architecture", label: "Architecture" }, { label: note.title }]} eyebrow={note.category ?? "Architecture note"} status={`${note.status} architecture`} title={note.title} summary={note.description} />
        <p className="mt-8 max-w-[var(--article-width)] border-l-2 border-[var(--accent)] bg-[var(--surface)] p-5 text-sm leading-6 text-[var(--muted)]"><strong className="text-[var(--foreground)]">Scope:</strong> This is a conceptual reference architecture. It explains a design approach and does not represent a deployed or implemented system.</p>
      </Container></Section>
      <Container>
        {note.problem ? <ArchitectureSection id="problem" title="Problem" summary={note.problem} /> : null}
        {note.architecture ? <ArchitectureSection id="architecture" title="Architecture" summary={note.architecture}>{note.dataFlow ? <TechnicalFlowDiagram {...note.dataFlow} /> : null}</ArchitectureSection> : null}
        {note.components?.length ? <ArchitectureSection id="components" title="Components"><ComponentTable components={note.components} /></ArchitectureSection> : null}
        {note.infrastructure ? <ArchitectureSection id="infrastructure" title="Infrastructure" summary={note.infrastructure} /> : null}
        {note.deployment ? <ArchitectureSection id="deployment" title="Deployment" summary={note.deployment} /> : null}
        {note.observability ? <ArchitectureSection id="observability" title="Observability" summary={note.observability} /> : null}
        {note.security ? <ArchitectureSection id="security" title="Security" summary={note.security} /> : null}
        {note.scalability ? <ArchitectureSection id="scalability" title="Scalability" summary={note.scalability} /> : null}
        {note.tradeoffs?.length ? <ArchitectureSection id="trade-offs" title="Trade-offs"><TradeoffTable tradeoffs={note.tradeoffs} /></ArchitectureSection> : null}
        {note.failureModes?.length ? <ArchitectureSection id="failure-modes" title="Failure modes"><FailureModeTable failureModes={note.failureModes} /></ArchitectureSection> : null}
        {note.technologies?.length ? <ArchitectureSection id="technologies" title="Technology categories"><TagList label="Relevant technology categories" tags={note.technologies} /></ArchitectureSection> : null}
        <ArchitectureSection id="implementation-notes" title="Implementation notes" summary="Treat this design as a starting point. Validate it against latency, safety, data quality, connectivity, ownership, maintainability, and operational consequence before selecting technologies or boundaries." />
        {related.projects.length || related.articles.length ? <aside aria-labelledby="related-title" className="border-t border-[var(--line)] py-10"><h2 className="text-xl font-semibold" id="related-title">Related content</h2><ul className="mt-5 space-y-3">{related.projects.map((project) => <li key={project.slug}><Link className="text-[var(--accent)] hover:underline" href={`/projects/${project.slug}`}>{project.title} ({project.status})</Link></li>)}{related.articles.map((article) => <li key={article.slug}><Link className="text-[var(--accent)] hover:underline" href={`/blog/${article.slug}`}>{article.title}</Link></li>)}</ul></aside> : null}
      </Container>
    </article>
  </>;
}
