import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Section spacing="wide">
      <Container>
        <div className="max-w-2xl">
          <p className="font-mono text-sm uppercase tracking-[0.14em] text-[var(--muted)]">404 / Not found</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Page not found</h1>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">The requested page does not exist. Explore the published systems, technical writing, or the homepage.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/">Return home</ButtonLink>
            <ButtonLink href="/blog" variant="secondary">Read technical writing</ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
