# Data

## Current State

The repository has no persistent data store yet. The only structured data today is:

- page content in `content/pages/home.ts`
- section contracts in `content/schema.ts`
- site and theme defaults in `config/`

## Ownership Rules

- Content shape belongs in `content/`.
- Site and theme defaults belong in `config/`.
- Request payload schemas should live next to the route or server module that owns them.
- Use `types/` only for contracts reused across multiple layers with no better home.

## Future Persistence Rules

- When a database is introduced, give it one clear home under `server/` and document the choice here.
- Keep migrations, schema definitions, and repository adapters together instead of scattering SQL or ORM calls across routes.
- Route handlers should not talk to the database directly once repository modules exist.

## Data Access Boundaries

- `app/` and `components/` should consume already-prepared data, not own persistence logic.
- `server/` should be the boundary for database and third-party data access.
- `content/` and `config/` remain source-controlled inputs, not runtime persistence layers.

## Contracts Between Layers

- Prefer explicit schemas for external input and typed return values for internal boundaries.
- Avoid passing raw provider payloads through multiple layers; map them to repo-owned shapes first.
- If a new data source is introduced, update this file and `ARCHITECTURE.md` together.
