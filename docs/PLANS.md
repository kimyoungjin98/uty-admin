# Plans

## When a Plan Is Required

Create an execution plan before starting non-trivial work. A plan is required when a change:

- touches multiple directories or layers
- changes architecture, data flow, or shared conventions
- introduces a new integration, API surface, or persistence layer
- carries migration, rollout, or regression risk
- is large enough that another engineer or agent would benefit from a written sequence

Small copy edits, isolated style fixes, and docs-only changes usually do not need a plan.

## Where Plans Live

- Active work: `docs/exec-plans/active/`
- Completed work: `docs/exec-plans/completed/`

Non-trivial work should begin with a plan doc in `docs/exec-plans/active/`.

## Standard Plan Sections

Each plan should include:

1. Summary
2. Scope
3. Assumptions and open questions
4. Affected files or areas
5. Implementation steps
6. Validation plan
7. Risks, follow-ups, or rollback notes

Link the relevant plan from PRs, design docs, product specs, and tech-debt entries when applicable.
