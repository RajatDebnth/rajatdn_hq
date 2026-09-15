import type { Metadata } from "next";

import { PageHeader } from "@/components/content/page-header";
import { ProjectCard } from "@/components/cards/project-card";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getAllProjects } from "@/lib/content/projects";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata";
import { createBreadcrumbStructuredData, createWebPageStructuredData } from "@/lib/seo/structured-data";

const description = "Planned and verified engineering case studies about production AI systems for advanced manufacturing.";

export const metadata: Metadata = createPageMetadata({ title: "Projects", description, path: "/projects" });

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      <JsonLd data={createWebPageStructuredData({ name: "Projects", description, path: "/projects" })} />
      <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }])} />
      <Section spacing="wide">
        <Container>
          <PageHeader
            breadcrumb={[{ href: "/", label: "Home" }, { label: "Projects" }]}
            eyebrow="Engineering case studies"
            title="Projects"
            summary="A content-driven collection for documenting system problems, architecture, implementation, deployment, evidence, limitations, and lessons. Current entries are explicitly labeled placeholders."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => <ProjectCard headingLevel={2} key={project.slug} project={project} />)}
          </div>
        </Container>
      </Section>
    </>
  );
}
