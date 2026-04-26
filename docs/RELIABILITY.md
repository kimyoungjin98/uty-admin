# Reliability

## Current Baseline

Reliability checks are lightweight today:

- static analysis through `pnpm lint`
- production compilation through `pnpm build`
- manual smoke testing in local dev

There is no formal monitoring, tracing, or automated regression suite yet.

## Logging and Observability

- Prefer structured server-side logs once backend code exists.
- Include route, operation, and integration context in failure logs.
- Keep browser console output minimal and remove temporary debug logging before merge.
- Never log secrets, tokens, or full contact payloads.

## Runtime Checks

- Validate external inputs at the boundary.
- Fail fast on missing required environment variables once env-backed integrations are added.
- Add explicit empty-state, loading-state, and error-state handling for new user flows.

## Metrics

- Start simple when instrumentation is added: request count, error count, and external integration failure rate.
- Track metrics per operation rather than as generic app-wide counters.

## Investigating Errors

- Reproduce with the exact route and input that failed.
- Capture what changed, how it was validated, and whether the failure is local-only or build-time.
- When integrations are involved, record whether the issue is config, provider response, or app logic.
- Link recurring issues to `docs/exec-plans/tech-debt-tracker.md`.
