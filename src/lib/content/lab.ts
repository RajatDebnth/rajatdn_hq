import { labExperimentEntries } from "@/content/lab/experiments";
import { assertPublicHttpsUrl } from "@/lib/content/external-url";
import { resolveRelatedArticles } from "@/lib/content/blog";
import { createSlug, getProjectBySlug, isValidSlug } from "@/lib/content/projects";
import type { LabExperimentMetadata } from "@/types/content";

const validStatuses = new Set<LabExperimentMetadata["status"]>(["planned", "running", "completed"]);

function validateLabExperiments(experiments: readonly LabExperimentMetadata[]) {
  const slugs = new Set<string>();

  for (const experiment of experiments) {
    if (!isValidSlug(experiment.slug)) throw new Error(`Invalid lab slug: ${experiment.slug}`);
    if (createSlug(experiment.title) !== experiment.slug) throw new Error(`Lab slug must match its generated title slug: ${experiment.slug}`);
    if (slugs.has(experiment.slug)) throw new Error(`Duplicate lab slug: ${experiment.slug}`);
    if (!validStatuses.has(experiment.status)) throw new Error(`Invalid lab status: ${experiment.status}`);
    if (experiment.status !== "completed" && (experiment.results || experiment.conclusion)) {
      throw new Error(`Uncompleted lab cannot publish results or a conclusion: ${experiment.slug}`);
    }
    if (experiment.repositoryUrl) assertPublicHttpsUrl(experiment.repositoryUrl, `Lab '${experiment.slug}' repositoryUrl`);
    for (const projectSlug of experiment.relatedProjects ?? []) {
      if (!getProjectBySlug(projectSlug)) throw new Error(`Unknown related project '${projectSlug}' in lab '${experiment.slug}'`);
    }
    slugs.add(experiment.slug);
  }
}

validateLabExperiments(labExperimentEntries);

export function getAllLabExperiments(): readonly LabExperimentMetadata[] {
  const order: Record<LabExperimentMetadata["status"], number> = { running: 0, completed: 1, planned: 2 };
  const experiments: LabExperimentMetadata[] = [...labExperimentEntries];
  return experiments.sort((a, b) => order[a.status] - order[b.status] || (b.date ?? "").localeCompare(a.date ?? "") || a.title.localeCompare(b.title));
}

export function getLabExperimentBySlug(slug: string): LabExperimentMetadata | undefined {
  if (!isValidSlug(slug)) return undefined;
  return labExperimentEntries.find((experiment) => experiment.slug === slug);
}

export function getLabExperimentSlugs() {
  return labExperimentEntries.map(({ slug }) => ({ slug }));
}

export function getLabRelationships(experiment: LabExperimentMetadata) {
  return {
    projects: (experiment.relatedProjects ?? []).map((slug) => getProjectBySlug(slug)).filter((project) => project !== undefined),
    articles: resolveRelatedArticles(experiment.relatedArticles ?? [], `lab '${experiment.slug}'`),
  };
}
