# Rajat Debnath Portfolio — Master Implementation Plan

## Document status

- **Purpose:** Define the complete, dependency-aware implementation plan for a professional portfolio positioned around production AI systems for advanced manufacturing.
- **Project status:** Planning only; implementation has not started.
- **Canonical production URL:** `https://rajatdn.vercel.app`
- **Repository requirement:** Private GitHub repository.
- **Primary stack:** Next.js, TypeScript, App Router, Tailwind CSS, local MDX/Markdown, Vercel.
- **Last environment audit:** 2026-09-15.

---

## 1. Product direction

### Professional positioning

> **AI Systems & Infrastructure Engineer — building production AI systems for advanced manufacturing.**

The website will function as:

1. A professional identity hub.
2. A technical portfolio.
3. A collection of engineering case studies.
4. A technical knowledge and architecture library.
5. A technical blog.
6. A record of experiments and labs.
7. An SEO/GEO traffic asset.
8. A future lead-generation channel.
9. A foundation for long-term career and business positioning.

### Core subject areas

- Industrial AI
- AI systems engineering
- AI infrastructure
- MLOps
- Edge AI
- Computer vision
- Industrial data systems
- Predictive maintenance
- Anomaly detection
- Optimization
- Automation
- Operational intelligence
- Production AI deployment

### Homepage positioning

- **H1:** Production AI Systems for Advanced Manufacturing
- **Core message:** Rajat Debnath is an AI Systems & Infrastructure Engineer building production AI systems that turn industrial data into reliable predictions, decisions, automation, and operational intelligence.
- **Primary systems:** Prediction, optimization, anomaly detection, automation, and operational intelligence.
- **Architecture narrative:** Industrial Data → Data Infrastructure → AI/ML → Infrastructure → Deployment → Monitoring → Operational Decision.
- **Engineering principles:**
  - Production over prototype.
  - Measurable outcomes over model metrics alone.
  - Reliability over unnecessary complexity.
  - Architecture before implementation.
  - Observability from day one.

### Accuracy policy

The website must never invent clients, employers, results, metrics, datasets, users, revenue, awards, certifications, deployments, technologies, testimonials, or professional experience. Missing information must remain clearly labeled as missing, planned, experimental, or conceptual.

Every relevant item must distinguish among:

- Conceptual
- Planned
- Running
- Implemented
- Tested
- Completed
- Deployed

Only statuses supported by evidence may be used.

---

## 2. Current environment audit

The audit was read-only. No project files were created, installed, or modified during it.

| Check | Finding | Consequence |
|---|---|---|
| Working directory | `C:\Users\rajat\Desktop\rajatdn-portfolio` | Correct project workspace |
| Top-level items | 0 | Clean-slate implementation |
| Files recursively | 0 | No source or configuration to preserve |
| Existing project | No | Project must be initialized |
| Git repository | No | Local Git setup is required |
| Parent Git repository | No | Workspace is not nested in another repository |
| Git | `2.51.1.windows.1` | Available |
| Node.js | `v22.21.0` | Available; verify compatibility before initialization |
| npm | `10.9.4` | Available and recommended for this project |
| npx | Available | Official initializer can be used |
| Corepack | `0.34.0` | Available but not required |
| pnpm | `11.19.0` | Available but not selected |
| Next.js CLI | Not globally installed | Expected; use a local project dependency |
| Local Next.js | Not installed | Initialization required |
| TypeScript | Not configured | Configure during initialization |
| Tailwind CSS | Not configured | Configure during initialization |
| `package.json` | Missing | Generate during initialization |
| Lockfile | Missing | Generate and commit `package-lock.json` |
| GitHub remote | None | Create and connect a private repository |
| GitHub CLI | Not installed | Use GitHub UI or install later only if justified |
| Vercel CLI | Not installed | Dashboard Git integration is preferred |
| Existing dependencies | None | Dependency selection starts clean |
| Existing constraints | No legacy constraints | External account and content inputs remain prerequisites |

### External prerequisites

- GitHub repository owner and account access.
- Vercel account connected to GitHub.
- Availability of the requested Vercel project name.
- Verified biography, profile links, contact preferences, and resume.
- Real project, experiment, and architecture source material.

---

## 3. Architecture recommendation

### 3.1 System model

```text
Private GitHub repository
        ↓
Vercel Git integration
        ↓
Next.js App Router
        ├── Server Components by default
        ├── Local typed MDX content
        ├── Static index and detail pages
        ├── Next.js Metadata API
        ├── Generated sitemap and robots policy
        └── Minimal or zero runtime backend
```

### 3.2 Architectural decisions

1. **Use Next.js App Router.** It provides layouts, Server Components, metadata conventions, static generation, and dynamic content routes without a custom server.
2. **Use TypeScript in strict mode.** Content structures and relationships should fail during development or build when invalid.
3. **Use Server Components by default.** Client Components are allowed only for necessary browser interaction, such as mobile navigation.
4. **Use repository-local MDX.** Content remains versioned, reviewable, portable, and independent of a database or CMS.
5. **Generate public content statically.** Portfolio and knowledge content does not require request-time rendering.
6. **Use Tailwind CSS with project-owned tokens and primitives.** Avoid a third-party component suite unless a later requirement proves necessary.
7. **Use the Next.js Metadata API.** Keep titles, canonical URLs, social metadata, sitemap, and robots behavior native to the framework.
8. **Validate content at build time.** Use small typed schemas and fail the build for malformed metadata, duplicate slugs, or broken relationships.
9. **Keep content and presentation separate.** MDX stores technical content; React components control presentation; metadata utilities control discovery.
10. **Avoid runtime infrastructure.** Do not add a database, authentication, admin dashboard, custom backend, or CMS for the initial release.

### 3.3 Proposed directory structure

```text
rajatdn-portfolio/
├── public/
│   ├── diagrams/
│   ├── documents/
│   └── images/
├── src/
│   ├── app/
│   │   ├── (site)/
│   │   │   ├── about/
│   │   │   ├── architecture/
│   │   │   │   └── [slug]/
│   │   │   ├── blog/
│   │   │   │   └── [slug]/
│   │   │   ├── capabilities/
│   │   │   ├── contact/
│   │   │   ├── industries/
│   │   │   ├── lab/
│   │   │   │   └── [slug]/
│   │   │   ├── newsletter/
│   │   │   ├── projects/
│   │   │   │   └── [slug]/
│   │   │   ├── resume/
│   │   │   └── systems/
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── content/
│   │   ├── diagrams/
│   │   ├── layout/
│   │   ├── seo/
│   │   └── ui/
│   ├── content/
│   │   ├── architecture/
│   │   ├── blog/
│   │   ├── lab/
│   │   └── projects/
│   ├── lib/
│   │   ├── content/
│   │   ├── metadata/
│   │   └── structured-data/
│   ├── styles/
│   └── types/
├── mdx-components.tsx
├── next.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

The `(site)` route group is organizational and must not alter public URLs.

### 3.4 Planned routes

| Route | Purpose |
|---|---|
| `/` | Primary positioning and high-level navigation |
| `/about` | Verified professional identity and engineering philosophy |
| `/systems` | Types of production AI systems addressed |
| `/capabilities` | Verified technical capabilities |
| `/industries` | Relevant domains, without implying unverified experience |
| `/projects` | Case-study index |
| `/projects/[slug]` | Individual project or case study |
| `/architecture` | Architecture knowledge index |
| `/architecture/[slug]` | Individual architecture article |
| `/lab` | Experiment index and statuses |
| `/lab/[slug]` | Individual experiment record |
| `/blog` | Technical article index |
| `/blog/[slug]` | Individual article |
| `/newsletter` | Subscription information or future provider integration |
| `/resume` | Accessible HTML resume and approved PDF |
| `/contact` | Minimal, dependable contact options |

### 3.5 Dependency policy

Dependencies require a concrete architectural reason. The expected baseline is:

- `next`
- `react`
- `react-dom`
- `typescript`
- Tailwind CSS toolchain
- ESLint tooling created by the selected Next.js initializer
- Official MDX packages when the content system is introduced
- One small schema validator such as Zod if content validation benefits justify it

Do not add, unless a future phase explicitly proves the need:

- Global state management
- Animation frameworks
- Component libraries
- Database or ORM clients
- Authentication SDKs
- CMS clients
- Analytics suites
- Form backends
- Search services
- Diagramming or chart packages
- Icon packages when a few local SVG components are sufficient

---

## 4. Execution contract for every implementation phase

Each phase will receive its own implementation prompt. Every implementation run must:

1. Inspect the existing repository before editing.
2. Confirm prerequisites from earlier phases.
3. Modify only files required for the current phase.
4. Preserve existing behavior and unrelated user changes.
5. Avoid speculative dependencies and abstractions.
6. Apply the content accuracy policy.
7. Run validation proportionate to the changes.
8. Report the outcome first.
9. List files created, changed, or removed.
10. List commands and tests executed.
11. Report warnings, failures, or skipped validation honestly.
12. State remaining work without starting the next phase.
13. Stop when the current phase is complete.

---

## 5. Master implementation plan

### Phase 0 — Environment and prerequisites

1. **Objective:** Confirm the supported toolchain and collect prerequisite decisions.
2. **Why needed:** Initialization choices determine compatibility and reproducibility.
3. **Implement:** Verify Node/Next compatibility, npm configuration, Git identity, account readiness, repository ownership, and canonical URL assumptions.
4. **Likely files/directories:** None; optionally planning documentation only.
5. **Dependencies required:** Git, supported Node.js, npm.
6. **Dependencies not required:** Global Next.js, Vercel CLI, database, CMS.
7. **Inputs from Rajat:** GitHub owner, repository name, Vercel status, author identity, public contact policy.
8. **Expected output:** Approved prerequisite checklist and pinned toolchain direction.
9. **Validation:** Version checks and account/access confirmation.
10. **Risks:** Unsupported version pairing; unsuitable private-organization hosting configuration.
11. **Must not do:** Install packages or initialize application code.
12. **Next phase:** Phase 1.

### Phase 1 — Private GitHub repository setup

1. **Objective:** Establish private source control.
2. **Why needed:** Privacy is mandatory and Vercel will deploy from Git.
3. **Implement:** Create a private repository, initialize local Git, set `main`, and connect `origin`.
4. **Likely files/directories:** `.git/`; possibly minimal repository metadata.
5. **Dependencies required:** Git and GitHub access.
6. **Dependencies not required:** GitHub CLI, Vercel CLI, GitHub Actions.
7. **Inputs from Rajat:** Repository owner/name and confirmation of private visibility.
8. **Expected output:** Empty private remote connected to the local workspace.
9. **Validation:** Remote URL, branch, access, and GitHub visibility checks.
10. **Risks:** Accidental public repository; Vercel Hobby restrictions for organization-owned private repositories.
11. **Must not do:** Push secrets, generate site code, or make the repository public.
12. **Next phase:** Phase 2.

### Phase 2 — Next.js project initialization

1. **Objective:** Create the minimal application foundation.
2. **Why needed:** Later work requires a reproducible framework baseline.
3. **Implement:** Supported Next.js release, App Router, TypeScript, Tailwind, ESLint, `src/`, npm scripts, import alias, and lockfile.
4. **Likely files/directories:** `package.json`, `package-lock.json`, `src/app`, `public`, framework configuration.
5. **Dependencies required:** Next.js, React, React DOM, TypeScript, Tailwind, ESLint.
6. **Dependencies not required:** UI kits, state libraries, animation packages, backend SDKs.
7. **Inputs from Rajat:** Approval of npm and project package name.
8. **Expected output:** Minimal locally runnable application.
9. **Validation:** Install, lint, type-check, production build, and local smoke test.
10. **Risks:** Unwanted scaffolder defaults or version incompatibility.
11. **Must not do:** Build portfolio pages or add speculative packages.
12. **Next phase:** Phase 3.

### Phase 3 — Application architecture

1. **Objective:** Define stable boundaries for routes, UI, content, types, and metadata.
2. **Why needed:** Shared behavior must remain consistent without tight coupling.
3. **Implement:** Directory structure, route shells, content contracts, site configuration, status/evidence enums, errors, and not-found behavior.
4. **Likely files/directories:** `src/app`, `src/components`, `src/content`, `src/lib`, `src/types`.
5. **Dependencies required:** Existing framework; possibly a schema validator.
6. **Dependencies not required:** CMS, database, dependency injection, global state.
7. **Inputs from Rajat:** Final route approval and preferred author name.
8. **Expected output:** Documented architecture with compiling route shells.
9. **Validation:** Type-check, lint, build, and import-boundary review.
10. **Risks:** Premature abstraction or inconsistent content systems.
11. **Must not do:** Fill routes with fabricated content or introduce runtime data services.
12. **Next phase:** Phase 4.

### Phase 4 — Design system

1. **Objective:** Establish the visual and interaction foundation.
2. **Why needed:** All pages need consistent typography, spacing, color, focus, and responsiveness.
3. **Implement:** Tokens, global CSS, typography, containers, links, buttons, tags, callouts, tables, code styles, focus states, and prose rules.
4. **Likely files/directories:** Global styles, UI components, font configuration, design documentation.
5. **Dependencies required:** Tailwind and framework font support.
6. **Dependencies not required:** Component suite, large icon pack, animation library.
7. **Inputs from Rajat:** Color preferences, portrait/logo availability, visual references.
8. **Expected output:** Accessible primitives and a design-system test surface.
9. **Validation:** Responsive QA, contrast, keyboard focus, reduced motion, and build.
10. **Risks:** Generic template appearance or decorative complexity.
11. **Must not do:** Create page-specific duplication or claim-bearing content.
12. **Next phase:** Phase 5.

### Phase 5 — Global SEO foundation

1. **Objective:** Give every future page correct baseline metadata.
2. **Why needed:** Canonical identity and crawler behavior are costly to retrofit.
3. **Implement:** Site metadata configuration, title template, metadata base, canonical strategy, default description, icons, Open Graph/Twitter defaults, `robots.ts`, initial `sitemap.ts`, and truthful Person/WebSite schema helpers.
4. **Likely files/directories:** Root layout, metadata utilities, structured-data components, public icons.
5. **Dependencies required:** Next.js Metadata API.
6. **Dependencies not required:** Third-party SEO package or analytics.
7. **Inputs from Rajat:** Verified name, title, profile URLs, image, and description.
8. **Expected output:** Valid global metadata without unverifiable claims.
9. **Validation:** Rendered-head inspection, sitemap, robots, and schema syntax checks.
10. **Risks:** Incorrect canonical URL or unverified identity properties.
11. **Must not do:** Add fake credentials or irrelevant structured data.
12. **Next phase:** Phase 6.

### Phase 6 — Homepage

1. **Objective:** Communicate positioning, system focus, architecture chain, and principles immediately.
2. **Why needed:** The homepage is the primary identity and discovery surface.
3. **Implement:** Semantic hero, core message, system areas, architecture flow, principles, featured-content slots, and restrained calls to action.
4. **Likely files/directories:** `src/app/page.tsx` and homepage components.
5. **Dependencies required:** Design system and global metadata.
6. **Dependencies not required:** Video, 3D, carousel, animation package.
7. **Inputs from Rajat:** Wording approval and verified featured material.
8. **Expected output:** Responsive, accurate homepage with honest empty states.
9. **Validation:** Visual QA, heading hierarchy, keyboard test, metadata, and build.
10. **Risks:** Overcrowding or implying unverified commercial experience.
11. **Must not do:** Invent clients, deployments, results, or metrics.
12. **Next phase:** Phase 7.

### Phase 7 — About, Systems, Capabilities, and Industries

1. **Objective:** Explain professional identity, technical scope, and relevant domains.
2. **Why needed:** The four pages answer different evaluation questions.
3. **Implement:** Semantic pages, shared taxonomy links, definitions, and careful claim language.
4. **Likely files/directories:** Corresponding app routes and shared content components.
5. **Dependencies required:** Design system and metadata foundation.
6. **Dependencies not required:** Dynamic content engine or database.
7. **Inputs from Rajat:** Biography, education, experience, real skills, and domain boundaries.
8. **Expected output:** Four accurate and interconnected pages.
9. **Validation:** Factual review, metadata, accessibility, responsive QA, and links.
10. **Risks:** Keyword-list content or industries implying work not performed.
11. **Must not do:** Present aspirations as delivered work.
12. **Next phase:** Phase 8.

### Phase 8 — Projects system

1. **Objective:** Support evidence-based technical case studies.
2. **Why needed:** Projects are the primary professional proof surface.
3. **Implement:** Project schema, MDX template, index, `[slug]`, maturity/evidence markers, optional repository/demo fields, relationships, and empty states.
4. **Likely files/directories:** `src/content/projects`, project routes, loaders, types, MDX components.
5. **Dependencies required:** Official MDX tooling and content validation.
6. **Dependencies not required:** GitHub API, database, CMS, live demo hosting.
7. **Inputs from Rajat:** None for the system; verified project data later.
8. **Expected output:** Validated infrastructure for real or explicitly conceptual case studies.
9. **Validation:** Fixture build, invalid metadata, static params, metadata, and 404 tests.
10. **Risks:** Templates encouraging invented values or broken external links.
11. **Must not do:** Publish fictional completed projects.
12. **Next phase:** Phase 9.

### Phase 9 — Architecture knowledge system

1. **Objective:** Publish reusable system-architecture explanations.
2. **Why needed:** This demonstrates systems thinking beyond a conventional portfolio.
3. **Implement:** Architecture schema, index/detail routes, data flows, components, infrastructure, deployment, observability, security, scalability, trade-offs, and failure modes.
4. **Likely files/directories:** `src/content/architecture`, architecture routes, diagram components.
5. **Dependencies required:** Shared MDX foundation.
6. **Dependencies not required:** Interactive diagram or canvas framework.
7. **Inputs from Rajat:** Initial topics and any original diagrams.
8. **Expected output:** Typed architecture library with an honest structural fixture.
9. **Validation:** Diagram accessibility, schema validation, static generation, and links.
10. **Risks:** Generic content or inaccessible diagrams.
11. **Must not do:** Describe conceptual systems as deployed systems.
12. **Next phase:** Phase 10.

### Phase 10 — Lab system

1. **Objective:** Document experiments transparently through their lifecycle.
2. **Why needed:** Labs can demonstrate method without overstating maturity.
3. **Implement:** Planned/running/completed statuses, hypothesis, setup, protocol, observations, results, limitations, dates, and optional low-JavaScript filtering.
4. **Likely files/directories:** `src/content/lab`, lab routes, status components and schemas.
5. **Dependencies required:** Shared MDX/content infrastructure.
6. **Dependencies not required:** Experiment tracker, database, charts package by default.
7. **Inputs from Rajat:** Real experiment scope, data provenance, and status.
8. **Expected output:** Lab pages with explicit evidence boundaries.
9. **Validation:** Status display, metadata, empty result, and build tests.
10. **Risks:** Planned work appearing complete or observations appearing conclusive.
11. **Must not do:** Invent datasets, measurements, or outcomes.
12. **Next phase:** Phase 11.

### Phase 11 — MDX blog system

1. **Objective:** Create a maintainable technical publishing workflow.
2. **Why needed:** Articles require consistent metadata, archives, and rendering.
3. **Implement:** Blog schema, index/detail routes, dates, topics, descriptions, optional reliable reading time, code styling, table of contents, and related content.
4. **Likely files/directories:** `src/content/blog`, blog routes, MDX configuration and components.
5. **Dependencies required:** Official MDX packages and minimal validation/parsing utilities.
6. **Dependencies not required:** CMS, comments, reactions, or search service.
7. **Inputs from Rajat:** Topic taxonomy and author identity.
8. **Expected output:** Build-time blog publishing system.
9. **Validation:** Article fixture, heading IDs, code, tables, invalid metadata, and static build.
10. **Risks:** Plugin sprawl or unreliable automatic metadata.
11. **Must not do:** Add publication claims inconsistent with reality.
12. **Next phase:** Phase 12.

### Phase 12 — First technical article

1. **Objective:** Prove the authoring system with substantive original content.
2. **Why needed:** Placeholders alone cannot validate editorial quality.
3. **Implement:** One original article with citations where needed, direct definitions, structured sections, related links, and Article schema.
4. **Likely files/directories:** One blog MDX file and only genuinely reusable supporting components.
5. **Dependencies required:** Completed blog system.
6. **Dependencies not required:** Automated bulk writing tools.
7. **Inputs from Rajat:** Topic, thesis, original observations, boundaries, and approval.
8. **Expected output:** One publishable, fact-checked technical article.
9. **Validation:** Technical review, claim review, citations, schema, prose layout, and build.
10. **Risks:** Generic content, unsupported claims, or invented firsthand experience.
11. **Must not do:** Manufacture benchmarks, experiments, or field experience.
12. **Next phase:** Phase 13.

### Phase 13 — Contact system

1. **Objective:** Provide a dependable, low-risk communication path.
2. **Why needed:** Lead-generation potential does not require a custom backend.
3. **Implement:** Contact page with approved email and verified professional links; evaluate a third-party form only later if needed.
4. **Likely files/directories:** Contact route and site configuration.
5. **Dependencies required:** None for link-based contact.
6. **Dependencies not required:** Database, API route, server action, CRM.
7. **Inputs from Rajat:** Public email, links, availability statement, preferred channel.
8. **Expected output:** Accessible contact page.
9. **Validation:** Link tests, keyboard use, privacy/spam review, and metadata.
10. **Risks:** Spam or unintended exposure of personal information.
11. **Must not do:** Build an unrequested backend or claim response times.
12. **Next phase:** Phase 14.

### Phase 14 — Resume

1. **Objective:** Present verified career information in accessible and downloadable forms.
2. **Why needed:** Recruiters require concise and printable evidence.
3. **Implement:** Semantic HTML resume, print styles, and an approved PDF when source content exists.
4. **Likely files/directories:** Resume route, resume data/content, `public/documents`, print CSS.
5. **Dependencies required:** None; PDF tooling only if a PDF is generated.
6. **Dependencies not required:** Resume-builder service or database.
7. **Inputs from Rajat:** Authoritative resume and personal-data policy.
8. **Expected output:** Accessible resume page and optional downloadable PDF.
9. **Validation:** Factual comparison, print/PDF QA, and link checks.
10. **Risks:** Stale duplicate facts or personal-data exposure.
11. **Must not do:** Infer missing employment, education, or certification details.
12. **Next phase:** Phase 15.

### Phase 15 — Navigation and internal linking

1. **Objective:** Make the knowledge system easy to traverse.
2. **Why needed:** Navigation and semantic relationships support users and discovery systems.
3. **Implement:** Header, mobile navigation, footer, breadcrumbs, taxonomy links, related content, and active states.
4. **Likely files/directories:** Layout components and content route families.
5. **Dependencies required:** Stable routes and content structures.
6. **Dependencies not required:** Search service, command palette, client router package.
7. **Inputs from Rajat:** Primary-navigation priorities.
8. **Expected output:** Consistent site-wide navigation graph.
9. **Validation:** Keyboard traversal, focus, current-page indication, and orphan-page audit.
10. **Risks:** Overloaded navigation or irrelevant automatic recommendations.
11. **Must not do:** Hide essential content behind JavaScript-only controls.
12. **Next phase:** Phase 16.

### Phase 16 — Deep SEO and GEO implementation

1. **Objective:** Complete page-specific discoverability and machine-readable relationships.
2. **Why needed:** Global defaults do not accurately describe individual content.
3. **Implement:** Per-route metadata, canonical URLs, relevant schemas, sitemap discovery, authorship, dates, topic relationships, breadcrumbs, and answer-oriented content patterns.
4. **Likely files/directories:** Metadata utilities, routes, structured-data code, sitemap.
5. **Dependencies required:** Final route and content metadata.
6. **Dependencies not required:** SEO SaaS, keyword tools, doorway pages.
7. **Inputs from Rajat:** Verified identity URLs and approved descriptions.
8. **Expected output:** Truthful, consistent metadata across indexable pages.
9. **Validation:** Schema, canonical, social-preview, and crawler audits.
10. **Risks:** Schema/content mismatch, duplicate metadata, or indexed placeholders.
11. **Must not do:** Add invisible facts, keyword stuffing, or meaningless schema.
12. **Next phase:** Phase 17.

### Phase 17 — Performance optimization

1. **Objective:** Minimize runtime cost and deliver fast, stable pages.
2. **Why needed:** Performance improves usability, reliability, discoverability, and hosting cost.
3. **Implement:** Static-rendering audit, asset optimization, client-boundary reduction, font/image tuning, bundle review, and layout-shift fixes.
4. **Likely files/directories:** Components, assets, framework configuration, loading behavior.
5. **Dependencies required:** Completed primary pages.
6. **Dependencies not required:** CDN SDK, service worker, permanent analyzer dependency.
7. **Inputs from Rajat:** Approval for material image-quality trade-offs.
8. **Expected output:** Lean bundle and documented performance baseline.
9. **Validation:** Production build, Lighthouse, Core Web Vitals lab checks, bundle/network review.
10. **Risks:** Chasing synthetic scores at the expense of content quality.
11. **Must not do:** Remove accessibility or useful content solely to improve a score.
12. **Next phase:** Phase 18.

### Phase 18 — Accessibility

1. **Objective:** Meet WCAG 2.2 AA as the practical baseline.
2. **Why needed:** Accessibility is a core engineering and professional-quality requirement.
3. **Implement:** Landmarks, headings, labels, alt text, focus behavior, skip link, contrast, touch targets, reduced motion, and accessible tables/code/diagrams.
4. **Likely files/directories:** Shared UI and representative routes.
5. **Dependencies required:** Stable design and interactions.
6. **Dependencies not required:** Accessibility overlays.
7. **Inputs from Rajat:** Specialized descriptions for personal or technical imagery.
8. **Expected output:** Remediated and documented accessible experience.
9. **Validation:** Automated checks plus keyboard and screen-reader spot checks.
10. **Risks:** Mistaking automated scans for complete coverage.
11. **Must not do:** Use ARIA to conceal avoidable non-semantic HTML.
12. **Next phase:** Phase 19.

### Phase 19 — Security

1. **Objective:** Harden the public site and deployment supply chain proportionately.
2. **Why needed:** Static sites can still leak secrets or use unsafe dependencies/content.
3. **Implement:** Security headers, tested CSP, dependency audit, secret scan, safe external links, trusted local-MDX boundary, and environment-variable policy.
4. **Likely files/directories:** `next.config.ts`, documentation, link/MDX components, deployment settings.
5. **Dependencies required:** Existing Next.js configuration.
6. **Dependencies not required:** Authentication, WAF service, or secrets manager without secrets.
7. **Inputs from Rajat:** Approved external resource domains.
8. **Expected output:** Hardened configuration and security checklist.
9. **Validation:** Header/CSP inspection, dependency audit, secret scan, and build.
10. **Risks:** CSP breakage or security theater through meaningless headers.
11. **Must not do:** Commit secrets or compile arbitrary untrusted remote MDX.
12. **Next phase:** Phase 20.

### Phase 20 — Git hygiene

1. **Objective:** Make version control safe and maintainable.
2. **Why needed:** Secrets, build output, and local artifacts must not enter history.
3. **Implement:** Complete `.gitignore`, optional attributes, workflow documentation, commit conventions, and generated-artifact policy.
4. **Likely files/directories:** `.gitignore`, `README.md`, optional `.gitattributes`.
5. **Dependencies required:** Git and established build artifacts.
6. **Dependencies not required:** Git LFS or complex hooks unless later justified.
7. **Inputs from Rajat:** Collaboration and commit preferences.
8. **Expected output:** Clean and intentional repository state.
9. **Validation:** Status, ignored-path tests, tracked-file review, and secret scan.
10. **Risks:** Ignoring source files or tracking `.env`, cache, and build output.
11. **Must not do:** Rewrite history or remove unrelated user work.
12. **Next phase:** Phase 21.

### Phase 21 — First commit and GitHub push

1. **Objective:** Create the first reviewed source snapshot in the private remote.
2. **Why needed:** Deployment should begin from a known reproducible baseline.
3. **Implement:** Review changes, create a clear initial commit, and push `main`.
4. **Likely files/directories:** Git history and private GitHub repository.
5. **Dependencies required:** Passing Phases 1–20.
6. **Dependencies not required:** GitHub Actions or public visibility.
7. **Inputs from Rajat:** Explicit approval to commit and push.
8. **Expected output:** Validated baseline in the private remote.
9. **Validation:** Local/remote commit comparison, privacy check, clean status.
10. **Risks:** Pushing secrets or unfinished private material.
11. **Must not do:** Force-push, publish the repository, or bypass failures.
12. **Next phase:** Phase 22.

### Phase 22 — Vercel deployment

1. **Objective:** Connect the private repository and create the public deployment.
2. **Why needed:** Git integration supplies reproducible preview and production deployments.
3. **Implement:** Import repository, select `main`, verify framework/build settings, and assign `rajatdn.vercel.app` if available.
4. **Likely files/directories:** Vercel project settings; `.vercelignore` only if justified.
5. **Dependencies required:** Private GitHub remote and Vercel account.
6. **Dependencies not required:** Vercel CLI, custom server, or custom domain.
7. **Inputs from Rajat:** Vercel authorization and account/team confirmation.
8. **Expected output:** Public production deployment with Git-based previews.
9. **Validation:** Deployment logs, domain, TLS, and Git-trigger behavior.
10. **Risks:** Unavailable name, wrong team, or private-repository permission mismatch.
11. **Must not do:** Make GitHub public or expose environment values.
12. **Next phase:** Phase 23.

### Phase 23 — Production deployment verification

1. **Objective:** Confirm that deployed behavior matches local expectations.
2. **Why needed:** CDN, environment, metadata, and headers can differ in production.
3. **Implement:** Inspect routes, assets, redirects, headers, canonical URLs, sitemap, robots, social metadata, and error behavior; apply focused fixes only when necessary.
4. **Likely files/directories:** Usually none; only files tied to verified deployment defects.
5. **Dependencies required:** Live deployment.
6. **Dependencies not required:** Monitoring SaaS.
7. **Inputs from Rajat:** Access if deployment permissions block verification.
8. **Expected output:** Deployment verification record.
9. **Validation:** Route/status checks, HTTPS, 404, headers, metadata, and exposure review.
10. **Risks:** Cached builds or production-only CSP/resource failures.
11. **Must not do:** Expand product scope while fixing deployment defects.
12. **Next phase:** Phase 24.

### Phase 24 — Production QA

1. **Objective:** Evaluate the complete public experience.
2. **Why needed:** Correct routes do not guarantee launch quality.
3. **Implement:** Resolve verified browser, responsive, visual, content, accessibility, print, and link defects.
4. **Likely files/directories:** Only files implicated by QA findings.
5. **Dependencies required:** Verified production deployment.
6. **Dependencies not required:** Paid device farm initially.
7. **Inputs from Rajat:** Final subjective design/content review.
8. **Expected output:** Signed-off QA checklist.
9. **Validation:** Browser/viewport matrix, links, resume print, metadata, accessibility, Lighthouse.
10. **Risks:** Endless aesthetic revision or missing real-device issues.
11. **Must not do:** Introduce a broad redesign during defect closure.
12. **Next phase:** Phase 25.

### Phase 25 — Google Search Console

1. **Objective:** Establish search ownership and submit crawl information.
2. **Why needed:** Search Console enables indexing visibility and diagnosis.
3. **Implement:** Verify the Vercel URL-prefix property, submit sitemap, and inspect core URLs.
4. **Likely files/directories:** Optional verification metadata or static verification file.
5. **Dependencies required:** Stable public HTTPS deployment and Google account.
6. **Dependencies not required:** Google Analytics, Tag Manager, paid SEO tools.
7. **Inputs from Rajat:** Google account access and verification approval.
8. **Expected output:** Verified property with accepted sitemap submission.
9. **Validation:** Ownership, sitemap status, and live URL inspection.
10. **Risks:** Processing delay or verifying the wrong URL variant.
11. **Must not do:** Promise rankings or immediate indexing.
12. **Next phase:** Phase 26.

### Phase 26 — Minimum launch content

1. **Objective:** Publish enough accurate substance to justify indexing.
2. **Why needed:** An empty but technically complete site harms credibility.
3. **Implement:** Final homepage, about, systems, capabilities, industries, contact, resume, first article, and honest content-library landing pages.
4. **Likely files/directories:** Page copy and content across the site.
5. **Dependencies required:** Publishing systems and verified factual inputs.
6. **Dependencies not required:** Dozens of posts or invented portfolio items.
7. **Inputs from Rajat:** Approved copy, biography, links, resume, and domain boundaries.
8. **Expected output:** Coherent launch corpus without deceptive placeholders.
9. **Validation:** Editorial review, claim audit, orphan scan, metadata completeness.
10. **Risks:** Thin pages, duplication, or indexed placeholders.
11. **Must not do:** Fill gaps with synthetic achievements.
12. **Next phase:** Phase 27.

### Phase 27 — First real technical project or case study

1. **Objective:** Add the first substantial evidence-backed case study.
2. **Why needed:** Real evidence is central to the portfolio's purpose.
3. **Implement:** Problem, objective, constraints, data, architecture, pipeline, models, infrastructure, deployment, monitoring, results, limitations, lessons, improvements, technologies, and permitted links.
4. **Likely files/directories:** Project MDX, diagrams/images, and related-content metadata.
5. **Dependencies required:** Projects system and verified source material.
6. **Dependencies not required:** Public source repository or hosted demo if inappropriate.
7. **Inputs from Rajat:** Facts, role, constraints, technology, evidence, and disclosure rules.
8. **Expected output:** Accurate and technically useful case study.
9. **Validation:** Evidence review, technical review, links, diagrams, metadata, and build.
10. **Risks:** Confidentiality leakage or overstated contribution/results.
11. **Must not do:** Infer metrics, clients, data, deployments, or outcomes.
12. **Next phase:** Phase 28.

### Phase 28 — Long-term content and distribution system

1. **Objective:** Make the site a sustainable technical and lead-generation asset.
2. **Why needed:** Long-term value requires consistent, interconnected publishing.
3. **Implement:** Editorial backlog, topic clusters, briefs, cadence, quality checklist, distribution checklist, content updates, and periodic technical audits.
4. **Likely files/directories:** Documentation, content roadmap, and future MDX files.
5. **Dependencies required:** Launched site and stable content schemas.
6. **Dependencies not required:** Automated mass publishing, content farm, or heavy analytics.
7. **Inputs from Rajat:** Capacity, priority topics, audience, channels, and business direction.
8. **Expected output:** Repeatable editorial and maintenance workflow.
9. **Validation:** Quarterly content, link, schema, search, and performance audits.
10. **Risks:** Generic content, stale pages, inconsistency, or off-positioning traffic.
11. **Must not do:** Trade accuracy and originality for publishing volume.
12. **Next phase:** Evidence-led iterative content cycles.

---

## 6. Dependency map

```text
Phase 0: Environment and prerequisites
└── Phase 1: Private GitHub repository
    └── Phase 2: Next.js initialization
        └── Phase 3: Application architecture
            └── Phase 4: Design system
                └── Phase 5: Global SEO foundation
                    ├── Phase 6: Homepage
                    └── Phase 7: Identity/domain pages
                        └── Phase 8: Projects system
                            └── Phase 9: Architecture system
                                └── Phase 10: Lab system
                                    └── Phase 11: Blog system
                                        └── Phase 12: First article

Phases 6–12
├── Phase 13: Contact
├── Phase 14: Resume
└── Phase 15: Navigation and internal linking
    └── Phase 16: Deep SEO/GEO
        └── Phase 17: Performance
            └── Phase 18: Accessibility
                └── Phase 19: Security
                    └── Phase 20: Git hygiene
                        └── Phase 21: First commit and push
                            └── Phase 22: Vercel deployment
                                └── Phase 23: Deployment verification
                                    └── Phase 24: Production QA
                                        └── Phase 25: Search Console
                                            └── Phase 26: Minimum launch content
                                                └── Phase 27: First real case study
                                                    └── Phase 28: Long-term system
```

SEO, performance, accessibility, and security are constraints from the beginning. Their dedicated phases are comprehensive audits and hardening passes, not the first time those concerns are considered.

---

## 7. Risk register

| Risk | Impact | Mitigation |
|---|---|---|
| Fabricated or overstated claims | Critical | Typed status/evidence fields and mandatory factual review |
| Aspirational industries appear as experience | High | Explicitly separate experience, research interest, and target domains |
| Private repository accidentally public | Critical | Explicit private creation and visibility checks before integration |
| Vercel private-organization restriction | High | Prefer a personal private repository or confirm appropriate Vercel plan |
| Over-engineered content architecture | Medium | Local MDX, static generation, small dependency set, no backend |
| Content-type implementations drift | Medium | Shared primitives plus distinct typed schemas |
| Invalid MDX breaks publishing | Medium | Build-time schemas, fixtures, and fail-fast validation |
| Placeholder content is indexed | High | Meaningful empty states, temporary `noindex`, and sitemap exclusion |
| Structured data contradicts visible content | High | Generate both from the same verified metadata source |
| Duplicate or inaccurate metadata | Medium | Central helpers and route-level validation |
| Weak GEO despite schema | Medium | Direct definitions, explicit relationships, evidence, and original analysis |
| Excessive client JavaScript | Medium | Server Components by default and client-boundary audits |
| Dependency bloat | Medium | Require an explicit reason for every production dependency |
| Poor long-form readability | High | Dedicated prose design and real-article QA |
| Accessibility regression | High | Semantic primitives plus automated and manual testing |
| CSP breaks resources | Medium | Derive CSP from actual resource origins and test production behavior |
| Secret or personal-data exposure | Critical | Ignore policy, secret scan, data review, and minimal environment use |
| Resume/content becomes stale | Medium | Authoritative sources and scheduled content review |
| Contact spam | Medium | Start with controlled direct contact and defer custom forms |
| Requested Vercel subdomain unavailable | Medium | Check before canonical configuration and define an approved fallback |
| Portfolio launches empty | High | Minimum launch-content gate and evidence-backed case-study milestone |
| Visual design feels generic | Medium | Typography-led technical design and restraint |
| Premature optimization delays launch | Medium | Establish budgets, then optimize measured issues |
| Search Console is treated as guaranteed indexing | Medium | Monitor actual crawl/index state and avoid ranking promises |

---

## 8. Production definition of done

### Architecture and build

- [ ] GitHub repository is private and its visibility has been verified.
- [ ] A clean clone can install dependencies using the committed lockfile.
- [ ] Linting passes.
- [ ] Type-checking passes.
- [ ] The production build passes.
- [ ] Intended routes resolve and invalid slugs return a real 404.
- [ ] Content metadata and relationships are validated at build time.
- [ ] Server Components remain the default.
- [ ] Every Client Component has a necessary interaction reason.
- [ ] No unapproved database, CMS, authentication, or backend exists.

### Content integrity

- [ ] Rajat has approved every factual professional claim.
- [ ] No fabricated client, employer, metric, dataset, award, deployment, or testimonial exists.
- [ ] Projects and labs display explicit maturity/evidence status.
- [ ] Conceptual work cannot be mistaken for implemented or deployed work.
- [ ] Minimum launch content is complete.
- [ ] At least one substantive technical article is published.
- [ ] Any published case study is evidence-backed.

### Design and accessibility

- [ ] Representative mobile, tablet, laptop, and wide layouts pass visual QA.
- [ ] Typography, code, tables, and diagrams remain readable.
- [ ] Keyboard navigation works throughout.
- [ ] Focus states are visible.
- [ ] Skip navigation and semantic landmarks exist.
- [ ] Heading hierarchy is valid.
- [ ] Contrast meets the target standard.
- [ ] Motion respects reduced-motion preferences.
- [ ] Manual accessibility checks supplement automated tools.

### SEO and GEO

- [ ] Each indexable page has a unique accurate title and description.
- [ ] Canonical URLs are correct.
- [ ] Open Graph and social metadata work.
- [ ] `robots.txt` is valid and production-aware.
- [ ] `sitemap.xml` contains the correct indexable URLs.
- [ ] Structured data is truthful and matches visible content.
- [ ] Dates, topics, authorship, and breadcrumbs are consistent.
- [ ] No unfinished placeholder is unintentionally indexable.
- [ ] No important page is orphaned.
- [ ] Google Search Console ownership and sitemap submission are complete.

### Performance and security

- [ ] Production performance has been measured.
- [ ] Images and fonts are optimized.
- [ ] No unjustified large client bundle or third-party script exists.
- [ ] Core pages avoid serious layout shift.
- [ ] Security headers and CSP work in production.
- [ ] Dependency and secret scans have been reviewed.
- [ ] No credential, private document, or sensitive environment value is exposed.

### Deployment and operations

- [ ] `https://rajatdn.vercel.app` resolves over HTTPS, subject to name availability.
- [ ] Production corresponds to the intended `main` commit.
- [ ] Git pushes trigger expected Vercel deployments.
- [ ] Error pages, assets, links, sitemap, robots, and metadata work in production.
- [ ] README documentation covers setup, authoring, validation, deployment, and content status.
- [ ] A repeatable publishing and maintenance workflow exists.

---

## 9. Immediate next step

Execute **Phase 0 — Environment and prerequisites** first.

The phase should resolve these decisions before any initialization:

1. Personal GitHub account versus organization ownership.
2. Exact private repository name.
3. GitHub-to-Vercel connection status.
4. Availability of `rajatdn.vercel.app`.
5. Verified author identity and profile inputs.
6. Public contact and privacy preferences.
7. Supported Node.js and Next.js versions to pin.

After Phase 0 is approved, proceed to Phase 1. Do not combine Phase 0, repository creation, and application initialization into one execution prompt.
