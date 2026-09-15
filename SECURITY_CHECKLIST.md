# Portfolio security audit and checklist

Audit date: 2026-09-16. Scope: local project files, public source/content paths, the installed dependency graph, a production build, and local response headers. This is not a penetration test or verification of a GitHub/Vercel account.

## Audit result

No obvious credential literals were found in the project-source scan. Only the blank `.env.example` is present; `.env`, `.env.local`, `.env.production`, and nested `.env.local` paths are ignored by `.gitignore`. `package-lock.json` remains trackable. `npm audit --omit=dev --audit-level=moderate` and `npm audit --audit-level=moderate` both reported **zero known vulnerabilities** on the audit date. This does not prove that dependencies have no undisclosed issues.

The most material code risk was repository MDX: `next-mdx-remote/rsc` compiles source using a server-side function constructor, and a controlled probe confirmed that its default blocked-JavaScript-expression setting still permits raw `<script>` and `<iframe>` output. The article route now explicitly disables expressions/dynamic imports and runs a build-time MDX check that rejects executable/embed elements, event/dynamic attributes, JavaScript/import nodes, and unsafe URL schemes. A negative probe blocked script, iframe, `javascript:` link, environment expression, and event-handler cases while permitting ordinary Markdown. **This is defense in depth for author-controlled repository content, not permission to accept user-submitted MDX.** See the [maintainer's MDX security guidance](https://github.com/hashicorp/next-mdx-remote).

## Verified checklist

- [x] No local `.env` values or API-key/password/token/private-key literals were found in the scoped source scan. Scan output was limited to matching filenames so values would not be echoed.
- [x] `.gitignore` ignores local `.env*` files, dependencies, `.next`, Vercel state, build output, and TypeScript build artifacts; blank `.env.example` and `package-lock.json` are trackable.
- [x] No `NEXT_PUBLIC_*` environment variables or private server credentials are used. The four `CONTACT_*` settings are public destinations and must never contain secrets because they can be rendered into HTML.
- [x] `CONTACT_EMAIL` is a public mailto address only, not an email password or SMTP credential. No private email credentials are read or stored.
- [x] Contact form submission is disabled until an external HTTPS endpoint is configured. The site has no contact backend, database, or request-time submission handler.
- [x] Configured contact URLs are validated as HTTPS without embedded URL credentials; LinkedIn and GitHub destinations must use their expected hosts.
- [x] Project, demo, and lab repository URLs now fail content validation if non-HTTPS, credential-bearing, localhost, or carrying obvious credential query parameters. New-tab links explicitly use `rel="noopener noreferrer"`.
- [x] Blog canonical URLs reject embedded credentials; repository content image paths reject protocol-relative sources.
- [x] JSON-LD is serialized with `<`, U+2028, and U+2029 escaped before the one `dangerouslySetInnerHTML` call. No user data enters that script.
- [x] Published MDX is read only from repository files and rendered by a Server Component; drafts are excluded. JavaScript expressions/imports and unsafe markup are now rejected at build time.
- [x] No analytics, ad tags, remote JavaScript, chatbot, authentication, CMS, or other third-party browser script is included.
- [x] Production and full npm advisory checks reported zero known vulnerabilities. Keep the lockfile and repeat audits before deployment and after dependency updates.
- [x] Response headers now include `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, and a restrictive camera/microphone/geolocation `Permissions-Policy`; Next's `X-Powered-By` disclosure is disabled. Header support follows the installed [Next.js headers documentation](https://nextjs.org/docs/app/api-reference/config/next-config-js/headers).
- [x] Lint, typecheck, and production build pass after the fixes.

## Pending operational checklist

- [ ] **GitHub privacy cannot be verified locally:** a local Git repository has now been initialized, but it has no remote or commit. Before the first push, create an explicitly **private** GitHub repository, verify its visibility in GitHub, and inspect the staged diff for secrets. A public Vercel deployment does not require making the source repository public.
- [ ] Enable GitHub secret scanning/push protection if available, and review repository access, branch protection, and organization/account permissions. `.gitignore` does not remove secrets already committed in history.
- [ ] Keep Vercel environment variables scoped and access-controlled. Confirm all `CONTACT_*` values are meant to be public; never use an API key or private provider token in a public form action URL.
- [ ] Verify the actual contact provider's allowed endpoint, spam filtering, privacy policy, success/error experience, and submission retention before activating the form. A browser-posted honeypot is only a weak UX measure and not server-side abuse protection.
- [ ] Recheck the four security headers and `X-Powered-By` absence on the deployed HTTPS site. Verify TLS/HSTS behavior there; local HTTP cannot establish HTTPS policy.
- [ ] Review any Content Security Policy as a separate tested deployment change. A restrictive `script-src` was **not** added blindly because Next.js emits inline hydration/RSC scripts; an untested CSP could break navigation or metadata. Current MDX protection is build-time, not a full browser CSP.
- [ ] Re-run npm advisories regularly and review newly added dependencies and MDX content before publication. A zero-advisory result is time-bound.
- [ ] If real projects, image files, PDFs, or a form provider are added, inspect them for embedded personal data, access keys, signed URLs, source maps, and accidental client-visible credentials.

## Files changed in this audit

`next.config.ts`, `AGENTS.md`, `src/app/(site)/blog/[slug]/page.tsx`, `src/app/(site)/contact/page.tsx`, `src/app/(site)/projects/[slug]/page.tsx`, `src/app/(site)/lab/[slug]/page.tsx`, `src/lib/content/blog.ts`, `src/lib/content/projects.ts`, `src/lib/content/lab.ts`, new `src/lib/content/mdx-security.ts`, new `src/lib/content/external-url.ts`, and this checklist.

## Validation details

- Source and file-name inspection: no project `.env` values or obvious credential-pattern files. Git was not present during this security audit; it was initialized afterward in the Git-hygiene phase, with no remote yet.
- Ignore-pattern probe: `.env`, `.env.local`, `.env.production`, and nested `.env.local` ignored; `.env.example` and lockfile trackable.
- npm advisories: 0 production; 0 complete dependency-tree known vulnerabilities.
- MDX probe: five malicious/unsafe examples blocked; ordinary Markdown allowed; published article builds.
- Final local production response: 200 response included the four new security headers and omitted `X-Powered-By`; deployed headers remain to be checked separately.
- `npm run lint`, `npm run typecheck`, `npm run build`: passed, including the final `poweredByHeader` change.
