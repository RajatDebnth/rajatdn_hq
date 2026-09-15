import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TagList } from "@/components/ui/tag-list";
import type { ProjectMetadata } from "@/types/content";

type ProjectCardProps = {
  project: Pick<ProjectMetadata, "placeholder" | "shortDescription" | "slug" | "status" | "title" | "topics">;
  headingLevel?: 2 | 3;
};

export function ProjectCard({ project, headingLevel = 3 }: ProjectCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <Card className="flex h-full flex-col">
      <div className="flex flex-wrap gap-2">
        <Badge tone="accent">{project.status}</Badge>
        {project.placeholder ? <Badge>placeholder</Badge> : null}
      </div>
      <Heading className="mt-5 text-xl font-semibold tracking-tight">
        <Link className="hover:text-[var(--accent)]" href={`/projects/${project.slug}`}>{project.title}</Link>
      </Heading>
      <p className="mt-3 flex-1 text-[var(--muted)]">{project.shortDescription}</p>
      <div className="mt-6"><TagList tags={project.topics} /></div>
    </Card>
  );
}
