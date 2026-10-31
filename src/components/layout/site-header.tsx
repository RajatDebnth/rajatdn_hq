import Link from "next/link";

import { SiteNav } from "@/components/layout/site-nav";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-2.5 sm:top-4 z-50 w-full px-2.5 sm:px-4">
      <div className="mx-auto flex h-13 sm:h-14 max-w-[var(--article-width)] items-center justify-between gap-2 sm:gap-5 rounded-full border border-[var(--line)] bg-[var(--background)]/85 px-3 sm:px-6 shadow-[0_8px_28px_rgba(0,0,0,0.06)] backdrop-blur-md">
        <Link
          className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-[var(--foreground)] no-underline transition-opacity hover:opacity-80 truncate shrink-0"
          href="/"
        >
          {siteConfig.name}
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
