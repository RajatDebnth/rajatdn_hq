import { Container } from "@/components/ui/container";
import { RssIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer>
      <Container className="reading-width border-t border-[var(--line)] py-8 text-sm text-[var(--muted)]">
        <p className="flex flex-wrap items-center gap-2">
          <span>© {new Date().getFullYear()} {siteConfig.name}</span>
          <span aria-hidden="true">·</span>
          <a
            className="inline-flex items-center gap-1.5 underline-offset-4 hover:text-[var(--foreground)] hover:underline"
            href="/rss.xml"
          >
            <RssIcon className="size-3 text-amber-600 dark:text-amber-500" />
            <span>RSS Feed</span>
          </a>
        </p>
      </Container>
    </footer>
  );
}
