# AGENTS.md

## Repository Overview

Reusable `Next.js` landing-page boilerplate for client work.

Current scope:
- One App Router web app rooted at `app/`
- Shared UI primitives in `components/ui`
- Landing-specific sections in `components/landing`
- Config and typed content in `config/` and `content/`
- No API routes, database, worker, or monorepo packages yet

See [ARCHITECTURE.md](./ARCHITECTURE.md) and `docs/*.md` for detail.

## Run Commands

- Install: `bun install` (preferred) or `npm install`
- Dev: `bun run dev`
- Build: `bun run build`
- Lint: `bun run lint`
- Start production build locally: `bun run start`
- Test: no `test` script exists yet

## Testing Expectations

- Before finishing code changes, run `bun run lint` and `bun run build` at minimum.
- There is no automated `test` or `typecheck` script yet; do not claim those checks ran unless you added them.
- Manual verification is acceptable for docs, content, and UI-only changes; smoke-test changed flows in `bun run dev`.
- Always report exactly what you validated and what you could not validate.

## Key Module Locations

- `app`: routes, metadata, and global CSS
- `components/landing`: page sections and landing-specific presentation
- `components/ui`: reusable design-system primitives
- `config`: site and theme defaults
- `content`: typed page content and section schema
- `hooks`, `lib`: shared hooks and utilities
- `server`: future server-only integrations
- `types`: shared cross-layer types with no clear local owner
- `docs`: plans, specs, references, and deeper guidance

## Commit / PR Guidelines

- Keep commits small and scoped to one concern.
- For non-trivial work, start with a plan in `docs/exec-plans/active/` and reference it in the PR.
- Reference relevant specs, design docs, or tech-debt entries when they influenced the change.
- PRs should summarize changed files, validation performed, and remaining risks or follow-ups.

## Weekly Improvement Loop

- Once a week, run a Codex review over local session logs in `[LOCAL_SESSION_LOG_PATH]`.
- Extract repeated mistakes, missing instructions, and recurring workflows from those logs.
- Propose a small `AGENTS.md` patch plus linked doc updates; prefer concrete command, path, or validation fixes over generic prose.
- Remove stale guidance when the codebase changes so the root guide stays short and current.
