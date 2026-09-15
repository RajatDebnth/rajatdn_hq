import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { ArchitectureNoteMetadata } from "@/types/content";

type ArchitectureCardProps = {
  note: Pick<ArchitectureNoteMetadata, "description" | "slug" | "status" | "title">;
  headingLevel?: 2 | 3;
};

export function ArchitectureCard({ note, headingLevel = 3 }: ArchitectureCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <Card>
      <Badge>{note.status}</Badge>
      <Heading className="mt-5 text-xl font-semibold tracking-tight">
        <Link className="hover:text-[var(--accent)]" href={`/architecture/${note.slug}`}>{note.title}</Link>
      </Heading>
      <p className="mt-3 text-[var(--muted)]">{note.description}</p>
    </Card>
  );
}
