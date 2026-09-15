import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function ArticleNotFound() {
  return <Section spacing="wide"><Container><div className="max-w-2xl"><p className="font-mono text-sm uppercase tracking-[0.14em] text-[var(--muted)]">404 / Blog</p><h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Article not found</h1><p className="mt-5 text-lg leading-8 text-[var(--muted)]">This article is unpublished or does not exist.</p><div className="mt-8"><ButtonLink href="/blog">View technical writing</ButtonLink></div></div></Container></Section>;
}
