# Project rules for coding agents

These instructions apply to the entire repository.

## Product intent

Build a professional authority and technical publishing platform for Rajat Debnath, positioned as an AI Engineer focused on production-oriented AI systems, data infrastructure, and automation. This is not a generic developer portfolio.

## Accuracy and evidence

- Never invent clients, employers, projects, results, metrics, datasets, revenue, users, awards, certifications, testimonials, deployments, or technologies.
- Never convert hypothetical, planned, or experimental work into a statement of real experience.
- Clearly label work as conceptual, planned, running, implemented, tested, completed, or deployed when the distinction matters.
- Ask for authoritative information when a factual claim cannot be verified from repository content or the user.
- Keep structured data consistent with visible page content.

## Architecture

- Use Next.js App Router and TypeScript.
- Use Server Components by default.
- Add a Client Component only when browser state, browser APIs, or user interaction requires it.
- Keep content, presentation, metadata, and validation concerns separate.
- Prefer static generation for public content.
- Maintain clear boundaries under `src/app`, `src/components`, `src/content`, `src/lib`, `src/config`, and `src/types` as those areas are introduced.
- Create abstractions only after a real repeated need is visible.
- Preserve existing functionality and unrelated user changes.
- Keep `src/app` focused on routing, layouts, route metadata, and route composition.
- Keep reusable presentation in `src/components`; use `ui` for primitives, `layout` for site chrome, `content` for content presentation, and `seo` for rendered discovery primitives.
- Keep author-controlled MDX in a matching subdirectory of `src/content`.
- Keep content discovery, parsing, validation, and relationship resolution in `src/lib/content`; route files must not read the filesystem directly.
- Keep metadata construction in `src/lib/metadata` and structured-data construction in `src/lib/seo`.
- Keep site-wide facts and navigation under `src/config`, and shared contracts under `src/types`.
- Route folders may exist without a `page.tsx` until their implementation phase; do not publish thin placeholder pages merely to expose a URL.
- Validate future content metadata at build time and reject duplicate slugs or broken content relationships.

## Dependencies

- Use npm and commit `package-lock.json`.
- Do not add a dependency without a specific reason that cannot be served well by the platform or a small local implementation.
- Do not add a database, CMS, authentication, global state library, animation library, analytics suite, form backend, or UI framework unless the current user-approved phase explicitly requires it.
- Prefer framework-native capabilities.

## UI and content

- Use semantic HTML and accessible names before ARIA workarounds.
- Maintain visible keyboard focus, logical heading order, sufficient contrast, reduced-motion support, and responsive layouts.
- Keep the visual language technical, restrained, readable, and documentation-inspired.
- Avoid generic portfolio templates, neon AI styling, glassmorphism, excessive gradients, excessive rounded cards, decorative stock AI imagery, and unnecessary motion.
- Do not use placeholder copy that could be mistaken for a factual professional claim.
- Reuse the shared primitives under `src/components/ui` before creating route-specific variants.
- Use `Container` for the standard site width and `--article-width` for long-form reading width.
- Use square or small-radius surfaces; reserve larger radii for controls that genuinely benefit from them.
- Keep site chrome and content components as Server Components. Isolate browser state to the smallest possible Client Component, currently mobile navigation.
- Use native buttons for actions and links for navigation; do not style one semantic role as the other without preserving its correct element.
- The theme follows `prefers-color-scheme`; do not add a theme toggle or persistent client-side theme state without a separate approved requirement.
- Tailwind responsive variants use the framework defaults. Design mobile-first and verify layouts at small, medium, and large widths.

## SEO and GEO

- Treat metadata, semantic structure, crawlability, authorship, and internal links as architectural concerns.
- Use accurate unique titles, descriptions, and canonical URLs.
- Add structured data only when it matches visible, verified content.
- Do not use keyword stuffing, doorway pages, invisible content, or meaningless schema.
- Read identity, canonical URL, topics, locale, theme colors, and social-image settings from `src/config/site.ts`; do not duplicate them across routes.
- Use Next.js metadata exports only from Server Components.
- Add only published, indexable routes to `src/app/sitemap.ts`.
- Use the builders in `src/lib/seo/structured-data.ts`; do not emit `Organization` schema without a real represented organization.
- Emit `ProfessionalService` only on a page that describes a genuine, current service offering.

## Security and privacy

- Never commit secrets or local environment files.
- Treat `CONTACT_*` variables as public destinations: configured URLs and addresses may appear in generated HTML. Never place provider secrets, tokens, passwords, or private email credentials in them.
- Treat repository MDX as trusted author-controlled content; do not compile arbitrary remote MDX.
- Keep MDX JavaScript expressions/imports blocked and retain the build-time unsafe-markup check. Review all new MDX for literal private data before publication.
- Validate external case-study links as public HTTPS URLs without embedded credentials; do not place access tokens in link query strings.
- Minimize external scripts and resource origins.
- Keep the GitHub repository private.

## Change workflow

For each requested phase:

1. Inspect the existing repository and these instructions before editing.
2. Confirm that required earlier phases are complete.
3. Modify only what the current phase requires.
4. Keep the implementation small and maintainable.
5. Run the relevant lint, type-check, test, and production-build commands.
6. Report files changed, commands run, validation results, failures, and remaining work.
7. Stop when the requested phase is complete; do not begin a later phase automatically.

Do not silence lint or type errors merely to make validation pass. Fix their cause or report the blocker accurately.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
