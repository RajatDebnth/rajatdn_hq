import { isValidElement, type ComponentPropsWithoutRef, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

import { ArchitectureFlow } from "@/components/home/architecture-flow";
import { TechnicalFlowDiagram } from "@/components/architecture/technical-flow-diagram";
import { Callout } from "@/components/ui/callout";
import { DataTable } from "@/components/content/data-table";
import { CodeBlock } from "@/components/content/code-block";
import { getProjectBySlug, isValidSlug } from "@/lib/content/projects";

function idFromChildren(children: ReactNode) {
  return String(children).toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

export function CaptionedImage({ alt, caption, height, src, width }: { alt: string; caption: string; height: number; src: string; width: number }) {
  if (!src.startsWith("/")) throw new Error("Article images must use repository-local paths");
  return <figure className="my-8"><Image alt={alt} className="h-auto w-full border border-[var(--line)]" height={height} sizes="(max-width: 736px) 100vw, 736px" src={src} width={width} /><figcaption className="mt-3 text-center text-sm text-[var(--muted)]">{caption}</figcaption></figure>;
}

export function ArchitectureBlock({ children, title }: { children: ReactNode; title: string }) {
  return <aside className="my-8 border-l-2 border-[var(--accent)] bg-[var(--surface)] p-5"><h3 className="font-semibold">{title}</h3><div className="mt-3 leading-7 text-[var(--muted)]">{children}</div></aside>;
}

export function RelatedProjectLink({ slug, title }: { slug: string; title: string }) {
  if (!isValidSlug(slug) || !getProjectBySlug(slug)) throw new Error(`Unknown related project slug: ${slug}`);
  return <Link className="font-medium text-[var(--accent)] underline-offset-4 hover:underline" href={`/projects/${slug}`}>{title}</Link>;
}

function MarkdownPre({ children }: { children?: ReactNode }) {
  if (!isValidElement<{ children?: ReactNode; className?: string }>(children)) return <pre>{children}</pre>;
  const language = children.props.className?.replace(/^language-/, "") ?? "text";
  return <CodeBlock code={String(children.props.children ?? "").replace(/\n$/, "")} language={language} />;
}

const heading = "font-semibold tracking-tight text-[var(--foreground)]";
const tableCell = "border-b border-[var(--line)] px-4 py-3 align-top";

export const blogMdxComponents = {
  h2: ({ children }: { children?: ReactNode }) => <h2 className={`mb-4 mt-12 text-2xl ${heading}`} id={idFromChildren(children)}>{children}</h2>,
  h3: ({ children }: { children?: ReactNode }) => <h3 className={`mb-3 mt-9 text-xl ${heading}`} id={idFromChildren(children)}>{children}</h3>,
  p: ({ children }: { children?: ReactNode }) => <p className="my-5 leading-8 text-[var(--muted)]">{children}</p>,
  ul: ({ children }: { children?: ReactNode }) => <ul className="my-5 list-disc space-y-2 pl-6 leading-7 text-[var(--muted)]">{children}</ul>,
  ol: ({ children }: { children?: ReactNode }) => <ol className="my-5 list-decimal space-y-2 pl-6 leading-7 text-[var(--muted)]">{children}</ol>,
  blockquote: ({ children }: { children?: ReactNode }) => <blockquote className="my-7 border-l-2 border-[var(--accent)] pl-5 text-[var(--muted)]">{children}</blockquote>,
  a: ({ href, children }: ComponentPropsWithoutRef<"a">) => <a className="text-[var(--accent)] underline-offset-4 hover:underline" href={href}>{children}</a>,
  pre: MarkdownPre,
  code: ({ children }: { children?: ReactNode }) => <code className="rounded-sm bg-[var(--surface-subtle)] px-1 py-0.5 font-mono text-sm">{children}</code>,
  table: ({ children }: { children?: ReactNode }) => <DataTable>{children}</DataTable>,
  th: ({ children }: { children?: ReactNode }) => <th className={`${tableCell} bg-[var(--surface-subtle)] text-left font-semibold`} scope="col">{children}</th>,
  td: ({ children }: { children?: ReactNode }) => <td className={`${tableCell} text-[var(--muted)]`}>{children}</td>,
  Callout,
  CodeBlock,
  DataTable,
  ArchitectureFlow,
  TechnicalFlowDiagram,
  ArchitectureBlock,
  CaptionedImage,
  RelatedProjectLink,
};
