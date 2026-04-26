# Order Workflow Foundation

Status: Draft

## Summary

Create the implementation plan for the order workflow requested in [docs/references/requirement.md](../../references/requirement.md), covering one-click ordering, automatic amount calculation, approval-based payment processing, progress tracking, reporting, and supporting operations.

The immediate goal of this plan is to define a safe build sequence for introducing these capabilities into this repository in a phased way, without mixing pricing logic, workflow state, uploads, and reporting concerns in one layer too early.

## Scope

In scope:

- order intake flow for account selection, vendor registration, product link parsing, content type selection, keyword input, product selection, option selection, quantity/date selection, image zip upload, and payment method choice
- automatic price calculation for product, options, quantity, and schedule inputs
- approval flow for pending requests, admin confirmation, and edit locking after approval
- progress tracking with filtered views for pending, in-progress, and completed work
- report access for completed work
- bulk Excel intake, one-click re-order from recent history, FAQ/guide, stop request, and detailed logs
- architecture guidance for separating customer flow, admin operations, pricing, workflow, and storage
- initial repository bootstrap needed because the current workspace is documentation-first and does not yet contain the actual app, API, or persistence modules described in the requirements

Out of scope for the first implementation pass:

- full production deployment design
- external accounting integration
- advanced notification orchestration across many third-party channels
- multi-tenant billing customization per client contract
- final UI styling details
- full payment gateway integration beyond point balance handling and admin-verified deposit flow

## Assumptions And Open Questions

Assumptions:

- order requests require explicit admin approval before work starts
- pricing is calculated from a managed catalog plus optional add-on rules
- image files are uploaded directly through the request form and stored with the order
- status filters must work consistently in both customer and admin views
- reports are generated from execution result data already tied to each order line or placement
- the first delivery can ship with mocked or local persistence if the real backend stack is not yet selected, as long as domain contracts stay stable

Open questions:

- should point charging and per-order bank transfer both remain available for every client, or be configurable per account?
- does one order contain multiple delivery targets under one request, or should each target be normalized into child items?
- what Excel column template is required for bulk intake?
- what level of detail is expected in the stop request flow: full pause, cancel request, or admin review only?
- should progress percentage be manual, derived from completed placements, or both?
- what exact product metadata should be parsed automatically from the pasted product link?
- should the admin area live inside the same Next.js app or as a separately scoped route group?

## Affected Files Or Areas

Current plan and design inputs:

- `docs/references/requirement.md`: source requirement list
- `docs/exec-plans/active/2026-04-26-order-workflow-foundation.md`: implementation sequence and validation plan
- `docs/design-docs/`: interaction and architecture decisions
- `docs/product-specs/`: feature-level acceptance criteria if split by milestone

Expected implementation areas once the app is scaffolded:

- `app/**`: customer routes for order intake, status, report, FAQ, and re-order
- `components/**`: form steps, pricing summary, status cards, report views, admin tables
- `lib/**`: domain types, form schemas, status helpers, pricing utilities, import parsing helpers
- `server/**`: order intake, pricing, approval, reporting, logs, uploads, and import services
- `content/**` and `config/**`: FAQ, guide, workflow copy, and seeded catalog data if managed in-repo
- future persistence layer: catalog, pricing rules, orders, payments, logs, reports, uploads

## Implementation Steps

1. Bootstrap the application foundation for this repository.

- Establish the actual web app structure in the repo before feature work starts.
- Create route groups for customer flow and admin operations so the requirement can be delivered incrementally.
- Keep mocked data and server boundaries explicit if the real backend is not ready yet.

2. Define the core domain model and state machine.

- Separate `Account`, `Vendor`, `CatalogProduct`, `CatalogOption`, `OrderRequest`, `OrderItem`, `Payment`, `ProgressEntry`, `IssueRequest`, `Report`, and `AuditLog`.
- Treat a single request as a parent container with one or more order items so progress and reporting can roll up cleanly.
- Finalize the allowed transitions for `draft`, `pending_approval`, `payment_pending`, `approved`, `in_progress`, `stopped`, `completed`, and `report_published`.

3. Establish the pricing engine boundary.

- Move all price math into a dedicated pricing service.
- Calculate subtotal from selected products, options, quantities, and schedule rules.
- Preserve the tax-exclusive amount and derive tax-inclusive totals only for payment display when needed.
- Version pricing inputs so reports and logs can explain which rule set produced the total.

4. Build the staged order intake workflow.

- Create a staged form that supports account selection, vendor registration, link parsing, content type and keyword input, product selection, option selection, quantity/date selection, image zip upload, and payment method choice.
- Save as `draft` during editing and convert to `pending_approval` on submission.
- Support loading recent account history so a user can start a same-format re-order without re-entering everything.

5. Add approval and payment handling.

- Keep new requests in `pending_approval`.
- Support either point deduction or deposit verification before transition to `approved`.
- Lock customer-side editing after approval and move correction handling into an admin-managed request flow.
- Persist approval, rejection, deposit verification, and correction-request events in the audit log.

6. Add execution tracking and status filtering.

- Split high-level request status from item-level execution status.
- Provide filtered views for `pending_approval`, `in_progress`, and `completed`.
- Expose execution targets and progress counts or percentages on each active request.
- Show the in-progress blog list or delivery target list from the same item-level model.

7. Add reporting, issue handling, and detailed logs.

- Generate a simple aggregated report for completed requests.
- Add stop-request capability for issue escalation with clear audit history.
- Store meaningful operational logs for approvals, edits, uploads, state changes, report publication, and stop/resume actions.

8. Add productivity and onboarding features.

- Design bulk Excel intake using a fixed import template and row-level validation.
- Add one-click re-order using recent account-specific request history as a prefill source.
- Publish FAQ and guide pages for new users.

9. Validate end-to-end behavior before expanding integrations.

- Verify pricing accuracy, edit locking, status transitions, upload handling, and report access.
- Confirm that admin and customer views stay consistent from the same underlying workflow state.

## Suggested Delivery Milestones

1. Milestone A: foundation and contracts

- scaffold the app structure
- define domain types, state machine, and seeded catalog data
- publish the architecture and product-spec updates needed for implementation

2. Milestone B: order intake and pricing

- staged request form
- automatic amount calculation
- draft save and pending approval submission

3. Milestone C: approval, payment, and tracking

- admin approval queue
- point/deposit handling
- status filters and progress indicators

4. Milestone D: reporting and operational extras

- completed report access
- stop request and audit logs
- Excel import, re-order, FAQ/guide

## Validation Plan

Documentation validation for this planning task:

- review the architecture diagram against the requested features
- confirm each user-facing function maps to a bounded service or module
- confirm status names and transitions are consistent across intake, admin, and report flows

Future implementation validation:

- `pnpm lint`
- `pnpm build`
- smoke-test the order form, approval flow, status filters, and completed report screen

If the repo later moves to a Turborepo workspace, likely commands become:

- `pnpm turbo run lint`
- `pnpm turbo run build`
- `pnpm --filter web dev`
- `pnpm --filter api dev`

Current note:

- the repository does not yet contain the application source tree described in the requirements, so this turn validates the plan and document structure only, not a runnable feature build

## Risks, Follow-Ups, Or Rollback Notes

Key risks:

- starting feature work before the actual app structure exists will force avoidable rewrites
- mixing pricing rules into UI code will create inconsistent totals
- keeping only one flat order record will make progress, reporting, and re-order features fragile
- approval, payment, and execution states can drift unless modeled explicitly
- bulk Excel intake can create partial failures unless row-level validation and import logs are first-class

Follow-ups:

- choose the concrete app and persistence bootstrap strategy for this repo
- define the exact Excel schema and validation errors
- define the catalog and option pricing ownership process for admins
- decide whether reports are generated snapshots or live views
- define file storage retention and allowed image zip size

Rollback posture:

- land domain model and pricing boundaries before external integrations
- keep each workflow phase isolated behind explicit status transitions
- avoid coupling admin-only logic directly into customer-facing components
- if a milestone slips, pause after a complete workflow slice rather than partially shipping pricing, payment, and reporting in the same release
