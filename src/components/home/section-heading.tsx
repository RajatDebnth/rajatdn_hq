type SectionHeadingProps = {
  description?: string;
  eyebrow: string;
  id?: string;
  title: string;
};

export function SectionHeading({ description, eyebrow, id, title }: SectionHeadingProps) {
  return (
    <header className="max-w-3xl">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em] sm:text-4xl" id={id}>{title}</h2>
      {description ? (
        <p className="mt-4 text-lg leading-8 text-[var(--muted)]">{description}</p>
      ) : null}
    </header>
  );
}
