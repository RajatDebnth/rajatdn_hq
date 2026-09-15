import { Badge } from "@/components/ui/badge";

const statuses = [
  { label: "planned", tone: "neutral" as const, definition: "The question is defined, but the experiment has not started." },
  { label: "running", tone: "warning" as const, definition: "Implementation or evidence collection is in progress; conclusions are not final." },
  { label: "completed", tone: "accent" as const, definition: "The documented methodology has run and reviewed evidence can be published with its limitations." },
];

export function LabStatusKey() {
  return <aside aria-labelledby="lab-status-title" className="mt-10 border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6"><h2 className="text-lg font-semibold" id="lab-status-title">Experiment status</h2><dl className="mt-5 grid gap-5 md:grid-cols-3">{statuses.map((status) => <div key={status.label}><dt><Badge tone={status.tone}>{status.label}</Badge></dt><dd className="mt-2 text-sm leading-6 text-[var(--muted)]">{status.definition}</dd></div>)}</dl></aside>;
}
