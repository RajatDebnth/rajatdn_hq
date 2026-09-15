import type { Metadata } from "next";

import { ArchitectureCard } from "@/components/cards/architecture-card";
import { PageHeader } from "@/components/content/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getAllArchitectureNotes } from "@/lib/content/architecture";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata";
import { createBreadcrumbStructuredData, createWebPageStructuredData } from "@/lib/seo/structured-data";

const description = "Conceptual technical architecture notes for designing reliable production AI systems in advanced manufacturing.";
export const metadata: Metadata = createPageMetadata({ title: "AI Systems Architecture", description, path: "/architecture" });

export default function ArchitecturePage() {
  const notes = getAllArchitectureNotes();
  return <>
    <JsonLd data={createWebPageStructuredData({ name: "AI Systems Architecture", description, path: "/architecture" })} />
    <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Architecture", path: "/architecture" }])} />
    <Section spacing="wide"><Container>
      <PageHeader breadcrumb={[{ href: "/", label: "Home" }, { label: "Architecture" }]} eyebrow="Technical knowledge" title="Architecture knowledge system" summary="Reference architectures for reasoning about components, data flow, infrastructure, deployment, observability, security, scale, trade-offs, and failure modes. Every current note is conceptual—not a claim of implementation." />
      <div className="mt-12 grid gap-4 md:grid-cols-2">{notes.map((note) => <ArchitectureCard headingLevel={2} key={note.slug} note={note} />)}</div>
    </Container></Section>
  </>;
}
