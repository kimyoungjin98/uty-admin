# Order Workflow Foundation

Status: Draft

## Summary

Add the planning foundation for a streamlined order workflow that covers one-click ordering, automatic amount calculation, approval-based payment processing, progress tracking, bulk intake, re-ordering, issue handling, and reporting.

The immediate goal of this plan is to define a safe build sequence for introducing these capabilities into the future admin platform without mixing pricing logic, workflow state, and reporting concerns in a single layer.

## Scope

In scope:

- order intake flow for account selection, vendor registration, product link parsing, content type selection, keyword input, product selection, option selection, quantity/date selection, image zip upload, and payment method choice
- automatic price calculation for product, options, quantity, and schedule inputs
- approval flow for pending requests, admin confirmation, and edit locking after approval
- progress tracking with filtered views for pending, in-progress, and completed work
- report access for completed work
- bulk Excel intake, one-click re-order from recent history, FAQ/guide, stop request, and detailed logs
- architecture guidance for separating customer flow, admin operations, pricing, workflow, and storage

Out of scope for the first implementation pass:

- full production deployment design
- external accounting integration
- advanced notification orchestration across many third-party channels
- multi-tenant billing customization per client contract
- final UI styling details

## Assumptions And Open Questions

Assumptions:

- order requests require explicit admin approval before work starts
- pricing is calculated from a managed catalog plus optional add-on rules
- image files are uploaded directly through the request form and stored with the order
- status filters must work consistently in both customer and admin views
- reports are generated from execution result data already tied to each order line or placement

Open questions:

- should point charging and per-order bank transfer both remain available for every client, or be configurable per account?
- does one order contain multiple delivery targets under one request, or should each target be normalized into child items?
- what Excel column template is required for bulk intake?
- what level of detail is expected in the stop request flow: full pause, cancel request, or admin review only?
- should progress percentage be manual, derived from completed placements, or both?

## Affected Files Or Areas

Expected future areas:

- `apps/web/app/**` or `app/**`: customer order form, status list, report screen, FAQ
- `apps/web/components/**` or `components/**`: reusable order and status UI
- `apps/api/**` or `server/**`: order intake, pricing, approval, reporting, logs, uploads
- `packages/db/**` or future persistence layer: catalog, pricing rules, orders, payments, logs, reports
- `docs/design-docs/`: interaction and architecture decisions
- `docs/product-specs/`: feature-level acceptance criteria if split by milestone

## Implementation Steps

1. Define the core domain model.

- Separate `Account`, `Vendor`, `CatalogProduct`, `CatalogOption`, `OrderRequest`, `OrderItem`, `Payment`, `ProgressEntry`, `IssueRequest`, `Report`, and `AuditLog`.
- Treat a single request as a parent container with one or more order items so progress and reporting can roll up cleanly.

2. Establish the pricing engine boundary.

- Move all price math into a dedicated pricing service.
- Calculate subtotal from selected products, options, quantities, and schedule rules.
- Preserve the tax-exclusive amount and derive tax-inclusive totals only for payment display when needed.

3. Build the order intake workflow.

- Create a staged form that supports account selection, link parsing, auto-filled metadata, manual keyword/content-type input, option selection, image zip upload, and payment method choice.
- Save as draft while pending approval so users can edit before admin confirmation.

4. Add approval and payment handling.

- Keep new requests in `pending_approval`.
- Support either point deduction or deposit verification before transition to `approved`.
- Lock customer-side editing after approval and move correction handling into an admin-managed request flow.

5. Add execution tracking.

- Split high-level request status from item-level execution status.
- Provide filtered views for `pending_approval`, `in_progress`, and `completed`.
- Expose execution targets and progress counts or percentages on each active request.

6. Add reporting and exception handling.

- Generate a simple aggregated report for completed requests.
- Add stop-request capability for issue escalation with clear audit history.
- Store meaningful operational logs for approvals, edits, uploads, state changes, and report publication.

7. Add productivity features.

- Design bulk Excel intake using a fixed import template and row-level validation.
- Add one-click re-order using recent account-specific request history as a prefill source.
- Publish FAQ and guide pages for new users.

8. Validate end-to-end behavior before expanding integrations.

- Verify pricing accuracy, edit locking, status transitions, upload handling, and report access.
- Confirm that admin and customer views stay consistent from the same underlying workflow state.

## Validation Plan

Documentation validation for this phase:

- review the architecture diagram against the requested features
- confirm each user-facing function maps to a bounded service or module
- confirm status names and transitions are consistent across intake, admin, and report flows

Future implementation validation:

- `bun run lint`
- `bun run build`
- smoke-test the order form, approval flow, status filters, and completed report screen

If the repo later moves to a Turborepo workspace, likely commands become:

- `pnpm turbo run lint`
- `pnpm turbo run build`
- `pnpm --filter web dev`
- `pnpm --filter api dev`

## Risks, Follow-Ups, Or Rollback Notes

Key risks:

- mixing pricing rules into UI code will create inconsistent totals
- keeping only one flat order record will make progress, reporting, and re-order features fragile
- approval, payment, and execution states can drift unless modeled explicitly
- bulk Excel intake can create partial failures unless row-level validation and import logs are first-class

Follow-ups:

- define the exact Excel schema and validation errors
- define the catalog and option pricing ownership process for admins
- decide whether reports are generated snapshots or live views
- define file storage retention and allowed image zip size

Rollback posture:

- land domain model and pricing boundaries before external integrations
- keep each workflow phase isolated behind explicit status transitions
- avoid coupling admin-only logic directly into customer-facing components
