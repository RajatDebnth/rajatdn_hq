# SEO and AI-search readiness audit

Audit date: 2026-09-15. Scope: the repository's production build, rendered HTML for every public page, metadata route output, content relationships, and structured-data builders. This is an implementation audit, not a Search Console or live-crawler assessment.

## Executive result

The site has a strong technical foundation: server-rendered, crawlable pages; route-specific metadata; semantic content; a canonical base URL; robots and sitemap endpoints; visible authorship; and restrained schema. Four real issues were corrected: planned-only detail pages were included in the sitemap and indexable, three listing routes skipped H2, the homepage represented a published article as future-only content, and the root sitemap URL differed from its rendered canonical by a trailing slash. A fifth content gap—absence of primary technical references in the first article—was addressed without adding unsupported experience claims.

The remaining launch constraint is editorial rather than technical: there is one published article, but all project and lab entries are placeholders. The site's identity is also inconsistent across user-supplied inputs (“Rajat Nath” versus “Rajat Debnath”); the site's configured positioning was deliberately **not** changed in this audit. The owner must confirm the intended public/legal display name before Search Console submission or wider promotion.

## Method and coverage

- Inspected `src/app`, site/navigation config, content loaders, metadata helpers, JSON-LD builders, and the article MDX.
- Checked all 27 generated public HTML pages for a title, description, canonical, one H1, heading sequence, image `alt` presence, noindex/sitemap consistency, and duplicate titles/descriptions.
- Checked the generated `robots.txt`, `sitemap.xml`, and JSON-LD script parseability and schema type counts.
- Reviewed not-found routes, article links, breadcrumb coverage, publication status, visible source references, and the previous internal-link audit (27 pages, 527 internal link occurrences, zero broken route/fragment links).
- The final build and command results are recorded below. No live Googlebot, Bingbot, Search Console, production response-header, or rich-result test was available; indexation and search visibility cannot be guaranteed by local inspection.

## Technical SEO findings

| Area | Result | Action / caveat |
| --- | --- | --- |
| Titles and descriptions | Unique route-level titles and descriptions across all 27 generated pages; no missing values | Preserve uniqueness as content grows. |
| Canonicals and URL structure | HTTPS canonicals from central site configuration; clean slugs and no query-driven duplicate routes | Root canonical and sitemap root URL were aligned exactly. A future custom domain will require one coordinated config/deployment migration. |
| Sitemap and indexability | 18 canonical, indexable URLs after the correction; 9 pages carry `noindex` (8 planned-only details plus the incomplete resume) | Planned project/lab detail pages remain navigable but are excluded until verified material exists. Their listing pages remain indexable because they explain the collection and status. |
| Robots and crawlability | `robots.txt` allows crawling and points to the sitemap | `noindex` pages must stay crawlable so crawlers can see the directive. No crawler-specific AI bot block was added. |
| 404 and redirects | Next.js generates a noindexed global 404; each dynamic content family has a route-specific not-found page; unknown slugs are not statically published | No legacy URL inventory exists, so speculative redirects were not added. Confirm status codes against the public deployment. |
| Headings and images | One H1 per generated public page; listing-card heading gaps corrected; no rendered `<img>` lacked an `alt` attribute | Recheck after new content or images are introduced. Decorative images should use an empty alt rather than invented descriptions. |
| Internal links | Primary navigation, breadcrumbs, related content, footer, and in-article links connect important routes; previous exhaustive link audit reported zero broken routes/fragments | Homepage now links to its actually published featured article. Re-run the link audit whenever content relationships change. |
| Social metadata | Global Open Graph/X defaults and article-specific publication fields exist | Social previews were not tested on live platform crawlers. |

Google describes sitemaps as hints for the canonical URLs one wants in results, not as indexing guarantees; it also explains that `noindex` must be accessible to the crawler and not blocked by robots. See [Google's sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) and [noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

## Structured-data findings

All rendered JSON-LD scripts parsed successfully. The 27 public pages each include a Person and WebSite identity graph plus WebPage. Twenty-six include BreadcrumbList (the homepage has no breadcrumb). The one published technical article includes Article with headline, author identity, publication date, modified date, and page relationship. Project placeholders do **not** emit CreativeWork; there are no Organization, rating, review, FAQPage, or ProfessionalService claims. Conceptual architecture notes and planned experiments use only general page/breadcrumb schema because they do not claim published research or implementation evidence.

This is intentionally conservative. [Google's Article markup guidance](https://developers.google.com/search/docs/appearance/structured-data/article) recommends clear headline, author, and dates where applicable. Schema is not a substitute for visible, verified content. Future real projects may use CreativeWork only when their visible case-study facts justify it.

## Content and AI-search readiness

The first article provides a direct production-AI definition, a prototype-versus-deployment explanation, explicit drift terminology, a system architecture, a comparison table, a production checklist, visible author/date, and question/answer content that is also rendered for human readers. The architecture library uses conceptual-status labels, components, data flow, trade-offs, and failure modes. Project and lab pages clearly disclose planned/placeholder status and do not fabricate results. Primary references were added to the article for OT security, AI risk management, and MLOps monitoring; the article explicitly distinguishes Rajat's engineering synthesis from firsthand deployment evidence and from vendor-specific architecture.

The content is crawlable and understandable without an AI-search-specific file, hidden prose, or keyword repetition. There is no reliable technical mechanism to guarantee citation or ranking in AI answers; sustained discoverability depends on original, substantiated case studies and useful publishing. This inference is consistent with [Google's people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), but AI retrieval behavior itself was not tested here.

## Changes made

1. Added `noindex, follow` to placeholder project and lab detail metadata, and omitted those details from the sitemap; kept navigational/related links usable.
2. Made listing card headings H2 on `/projects`, `/architecture`, and `/blog`; kept H3 for cards nested under a homepage section.
3. Replaced obsolete homepage article placeholders with the published featured article from the content loader.
4. Aligned the root absolute URL helper with the site's rendered root canonical so the sitemap, JSON-LD, and canonical use the same root URL.
5. Added primary technical reference links and a clear evidence/scope statement to the published article.

## Unresolved risks and owner inputs

- **Identity:** Confirm whether the public name should be “Rajat Nath” or “Rajat Debnath.” Current site config and Article authorship say the former; the previously supplied LinkedIn URL and some earlier project requests say the latter. Do not merge identities in Person schema or change author claims without confirmation.
- **Thin launch content:** The indexable project/lab collection pages chiefly describe planned work. Add real, evidenced case studies/experiments before expecting them to be meaningful acquisition pages. Keep individual placeholders noindexed until then.
- **Contact conversion:** The contact page has no verified address, social links, or active form endpoint. It is indexable and reachable, but not yet a working lead channel. Supply real contact details or an approved form provider in a separate phase.
- **Deployment:** Validate HTTP status codes, canonical host, social previews, sitemap fetchability, and Search Console indexing on the final public Vercel URL. Local build output cannot establish live crawler behavior.
- **Custom domain:** If introduced later, update the central URL, redirects, canonicals, sitemap, structured-data IDs, and Search Console property together; do not serve two competing canonical hosts.

## Validation record

- `npm run lint`: passed.
- `npm run build`: passed; all public pages statically prerendered or generated as SSG; TypeScript check passed within the build.
- Generated-HTML audit: 27 pages; zero missing titles/descriptions/canonicals/H1s/alt attributes, zero heading-level gaps after correction, zero duplicate titles/descriptions, zero sitemap/noindex conflicts; 18 sitemap URLs and 9 noindexed pages.
- JSON-LD audit: scripts parsed; expected Person, WebSite, WebPage, BreadcrumbList, and one Article; no unjustified project/organization/rating schema.

## Audit decision

Technical SEO is ready for production QA, with the owner inputs above still required for brand accuracy and lead-generation completeness. No claim is made that search engines have indexed or ranked the site.
