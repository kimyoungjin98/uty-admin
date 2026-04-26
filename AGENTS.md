# AGENTS.md

## Repository Overview

Reusable `Next.js` landing-page boilerplate for client work.

Current scope:
- Turborepo workspace rooted at the repository root
- `apps/web`: Next.js App Router frontend
- `apps/api`: NestJS backend
- Shared workspace-level config for TypeScript and Turbo
- No database, worker, or shared package under `packages/` yet

See [ARCHITECTURE.md](./ARCHITECTURE.md) and `docs/*.md` for detail.

## Run Commands

- Install: `pnpm install`
- Dev: `pnpm dev`
- Web only: `pnpm dev:web`
- API only: `pnpm dev:api`
- Build: `pnpm build`
- Lint: `pnpm lint`
- Typecheck: `pnpm typecheck`
- Test: no `test` script exists yet

## Testing Expectations

- Before finishing code changes, run `pnpm lint` and `pnpm build` at minimum.
- There is no automated `test` script yet; do not claim tests ran unless you added them.
- Manual verification is acceptable for docs, content, and UI-only changes; smoke-test changed flows in `pnpm dev`.
- Always report exactly what you validated and what you could not validate.

## Key Module Locations

- `apps/web`: routes, metadata, frontend components, content, and styling
- `apps/api`: NestJS controllers, modules, and services
- `packages`: future shared packages
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
