# Project Context - Riptide Studio

Last updated: 2026-04-24

## What this repo is

This repository contains the public portfolio site for Riptide Studio.
It is intentionally simple:

- Single-page static site
- Main implementation lives in `index.html`
- No framework
- No build pipeline
- No package manager
- Git repo initialized

## Primary goal

Convert startup founders and operators into email conversations by showing:

- real shipped capability
- direct, confident communication
- strong taste without agency fluff

## Current stack

- HTML, CSS, and vanilla JavaScript
- GSAP from CDN for motion
- Google Fonts for typography
- Local bitmap assets for hero art and project covers
- No app framework, no build step, no package manager

## Current page structure

- Hero with dark ocean art, floating project panels, and direct CTAs
- Proof strip for shipped capabilities
- Selected Work: WavePass, Gijón Throwdown, ShiftSwap, Breaking Trail, SN Assistant, and Alvear IA
- Concept sections: Inside my mind, My internet lab, and Things I would build if I had 10 lives
- How we ship philosophy section
- Contact section using `marcohenalu@gmail.com`

## Current implementation notes

- `index.html` contains the full site: markup, CSS, translations, and JavaScript.
- The default visible copy is English. Spanish is applied from the embedded `translations.es` object.
- Every visible translated text uses `data-t`. If a new key is added, it must exist in both `translations.en` and `translations.es`.
- The hero uses local scene imagery from `assets/hero/` plus clickable floating project panels.
- Hero panel images are treated concept covers. They are intentionally atmospheric and should not be treated as product screenshots.
- Hero card visuals should share one Riptide language: dark, cinematic, glassy, oceanic, high-pressure, subtle current/light trails, and restrained project-specific color.
- Selected Work uses real screenshot captures from `assets/project-covers/`.
- Selected Work screenshots share one neutral full-container overlay via `.proj-visual::before`. Avoid per-project colored overlays, inset frames, stacked pseudo-elements, or decorative layers over screenshots.
- Mobile detail sections use the shared `data-disclosure-toggle` pattern in the JavaScript.
- GSAP is progressive enhancement. The page should remain usable if motion is reduced or unavailable.

## File map

- `index.html`: source of truth for layout, styles, scripts, and translations
- `assets/hero/`: hero background and floating project panel imagery; `*-concept.png` files are source concept covers and `*-riptide.png` files are the current treated hero card assets
- `assets/project-covers/`: local project cover screenshots/captures
- `BRAND-CONTEXT.md`: brand, tone, positioning, project references
- `.impeccable.md`: design context for AI tools
- `AI-WORKFLOW.md`: prompting and operating guide for Codex and Claude
- `TECHNICAL-OVERVIEW.md`: readable overview of how the site is assembled and why
- `MANUAL-EDITING-GUIDE.md`: practical guide for making hand edits safely
- `scripts/dev.ps1`: local preview server
- `scripts/verify.ps1`: deterministic repo checks
- `artifacts/`: generated review/verification artifacts when needed
- `temp/`: local scratch output; do not treat as source of truth

## Repo-specific constraints

- Keep the site static unless the user explicitly asks for a framework or tooling.
- Preserve EN/ES parity. Any new `data-t` key must exist in both language objects.
- Prefer honest proof over decorative filler.
- Do not add fake metrics, fake client logos, fake testimonials, or fake project URLs.
- Preserve the "night ocean" visual metaphor and the sharp, dry tone from `BRAND-CONTEXT.md`.
- If a project does not have a real live URL or screenshot yet, say less rather than inventing.
- Keep project cover treatment consistent: one neutral overlay, same filter/blend behavior, no colored per-project tinting in Selected Work.

## Working rules

- Read `BRAND-CONTEXT.md` before making product or copy decisions.
- Read `.impeccable.md` before making visual changes.
- Read `AI-WORKFLOW.md` before changing the repo workflow or agent instructions.
- After editing `index.html`, run `scripts/verify.ps1`.
- For visual changes, preview locally and inspect the affected section at desktop and mobile widths.
- Use `TECHNICAL-OVERVIEW.md` for architectural orientation and `MANUAL-EDITING-GUIDE.md` for hand-edit instructions.
- Prefer small, verifiable changes over large rewrites.

## Definition of done for this repo

- The page still opens as a plain static site.
- Navigation anchors still work.
- Translation keys stay in sync.
- Reduced-motion users can still use the page comfortably.
- The verify script passes.

## Known open items

- Real live URLs for projects
- Ongoing refresh of real screenshots/captures as projects change
- Better visual verification workflow, ideally with Playwright or a screenshot helper skill/tool
