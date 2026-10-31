"use client";

import Link from "next/link";
import { useEffect } from "react";

import { ArticleIcon, CloseIcon, ExternalLinkIcon, GitHubIcon } from "@/components/ui/icons";
import type { WorkCta, WorkItem } from "@/types/works";

type ProjectModalProps = {
  project: WorkItem | null;
  onClose: () => void;
};

function getCtaIcon(type: WorkCta["type"]) {
  switch (type) {
    case "github":
      return <GitHubIcon className="size-3.5" />;
    case "article":
      return <ArticleIcon className="size-3.5" />;
    default:
      return <ExternalLinkIcon className="size-3.5" />;
  }
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Handle ESC key press and scroll locking
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [project, onClose]);

  if (!project || !project.popup) return null;

  const { popup } = project;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-[var(--line)] bg-[var(--background)] p-5 sm:p-7 shadow-2xl z-10 max-h-[90vh] overflow-y-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden text-left transition-all">
        {/* Header with Title and Close Button */}
        <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5 text-[0.625rem] font-mono font-medium text-[var(--muted)]">
                {project.category}
              </span>
              <span className="text-xs text-[var(--muted)]">•</span>
              <span className="text-xs font-mono text-[var(--muted)]">
                {project.subtitle}
              </span>
            </div>
            <h2
              id="modal-project-title"
              className="mt-1.5 text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]"
            >
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="rounded-full border border-[var(--line)] bg-[var(--surface)] p-2 text-[var(--muted)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)] cursor-pointer shrink-0"
          >
            <CloseIcon className="size-4" />
          </button>
        </div>

        {/* 6 Concise Sections */}
        <div className="mt-5 space-y-5 text-sm">
          {/* Section 1: Access & Verified Source (Call to Action & Access) */}
          <section className="pb-4 border-b border-[var(--line)]">
            <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-[var(--muted)]">
              1. Access &amp; Verified Source
            </h3>
            <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
              {popup.ctas.map((cta) => {
                const isExternal =
                  cta.url.startsWith("http://") || cta.url.startsWith("https://") || cta.url.startsWith("mailto:");

                const buttonClasses =
                  cta.type === "github" || cta.type === "demo"
                    ? "inline-flex items-center gap-2 rounded-full border border-zinc-900 bg-[#18181b] px-4 py-2 text-xs sm:text-sm font-semibold !text-white shadow-xs hover:bg-black active:scale-95 transition-all"
                    : "inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-xs sm:text-sm font-semibold !text-zinc-900 shadow-xs hover:border-zinc-400 hover:bg-zinc-50 active:scale-95 transition-all";

                if (isExternal) {
                  return (
                    <a
                      key={cta.label}
                      href={cta.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClasses}
                    >
                      {getCtaIcon(cta.type)}
                      <span>{cta.label}</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  );
                }

                return (
                  <Link
                    key={cta.label}
                    href={cta.url}
                    onClick={onClose}
                    className={buttonClasses}
                  >
                    {getCtaIcon(cta.type)}
                    <span>{cta.label}</span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Section 2: What is it? (The One-Liner) */}
          <section>
            <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-[var(--muted)]">
              2. What is it?
            </h3>
            <p className="mt-1 text-sm sm:text-base font-medium text-[var(--foreground)] leading-relaxed">
              {popup.oneLiner}
            </p>
          </section>

          {/* Section 3: What problem does it solve? (The Value Proposition) */}
          <section>
            <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-[var(--muted)]">
              3. Problem Solved
            </h3>
            <div className="mt-1.5 rounded-lg border-l-2 border-[var(--foreground)] bg-[var(--surface-subtle)]/60 px-3.5 py-2.5 text-xs sm:text-sm text-[var(--foreground)] leading-relaxed">
              {popup.problem}
            </div>
          </section>

          {/* Section 4: How does it work? (Core Feature Demo) */}
          {popup.workflow && popup.workflow.length > 0 && (
            <section>
              <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-[var(--muted)]">
                4. How does it work?
              </h3>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                {popup.workflow.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-2.5 text-left"
                  >
                    <div className="flex items-center gap-1.5 text-[0.625rem] font-mono font-bold text-[var(--muted)] uppercase">
                      <span className="size-3.5 rounded-full bg-[var(--surface-subtle)] border border-[var(--line)] inline-flex items-center justify-center text-[0.5625rem]">
                        {item.step}
                      </span>
                      <span>{item.title}</span>
                    </div>
                    <p className="mt-1 text-[0.6875rem] text-[var(--foreground)] leading-snug">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 5: Tech Stack & Architecture */}
          <section>
            <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-[var(--muted)]">
              5. Tech Stack &amp; Architecture
            </h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {popup.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5 text-xs font-mono text-[var(--foreground)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Section 6: Unique Highlights & Impact */}
          <section>
            <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-[var(--muted)]">
              6. Highlights &amp; Impact
            </h3>
            <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-[var(--foreground)]">
              {popup.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold text-xs mt-0.5">✓</span>
                  <span className="leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

