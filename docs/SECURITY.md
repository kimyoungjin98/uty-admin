# Security

## Current Boundary

This repository currently serves a public landing page. There is no auth system, admin surface, or persistent backend yet, but the same security rules should apply as features are added.

## Secrets

- Keep secrets in environment variables only.
- Do not place secrets in `config/`, `content/`, committed JSON, or client-side code.
- Treat anything imported into a Client Component as public.

## Auth and Authorization

- If auth is introduced later, enforce authorization on the server, not in the client.
- Do not rely on hidden UI state as an access-control boundary.
- Keep privileged integrations inside `server/`.

## Input Validation

- Validate all external input at the boundary with explicit schemas.
- Sanitize or reject unexpected fields instead of passing them through.
- Rate-limit or challenge public write endpoints such as contact forms once they are added.

## Security-Sensitive Rules

- Do not expose provider keys, webhook secrets, or private endpoints in client bundles.
- Do not leak stack traces or provider internals in HTTP responses.
- Review new dependencies for browser exposure and maintenance risk before adding them to shared UI code.
- Update this file whenever the repo gains auth, forms that write data, or third-party integrations.
