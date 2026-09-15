type ProjectSectionProps = {
  title: string;
  children: string;
};

export function ProjectSection({ children, title }: ProjectSectionProps) {
  return (
    <section className="grid gap-4 border-t border-[var(--line)] py-8 md:grid-cols-[12rem_1fr] md:gap-10">
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="max-w-[var(--article-width)] leading-7 text-[var(--muted)]">{children}</p>
    </section>
  );
}
