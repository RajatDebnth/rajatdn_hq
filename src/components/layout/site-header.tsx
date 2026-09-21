import Link from "next/link";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header>
      <Container className="reading-width flex min-h-20 items-center justify-between gap-5 border-b border-[var(--line)]">
        <Link className="font-serif text-lg font-semibold no-underline" href="/">{siteConfig.name}</Link>
        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-4 text-sm text-[var(--muted)] sm:gap-6">
            <li><Link className="hover:text-[var(--foreground)]" href="/blog">Blogs</Link></li>
            <li><Link className="hover:text-[var(--foreground)]" href="/experiences">Experiences</Link></li>
            <li><ThemeToggle /></li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
