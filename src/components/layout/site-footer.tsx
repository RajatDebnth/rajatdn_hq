import Link from "next/link";

import { Container } from "@/components/ui/container";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  const importantLinks = navigation.primary.filter((item) => item.available && ["/systems", "/projects", "/blog", "/contact"].includes(item.href));
  const supportingLinks = navigation.secondary.filter((item) => item.available);

  return (
    <footer className="border-t border-[var(--line)]">
      <Container className="grid gap-8 py-10 text-sm text-[var(--muted)] md:grid-cols-[1.4fr_1fr_1fr]">
        <div><p className="font-semibold text-[var(--foreground)]">{siteConfig.name}</p><p className="mt-2 max-w-xs">AI systems for advanced manufacturing.</p></div>
        <nav aria-label="Footer main links"><h2 className="font-semibold text-[var(--foreground)]">Explore</h2><ul className="mt-3 space-y-2">{importantLinks.map((item) => <li key={item.href}><Link className="hover:text-[var(--accent)]" href={item.href}>{item.label}</Link></li>)}</ul></nav>
        <nav aria-label="Footer supporting links"><h2 className="font-semibold text-[var(--foreground)]">More</h2><ul className="mt-3 space-y-2">{supportingLinks.map((item) => <li key={item.href}><Link className="hover:text-[var(--accent)]" href={item.href}>{item.label}</Link></li>)}</ul></nav>
      </Container>
    </footer>
  );
}
