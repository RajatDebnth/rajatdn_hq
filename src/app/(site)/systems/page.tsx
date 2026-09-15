import type { Metadata } from "next";

import { PageHeader } from "@/components/content/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { SystemCategory } from "@/components/systems/system-category";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata";
import { createBreadcrumbStructuredData, createWebPageStructuredData } from "@/lib/seo/structured-data";

const description =
  "A systems-level view of prediction, optimization, anomaly detection, automation, and operational intelligence for advanced manufacturing.";

const systems = [
  {
    title: "Prediction systems",
    problem: "Important future conditions are uncertain and decisions must be made before the outcome is observable.",
    objective: "Estimate a future state or outcome with enough context and reliability to support a defined decision.",
    data: "Time-series signals, operating conditions, events, maintenance records, quality observations, and contextual data.",
    mlRole: "Learn relationships between historical conditions and future outcomes, while representing uncertainty and error limits.",
    infrastructureRole: "Collect and align data, serve repeatable inference, track versions, and monitor input and output behavior.",
    output: "A forecast, probability, risk score, or estimated future state connected to an operational workflow.",
  },
  {
    title: "Optimization systems",
    problem: "Operations must balance competing objectives, resource limits, process constraints, and changing conditions.",
    objective: "Recommend or select a feasible operating decision that improves a defined objective under explicit constraints.",
    data: "Process parameters, schedules, capacities, costs, equipment states, quality limits, and demand signals.",
    mlRole: "Estimate system response, search decision spaces, or combine learned models with mathematical optimization.",
    infrastructureRole: "Maintain current state, execute optimization reliably, enforce constraints, and record decisions and overrides.",
    output: "A ranked recommendation, schedule, setpoint, allocation, or decision plan with its assumptions visible.",
  },
  {
    title: "Anomaly detection systems",
    problem: "Unusual behavior can be difficult to identify early across noisy, multivariate industrial signals.",
    objective: "Surface deviations that deserve investigation while controlling alert volume and operational disruption.",
    data: "Sensor telemetry, images, event logs, control states, production context, and known incident records when available.",
    mlRole: "Model normal behavior, classify known conditions, or score deviations across time, assets, and operating regimes.",
    infrastructureRole: "Stream or batch data, preserve context, manage thresholds, route alerts, and monitor detection quality.",
    output: "A contextual alert, anomaly score, affected signal set, or investigation queue—not an unsupported root-cause claim.",
  },
  {
    title: "Automation systems",
    problem: "Repeated operational decisions and data handoffs are slow, inconsistent, or difficult to audit when handled manually.",
    objective: "Coordinate dependable workflows with clear boundaries for automated action, approval, fallback, and recovery.",
    data: "Events, model outputs, process state, business rules, operator inputs, and downstream system responses.",
    mlRole: "Classify, extract, rank, predict, or recommend where learned behavior adds value to the workflow.",
    infrastructureRole: "Orchestrate steps, enforce permissions and rules, handle retries, preserve audit trails, and expose failures.",
    output: "A completed workflow step, routed decision, generated instruction, or operator request with traceable state.",
  },
  {
    title: "Operational intelligence systems",
    problem: "Relevant data exists across systems, but teams lack a coherent view of current conditions and decision context.",
    objective: "Turn telemetry, events, predictions, and operational context into understandable information for action.",
    data: "Production data, equipment states, quality signals, events, model outputs, targets, and operational definitions.",
    mlRole: "Detect patterns, produce forecasts or classifications, summarize signals, and prioritize information where appropriate.",
    infrastructureRole: "Unify data semantics, maintain freshness, calculate trusted indicators, and provide observable delivery paths.",
    output: "A decision-ready view, prioritized issue, operational explanation, or traceable indicator with known provenance.",
  },
] as const;

export const metadata: Metadata = createPageMetadata({ title: "Production AI Systems", description, path: "/systems" });

export default function SystemsPage() {
  return (
    <>
      <JsonLd data={createWebPageStructuredData({ name: "Production AI Systems", description, path: "/systems" })} />
      <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Systems", path: "/systems" }])} />
      <Section spacing="wide">
        <Container>
          <PageHeader
            breadcrumb={[{ href: "/", label: "Home" }, { label: "Systems" }]}
            eyebrow="Systems"
            title="Production AI system categories"
            summary="Five system categories organized by the operational problem, the role of AI/ML, the infrastructure required, and the output delivered to a decision or workflow."
          />
        </Container>
      </Section>
      <Container>
        {systems.map((system, index) => <SystemCategory index={index + 1} key={system.title} system={system} />)}
        <aside className="border-t border-[var(--line)] py-12 text-[var(--muted)]">
          These systems share capabilities across <TextLink href="/capabilities">AI/ML, data infrastructure, deployment, and observability</TextLink>. Their potential manufacturing contexts are outlined under <TextLink href="/industries">industry focus</TextLink>.
        </aside>
      </Container>
    </>
  );
}
