import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/content/page-header";
import { ProjectSection } from "@/components/projects/project-section";
import { RelatedContent } from "@/components/projects/related-content";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag-list";
import { getProjectBySlug, getProjectSlugs, getRelatedContent } from "@/lib/content/projects";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata";
import { createBreadcrumbStructuredData, createProjectStructuredData, createWebPageStructuredData } from "@/lib/seo/structured-data";
import type { ProjectMetadata } from "@/types/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSlugs();
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  return createPageMetadata({
    title: project.seoTitle ?? project.title,
    description: project.seoDescription ?? project.shortDescription,
    path: `/projects/${project.slug}`,
    noIndex: project.placeholder,
  });
}

const projectSections: readonly [keyof ProjectMetadata, string][] = [
  ["problem", "Problem"],
  ["objective", "Objective"],
  ["systemOverview", "System overview"],
  ["architecture", "Architecture"],
  ["data", "Data"],
  ["pipeline", "Pipeline"],
  ["models", "Models"],
  ["infrastructure", "Infrastructure"],
  ["deployment", "Deployment"],
  ["monitoring", "Monitoring"],
  ["results", "Results"],
  ["lessons", "Lessons"],
];

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const path = `/projects/${project.slug}` as const;
  const related = getRelatedContent(project);

  return (
    <>
      <JsonLd data={createWebPageStructuredData({ name: project.title, description: project.description, path })} />
      {!project.placeholder ? <JsonLd data={createProjectStructuredData({ name: project.title, description: project.description, path, topics: project.topics })} /> : null}
      <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }, { name: project.title, path }])} />
      <Section spacing="wide">
        <Container>
          <PageHeader
            breadcrumb={[{ href: "/", label: "Home" }, { href: "/projects", label: "Projects" }, { label: project.title }]}
            eyebrow={project.industry ?? "Project"}
            status={project.status}
            title={project.title}
            summary={project.description}
          />
          {project.placeholder ? (
            <div className="mt-8 border-l-2 border-[var(--accent)] bg-[var(--surface)] p-5" role="note">
              <div className="flex flex-wrap items-center gap-3"><Badge>placeholder</Badge><strong>Planned content—not a completed project claim</strong></div>
              <p className="mt-3 max-w-[var(--article-width)] text-[var(--muted)]">This reserved entry will be replaced with verified problem context, implementation details, evidence, limitations, and results when that material is available.</p>
            </div>
          ) : null}
          {project.image ? (
            <Image
              alt={project.image.alt}
              className="mt-10 h-auto w-full border border-[var(--line)]"
              height={project.image.height}
              sizes="(max-width: 1152px) 100vw, 1152px"
              src={project.image.src}
              width={project.image.width}
            />
          ) : null}
        </Container>
      </Section>
      <Container>
        {project.date || project.repositoryUrl || project.demoUrl ? (
          <dl className="grid gap-px border-y border-[var(--line)] bg-[var(--line)] sm:grid-cols-3">
            {project.date ? <div className="bg-[var(--background)] p-5"><dt className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">Date</dt><dd className="mt-2"><time dateTime={project.date}>{project.date}</time></dd></div> : null}
            {project.repositoryUrl ? <div className="bg-[var(--background)] p-5"><dt className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">Repository</dt><dd className="mt-2"><a className="font-medium text-[var(--accent)] underline-offset-4 hover:underline" href={project.repositoryUrl} rel="noopener noreferrer" target="_blank">View repository<span className="sr-only"> (opens in a new tab)</span></a></dd></div> : null}
            {project.demoUrl ? <div className="bg-[var(--background)] p-5"><dt className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">Demo</dt><dd className="mt-2"><a className="font-medium text-[var(--accent)] underline-offset-4 hover:underline" href={project.demoUrl} rel="noopener noreferrer" target="_blank">View demo<span className="sr-only"> (opens in a new tab)</span></a></dd></div> : null}
          </dl>
        ) : null}
        {projectSections.map(([field, title]) => {
          const value = project[field];
          return typeof value === "string" ? <ProjectSection key={field} title={title}>{value}</ProjectSection> : null;
        })}
        {project.architectureDiagram ? (
          <section className="border-t border-[var(--line)] py-8" aria-labelledby="architecture-diagram-title">
            <h2 id="architecture-diagram-title" className="text-base font-semibold">Architecture diagram</h2>
            <ol aria-label={project.architectureDiagram.alt} className="mt-5 grid gap-px bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
              {project.architectureDiagram.steps.map((step, index) => <li className="bg-[var(--surface)] p-5" key={step}><span className="font-mono text-xs text-[var(--muted)]">{String(index + 1).padStart(2, "0")}</span><p className="mt-2 font-medium">{step}</p></li>)}
            </ol>
          </section>
        ) : null}
        {project.technologies?.length ? <section className="border-t border-[var(--line)] py-8"><TagList label="Technologies" tags={project.technologies} /></section> : null}
        <RelatedContent articles={related.articles} />
      </Container>
    </>
  );
}
