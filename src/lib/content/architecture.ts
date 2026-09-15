import { architectureNoteEntries } from "@/content/architecture/architecture-notes";
import { resolveRelatedArticles } from "@/lib/content/blog";
import { createSlug, getProjectBySlug, isValidSlug } from "@/lib/content/projects";
import type { ArchitectureNoteMetadata } from "@/types/content";

function validateArchitectureNotes(notes: readonly ArchitectureNoteMetadata[]) {
  const slugs = new Set<string>();

  for (const note of notes) {
    if (!isValidSlug(note.slug)) throw new Error(`Invalid architecture slug: ${note.slug}`);
    if (createSlug(note.title) !== note.slug) throw new Error(`Architecture slug must match its generated title slug: ${note.slug}`);
    if (slugs.has(note.slug)) throw new Error(`Duplicate architecture slug: ${note.slug}`);
    if (!note.description.trim()) throw new Error(`Architecture note requires a description: ${note.slug}`);

    for (const projectSlug of note.relatedProjects ?? []) {
      if (!getProjectBySlug(projectSlug)) throw new Error(`Unknown related project '${projectSlug}' in architecture note '${note.slug}'`);
    }

    slugs.add(note.slug);
  }
}

validateArchitectureNotes(architectureNoteEntries);

export function getAllArchitectureNotes(): readonly ArchitectureNoteMetadata[] {
  return [...architectureNoteEntries].sort((a, b) => a.title.localeCompare(b.title));
}

export function getArchitectureNoteBySlug(slug: string): ArchitectureNoteMetadata | undefined {
  if (!isValidSlug(slug)) return undefined;
  return architectureNoteEntries.find((note) => note.slug === slug);
}

export function getArchitectureNoteSlugs() {
  return architectureNoteEntries.map(({ slug }) => ({ slug }));
}

export function getArchitectureRelationships(note: ArchitectureNoteMetadata) {
  return {
    projects: (note.relatedProjects ?? []).map((slug) => getProjectBySlug(slug)).filter((project) => project !== undefined),
    articles: resolveRelatedArticles(note.relatedArticles ?? [], `architecture note '${note.slug}'`),
  };
}
