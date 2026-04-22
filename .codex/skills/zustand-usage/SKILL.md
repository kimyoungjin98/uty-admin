---
name: zustand-usage
description: Build, refactor, and review Zustand-based state management in React/Next.js TypeScript codebases. Use when requests mention Zustand stores, replacing prop drilling with global state, splitting UI/server state boundaries, adding selectors/actions, persisting client state, or fixing stale/rerender issues in store usage.
---

# Zustand Usage Workflow

Create or update Zustand stores with predictable shape, minimal rerenders, and explicit server/client boundaries.

## Quick Decision
- Use a Zustand store when state must be shared across distant client components.
- Keep server-origin data fetching in server components/actions/routes; hydrate store only with safe client snapshot data.
- Keep ephemeral local UI state (`isOpen`, one-off form input) in component state unless sharing is required.

## Implementation Steps
1. Define the store contract first.
2. Keep state serializable and minimal.
3. Add narrow actions that encode business intent.
4. Select only required slices in components.
5. Validate behavior with targeted checks.

## 1) Define Store Contract
- Write explicit interfaces for:
  - state fields
  - action signatures
  - optional derived values
- Prefer a single root object for related data (`user`, `filters`, `draft`) over many top-level fields.
- Keep fallback display strings out of store when they can distort logic; apply fallback text in UI.

## 2) Keep Store Client-Safe
- Put store files under client code and include `"use client"` in store modules used by client components.
- Never place secrets, tokens, privileged server responses, or raw sensitive payloads in store state.
- Store only data required for rendering and client-side interactions.

## 3) Write Intent-Based Actions
- Use action names as verbs (`setUser`, `updateFilter`, `clearSession`, `resetDraft`).
- Keep actions small and deterministic.
- Use functional updates for state transitions that depend on previous state.

## 4) Consume with Selectors
- In components, select only needed fields/actions:
  - `useStore((s) => s.user.image)`
  - `useStore((s) => s.setUser)`
- Avoid selecting entire store objects unless necessary.
- Prefer separate selectors over broad object picks to reduce rerenders.

## 5) Next.js Integration Pattern
1. Read auth/session/server data in a client boundary component that already has access (`useSession`, client props, hydrated payload).
2. Sync into store in `useEffect` with minimal dependencies.
3. Consume store from downstream client components.
4. Keep display fallback strings at the render layer.

## Store Template (TypeScript)
```ts
"use client";
import { create } from "zustand";

interface DomainState {
  value: string | null;
  setValue: (next: string | null) => void;
  reset: () => void;
}

const initialValue: string | null = null;

export const useDomainStore = create<DomainState>((set) => ({
  value: initialValue,
  setValue: (next) => set({ value: next }),
  reset: () => set({ value: initialValue }),
}));
```

## Refactor Checklist
- Rename store by domain ownership (`userStore`, `cartStore`) not by one UI location (`sidebarStore`) when state is shared.
- Remove replaced store imports/usages fully.
- Keep naming consistent between state keys and UI consumers.
- Verify login/auth booleans are derived from canonical auth fields, not fallback literals.

## Verification Commands
- Prefer project gate commands when available:
  - `npm exec turbo run lint --filter=<target>`
  - `npm exec turbo run typecheck --filter=<target>`
  - `npm exec turbo run test --filter=<target>`
  - `npm exec turbo run build --filter=<target>`
- If tasks are missing, run package-local equivalents and report gaps explicitly.

## Review Severity Mapping
- P1: Secret leakage to client store, authz bypass risk, broken build/runtime.
- P2: Incorrect derived logic, stale sync behavior, unnecessary rerenders.
- P3: Naming clarity, minor selector/action ergonomics.
