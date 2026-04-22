# Frontend

## Current Structure

- `app/layout.tsx`: root HTML shell, metadata, analytics, and global CSS import
- `app/page.tsx`: page composition entrypoint
- `components/landing/`: landing-specific sections such as hero, pricing, FAQ, and footer
- `components/ui/`: reusable primitives generated and curated from the shadcn/ui-style setup
- `config/`: site settings and theme defaults
- `content/pages/home.ts`: primary landing-page content
- `content/schema.ts`: typed section contracts

## Page and Component Rules

- Keep route files focused on composition, metadata, and data loading.
- Put landing-page sections in `components/landing/`, not directly in `app/page.tsx`.
- Keep reusable primitives in `components/ui/`; do not let page-specific copy or layout logic leak into them.
- Store reusable page content in `content/` and keep it typed through `content/schema.ts`.
- Prefer a local type next to the owning feature. Use `types/` only for contracts shared across multiple layers.

## State and Data Fetching

- Prefer Server Components by default.
- Add `"use client"` only when a component needs browser APIs, local interaction state, or third-party client libraries.
- Prefer static imports from `config/` and `content/` over ad hoc objects inside components.
- If future server data is needed, fetch in route-level server components or server-only modules, then pass serialized props down.
- Avoid client-side fetching for content that can be resolved during render on the server.

## UI Conventions

- Use `app/globals.css` as the source of truth for global tokens and semantic styling.
- Treat `config/theme.ts` as the home for theme mode and primary-color defaults.
- Keep `components/ui/` generic enough to survive reuse across multiple client projects.
- When introducing a new landing section, make the section API obvious and keep its content shape aligned with `content/schema.ts`.
- Preserve accessibility basics: semantic headings, keyboard focus states, and sufficient contrast.

## Validation

- Run `bun run lint` and `bun run build` after frontend changes.
- Smoke-test changed routes in `bun run dev`.
- For visual or interactive changes, check mobile and desktop layouts plus any affected hover, focus, and keyboard behavior.
- Because there is no automated frontend test suite yet, report manual verification explicitly.
