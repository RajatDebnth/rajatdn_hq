import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "@/components/ui/icons";
import { WorksShowcase } from "@/components/works/works-showcase";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata";
import { createBreadcrumbStructuredData, createWebPageStructuredData } from "@/lib/seo/structured-data";

const description =
  "Showcase of AI products, production RAG pipelines, data infrastructure, and software systems engineered by Rajat Debnath.";

export const metadata: Metadata = createPageMetadata({
  title: "My Works",
  description,
  path: "/works",
});

export default function WorksPage() {
  return (
    <>
      <JsonLd
        data={createWebPageStructuredData({
          name: "My Works — Rajat Debnath",
          description,
          path: "/works",
        })}
      />
      <JsonLd
        data={createBreadcrumbStructuredData([
          { name: "Home", path: "/" },
          { name: "My Works", path: "/works" },
        ])}
      />

      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-10 sm:py-14">
        {/* Gallery with Tabs and 3 images in a row with hover title overlay */}
        <WorksShowcase />

        {/* Converting CTA Section */}
        <section
          aria-labelledby="cta-heading"
          className="mt-12 sm:mt-14 rounded-2xl border border-[var(--line)] bg-[var(--surface-subtle)]/70 p-4 sm:px-6 sm:py-5 shadow-2xs"
          id="contact"
        >
          <div className="max-w-xl">
            <span className="font-mono text-[0.625rem] sm:text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Let&apos;s Build Together
            </span>
            <h2
              className="mt-1 text-base sm:text-lg font-bold tracking-tight text-[var(--foreground)]"
              id="cta-heading"
            >
              Have a project or AI system in mind?
            </h2>
            <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[var(--muted)]">
              I build AI products, software, websites and automations. Reach out directly through your preferred channel.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-2.5">
            {/* Phone CTA */}
            <a
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--background)] px-3.5 py-1.5 text-xs sm:text-sm font-medium text-[var(--foreground)] shadow-2xs transition-all hover:border-[var(--line-strong)] hover:bg-[var(--surface)] hover:scale-[1.02] active:scale-[0.98]"
              href={`tel:${siteConfig.contact.phone}`}
            >
              <PhoneIcon className="size-3.5 text-[var(--foreground)]" />
              <span>{siteConfig.contact.phoneFormatted}</span>
            </a>

            {/* Email CTA */}
            <a
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--background)] px-3.5 py-1.5 text-xs sm:text-sm font-medium text-[var(--foreground)] shadow-2xs transition-all hover:border-[var(--line-strong)] hover:bg-[var(--surface)] hover:scale-[1.02] active:scale-[0.98]"
              href={`mailto:${siteConfig.contact.email}`}
            >
              <MailIcon className="size-3.5 text-[var(--foreground)]" />
              <span>{siteConfig.contact.email}</span>
            </a>

            {/* LinkedIn CTA */}
            <a
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--background)] px-3.5 py-1.5 text-xs sm:text-sm font-medium text-[var(--foreground)] shadow-2xs transition-all hover:border-[var(--line-strong)] hover:bg-[var(--surface)] hover:scale-[1.02] active:scale-[0.98]"
              href={siteConfig.contact.linkedInUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkedInIcon className="size-3.5 text-[var(--foreground)]" />
              <span>LinkedIn<span className="sr-only"> (opens in a new tab)</span></span>
            </a>

            {/* GitHub CTA */}
            <a
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--background)] px-3.5 py-1.5 text-xs sm:text-sm font-medium text-[var(--muted)] shadow-2xs transition-all hover:border-[var(--line-strong)] hover:bg-[var(--surface)] hover:text-[var(--foreground)] hover:scale-[1.02] active:scale-[0.98]"
              href={siteConfig.contact.gitHubUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GitHubIcon className="size-3.5 text-[var(--foreground)]" />
              <span>GitHub<span className="sr-only"> (opens in a new tab)</span></span>
            </a>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-6 text-xs sm:text-sm">
          <Link className="underline underline-offset-4 hover:text-[var(--foreground)]" href="/blog">
            Read technical articles →
          </Link>
          <Link className="underline underline-offset-4 hover:text-[var(--foreground)]" href="/experiences">
            View full professional experiences →
          </Link>
        </div>
      </main>
    </>
  );
}
