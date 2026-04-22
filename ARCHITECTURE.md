# Architecture

## Purpose

This repository is a single `Next.js` App Router landing-page boilerplate. The current codebase is frontend-heavy: one page, shared UI primitives, typed content/config, and placeholder folders for future server-only code and shared types.

## Current Boundaries

- `app/`: route entrypoints, metadata, and global CSS
- `components/landing/`: landing-specific sections and page composition
- `components/ui/`: reusable UI primitives; these should stay domain-agnostic
- `config/`: site-level settings and theme defaults
- `content/`: typed page content and section schemas
- `hooks/`: client hooks
- `lib/`: shared helpers and low-level utilities
- `server/`: future server-only integrations and adapters
- `types/`: shared types only when no tighter owner exists

## Dependency Direction

Allowed direction:
- `app` -> `components/*`, `config`, `content`, `hooks`, `lib`, `server`, `types`
- `components/landing` -> `components/ui`, `config`, `content`, `hooks`, `lib`, `types`
- `components/ui` -> `hooks`, `lib`, `types`
- `content` and `config` -> `types` only when needed
- `server` -> `config`, `lib`, `types`

Keep low-level modules importable from higher layers. Do not make `content`, `config`, or `server` depend on presentation code.

## Forbidden Patterns

- Importing `server/` modules into client components
- Putting landing-specific copy or business rules inside `components/ui`
- Hardcoding page content in route files when it belongs in `content/`
- Adding shared types to `types/` when a closer owner already exists
- Mixing server concerns, data access, or secret handling into client hooks or browser components
- Duplicating theme tokens across multiple files instead of centralizing them in `app/globals.css` and `config/theme.ts`

## Validation Expectations

- Required before merge today: `bun run lint` and `bun run build`
- Manual UI verification is acceptable because there is no automated test suite yet
- When backend code is added, validate request parsing, error paths, and integration fallbacks explicitly
- Any non-trivial change should link to a plan in `docs/exec-plans/active/` or `docs/exec-plans/completed/`

## Logging Expectations

- Keep browser logging minimal and temporary
- Server-side logging should be structured and include route or operation context
- Never log secrets, raw tokens, or full personal-contact payloads
- When adding integrations, log enough metadata to debug failures without leaking sensitive data
