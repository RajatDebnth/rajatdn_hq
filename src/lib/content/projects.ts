import { projectEntries } from "@/content/projects/projects";
import { assertPublicHttpsUrl } from "@/lib/content/external-url";
import { resolveRelatedArticles } from "@/lib/content/blog";
import type { ProjectMetadata, RelatedContentReference } from "@/types/content";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function createSlug(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isValidSlug(value: string) {
  return slugPattern.test(value);
}

function validateProjectCollection(projects: readonly ProjectMetadata[]) {
  const slugs = new Set<string>();

  for (const project of projects) {
    if (!isValidSlug(project.slug)) {
      throw new Error(`Invalid project slug: ${project.slug}`);
    }

    if (createSlug(project.title) !== project.slug) {
      throw new Error(`Project slug must match its generated title slug: ${project.slug}`);
    }

    if (slugs.has(project.slug)) {
      throw new Error(`Duplicate project slug: ${project.slug}`);
    }

    if (project.repositoryUrl) assertPublicHttpsUrl(project.repositoryUrl, `Project '${project.slug}' repositoryUrl`);
    if (project.demoUrl) assertPublicHttpsUrl(project.demoUrl, `Project '${project.slug}' demoUrl`);
    if (project.image && (!project.image.src.startsWith("/") || project.image.src.startsWith("//"))) {
      throw new Error(`Project '${project.slug}' image must use a local absolute path`);
    }

    slugs.add(project.slug);
  }
}

validateProjectCollection(projectEntries);

export function getAllProjects(): readonly ProjectMetadata[] {
  const projects: ProjectMetadata[] = [...projectEntries];

  return projects.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return (b.date ?? "").localeCompare(a.date ?? "") || a.title.localeCompare(b.title);
  });
}

export function getProjectBySlug(slug: string): ProjectMetadata | undefined {
  if (!isValidSlug(slug)) return undefined;
  return projectEntries.find((project) => project.slug === slug);
}

export function getProjectSlugs() {
  return projectEntries.map(({ slug }) => ({ slug }));
}

export function getRelatedContent(project: ProjectMetadata): {
  articles: readonly RelatedContentReference[];
} {
  return { articles: resolveRelatedArticles(project.relatedArticles ?? [], `project '${project.slug}'`) };
}
