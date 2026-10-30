import "server-only";

import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { siteConfig } from "@/config/site";
import { getAbsoluteUrl } from "@/lib/metadata/create-page-metadata";
import type { ArticleMetadata, RelatedContentReference } from "@/types/content";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidSlug(value: string) {
  return slugPattern.test(value);
}

const directory = path.join(process.cwd(), "src", "content", "blog");
const publishedDirectory = path.join(directory, "published");

export type BlogArticle = { metadata: ArticleMetadata; body: string; headings: readonly { id: string; title: string; level: number }[] };

function fail(file: string, message: string): never {
  throw new Error(`Invalid blog frontmatter in ${file}: ${message}`);
}

function stringField(data: Record<string, unknown>, name: string, file: string): string {
  const value = data[name];
  if (typeof value !== "string" || !value.trim()) fail(file, `${name} must be a non-empty string`);
  return value.trim();
}

function optionalString(data: Record<string, unknown>, name: string, file: string): string | undefined {
  const value = data[name];
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value !== "string") fail(file, `${name} must be a string`);
  return value.trim();
}

function dateField(data: Record<string, unknown>, name: string, file: string, required = false): string | undefined {
  const value = data[name];
  if (value === undefined && !required) return undefined;
  const date = value instanceof Date ? value.toISOString().slice(0, 10) : value;
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) fail(file, `${name} must be a valid YYYY-MM-DD date`);
  return date;
}

function stringList(data: Record<string, unknown>, name: string, file: string): string[] {
  const value = data[name];
  if (!Array.isArray(value) || !value.every((item) => typeof item === "string" && item.trim())) fail(file, `${name} must be a list of non-empty strings`);
  return value.map((item: string) => item.trim());
}

function headingId(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

function extractHeadings(body: string) {
  const seen = new Set<string>();
  return [...body.matchAll(/^(#{2,3})\s+(.+)$/gm)].map((match) => {
    const title = match[2].replace(/[*_`]/g, "").trim();
    const id = headingId(title);
    if (!id || seen.has(id)) throw new Error(`Duplicate or invalid article heading: ${title}`);
    seen.add(id);
    return { id, title, level: match[1].length };
  });
}

function parseArticle(file: string): BlogArticle {
  const raw = readFileSync(path.join(publishedDirectory, file), "utf8");
  const { data, content } = matter(raw);
  const fields = data as Record<string, unknown>;
  const title = stringField(fields, "title", file);
  const filenameSlug = file.replace(/\.(md|mdx)$/, "");
  const slug = optionalString(fields, "slug", file) ?? filenameSlug;
  if (!isValidSlug(slug)) fail(file, "slug must use lowercase letters, digits, and single hyphens");
  if (slug !== filenameSlug) fail(file, "slug must match the article filename, or the slug field should be removed");
  const description = stringField(fields, "description", file);
  const date = dateField(fields, "date", file, true)!;
  const updatedDate = dateField(fields, "updatedDate", file);
  if (updatedDate && updatedDate < date) fail(file, "updatedDate cannot predate date");
  const author = optionalString(fields, "author", file) ?? siteConfig.name;
  if (author !== siteConfig.name) fail(file, `author must match the verified site author (${siteConfig.name})`);
  const category = stringField(fields, "category", file);
  const tags = stringList(fields, "tags", file);
  if (fields.draft === true) fail(file, "draft articles belong in src/content/blog/drafts, not published");
  if (fields.draft !== undefined && typeof fields.draft !== "boolean") fail(file, "draft must be a boolean when provided");
  if (fields.featured !== undefined && typeof fields.featured !== "boolean") fail(file, "featured must be a boolean");
  const canonicalUrl = optionalString(fields, "canonicalUrl", file);
  if (canonicalUrl) {
    let url: URL;
    try { url = new URL(canonicalUrl); } catch { fail(file, "canonicalUrl must be an absolute HTTPS URL"); }
    if (url.protocol !== "https:" || url.username || url.password) fail(file, "canonicalUrl must use HTTPS without credentials");
  }
  const imageData = fields.image;
  let image: ArticleMetadata["image"];
  if (imageData !== undefined) {
    if (!imageData || typeof imageData !== "object" || Array.isArray(imageData)) fail(file, "image must be an object");
    const record = imageData as Record<string, unknown>;
    const src = stringField(record, "src", file);
    const alt = stringField(record, "alt", file);
    if (!src.startsWith("/") || src.startsWith("//")) fail(file, "image.src must be a local absolute path");
    if (typeof record.width !== "number" || typeof record.height !== "number" || record.width <= 0 || record.height <= 0) fail(file, "image dimensions must be positive numbers");
    image = { src, alt, width: record.width, height: record.height };
  }
  const faqData = fields.faq;
  let faq: ArticleMetadata["faq"];
  if (faqData !== undefined) {
    if (!Array.isArray(faqData)) fail(file, "faq must be a list");
    faq = faqData.map((item) => {
      if (!item || typeof item !== "object") fail(file, "faq entries must be objects");
      const record = item as Record<string, unknown>;
      return { question: stringField(record, "question", file), answer: stringField(record, "answer", file) };
    });
  }
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const calculatedReadingTime = Math.max(1, Math.ceil(words / 220));
  if (calculatedReadingTime > 5) fail(file, `article is approximately ${calculatedReadingTime} minutes; published articles must be 5 minutes or less`);
  const readingTime = fields.readingTime;
  if (readingTime !== undefined && (typeof readingTime !== "number" || !Number.isInteger(readingTime) || readingTime < 1)) fail(file, "readingTime must be a positive whole number");
  const metadata: ArticleMetadata = {
    kind: "article", status: "completed", slug, title, description, topics: tags,
    date, publishedAt: date, updatedDate, updatedAt: updatedDate, author, category, tags,
    featured: fields.featured === true, image, readingTime: (readingTime as number | undefined) ?? calculatedReadingTime,
    canonicalUrl, seoTitle: optionalString(fields, "seoTitle", file), seoDescription: optionalString(fields, "seoDescription", file), faq,
    draft: false,
  };
  return { metadata, body: content, headings: extractHeadings(content) };
}

function readArticles(): BlogArticle[] {
  const files = readdirSync(publishedDirectory).filter((file) => /\.(md|mdx)$/.test(file));
  const articles = files.map(parseArticle);
  const slugs = new Set<string>();
  for (const article of articles) {
    if (slugs.has(article.metadata.slug)) throw new Error(`Duplicate blog slug: ${article.metadata.slug}`);
    slugs.add(article.metadata.slug);
  }
  return articles;
}

export function getPublishedArticles(): BlogArticle[] {
  return readArticles().filter((article) => !article.metadata.draft).sort((a, b) => b.metadata.date.localeCompare(a.metadata.date) || a.metadata.title.localeCompare(b.metadata.title));
}

export function getPublishedArticleBySlug(slug: string): BlogArticle | undefined {
  if (!isValidSlug(slug)) return undefined;
  return getPublishedArticles().find((article) => article.metadata.slug === slug);
}

export function resolveRelatedArticles(references: readonly RelatedContentReference[], source: string): RelatedContentReference[] {
  return references.map(({ slug }) => {
    const article = getPublishedArticleBySlug(slug);
    if (!article) throw new Error(`Unpublished or missing related article '${slug}' in ${source}`);
    return { slug, title: article.metadata.title };
  });
}

export function getAdjacentArticles(slug: string) {
  const articles = getPublishedArticles();
  const index = articles.findIndex((article) => article.metadata.slug === slug);
  return { previous: index > 0 ? articles[index - 1] : undefined, next: index >= 0 ? articles[index + 1] : undefined };
}

export function getRelatedArticles(article: BlogArticle, limit = 3) {
  return getPublishedArticles().filter((other) => other.metadata.slug !== article.metadata.slug)
    .map((other) => ({ article: other, score: other.metadata.tags.filter((tag) => article.metadata.tags.includes(tag)).length + Number(other.metadata.category === article.metadata.category) }))
    .filter(({ score }) => score > 0).sort((a, b) => b.score - a.score || b.article.metadata.date.localeCompare(a.article.metadata.date))
    .slice(0, limit).map(({ article: related }) => related);
}

export function getArticleCanonicalUrl(article: BlogArticle) {
  return article.metadata.canonicalUrl ?? getAbsoluteUrl(`/blog/${article.metadata.slug}`);
}
