# Frontend

## Current Structure

- `apps/web/app/layout.tsx`: root HTML shell, metadata, and global CSS import
- `apps/web/app/page.tsx`: page composition entrypoint
- `apps/web/components/landing/`: landing-specific sections such as hero, workflow, and operations
- `apps/web/components/ui/`: reusable primitives for buttons, panels, and badges
- `apps/web/config/`: site settings and theme defaults
- `apps/web/content/pages/home.ts`: primary landing-page content
- `apps/web/content/schema.ts`: typed section contracts

## Page and Component Rules

- Keep route files in `apps/web/app/**` focused on composition, metadata, and data loading.
- Put landing-page sections in `apps/web/components/landing/`, not directly in route files.
- Keep reusable primitives in `apps/web/components/ui/`; do not let page-specific copy or layout logic leak into them.
- Store reusable page content in `apps/web/content/` and keep it typed through `apps/web/content/schema.ts`.
- Prefer a local type next to the owning feature. Use `apps/web/types/` only for contracts shared across multiple frontend layers.

## State and Data Fetching

- Prefer Server Components by default.
- Add `"use client"` only when a component needs browser APIs, local interaction state, or third-party client libraries.
- Prefer static imports from `apps/web/config/` and `apps/web/content/` over ad hoc objects inside components.
- If future server data is needed, fetch in route-level server components or server-only modules, then pass serialized props down.
- Avoid client-side fetching for content that can be resolved during render on the server.

## UI Conventions

- Use `apps/web/app/globals.css` as the source of truth for global tokens and semantic styling.
- Treat `apps/web/config/theme.ts` as the home for theme mode and primary-color defaults.
- Keep `apps/web/components/ui/` generic enough to survive reuse across multiple client projects.
- When introducing a new landing section, make the section API obvious and keep its content shape aligned with `apps/web/content/schema.ts`.
- Preserve accessibility basics: semantic headings, keyboard focus states, and sufficient contrast.

## Validation

- Run `pnpm lint` and `pnpm build` from the repo root after frontend changes.
- Use `pnpm dev:web` when you only need the Next.js app, or `pnpm dev` to start the full monorepo.
- For visual or interactive changes, check mobile and desktop layouts plus any affected hover, focus, and keyboard behavior.
- Because there is no automated frontend test suite yet, report manual verification explicitly.
