# AI Workflow Playbook

Last researched: 2026-04-23
Repo context last refreshed: 2026-04-24

This file translates current official OpenAI and Anthropic guidance into a practical workflow for this repo.

## Reliable vibe-coding loop

1. Start with a scoped task.
   - Describe the outcome, affected files, constraints, and acceptance criteria.
2. For larger changes, ask for a plan first.
   - Then follow with implementation once the plan looks right.
3. Keep one prompt focused on one meaningful unit of work.
   - A good default is something like one hour of human work or a few hundred lines of change.
4. Write prompts like short GitHub issues.
   - Include file paths, examples, constraints, and references to existing patterns.
5. Keep persistent context in repo files.
   - `AGENTS.md`, `CLAUDE.md`, `.impeccable.md`, `PROJECT-CONTEXT.md`, `TECHNICAL-OVERVIEW.md`, and `MANUAL-EDITING-GUIDE.md` are the shared memory layer.
6. Verify after edits.
   - In this repo that means at least running `scripts/verify.ps1` and previewing the site locally.
7. Update the context files when the project changes.
   - Do not let the memory drift behind the code.

## Prompt templates

### Small implementation prompt

```text
Implement this change in `index.html`.

Goal:
- [desired outcome]

Constraints:
- Keep the site static
- Preserve EN/ES parity
- Keep the Riptide tone direct and concise

Acceptance criteria:
- [criterion]
- [criterion]

After editing, run `scripts/verify.ps1` and summarize what changed.
```

### Plan-first prompt

```text
First, inspect the repo and propose a short implementation plan for this change.
Do not edit files yet.

Task:
- [desired outcome]

Relevant files:
- `index.html`
- `BRAND-CONTEXT.md`
- `.impeccable.md`

Call out tradeoffs, then stop.
```

### Review prompt

```text
Review the current changes with a code-review mindset.
Focus on bugs, regressions, accessibility issues, and missing translation coverage.
List findings first, then a short summary.
```

### Context refresh prompt

```text
Read `PROJECT-CONTEXT.md`, `BRAND-CONTEXT.md`, `.impeccable.md`, and `AGENTS.md`.
Summarize the current project goals, constraints, and open questions before coding.
```

## Repo-specific habits

- If you touch copy, check both the visible default text and the translation objects.
- If you touch motion, make sure the experience still works with reduced motion or missing GSAP.
- If you introduce a new reusable pattern, document it in the shared context files.
- If you change how the site is assembled, update `TECHNICAL-OVERVIEW.md`.
- If you change where or how a human should edit the site manually, update `MANUAL-EDITING-GUIDE.md`.
- Git is initialized. Check `git status --short` before editing and do not overwrite unrelated local changes.

## Why this setup exists

OpenAI guidance for Codex emphasizes:

- starting large tasks with planning
- improving the agent environment over time
- structuring prompts like issues
- supplying persistent repo context with `AGENTS.md`

Anthropic guidance for Claude Code emphasizes:

- using project memory in `CLAUDE.md`
- keeping instructions structured and specific
- using lightweight project settings and hooks where useful
- maintaining shared commands and conventions in-repo

## Official sources

- OpenAI, "How OpenAI uses Codex"
  - https://openai.com/business/guides-and-resources/how-openai-uses-codex/
- OpenAI, "Introducing Codex"
  - https://openai.com/index/introducing-codex/
- OpenAI, prompt engineering guide
  - https://platform.openai.com/docs/guides/prompt-engineering/strategies-for-better-results
- OpenAI, reasoning best practices
  - https://platform.openai.com/docs/guides/reasoning-best-practices
- Anthropic, Claude Code memory
  - https://code.claude.com/docs/en/memory
- Anthropic, Claude Code settings
  - https://code.claude.com/docs/en/settings
- Anthropic, Claude Code hooks
  - https://code.claude.com/docs/en/hooks
- Anthropic, prompting best practices
  - https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
