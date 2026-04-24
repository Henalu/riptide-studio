# Project Context - Riptide Studio

Last updated: 2026-04-23

## What this repo is

This repository contains the public portfolio site for Riptide Studio.
It is intentionally simple:

- Single-page static site
- Main implementation lives in `index.html`
- No framework
- No build pipeline
- No package manager
- No git repo yet

## Primary goal

Convert startup founders and operators into email conversations by showing:

- real shipped capability
- direct, confident communication
- strong taste without agency fluff

## Current stack

- HTML, CSS, and vanilla JavaScript
- GSAP from CDN for motion
- Google Fonts for typography

## File map

- `index.html`: source of truth for layout, styles, scripts, and translations
- `BRAND-CONTEXT.md`: brand, tone, positioning, project references
- `.impeccable.md`: design context for AI tools
- `AI-WORKFLOW.md`: prompting and operating guide for Codex and Claude
- `scripts/dev.ps1`: local preview server
- `scripts/verify.ps1`: deterministic repo checks

## Repo-specific constraints

- Keep the site static unless the user explicitly asks for a framework or tooling.
- Preserve EN/ES parity. Any new `data-t` key must exist in both language objects.
- Prefer honest proof over decorative filler.
- Do not add fake metrics, fake client logos, fake testimonials, or fake project URLs.
- Preserve the "night ocean" visual metaphor and the sharp, dry tone from `BRAND-CONTEXT.md`.
- If a project does not have a real live URL or screenshot yet, say less rather than inventing.

## Working rules

- Read `BRAND-CONTEXT.md` before making product or copy decisions.
- Read `.impeccable.md` before making visual changes.
- Read `AI-WORKFLOW.md` before changing the repo workflow or agent instructions.
- After editing `index.html`, run `scripts/verify.ps1`.
- Prefer small, verifiable changes over large rewrites.

## Definition of done for this repo

- The page still opens as a plain static site.
- Navigation anchors still work.
- Translation keys stay in sync.
- Reduced-motion users can still use the page comfortably.
- The verify script passes.

## Known open items

- Final confirmation for the contact email
- Real live URLs for projects
- Real screenshots or captures for project visuals
- Decision on whether to initialize git before heavier iteration
