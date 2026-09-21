import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer>
      <Container className="reading-width border-t border-[var(--line)] py-8 text-sm text-[var(--muted)]">
        <p>© {new Date().getFullYear()} {siteConfig.name} · <a className="underline-offset-4 hover:text-[var(--foreground)] hover:underline" href="/rss.xml">RSS</a></p>
      </Container>
    </footer>
  );
}
