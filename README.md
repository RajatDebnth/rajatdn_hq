# Rajat Debnath — Professional Portfolio

The source for Rajat Debnath's professional website, focused on AI systems, data infrastructure, and automation.

## Current scope

The application now includes the production homepage, About/Systems/Capabilities/Industries pages, content-driven project, architecture, lab, and MDX blog routes, Contact and Resume pages, and a global SEO foundation. One technical article is published. Project and lab details remain clearly labeled planned placeholders; architecture notes are conceptual. The contact form has no configured destination, the resume lacks verified experience/education, and production deployment remains a separate phase.

The project must not present planned, conceptual, or experimental work as completed professional experience.

## Technology

- Next.js with the App Router
- TypeScript in strict mode
- Tailwind CSS
- ESLint with Next.js Core Web Vitals and TypeScript rules
- npm for dependency management

No database, custom backend, authentication, CMS, analytics, or newsletter integration is included.

## Design system

The reusable design system lives under `src/components`. It uses a restrained, border-led visual language, small radii, system fonts, strong focus states, mobile-first responsive styles, and an automatic `prefers-color-scheme` light/dark strategy. Mobile navigation is the only current stateful Client Component; the remaining primitives are Server Components.

## Local development

Requirements:

- Node.js 20.9 or newer
- npm

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run lint
npm run typecheck
npm run build
```

Run all applicable checks before committing a completed implementation phase.

The repository also contains [SEO](./SEO_AUDIT_REPORT.md), [performance](./PERFORMANCE_AUDIT_REPORT.md), [accessibility](./ACCESSIBILITY_AUDIT_REPORT.md), and [security](./SECURITY_CHECKLIST.md) audit/checklist documents. They record implementation findings and outstanding production checks; they are not claims of live indexing, Core Web Vitals, WCAG certification, or penetration-test coverage.

The production build currently uses Next.js's supported webpack builder. This avoids a Windows-specific native CSS-module resolution failure observed in the default Turbopack build; the choice should be re-evaluated after relevant Next.js/Turbopack updates.

## Contact page activation

The `/contact` page has a native, provider-compatible POST form but does not submit until a real destination is configured. Copy `.env.example` to an ignored `.env.local` for local testing, or set the same values in the Vercel project environment:

- `CONTACT_FORM_ENDPOINT`: HTTPS form-provider endpoint that accepts standard form POST fields (`name`, `email`, `company`, `topic`, `message`). Configure the provider's spam filtering, confirmation behavior, and privacy policy before enabling it. The hidden `website` field is a honeypot signal only; it does not filter submissions on this site.
- `CONTACT_EMAIL`: public professional email address for a `mailto:` link. Never use private email credentials.
- `CONTACT_LINKEDIN_URL` and `CONTACT_GITHUB_URL`: actual profile URLs.

The website does not store contact data or run a custom contact backend. In an unconfigured build, the form is visibly disabled and missing links are labeled as not supplied. Verify a provider submission in its own dashboard before treating the form as live. Do not enter secrets in these variables: public destinations become visible in generated HTML.

## Resume content and PDF

The browser-readable `/resume` page draws verified positioning and focus from `src/content/resume/resume.ts`. Its experience and education arrays remain empty until Rajat supplies authoritative details; planned projects are not shown as resume achievements. The incomplete page is `noindex` and omitted from the sitemap until its factual sections are reviewed.

The future PDF asset path is reserved as `public/resume/rajat-debnath-resume.pdf` in `src/config/resume.ts`. Add only a real reviewed PDF, then set `resumeAsset.published` to `true` and verify the download URL, file content, accessibility, and consistency with the browser-readable page. No placeholder PDF is generated.

## Project structure

```text
src/
├── app/          # App Router pages, layouts, route metadata, and composition
├── components/   # Reusable layout, UI, content, SEO, and feature components
├── config/       # Site-wide verified facts and navigation
├── content/      # Repository-local articles and typed content, grouped by type
├── lib/          # Content, metadata, and SEO implementation boundaries
└── types/        # Shared content, navigation, and SEO contracts
```

The planned architecture and phase sequence are documented in [`MASTER_IMPLEMENTATION_PLAN.md`](./MASTER_IMPLEMENTATION_PLAN.md).

## Content accuracy

Never invent professional achievements, clients, employers, projects, deployments, results, metrics, datasets, awards, certifications, testimonials, or technologies. Missing information must remain absent or be explicitly identified as planned, conceptual, or experimental.

## Deployment direction

Keep the GitHub repository private when its remote is created. The public site will eventually be deployed through Vercel at `https://rajatdn.vercel.app`, subject to availability and production verification. A public deployment does not require public source code.
