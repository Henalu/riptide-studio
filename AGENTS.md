# Riptide Studio Agent Guide

Read these files before making substantial changes:

1. `PROJECT-CONTEXT.md`
2. `BRAND-CONTEXT.md`
3. `.impeccable.md`
4. `AI-WORKFLOW.md`

## Repo facts

- Main implementation: `index.html`
- This is a static site. Do not introduce a framework, bundler, or package tooling unless the user explicitly asks for it.
- The repo currently has no git history. Avoid assuming branches, tests, or CI exist.

## Commands

- Preview locally:
  - `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\dev.ps1 -Port 5500`
- Verify after edits:
  - `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\verify.ps1`

## Working rules

- Preserve EN/ES translation parity.
- Keep copy direct and concrete.
- Prefer real evidence over decorative filler.
- Preserve the dark ocean / bioluminescent teal direction.
- Do not add fake proof, fake URLs, or placeholder business claims.
- If a change adds a new `data-t` key, update both translation objects immediately.

## Done when

- `scripts/verify.ps1` passes
- Contact flow is still obvious
- Anchors still work
- Motion still has a safe fallback
- The page still opens directly as static HTML
