# Tech Debt Tracker

Track debt items that are real enough to schedule, not vague frustrations.

| Area | Issue | Impact | Priority | Owner | Next action | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Frontend validation | No automated e2e smoke coverage for the landing page | UI regressions rely on manual checks | P2 | Unassigned | Add a minimal smoke suite once the page structure stabilizes | Open |
| Architecture enforcement | Folder boundaries are documented but not automatically checked | Import drift can accumulate silently | P2 | Unassigned | Add lint or tooling rules for client/server and layer boundaries | Open |
| Backend readiness | No route, service, or persistence baseline yet | First backend feature will have to define patterns from scratch | P3 | Unassigned | Create a plan when the first API route or integration is introduced | Open |
