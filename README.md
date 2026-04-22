# uty-admin

Reusable landing-page boilerplate intended for client work.

## Current Status

This repository is currently documentation-first.

The docs describe a single-app `Next.js` App Router landing-page boilerplate with shared UI primitives, typed content, and project conventions. In the current tracked snapshot, the repository mostly contains planning and reference documents rather than the full application source tree.

That means this repo is best read today as:

- a project foundation and operating guide
- a set of architecture and quality conventions
- a staging area for the app structure described in the docs

## Intended App Shape

The documented target structure is:

- `app/`: routes, metadata, and global CSS
- `components/landing/`: landing-page sections
- `components/ui/`: reusable UI primitives
- `config/`: site settings and theme defaults
- `content/`: typed page content
- `hooks/`, `lib/`, `server/`, `types/`: shared utilities and future expansion points

See the repository docs for the detailed ownership rules behind each area.

## Docs Map

- [AGENTS.md](./AGENTS.md): working conventions for agents and contributors
- [docs/FRONTEND.md](./docs/FRONTEND.md): frontend structure and UI rules
- [docs/BACKEND.md](./docs/BACKEND.md): backend expectations for future server work
- [docs/SECURITY.md](./docs/SECURITY.md): current security boundaries
- [docs/RELIABILITY.md](./docs/RELIABILITY.md): validation and reliability guidance
- [docs/PLANS.md](./docs/PLANS.md): when execution plans are required
- [docs/product-specs/index.md](./docs/product-specs/index.md): product-spec conventions
- [docs/design-docs/index.md](./docs/design-docs/index.md): design-doc conventions
- [docs/exec-plans/active/2026-04-23-turbo-pnpm-nextjs-nestjs-prisma-foundation.md](./docs/exec-plans/active/2026-04-23-turbo-pnpm-nextjs-nestjs-prisma-foundation.md): draft monorepo migration plan

## Expected Commands

Once the application files are present, the documented commands are:

- `bun install`
- `bun run dev`
- `bun run lint`
- `bun run build`
- `bun run start`

At the moment, the current tracked snapshot does not include the root app package files needed to run those commands successfully.

## Workflow Notes

- Keep plans for non-trivial work in `docs/exec-plans/active/`
- Keep product intent in `docs/product-specs/`
- Keep interaction and UX decisions in `docs/design-docs/`
- Update docs when the real app structure changes so the guide stays truthful

## Next Step

The clearest next milestone is to land the actual application scaffold that matches the documented `Next.js` landing-page structure, or proceed with the drafted move to a `pnpm` + `Turborepo` workspace.
