import type { MetadataRoute } from "next";

import { getAbsoluteUrl } from "@/lib/metadata/create-page-metadata";
import { getAllProjects } from "@/lib/content/projects";
import { getAllArchitectureNotes } from "@/lib/content/architecture";
import { getAllLabExperiments } from "@/lib/content/lab";
import { getPublishedArticles } from "@/lib/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/systems", priority: 0.9 },
    { path: "/capabilities", priority: 0.8 },
    { path: "/industries", priority: 0.8 },
    { path: "/projects", priority: 0.9 },
    { path: "/architecture", priority: 0.9 },
    { path: "/lab", priority: 0.8 },
    { path: "/blog", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
  ] as const;

  const projectRoutes = getAllProjects().filter((project) => !project.placeholder).map((project) => ({
    url: getAbsoluteUrl(`/projects/${project.slug}`),
    changeFrequency: "monthly" as const,
    priority: project.featured ? 0.8 : 0.7,
  }));

  const architectureRoutes = getAllArchitectureNotes().map((note) => ({
    url: getAbsoluteUrl(`/architecture/${note.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const labRoutes = getAllLabExperiments().filter((experiment) => !experiment.placeholder).map((experiment) => ({
    url: getAbsoluteUrl(`/lab/${experiment.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes = getPublishedArticles().map(({ metadata }) => ({
    url: getAbsoluteUrl(`/blog/${metadata.slug}`),
    lastModified: metadata.updatedDate ?? metadata.date,
    changeFrequency: "monthly" as const,
    priority: metadata.featured ? 0.8 : 0.7,
  }));

  return [...routes.map(({ path, priority }) => ({
    url: getAbsoluteUrl(path),
    changeFrequency: "monthly" as const,
    priority,
  })), ...projectRoutes, ...architectureRoutes, ...labRoutes, ...blogRoutes];
}
