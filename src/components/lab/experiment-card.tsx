import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TagList } from "@/components/ui/tag-list";
import type { LabExperimentMetadata } from "@/types/content";

const statusTone = { planned: "neutral", running: "warning", completed: "accent" } as const;

export function ExperimentCard({ experiment }: { experiment: LabExperimentMetadata }) {
  return <Card className="flex h-full flex-col">
    <div className="flex flex-wrap gap-2"><Badge tone={statusTone[experiment.status]}>{experiment.status}</Badge>{experiment.placeholder ? <Badge>placeholder</Badge> : null}</div>
    <h2 className="mt-5 text-xl font-semibold tracking-tight"><Link className="hover:text-[var(--accent)]" href={`/lab/${experiment.slug}`}>{experiment.title}</Link></h2>
    <p className="mt-3 flex-1 leading-7 text-[var(--muted)]">{experiment.description}</p>
    <div className="mt-6"><TagList tags={experiment.topics} /></div>
  </Card>;
}
