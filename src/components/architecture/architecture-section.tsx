import type { ReactNode } from "react";

export function ArchitectureSection({ children, id, summary, title }: { children?: ReactNode; id: string; summary?: string; title: string }) {
  return (
    <section aria-labelledby={id} className="border-t border-[var(--line)] py-9 sm:py-12">
      <div className="grid gap-5 lg:grid-cols-[13rem_1fr] lg:gap-12">
        <h2 className="text-xl font-semibold" id={id}>{title}</h2>
        <div className="min-w-0">
          {summary ? <p className="max-w-[var(--article-width)] leading-7 text-[var(--muted)]">{summary}</p> : null}
          {children ? <div className={summary ? "mt-6" : undefined}>{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
