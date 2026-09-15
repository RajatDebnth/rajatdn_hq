# Accessibility audit

Audit date: 2026-09-16. Scope: every major route and all 27 generated public HTML pages, shared layout/navigation/content components, the contact form, light/dark CSS tokens, and reduced-motion rules. This is a code and generated-markup audit, **not** a WCAG conformance certification or an assistive-technology test.

## Issues found and fixed

| Issue | Evidence | Fix |
| --- | --- | --- |
| Dark-mode skip link lacked readable contrast | It used a fixed white background while inheriting nearly white dark-theme text. | Use theme-aware surface and foreground colors, give it a visible border, and make `<main>` programmatically focusable as the fragment target. |
| Focus visibility was incomplete | Custom focus CSS covered links and buttons but not inputs, selects, textareas, or keyboard-focusable scrollable code/table containers. | Extend the same visible `:focus-visible` outline to those controls and `tabindex="0"` regions. |
| Selection text failed contrast in dark mode | White selected text on the light dark-theme accent calculated at about 2.0:1. | Use the theme-aware background color as selection text; it contrasts with the accent in both themes. |
| Essential control borders were too faint | `--line-strong` against the input background calculated at 2.05:1 in light mode and 2.83:1 in dark mode, below the 3:1 non-text threshold where the boundary identifies a control. | Add `--control-line` with about 3.59:1 light and 3.82:1 dark contrast; apply it to form controls, outlined actions, and the mobile-menu button. Decorative separators remain unchanged. |
| Topic groups lacked native list structure | A generic `<div aria-label>` does not give a meaningful grouped list to screen readers. | Render `ul/li` and retain a concise list label. No list role was added. |
| Mobile disclosure had a missing ID reference when closed | `aria-controls` pointed to a conditionally unmounted `<nav>`. Escape did not close the opened panel. | Keep the native `<nav>` in the DOM with `hidden` when closed; Escape closes it and returns focus to the native button. Keep `aria-expanded` for its disclosure state, without applying menu/menubar roles. |
| The article comparison table lacked row headers | It had column headers and a caption, but the first cell of each data row was a plain `<td>`. | Use `<th scope="row">` for each prototype assumption. Generated HTML contains five row headers. |

[W3C's contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) sets 4.5:1 for ordinary text and 3:1 for large text; [non-text contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) applies 3:1 to necessary control cues. [W3C's disclosure-navigation example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) supports native buttons, `aria-expanded`, ordinary link navigation, and Escape without turning a site nav into an ARIA menu. [W3C's table tutorial](https://www.w3.org/WAI/tutorials/tables/two-headers/) explains column and row header association.

## Route and shared-component checks

- **Semantics and landmarks:** Each of the 27 generated public pages has one `<main>` and one H1. Shared `<header>`, `<main>`, `<footer>`, named navigation areas, article/aside/section elements, figures, lists, breadcrumbs, and native form controls are used where appropriate. The dynamic content families have readable not-found pages.
- **Headings:** No generated page skipped a heading level after prior listing-card fixes; article H2/H3 structure and table caption are present.
- **Names and labels:** The generated-markup scan found no empty accessible-text links and no unlabeled form controls. Navigation links, CTA buttons, breadcrumb links, and article table-of-contents links have text names. The contact form has explicit labels and uses native `required` fields rather than redundant `aria-required`.
- **Images:** No current generated raster content image lacked `alt`; the optional project/MDX image schemas require alt text. Actual future image wording still needs editorial review.
- **Focus and keyboard:** A skip link is first in the keyboard sequence and becomes visible on focus; focus styling now covers links, buttons, fields, and scrollable regions. The mobile disclosure has a button, expanded state, hidden collapsed links, and Escape focus return.
- **Color:** Calculated normal foreground/background contrast is about 16.4:1 in both themes; muted body text is about 6.2:1 light and 9.2:1 dark; accent links are about 6.9:1 light and 9.4:1 dark. These calculations cover defined tokens, not every rendered pixel or browser override.
- **Motion:** Smooth scrolling and small color transitions are disabled by the existing `prefers-reduced-motion` CSS. No animation library or time-dependent content is present.
- **ARIA:** ARIA is used for genuinely named regions, disclosure state, relationships, and decorative-arrow hiding. Native lists, buttons, links, labels, table captions, and `scope` carry structure instead of role workarounds.
- **Forms and errors:** The currently unconfigured form is disabled and visibly states why; no active submit flow, provider confirmation, or provider error experience exists to audit. If a provider is configured, browser-native validation and provider error handling must be tested then.

## Generated-output validation

- `npm run lint`: passed.
- `npm run build`: passed; TypeScript validation passed within the build.
- Read-only generated-HTML scan: 27 public pages; zero missing mains/H1s, heading gaps, broken `aria-labelledby`/`aria-describedby`/`aria-controls` ID references, or images without `alt`.
- Link/form scan: zero empty-text links or unlabeled form controls in generated markup.
- Published article: five rendered `<th scope="row">` cells in the comparison table.
- Homepage: the collapsed mobile navigation is rendered with `hidden`, while its ID remains available for `aria-controls`.

## Manual browser and assistive-technology work still required

1. **Keyboard journey:** Tab/Shift+Tab every route at mobile and desktop widths; open/close the mobile menu with Enter/Space/Escape; confirm focus is visible and never lands in hidden menu links.
2. **Client-side navigation focus:** Confirm that focus lands predictably after selecting a mobile-menu link or any Next.js route link; programmatic focus behavior of the skip link and route transitions cannot be proven from static HTML.
3. **Screen readers:** Test landmarks, headings, breadcrumbs, topic lists, the architecture flows, code blocks, table caption/row headers, and form status with at least NVDA/Chrome or Edge and VoiceOver/Safari.
4. **Visual/browser states:** Review actual focus rings, control borders, text selection, both themes, 200–400% zoom, forced-colors/high-contrast mode, and touch targets on small screens. Token ratios do not guarantee every composited state.
5. **Active contact flow:** Once a real provider is supplied, test invalid required fields, provider-side errors, success feedback, focus placement, and the provider's own accessibility and privacy pages. No fake error UI was invented for the disabled form.
6. **Future media:** Review real image alt text, caption redundancy, diagram text alternatives, and PDF resume accessibility when those assets are supplied.

No claim is made that the site has passed a full WCAG audit until these browser and assistive-technology checks are completed.
