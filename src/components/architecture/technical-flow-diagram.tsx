import type { ArchitectureDiagram } from "@/types/content";

export function TechnicalFlowDiagram({ description, steps, title }: ArchitectureDiagram) {
  return (
    <figure className="border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-7">
      <figcaption>
        <span className="block text-lg font-semibold">{title}</span>
        <span className="mt-2 block max-w-3xl text-sm leading-6 text-[var(--muted)]">{description}</span>
      </figcaption>
      <ol className="mt-6 grid gap-3 lg:grid-cols-[repeat(var(--flow-count),minmax(0,1fr))]" style={{ "--flow-count": steps.length } as React.CSSProperties}>
        {steps.map((step, index) => (
          <li className="relative border-l-2 border-[var(--accent)] bg-[var(--background)] p-4" key={`${step.label}-${index}`}>
            <span className="font-mono text-xs text-[var(--muted)]">{String(index + 1).padStart(2, "0")}</span>
            <strong className="mt-2 block text-sm">{step.label}</strong>
            <span className="mt-1 block text-sm leading-6 text-[var(--muted)]">{step.detail}</span>
            {index < steps.length - 1 ? <span aria-hidden="true" className="absolute -bottom-3 left-1/2 text-[var(--accent)] lg:-right-3 lg:bottom-auto lg:left-auto lg:top-1/2">↓</span> : null}
          </li>
        ))}
      </ol>
    </figure>
  );
}
