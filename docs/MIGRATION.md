# Migration and release checklist

## Initial inspection — 2026-09-15 (before publication)

- Local source relocated from `C:/Dev/projects/Riptide Studio` to `C:/Dev/deBarrosLabs/website`. Git history and origin preserved; branch `codex/debarroslabs-public-site`. No duplicate repository or Vercel project was created.
- Parent lab repository ignores `/website/`. It stays outside `apps/*` and `packages/*`, so pnpm and Turbo do not treat the static site as another Next app. No shared package or dependency version was changed.
- Existing Git remote: `https://github.com/Henalu/riptide-studio.git`. Renaming the Vercel project does not require renaming this remote. The user requested a Vercel/site name change, not a GitHub repository rename.
- Existing Vercel team: `henalus-projects`, `team_asIr0xyy0MR42x0UBz5wstD5`.
- Existing project: `riptide-studio`, `prj_r237gRLOhKpfMgnRK2w9BvMcsrZm`.
- Git integration points at `Henalu/riptide-studio`; `main` triggers production. Custom production domain auto-assignment is enabled. No project-specific production variables, no linked shared variables, no deploy hooks. CLI has no saved login; the authenticated in-app Vercel dashboard is available.
- Integrations page lists team installations (Upstash, Resend, Supabase); this does not prove use by this site. The existing static source has no service dependencies; the replacement has none either. No integration is removed or changed.
- `riptide-studio.vercel.app` returns HTTP 200 and is assigned to production. Vercel domain editor offers a permanent 308 redirect. Merely seeing that option does not verify the eventual redirect.
- No project named `debarroslabs` appears in the team's project list. `debarroslabs.vercel.app` returns 404 / DEPLOYMENT_NOT_FOUND. This does not reserve or conclusively establish assignability. Check again at cutover; do not silently substitute a name.
- `debarroslabs.com` is registered in this Vercel team, with Vercel nameservers. The dashboard says no project is using it and no certificate has been issued yet. No registration purchase is needed. No nameserver, mail or subdomain record was changed.

## Candidate deployment

`vercel.json`: framework null, install/build commands null, output directory `public`. Only that directory is served. Metadata targets the owned canonical `https://debarroslabs.com/`. Icons and social card use the new brand. No source docs, CV, old covers, exports or private files are in `public/`.

The site is static, with no compilation. `scripts/verify.ps1` validates syntax, assets, navigation, metadata, output isolation and ledger behaviour. Preview uses the same configured security headers. Local Vercel Toolbar may be blocked by the deliberately restricted script/connect policy; the public site itself needs no toolbar or remote connection.

## Cutover procedure (approved and completed 2026-09-15)

1. Recheck public product state and domain availability; review the exact site diff. Do not publish the parent repository's unrelated working changes. Use this existing repo's branch and project ID.
2. Rename **the existing project** to `debarroslabs` in General settings. Verify the same project ID, Git repo/production branch, environment settings and retained domains. If assignment reports a collision or unexpected consequence, stop and explain before making a replacement.
3. Preserve the old `riptide-studio.vercel.app` domain assignment; do not edit it into a new domain or remove it. Add the new Vercel alias if available. Preserve existing deployment history for rollback.
4. Deploy the reviewed public-only candidate to the same project, with Root Directory at repository root and output `public`. Verify Vercel respects null build/install commands and the output directory; no parent checkout or pnpm install is required. A push to main is a production publication, not just backup.
5. Connect `debarroslabs.com` to this project, using the apex as canonical. Add `www.debarroslabs.com` as a 308 redirect to the apex if available. Vercel-managed DNS should supply its exact required records. Leave unrelated subdomains, email records and registrations intact.
6. Wait for HTTPS/valid configuration and verify real responses. Only then point the old `riptide-studio.vercel.app` domain and optional `debarroslabs.vercel.app` alias at the canonical with 308. Verify each hop, final 200, query/path preservation and deep links to `privacy.html`. Check old anchors: `#projects`, `#about`, `#contact`, `#top` remain; obsolete personal-concept sections are intentionally retired.
7. Check apex and redirects without a Vercel session, product links, mobile, static assets, robots/sitemap and social card. Confirm internal paths (AGENTS.md, CV, old assets, .git) return 404.
8. Record the deployed commit/deployment ID, final domains, redirect evidence and release date here. If any live check fails, use the prior deployment and retained domain settings to restore access; do not delete the project.

## Release result — 2026-09-15

User explicitly approved publishing the reviewed editorial version and renaming the existing project.

- Canonical: https://debarroslabs.com/ — HTTPS 200; Vercel reports Valid Configuration.
- Existing project renamed to debarroslabs. Project ID unchanged: prj_r237gRLOhKpfMgnRK2w9BvMcsrZm. No duplicate project; previous deployments retained.
- Git integration remains Henalu/riptide-studio, main. Approved site commit: 6eda40eb1156deb0058b346906c3d7558107cc94.
- Initial release deployment: dpl_CSztQL6XwMQo967JTTmsCJeHJRof (READY / production). Vercel build completed successfully in 37 ms with no dependency install.
- riptide-studio.vercel.app, debarroslabs.vercel.app and www.debarroslabs.com all return 308 to https://debarroslabs.com/. Verified /privacy.html?source=release preserves both path and query and ends at HTTP 200.
- Browser confirmed the old /#projects URL arrives at https://debarroslabs.com/#projects.
- All 17 public files exactly match the reviewed local bytes. Five tested internal paths return 404: /AGENTS.md, /.git/config, /docs/MIGRATION.md, /assets/social-card.svg and /.env.
- Live browser checked at 375 and 1440 CSS pixels: no overflow, fonts loaded, no broken anchors, no warnings/errors. Metric definition disclosure opens with Enter. OpenTests product link responds 200.
- No metrics integration added. Manual reports retain explicit periods, verification dates and unknown values; no fabricated zeros. No change to other products or their deployments.
- Detailed machine-check evidence is local at artifacts/production-checks.json. Screenshot: artifacts/production-desktop.png.

Future documentation-only deployments may supersede the initial deployment; the site content remains traceable to the approved commit above.

References consulted: [Vercel project renaming](https://vercel.com/kb/guide/how-do-i-change-the-name-of-my-vercel-project), [project-name workflow continuity](https://vercel.com/changelog/projects-can-now-be-renamed), [generated URLs](https://vercel.com/docs/deployments/generated-urls), [domain configuration](https://vercel.com/docs/domains/working-with-domains/add-a-domain), [static configuration](https://vercel.com/docs/project-configuration/vercel-json).
