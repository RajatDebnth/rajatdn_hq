import type { ReactNode } from "react";

type ProseSectionProps = {
  children: ReactNode;
  eyebrow?: string;
  title: string;
};

export function ProseSection({ children, eyebrow, title }: ProseSectionProps) {
  return (
    <section className="grid gap-5 border-t border-[var(--line)] py-10 md:grid-cols-[13rem_1fr] md:gap-12 sm:py-14">
      <header>
        {eyebrow ? (
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">{eyebrow}</p>
        ) : null}
        <h2 className="mt-2 text-xl font-semibold tracking-tight">{title}</h2>
      </header>
      <div className="max-w-[var(--article-width)] space-y-5 leading-8 text-[var(--muted)]">{children}</div>
    </section>
  );
}
