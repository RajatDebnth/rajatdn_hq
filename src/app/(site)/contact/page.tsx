import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { PageHeader } from "@/components/content/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getContactChannels } from "@/lib/contact/channels";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata";
import { createBreadcrumbStructuredData, createWebPageStructuredData } from "@/lib/seo/structured-data";

const description = "Contact Rajat Nath about a technical conversation on production AI systems, industrial data, architecture, and deployment for advanced manufacturing.";
export const metadata: Metadata = createPageMetadata({ title: "Contact", description, path: "/contact" });

export default function ContactPage() {
  const channels = getContactChannels();
  return <>
    <JsonLd data={createWebPageStructuredData({ name: "Contact", description, path: "/contact" })} />
    <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
    <Section spacing="wide"><Container>
      <PageHeader breadcrumb={[{ href: "/", label: "Home" }, { label: "Contact" }]} eyebrow="Technical conversation" title="Discuss a production AI problem" summary="Share the system objective, available data, operational constraints, and deployment questions. A useful first conversation starts with the decision and its environment, not a promised model result." />
      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(16rem,0.8fr)] lg:gap-20">
        <div>
          <h2 className="text-2xl font-semibold">Send an inquiry</h2>
          <ContactForm endpoint={channels.formEndpoint} />
          <div className="mt-8 border-t border-[var(--line)] pt-6 text-sm leading-7 text-[var(--muted)]" id="contact-privacy-note"><h3 className="font-semibold text-[var(--foreground)]">Privacy and data handling</h3><p className="mt-2">This website does not store contact submissions in a database. If a form provider is configured, your name, email, optional company, topic, and message are sent to that external provider for delivery; its privacy terms should be reviewed before submission. Please do not send confidential plant data, credentials, personal records, or proprietary files in an initial inquiry.</p></div>
        </div>
        <aside aria-labelledby="contact-channels-title" className="border-t border-[var(--line)] pt-7 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <h2 className="text-2xl font-semibold" id="contact-channels-title">Other contact channels</h2>
          <dl className="mt-6 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            <div className="py-5"><dt className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">Professional email</dt><dd className="mt-2">{channels.email ? <a className="text-[var(--accent)] hover:underline" href={`mailto:${channels.email}`}>{channels.email}</a> : <span className="text-[var(--muted)]">Address not supplied yet</span>}</dd></div>
            <div className="py-5"><dt className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">LinkedIn</dt><dd className="mt-2">{channels.linkedInUrl ? <a className="text-[var(--accent)] hover:underline" href={channels.linkedInUrl} rel="noopener noreferrer" target="_blank">View LinkedIn profile<span className="sr-only"> (opens in a new tab)</span></a> : <span className="text-[var(--muted)]">Profile link not supplied yet</span>}</dd></div>
            <div className="py-5"><dt className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">GitHub</dt><dd className="mt-2">{channels.gitHubUrl ? <a className="text-[var(--accent)] hover:underline" href={channels.gitHubUrl} rel="noopener noreferrer" target="_blank">View GitHub profile<span className="sr-only"> (opens in a new tab)</span></a> : <span className="text-[var(--muted)]">Profile link not supplied yet</span>}</dd></div>
          </dl>
          <p className="mt-6 text-sm leading-6 text-[var(--muted)]">These channels remain unlinked until Rajat supplies the real address and profile URLs.</p>
        </aside>
      </div>
    </Container></Section>
  </>;
}
