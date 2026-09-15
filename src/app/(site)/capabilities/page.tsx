import type { Metadata } from "next";

import { PageHeader } from "@/components/content/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata";
import { createBreadcrumbStructuredData, createWebPageStructuredData } from "@/lib/seo/structured-data";

const description =
  "The engineering capabilities involved in designing, deploying, and operating production AI systems for advanced manufacturing.";

const capabilities = [
  { title: "AI / ML", description: "Problem framing, feature and model design, evaluation, uncertainty, and alignment between model behavior and operational decisions." },
  { title: "Data Infrastructure", description: "Reliable ingestion, validation, transformation, lineage, storage boundaries, and usable industrial data contracts." },
  { title: "AI Infrastructure", description: "Repeatable training and inference environments, model artifacts, compute choices, serving interfaces, and system integration." },
  { title: "MLOps", description: "Versioning, reproducibility, automated validation, release workflows, model lifecycle controls, and feedback into development." },
  { title: "Edge AI", description: "Inference near machines or sensors when latency, resilience, bandwidth, privacy, or connectivity shape the architecture." },
  { title: "Computer Vision", description: "Image acquisition, inspection pipelines, model inference, quality controls, and integration with manufacturing workflows." },
  { title: "Observability", description: "Visibility into data quality, model behavior, infrastructure health, latency, failures, drift, and operational outcomes." },
  { title: "Deployment", description: "Packaging, configuration, release, rollback, scaling, security boundaries, and operation across edge and cloud environments." },
] as const;

export const metadata: Metadata = createPageMetadata({ title: "Capabilities", description, path: "/capabilities" });

export default function CapabilitiesPage() {
  return (
    <>
      <JsonLd data={createWebPageStructuredData({ name: "AI Systems Engineering Capabilities", description, path: "/capabilities" })} />
      <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Capabilities", path: "/capabilities" }])} />
      <Section spacing="wide">
        <Container>
          <PageHeader
            breadcrumb={[{ href: "/", label: "Home" }, { label: "Capabilities" }]}
            eyebrow="Capabilities"
            title="Engineering across the production AI lifecycle"
            summary="A production system requires coordinated capability across models, data, infrastructure, deployment, and ongoing operation—not a wall of disconnected tools."
          />
        </Container>
      </Section>
      <Section className="border-t border-[var(--line)]" spacing="compact">
        <Container>
          <div className="grid gap-px bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((capability, index) => (
              <Card className="min-h-64" key={capability.title}>
                <span className="font-mono text-xs text-[var(--muted)]">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="mt-10 text-xl font-semibold tracking-tight">{capability.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{capability.description}</p>
              </Card>
            ))}
          </div>
          <p className="mt-10 max-w-3xl leading-8 text-[var(--muted)]">
            See how these capabilities combine within the <TextLink href="/systems">five production AI system categories</TextLink>, or examine their potential application across <TextLink href="/industries">advanced manufacturing focus areas</TextLink>.
          </p>
        </Container>
      </Section>
    </>
  );
}
