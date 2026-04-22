# Backend

## Current State

There is no implemented backend layer yet. No `app/api/**/route.ts` handlers, background jobs, or database adapters exist in the current repository.

This file defines the expected shape once backend code is introduced.

## Conventions

- Keep route handlers thin. They should parse the request, call a server module, and return a clear response.
- Put reusable server-only logic in `server/`.
- If integrations grow, separate them by role:
  - service or adapter modules for business operations and external APIs
  - repository modules for persistence access once a database exists
- Do not put backend logic in client components, client hooks, or `components/ui`.

## Input Validation

- Validate all external input at the route boundary.
- Prefer `zod` schemas near the owning route or server module.
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

- Required today: `bun run lint` and `bun run build`
- For any new route handler, manually verify success and failure paths until automated tests exist.
- If a backend feature calls an external provider, document whether the validation used a real credential, a stub, or a local fallback.
