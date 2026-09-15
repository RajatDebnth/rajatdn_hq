import type { Metadata } from "next";

import { PageHeader } from "@/components/content/page-header";
import { ExperimentCard } from "@/components/lab/experiment-card";
import { LabStatusKey } from "@/components/lab/status-key";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getAllLabExperiments } from "@/lib/content/lab";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata";
import { createBreadcrumbStructuredData, createWebPageStructuredData } from "@/lib/seo/structured-data";

const description = "Planned, running, and completed engineering experiments about production AI, industrial data, models, and infrastructure.";
export const metadata: Metadata = createPageMetadata({ title: "Engineering Lab", description, path: "/lab" });

export default function LabPage() {
  const experiments = getAllLabExperiments();
  return <>
    <JsonLd data={createWebPageStructuredData({ name: "Engineering Lab", description, path: "/lab" })} />
    <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Lab", path: "/lab" }])} />
    <Section spacing="wide"><Container>
      <PageHeader breadcrumb={[{ href: "/", label: "Home" }, { label: "Lab" }]} eyebrow="Engineering laboratory" title="Experiments, benchmarks, and technical investigations" summary="A structured workspace for testing production AI assumptions. Current entries are planned placeholders and contain no experimental results." />
      <LabStatusKey />
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{experiments.map((experiment) => <ExperimentCard experiment={experiment} key={experiment.slug} />)}</div>
    </Container></Section>
  </>;
}
