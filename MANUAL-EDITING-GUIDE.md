# Maintain the public lab

## Preview and verify

From C:/Dev/deBarrosLabs/website:

    node scripts/serve.cjs
    powershell -NoProfile -ExecutionPolicy Bypass -File scripts/verify.ps1

Open http://localhost:5500/. public/index.html also opens directly. Node 24 is a local preview/check tool only, with no package installation and no runtime server to deploy.

## Add a product

Edit public/lab-data.js. Add a unique lowercase id, name, real status, checkedAt date, description, features, limitations, next step and metrics. Keep url: null until a real HTTPS URL is verified. Supported status keys: development, testing, published, closed. Testing requires an actual test to have started. Published does not imply validated demand.

Optional art: notebook, steps, or omit for a neutral lab mark. Never invent an experiment number. The list generates products, counts, rows and source notes without changing the layout. Update the short no-JavaScript fallback in index.html when adding a product.

## Update metrics manually

1. Choose a window within one calendar month in period.start/end (inclusive, Europe/Madrid). Exact dates show partial months. These dates never advance when the page is opened.
2. Verify a public-safe aggregate source for that period. Keep source exports, individual payments and customer identifiers outside this repository.
3. Set state to verified with integer value, real updatedAt date, source description and coverage. Label observed samples precisely. Only use coverage: 'All activity in the stated period' for complete global figures; only these enter lab financial totals.
4. Usage counts actions, not people. Purchases count successfully paid orders, including later-refunded orders, excluding test/failed/cancelled payments. Revenue uses integer EUR cents: payments received excluding tax, minus refunds recorded during the window, before fees/costs. Do not mix currencies or call these one-off sales MRR. Negative revenue can represent refunds.
5. Unknown: state missing, value null, updatedAt null. Not applicable: same null values plus the concrete reason, such as no paid offer. Zero requires verified evidence.
6. Update reviewedAt for an actual catalogue review; checkedAt is product status verification, distinct from metric updatedAt.
7. When changing month/period, reset metrics not reverified for the new window to missing. Never carry old figures into a new period. Preserve old releases in Git. No historical chart or month selector is needed.
8. Run checks and inspect the definitions and mobile layout before publishing.

## Pending sources

OpenTests: browser-local personal history is not a global usage count. No central reporting verified. Paid PDF release is pending; verified aggregate payment/refund/tax reporting is required before entering financial figures. No assumed zero.

StepBudget: planned manual observations have not started. Technical test files are not real users. No paid offer in this version, so purchases and revenue do not apply.

Lab totals remain unavailable if an applicable product has unknown or sampled data. Usage units differ and are never summed.

## Brand and deployment

scripts/sync-brand.ps1 copies ../packages/brand tokens/fonts/licences deliberately into this repository. Review diffs. Deployment needs no parent files.
Only public/ is deployed. Read docs/MIGRATION.md before release. Pushing main publishes automatically and requires the separate public review.
