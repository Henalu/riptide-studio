# Static architecture

Deploy public/ with no install or build command; vercel.json fixes the output directory and response headers.
index.html provides semantic structure, metadata and essential no-JavaScript content. lab-data.js owns the catalogue and reporting window; lab.js validates and renders it with escaped text and HTTPS-only product URLs. Missing values or sampled coverage cannot become lab-wide totals. Revenue uses integer EUR cents.

No third-party scripts, cookies, storage, fetch calls or runtime services. Fonts/tokens are copied with licences from the parent brand and are portable. React UI was inspected but is not imported, avoiding a framework dependency.

Node built-ins only: scripts/serve.cjs previews public/ on loopback; scripts/verify.cjs validates the static release and tests meaningful metric behaviours. No compilation exists. Original assets and internal documents are outside the public output.

The sibling Next apps, pnpm catalogue and shared packages are unchanged. Moving this folder does not alter the remote Git integration: it is linked by repo/project IDs, not this local path.
