# deBarrosLabs public website

Independent Git repository, relocated to C:/Dev/deBarrosLabs/website. The parent lab repository ignores /website/. Keep this history, remote and Vercel project; never create a duplicate project.

- Read PROJECT-CONTEXT.md, BRAND-CONTEXT.md and MANUAL-EDITING-GUIDE.md.
- Public files live only in public/. Never deploy the repository root: it contains internal notes, a CV and legacy assets.
- Static HTML/CSS/JavaScript. No framework, package tooling, runtime API, analytics SDK, account or database.
- Use the debarros-design skill at C:/Dev/deBarrosLabs/.agents/skills/debarros-design/SKILL.md and the upstream docs/brand/system.md and docs/distribution/voice.md. English, personal voice, no fabricated claims.
- public/brand is a portable copy of shared tokens and licensed fonts. Refresh via scripts/sync-brand.ps1. No deploy-time dependency outside this repo.
- public/lab-data.js owns project notes and aggregates. Preserve explicit states, period, units, source, coverage and dates. Null is not zero; one-off payments are not MRR.
- Verify: powershell -NoProfile -ExecutionPolicy Bypass -File scripts/verify.ps1 (Node built-ins only).
- Preview: node scripts/serve.cjs (public only, loopback port 5500).
- Review 320, 375 and 1440px, keyboard and reduced motion.
- Show the candidate before publishing. Pushing remote main triggers production. See docs/MIGRATION.md before renaming or connecting domains.
