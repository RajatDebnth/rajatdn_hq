import Link from "next/link";

import { Container } from "@/components/ui/container";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  const importantLinks = navigation.primary.filter((item) => item.available);

  return (
    <footer className="border-t border-white/10 bg-[var(--dark)] text-white">
      <Container className="grid gap-8 py-10 text-sm text-[var(--header-muted)] md:grid-cols-[1.4fr_1fr_1fr]">
        <div><p className="font-semibold text-white">{siteConfig.name}</p><p className="mt-2 max-w-xs">AI systems, data infrastructure, and automation.</p></div>
        <nav aria-label="Footer links"><h2 className="font-semibold text-white">Explore</h2><ul className="mt-3 space-y-2">{importantLinks.map((item) => <li key={item.href}><Link className="hover:text-[var(--contrast)]" href={item.href}>{item.label}</Link></li>)}</ul></nav>
        <div><h2 className="font-semibold text-white">Connect</h2><ul className="mt-3 space-y-2"><li><a className="hover:text-[var(--contrast)]" href={siteConfig.contact.linkedInUrl} rel="noopener noreferrer" target="_blank">LinkedIn<span className="sr-only"> (opens in a new tab)</span></a></li><li><a className="hover:text-[var(--contrast)]" href={siteConfig.contact.gitHubUrl} rel="noopener noreferrer" target="_blank">GitHub<span className="sr-only"> (opens in a new tab)</span></a></li></ul></div>
      </Container>
    </footer>
  );
}
