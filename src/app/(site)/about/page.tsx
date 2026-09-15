import type { Metadata } from "next";

import { PageHeader } from "@/components/content/page-header";
import { ProseSection } from "@/components/content/prose-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag-list";
import { TextLink } from "@/components/ui/text-link";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata";
import { createBreadcrumbStructuredData, createWebPageStructuredData } from "@/lib/seo/structured-data";

const description =
  "Learn about Rajat Nath's engineering direction across production AI, AI infrastructure, and reliable industrial systems.";

const interests = [
  "Production AI",
  "Industrial systems",
  "AI infrastructure",
  "Optimization",
  "Prediction",
  "Automation",
  "Anomaly detection",
  "Operational intelligence",
] as const;

export const metadata: Metadata = createPageMetadata({ title: "About", description, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <JsonLd data={createWebPageStructuredData({ name: "About Rajat Nath", description, path: "/about" })} />
      <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <Section spacing="wide">
        <Container>
          <PageHeader
            breadcrumb={[{ href: "/", label: "Home" }, { label: "About" }]}
            eyebrow="About"
            title={`${siteConfig.name} — ${siteConfig.professionalTitle}`}
            summary="My engineering direction centers on production AI systems: the data, models, infrastructure, deployment practices, and operational workflows required to make AI useful beyond a prototype."
          />
        </Container>
      </Section>
      <Container>
        <ProseSection eyebrow="01" title="Who I am">
          <p>I am an AI Systems &amp; Infrastructure Engineer focused on how AI systems can support advanced manufacturing.</p>
          <p>This site documents that direction through system explanations, architecture notes, technical writing, experiments, and evidence-backed case studies as they are developed.</p>
        </ProseSection>
        <ProseSection eyebrow="02" title="What I work on">
          <p>I work at the boundary between industrial data and operational decisions. That includes prediction, optimization, anomaly detection, automation, and operational intelligence.</p>
          <p>Explore the <TextLink href="/systems">systems overview</TextLink> for the role of data, AI/ML, infrastructure, and operational output in each category.</p>
        </ProseSection>
        <ProseSection eyebrow="03" title="Engineering approach">
          <p>I approach AI as a complete system rather than an isolated model. Data quality, deployment constraints, observability, failure handling, and human decision workflows belong in the architecture from the beginning.</p>
          <p>The aim is restrained engineering: select complexity only when the operational requirement justifies it, and evaluate usefulness beyond model metrics alone.</p>
        </ProseSection>
        <ProseSection eyebrow="04" title="Current focus">
          <p>My current focus is the architecture of reliable production AI for manufacturing environments, including data pipelines, model-serving boundaries, edge and cloud deployment choices, monitoring, and feedback loops.</p>
          <p>The <TextLink href="/capabilities">capabilities page</TextLink> organizes the engineering areas involved.</p>
        </ProseSection>
        <ProseSection eyebrow="05" title="Technical interests">
          <TagList label="Technical interests" tags={interests} />
        </ProseSection>
        <ProseSection eyebrow="06" title="What I am building toward">
          <p>I am building toward a body of work that explains and demonstrates dependable AI systems for advanced manufacturing—from industrial telemetry and perception through deployment, monitoring, and operational use.</p>
          <p>This is a direction and publishing commitment, not a claim of clients served or production outcomes already delivered. See the <TextLink href="/industries">advanced manufacturing focus areas</TextLink>.</p>
        </ProseSection>
      </Container>
    </>
  );
}
