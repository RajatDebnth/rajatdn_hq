import Link from "next/link";

import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Navigation } from "@/components/layout/navigation";
import { Container } from "@/components/ui/container";
import { availableNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[color:var(--background)]/95 backdrop-blur-sm">
      <Container className="flex min-h-16 items-center justify-between gap-6">
        <Link className="font-semibold tracking-tight no-underline" href="/">{siteConfig.name}</Link>
        <div className="hidden lg:block"><Navigation items={availableNavigation} /></div>
        <MobileNavigation items={availableNavigation} />
      </Container>
    </header>
  );
}
