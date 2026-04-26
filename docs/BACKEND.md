# Backend

## Current State

The repository now includes a standalone NestJS app at `apps/api`.

Current bootstrap:

- `apps/api/src/main.ts`: Nest application entrypoint
- `apps/api/src/app.module.ts`: root module
- `apps/api/src/app.controller.ts`: basic index and health endpoints
- `apps/api/src/orders/orders.controller.ts`: starter order preview endpoint

There is still no database adapter, queue worker, or external integration layer yet. This file defines the expected shape as the API grows.

## Conventions

- Keep controllers thin. They should parse the request, call a service, and return a clear response.
- Put reusable backend logic in `apps/api/src/**` services or future modules, not in controllers.
- If integrations grow, separate them by role:
  - service or adapter modules for business operations and external APIs
  - repository modules for persistence access once a database exists
- Do not put backend logic in `apps/web` client components, client hooks, or UI primitives.

## Input Validation

- Validate all external input at the controller boundary.
- Prefer DTOs and validation pipes for Nest routes. If schema-first validation is needed, keep `zod` or equivalent near the owning module.
- Reject malformed payloads with explicit `4xx` responses instead of silently coercing bad input.

## Error Handling

- Return stable response shapes for expected errors.
- Reserve `5xx` responses for real server or integration failures.
- Do not leak stack traces, secrets, or provider-specific internals to clients.
- When useful, map internal failures to a small set of error codes that the UI can handle predictably.

## Logging

- Log on the server, not in the browser, for backend failures.
- Include operation name, high-level request context, and integration name when relevant.
- Redact secrets and personal data.
- Use logs to explain failure cause and retry posture, not to dump full request bodies.

## Testing Expectations

- Required today: `pnpm lint` and `pnpm build` from the repo root
- Use `pnpm dev:api` for API-only work, or `pnpm dev` to run the monorepo together.
- For any new controller or service, manually verify success and failure paths until automated tests exist.
- If a backend feature calls an external provider, document whether the validation used a real credential, a stub, or a local fallback.
