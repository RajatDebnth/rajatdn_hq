import type { Metadata } from "next";

import { PageHeader } from "@/components/content/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { Callout } from "@/components/ui/callout";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata";
import { createBreadcrumbStructuredData, createWebPageStructuredData } from "@/lib/seo/structured-data";

const description =
  "Advanced manufacturing areas where production AI systems can support equipment, quality, process, and operational decisions.";

const focusAreas = [
  { title: "Factory operations", description: "Production state, throughput, constraints, events, and the information needed to coordinate daily operations." },
  { title: "Industrial equipment", description: "Machine telemetry, operating regimes, condition signals, and the infrastructure needed to interpret them reliably." },
  { title: "Quality inspection", description: "Inspection data and computer-vision pipelines that support consistent detection, review, and traceability." },
  { title: "Predictive maintenance", description: "Condition and maintenance data used to estimate risk, prioritize investigation, and support maintenance planning." },
  { title: "Process optimization", description: "Operating variables, constraints, quality targets, and resource trade-offs used to inform better process decisions." },
  { title: "Industrial IoT", description: "Connected sensor and equipment data flowing through ingestion, context, storage, processing, and monitoring layers." },
  { title: "Production intelligence", description: "Operational data and model outputs organized into decision-ready views with clear definitions and provenance." },
] as const;

export const metadata: Metadata = createPageMetadata({ title: "Advanced Manufacturing Focus", description, path: "/industries" });

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={createWebPageStructuredData({ name: "Advanced Manufacturing Focus", description, path: "/industries" })} />
      <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }])} />
      <Section spacing="wide">
        <Container>
          <PageHeader
            breadcrumb={[{ href: "/", label: "Home" }, { label: "Industries" }]}
            eyebrow="Industries"
            title="Advanced manufacturing focus"
            summary="The central domain focus is advanced manufacturing: environments where equipment, process, quality, and production data must connect to dependable operational decisions."
          />
          <div className="mt-10 max-w-3xl">
            <Callout title="Scope and evidence">
              <p>These are areas of technical focus and potential application. They are not a list of clients served, engagements completed, or results delivered.</p>
            </Callout>
          </div>
        </Container>
      </Section>
      <Section className="border-t border-[var(--line)]" spacing="compact">
        <Container>
          <div className="grid gap-px bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((area, index) => (
              <Card className="min-h-60" key={area.title}>
                <span className="font-mono text-xs text-[var(--muted)]">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="mt-9 text-xl font-semibold tracking-tight">{area.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{area.description}</p>
              </Card>
            ))}
          </div>
          <p className="mt-10 max-w-3xl leading-8 text-[var(--muted)]">
            The <TextLink href="/systems">systems page</TextLink> explains the operational system categories behind these focus areas. The <TextLink href="/capabilities">capabilities page</TextLink> describes the engineering layers involved.
          </p>
        </Container>
      </Section>
    </>
  );
}
