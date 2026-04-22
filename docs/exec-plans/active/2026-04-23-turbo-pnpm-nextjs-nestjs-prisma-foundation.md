# Turbo + pnpm + Next.js + NestJS + Prisma Foundation

Status: Draft

## Summary

Convert the current single-app landing-page repository into a `pnpm` workspace managed by `Turborepo`, while establishing a clear application split:

- `apps/web`: `Next.js` App Router frontend
- `apps/api`: `NestJS` backend
- `packages/db`: shared `Prisma` schema, generated client, and database scripts

The goal is to create a maintainable monorepo baseline that preserves the current landing-page frontend, adds a backend service without coupling it to the UI layer, and introduces a single home for persistence that both apps can consume through explicit boundaries.

## Scope

In scope:

- add `pnpm` workspaces and root `turbo.json`
- move the current `Next.js` app into `apps/web`
- scaffold a minimal `NestJS` app in `apps/api`
- introduce `Prisma` in a shared package such as `packages/db`
- define workspace-level TypeScript, lint, env, and script conventions
- document local development and migration flow for the new repo shape

Out of scope for the first pass:

- production deployment wiring
- auth, background jobs, queues, or cron workers
- multi-database support
- complex domain modules beyond a health check and one sample data flow
- full CI/CD redesign beyond what is needed to support the new workspace commands

## Assumptions And Open Questions

Assumptions:

- `pnpm` becomes the only supported package manager going forward
- the backend and database will be introduced without preserving `bun` as a primary workflow
- the primary runtime database is PostgreSQL
- `Prisma` client generation can live in a shared package and be imported by backend modules
- the current frontend remains mostly static during the monorepo transition

Open questions:

- should `Prisma` be consumed only by `apps/api`, or is limited server-side use in `apps/web` also expected?
- do we want a shared package for API contracts now, or only after the first real endpoint exists?
- should linting and formatting be centralized immediately, or phased after the workspace migration stabilizes?
- what deployment targets are expected for `web`, `api`, and the database?
- do we want Docker and local container orchestration in this phase, or only local host-based development?

## Affected Files Or Areas

Existing areas expected to move or be rewired:

- `app/` -> `apps/web/app/`
- `components/` -> `apps/web/components/`
- `config/` -> `apps/web/config/`
- `content/` -> `apps/web/content/`
- `hooks/` -> `apps/web/hooks/`
- `lib/` -> `apps/web/lib/`
- `public/` -> `apps/web/public/`
- `styles/` -> `apps/web/styles/`
- `server/` -> either `apps/web/server/` for web-only server code or replaced by `apps/api` and `packages/db`
- root `package.json`, lockfile, and app-level configs

New top-level files and folders expected:

- `pnpm-workspace.yaml`
- `turbo.json`
- `apps/web/package.json`
- `apps/api/package.json`
- `apps/api/src/**`
- `packages/db/package.json`
- `packages/db/prisma/schema.prisma`
- `packages/db/src/client.ts`
- `packages/typescript-config/` or equivalent shared config package
- `packages/eslint-config/` or equivalent shared config package
- updated root docs such as `ARCHITECTURE.md`, `docs/BACKEND.md`, and `docs/DATA.md`

## Implementation Steps

1. Establish the workspace root.

- Replace the current single-app root package configuration with a workspace root `package.json`.
- Add `pnpm-workspace.yaml` with `apps/*` and `packages/*`.
- Add `turbo.json` with pipelines for `dev`, `build`, `lint`, and any Prisma code generation tasks.
- Define canonical package names such as `@uty/web`, `@uty/api`, and `@uty/db`.

2. Move the current `Next.js` app into `apps/web`.

- Relocate the existing frontend directories and configs under `apps/web`.
- Update relative imports, TypeScript path configuration, asset paths, and root-level scripts.
- Preserve the current App Router structure and content ownership boundaries described in the docs.
- Ensure the frontend can still run independently via workspace filters.

3. Scaffold `NestJS` in `apps/api`.

- Create a minimal `NestJS` application with a health endpoint and config bootstrap.
- Keep controllers thin and place reusable backend logic behind service modules.
- Add `zod` or framework-native validation at request boundaries where needed.
- Establish app-level env loading and logging conventions that align with the current backend docs.

4. Introduce `Prisma` in `packages/db`.

- Create a shared database package containing the Prisma schema, migration scripts, and generated client accessors.
- Prefer a small wrapper such as `src/client.ts` so consuming apps do not import generated output directly.
- Add database scripts for `generate`, `migrate`, `studio`, and `seed` if seeding is needed.
- Keep repository and persistence abstractions close to this package instead of scattering ORM calls into route handlers.

5. Wire `apps/api` to `packages/db`.

- Add a database module or provider layer in `NestJS` that consumes the shared Prisma client.
- Implement one sample persistence-backed module or a minimal integration path after the health check is stable.
- Ensure shutdown hooks and connection lifecycle are handled explicitly.

6. Decide the boundary between `apps/web` and `apps/api`.

- Default to calling `apps/api` over HTTP for mutable operations and backend-owned business logic.
- Avoid leaking Prisma access into client components or frontend presentation code.
- If `apps/web` needs server-side reads, keep them constrained to server components or server-only helpers and document the rule.

7. Centralize shared config only where it reduces duplication.

- Add shared TypeScript and ESLint config packages if both apps truly need them.
- Avoid creating a large shared package surface before duplication exists.
- Add shared environment variable documentation at the root once both apps boot locally.

8. Update documentation and developer workflows.

- Rewrite `ARCHITECTURE.md` to reflect the monorepo boundaries.
- Update `docs/BACKEND.md` and `docs/DATA.md` for the `NestJS` and `Prisma` ownership model.
- Replace root run instructions so local development uses `pnpm` and `turbo`.
- Document how to run only the web app, only the API, or the whole workspace.

## Validation Plan

Root workspace validation:

- `pnpm install`
- `pnpm turbo run lint`
- `pnpm turbo run build`

Targeted validation during migration:

- `pnpm --filter @uty/web dev`
- `pnpm --filter @uty/web build`
- `pnpm --filter @uty/api start:dev`
- `pnpm --filter @uty/api build`
- `pnpm --filter @uty/db prisma generate`
- `pnpm --filter @uty/db prisma migrate dev`

Smoke checks:

- verify the landing page still renders correctly from `apps/web`
- verify the API health endpoint responds locally
- verify Prisma client generation works from the shared package
- verify one end-to-end backend-to-database call path before expanding scope

## Risks, Follow-Ups, Or Rollback Notes

Key risks:

- path rewrites may break imports and asset resolution when moving the existing frontend
- mixing web-only server code with API-owned backend logic can create long-term boundary drift
- Prisma package design can become too coupled to one app if client generation and runtime config are not normalized
- introducing shared config packages too early can add churn without reducing complexity

Recommended rollout posture:

- land the workspace root and `apps/web` move first
- add `apps/api` second with a health check only
- add `packages/db` third and integrate it into `apps/api`
- only then introduce real business modules or shared contracts

Rollback notes:

- keep each phase in a separate commit or PR so the repo can be reverted to the previous working state cleanly
- do not delete the old single-app assumptions from docs until `apps/web` boots and builds successfully
- if the Prisma package shape causes friction, keep the schema in `packages/db` but move runtime repository code temporarily into `apps/api` until the abstraction stabilizes
