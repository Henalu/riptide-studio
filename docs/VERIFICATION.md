# Local candidate verification — 2026-09-15

## Passed

- `scripts/verify.ps1`: JavaScript syntax; explicit metric states/dates/period/units; unknown versus confirmed zero; missing and sampled metrics excluded from totals; negative revenue/refunds; invalid URLs; duplicate IDs; static assets, anchors, metadata, image dimensions and public-only output.
- `git diff --check`: no whitespace errors.
- Parent `C:/Dev/deBarrosLabs`: `pnpm check` completed successfully. Formatting, six lint/typecheck tasks, required builds and 60 tests (48 StepBudget, 6 EmbedReady, 6 External MFA). No dependency or lockfile changes were needed for the website.
- Real in-app browser review at 1440×1000, 375×812 and 320×900. No horizontal document overflow. Also checked reflow at 720px. Fonts loaded; no broken internal anchors or third-party script elements; captured browser log had no warnings/errors.
- Main navigation reaches products/progress; ledger links point to the corresponding product. Native methodology disclosure opens with Enter and closes with Space. Tab reaches the visible skip link; Enter places focus on main.
- Mobile retains the complete ledger, units and status text. Small status text stays at least 11px. Primary actions have 44px or larger targets.
- Text colour pair contrast: ink/paper 15.93:1, muted/paper 6.27:1, muted/surface 5.67:1, ink/yellow 16.03:1, OpenTests blue/pale blue 7.04:1.
- HTTP: local homepage/privacy 200, AGENTS.md/.git/config/old hero asset 404. OpenTests public URL 200.
- Source defines no decorative loops and disables transitions/smooth scrolling for reduced-motion preference.
- Entire static output, including fonts, licences, icons and social card: approximately 221 KB before transport compression, 17 files. No new install dependency or compiler.

## Evidence

Local screenshots, ignored by Git and excluded from deployment:

- `artifacts/desktop.png`
- `artifacts/ledger-desktop.png`
- `artifacts/mobile.png`

## Limits and release gates

Browser zoom controls and reduced-motion preference emulation were unavailable in the in-app browser API. 720px reflow and the reduced-motion CSS were checked; this is not a claim of a tested 200% browser zoom, preference toggle or a full screen-reader/WCAG audit.

At the pre-publication review, remote release and domain changes were still pending. These were subsequently approved and verified; see the release result in MIGRATION.md. No payment, generation or analytics integration was added.

Current numeric product use, purchases and revenue remain unknown; StepBudget financial metrics are not applicable to its no-paid-offer version. Catalogue counts (two documented products, one published) are verified catalogue facts, not market traction.

## Editorial revision — 15 September 2026

Following design review, replaced the StepBudget-like split hero/poster and product illustrations with a wide typographic masthead and numbered editorial index. Updated social artwork and design context. Browser checks at 320, 375 and 1440 CSS pixels: no horizontal overflow; inspected mobile ledger and product index, desktop hero and index. No broken fragment links or browser warning/error logs. Static release and ledger validation passed. Production remains untouched.

## Approved production verification — 2026-09-15

Published to the original project, now named debarroslabs. HTTPS 200, three permanent redirects, exact byte comparison of all 17 public files, private-path isolation, the OpenTests link, live mobile/desktop rendering and keyboard disclosure verified. See MIGRATION.md for commit and deployment evidence.

## Interactive details — approved for publication, 2026-09-15

- Added native Canvas headline fragments, a bounded 18-pixel menu burst (maximum 72 concurrent particles), and CSS row hover/focus feedback. No dependencies, timers or continuous animation loop in production; requestAnimationFrame sleeps once positions settle.
- A separate ignored local harness drove synthetic pointer enter/leave and menu activation in Chromium. Headline emitted pixels, restored its unmasked text on leave, and settled without further animation frames. Menu reached #projects and settled after its burst. Reduced-motion JavaScript branch produced zero painted particles and still navigated.
- Repeated headline probe under the production CSP: no warnings/errors. Actual local-page keyboard navigation and product focus highlight verified, with pointer-events:none and aria-hidden on the canvas.
- Visual inspection: headline effect on desktop and ordinary layout at 375px through the isolated harness, no horizontal overflow. Canvas is resized and effects reset when layout changes.
- Limitation: available browser controls do not expose mouse hover or OS media emulation. Hover was driven by a synthetic PointerEvent in a local-only harness; reduced-motion input was supplied to matchMedia there, while the production CSS fallback was reviewed directly. No claim of a manual OS-setting test or measured frame rate.
- Shared design preference recorded in ../docs/brand/system.md, already loaded by the debarros-design skill. Other pre-existing parent repository changes remain untouched.
- Publication approved by Henalu on 2026-09-15. Test harness and diagnostics live outside public/ and are not deployed.
