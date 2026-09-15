import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

type CtaSectionProps = {
  actionHref: `/${string}` | "/" | `#${string}`;
  actionLabel: string;
  description: ReactNode;
  id?: string;
  title: string;
};

export function CtaSection({ actionHref, actionLabel, description, id, title }: CtaSectionProps) {
  return (
    <Section className="border-y border-[var(--line)] bg-[var(--surface)]" id={id}>
      <Container className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
          <div className="mt-4 text-[var(--muted)]">{description}</div>
        </div>
        <ButtonLink href={actionHref}>{actionLabel}</ButtonLink>
      </Container>
    </Section>
  );
}
