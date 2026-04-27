# Deployment

## Vercel web app

Create one Vercel project for the Next.js frontend.

- Framework Preset: `Next.js`
- Root Directory: repository root
- Install Command: `pnpm install --frozen-lockfile`
- Build Command: `pnpm build:web`
- Output Directory: `apps/web/.next`

The build command runs from the monorepo root and uses Turbo to build only the `web` workspace package. This keeps the deployment aware of workspace dependencies such as `@uty/ui`.

The same settings are committed in `vercel.json`.

## Local validation

Before deploying a code change, run:

```sh
pnpm lint
pnpm build
```

For a web-only deployment check, run:

```sh
pnpm build:web
```
