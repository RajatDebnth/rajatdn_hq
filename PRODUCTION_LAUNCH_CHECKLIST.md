# Production launch checklist

Status: **not launch-approved**. This checklist records the 2026-09-16 pre-launch audit. A passing local build does not prove the deployed site is ready.

## Blocking decisions and inputs

- [ ] Confirm the public identity and name spelling. The application currently publishes **Rajat Nath**; earlier project directions also used **Rajat Debnath**. Align the visible name, author byline, metadata, structured data, and resume with the name Rajat chooses.
- [ ] Provide and test at least one real contact destination: a public professional email address, a verified external form endpoint, or a verified professional profile with a clear way to initiate a conversation. The currently deployed `/contact` form is disabled, no email or profile URLs are configured, and the homepage CTA leads there. If a form provider is chosen, review its privacy terms and test a real submission with non-confidential test data.
- [ ] Decide whether planned project and lab entries are acceptable at launch. They are deliberately and accurately labeled as placeholders; all eight detail URLs are `noindex` and excluded from the sitemap. The `/projects` and `/lab` listings still show only planned entries. If launch requires no visible unfinished content, supply verified work or defer those listings and navigation deliberately; do not invent outcomes.
- [ ] Complete or deliberately defer `/resume`. It currently shows explicit experience, education, and project placeholders, has no PDF, and is `noindex`. Supply verified resume facts and a reviewed PDF before calling it a finished resume.
- [ ] Deploy the audited code and repeat checks on `https://rajatdn.vercel.app`. At audit time the live homepage still showed two reserved project slots that were removed locally, and the live contact form was disabled.
- [ ] Verify the GitHub repository is **private** in GitHub settings before sharing or deploying source. A configured remote alone does not prove visibility.

## Automated checks completed locally

- [x] `npm run lint`, `npm run typecheck`, and `npm run build` pass.
- [x] All 27 checked page routes return HTTP 200, with one H1, a unique title, and a route-specific canonical URL. The 18 sitemap page entries and nine additional noindex pages were checked.
- [x] Descriptions and parseable JSON-LD are present on the checked indexable and noindex page routes.
- [x] 32 distinct internal link targets return success; draft, nonexistent detail slugs, `/newsletter`, and unmatched URLs return 404 with `noindex`.
- [x] `robots.txt` and `sitemap.xml` use the configured production URL. Drafts, planned detail entries, and the incomplete resume are not in the sitemap.
- [x] npm reports zero known vulnerabilities in both the production and full dependency tree at audit time.
- [x] No tracked `node_modules`, `.next`, local `.env` files, private keys, or common token patterns were found. `.env.example` contains empty public-destination fields only.
- [x] Only mobile navigation is a Client Component. No analytics, external scripts, stock images, custom fonts, or animation packages were found. The generated stylesheet is approximately 29 KB before transfer compression.
- [x] At a 390 px browser viewport, the homepage, article, systems, projects, architecture, lab, contact, and resume samples showed no document-level horizontal overflow. The article table scrolls within a keyboard-focusable container; the mobile menu opens, closes with Escape, and returns focus to its button.

## Manual production acceptance

- [ ] Check every route on the deployed URL, including invalid slugs, the draft URL, RSS, sitemap, robots, favicon, Open Graph image, and social-card previews.
- [ ] Test the contact path end-to-end after configuration; confirm delivery, spam handling, provider confirmation, privacy copy, and no secret is exposed in rendered HTML.
- [ ] Review every visible factual statement against Rajat's evidence. Keep conceptual architectures, planned labs, and verified implementations clearly distinct. Confirm article date, authorship, and any references before publication.
- [ ] Test keyboard navigation, focus visibility, headings, screen-reader announcements, and contrast in both light and dark modes. Test at narrow mobile widths, tablet, and desktop with real browsers; inspect cards, tables, diagrams, and long breadcrumbs.
- [ ] Run a mobile performance trace on the deployed site (for example, Lighthouse/Web Vitals). Verify actual transferred JS/CSS, image behavior, and caching on the Vercel deployment rather than inferring performance from local build files.
- [ ] Confirm Vercel environment values contain only intended public destinations, that local environment files remain ignored, and that the private GitHub repository has no leaked secrets or unnecessary collaborators.
- [ ] Confirm canonical domain choice, HTTPS, redirect behavior, and Google Search Console ownership after the final deployment.

Launch approval requires all blocking items to be resolved or an explicit scope decision to defer the affected pages without misleading visitors. Re-run lint, build, route checks, and a live smoke test after the final changes.
