# Quality Score

## Scoring Scale

Use a simple `0-3` score per area:

- `0`: missing
- `1`: present but weak or informal
- `2`: solid baseline
- `3`: strong and repeatable

## Current Snapshot

| Area | Score | Notes | Next action |
| --- | --- | --- | --- |
| Architecture | 2 | Clear folder split and ownership guidance now exist. | Add automated checks for forbidden import boundaries. |
| Frontend | 2 | Good component separation and typed content; no automated UI tests. | Add a small e2e smoke suite for the landing page. |
| Backend | 0 | No API routes or backend services yet. | Define route and service patterns when the first endpoint is added. |
| Data | 1 | Typed content/config exists; no persistent data layer. | Decide persistence layout before introducing a database. |
| Reliability | 1 | Lint and build checks exist; no monitoring or regression suite. | Add runtime env validation and basic observability with the first integration. |
| Security | 1 | Low current exposure, but policies are mostly procedural. | Add env handling and input-validation standards to the first public write flow. |
| Documentation | 2 | Core repo docs exist and are cross-linked. | Keep plans, specs, and references current as features are added. |

## Layer View

| Layer | Score | Notes | Next action |
| --- | --- | --- | --- |
| `app/` | 2 | Simple composition layer with metadata and CSS. | Keep routes thin as more pages appear. |
| `components/landing/` | 2 | Clear home for page-specific sections. | Add section registry guidance if multi-page composition grows. |
| `components/ui/` | 2 | Reusable primitive layer is already substantial. | Audit unused primitives and keep APIs generic. |
| `config/` and `content/` | 2 | Strong split between defaults and typed page data. | Keep content contracts aligned with rendered sections. |
| `server/` | 0 | Placeholder only. | Establish server module conventions with the first integration. |

## How To Use This File

- Update scores when a meaningful capability changes.
- Prefer concrete notes over aspirational language.
- Link larger remediation work to a plan in `docs/exec-plans/`.
