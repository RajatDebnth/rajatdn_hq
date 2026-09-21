# Rajat Debnath — Professional Portfolio

The source for Rajat Debnath's professional website, focused on AI engineering, technical writing, data infrastructure, and automation.

## Current scope

The public application includes a personal homepage, an experience timeline, a repository-owned technical blog, RSS, sitemap, robots rules, metadata, and structured data. Blog publishing uses the no-code drop-folder workflow documented in `src/content/blog/BLOG_STRUCTURE.md`.

The project must not present planned, conceptual, or experimental work as completed professional experience.

## Technology

- Next.js with the App Router
- TypeScript in strict mode
- Tailwind CSS
- ESLint with Next.js Core Web Vitals and TypeScript rules
- npm for dependency management

No database, custom backend, authentication, CMS, analytics, or newsletter integration is included.

## Design

The site uses a narrow, writing-first layout with serif headings, readable body text, strong focus states, responsive spacing, and a persistent light/dark theme control. Server Components remain the default; the theme control is the only stateful Client Component.

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

The production build currently uses Next.js's supported webpack builder. This avoids a Windows-specific native CSS-module resolution failure observed in the default Turbopack build; the choice should be re-evaluated after relevant Next.js/Turbopack updates.

## Blog publishing

Copy the template in `src/content/blog/BLOG_STRUCTURE.md`, save the finished article as a lowercase hyphenated `.md` file in `src/content/blog/published`, then commit and push. Drafts belong in `src/content/blog/drafts` and never appear publicly. URLs, authorship, reading time, metadata, RSS, sitemap entries, and related writing are generated automatically.

## Project structure

```text
src/
├── app/          # App Router pages, layouts, route metadata, and composition
├── components/   # Reusable layout, UI, content, SEO, and feature components
├── config/       # Site-wide verified facts
├── content/      # Repository-local blog and verified experience content
├── lib/          # Content, metadata, and SEO implementation boundaries
└── types/        # Shared content, resume, and SEO contracts
```

## Content accuracy

Never invent professional achievements, clients, employers, projects, deployments, results, metrics, datasets, awards, certifications, testimonials, or technologies. Missing information must remain absent or be explicitly identified as planned, conceptual, or experimental.

## Deployment direction

Keep the GitHub repository private when its remote is created. The public site will eventually be deployed through Vercel at `https://rajatdn.vercel.app`, subject to availability and production verification. A public deployment does not require public source code.
