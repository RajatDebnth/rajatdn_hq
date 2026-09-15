import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function ArchitectureNotFound() {
  return <Section spacing="wide"><Container><div className="max-w-2xl"><p className="font-mono text-sm uppercase tracking-[0.14em] text-[var(--muted)]">404 / Architecture</p><h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Architecture note not found</h1><p className="mt-5 text-lg leading-8 text-[var(--muted)]">The requested note is not part of the published architecture collection.</p><div className="mt-8"><ButtonLink href="/architecture">View architecture notes</ButtonLink></div></div></Container></Section>;
}
