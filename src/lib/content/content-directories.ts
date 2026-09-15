import type { ContentKind } from "@/types/content";

export const contentDirectories = {
  article: "src/content/blog",
  architecture: "src/content/architecture",
  lab: "src/content/lab",
  project: "src/content/projects",
  page: "src/content/pages",
} as const satisfies Record<ContentKind, string>;

export type ContentDirectory = (typeof contentDirectories)[ContentKind];
