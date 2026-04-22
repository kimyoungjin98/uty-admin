# The Apiary Editorial — Design System Discipline

All UI that references the Amber system **must** comply with every rule below.
No exceptions without a documented override in this file.

---

## 1. Token Authority

| Source | Scope |
|---|---|
| `app/globals.css` `:root` / `.dark` | Single source of truth for every CSS custom property |
| `config/theme.ts` `amberTokens` | Runtime reference object; values must mirror `:root` |
| `app/globals.css` `@theme inline` | Tailwind bridge — never define raw hex here, always `var(--amber-*)` |

**Rules:**

- **R1.1** Never hardcode an Amber color hex in a component. Use a `--amber-*` token or its Tailwind alias (`bg-amber-primary`, `text-amber-on-surface`, etc.).
- **R1.2** Adding a new Amber token requires **both** a `:root` + `.dark` entry in `globals.css` and a corresponding `--color-amber-*` bridge in `@theme inline`.
- **R1.3** Adding a new Amber token also requires a matching key in `config/theme.ts` `amberTokens` (light value) and `amberTokens.dark` (dark value).
- **R1.4** Never reference shadcn semantic tokens (`--primary`, `--secondary`, etc.) from Amber-styled components. The two systems are intentionally independent.
- **R1.5** All tokens use `--amber-` prefix. No bare `--surface`, `--on-*` names outside the shadcn system.

---

## 2. Color: The Amber Spectrum

### 2.1 Usage Map

| Token | Purpose | Tailwind alias |
|---|---|---|
| `--amber-primary` | Actionable elements, focus states, active indicators | `bg-amber-primary` |
| `--amber-primary-container` | High-visibility alerts, gradient end-point | `bg-amber-primary-container` |
| `--amber-on-primary` | Text on primary background | `text-amber-on-primary` |
| `--amber-tertiary` | Flora — positive health, success states | `bg-amber-tertiary` |
| `--amber-tertiary-container` | Healthy status badge background | `bg-amber-tertiary-container` |
| `--amber-error-container` | Critical alert background | `bg-amber-error-container` |
| `--amber-on-surface` | Primary body text | `text-amber-on-surface` |
| `--amber-on-surface-variant` | Metadata, labels, captions | `text-amber-on-surface-variant` |
| `--amber-inverse-surface` | Dark backgrounds (never pure black) | `bg-amber-inverse-surface` |
| `--amber-outline-variant` | Ghost borders (15% only) | — |

### 2.2 Rules

- **R2.1** Dark backgrounds MUST use `--amber-inverse-surface` (#273140 / #eef0f7). Never `#000000` or `black`.
- **R2.2** Metadata and caption text MUST use `--amber-on-surface-variant` at `label-sm` (0.6875rem).
- **R2.3** High-impact metric values MUST use `--amber-primary` at `display-sm` or larger.
- **R2.4** Chart and data-viz accents SHOULD use `--amber-primary-container` as the primary data color and `--amber-tertiary` as the secondary.

---

## 3. The "No-Line" Rule

**This is the highest-priority visual rule in the system.**

### 3.1 Prohibited

- `border: 1px solid <any>` on any section separator, card boundary, or content divider.
- `divide-y`, `divide-x` Tailwind utilities for content lists.
- Horizontal `<hr>` or `<Separator>` components between log entries, list items, or content blocks.

### 3.2 Required Alternatives

| Need | Solution | Token / Class |
|---|---|---|
| Section separation | Background color shift | `bg-amber-surface` → `bg-amber-surface-container-low` |
| Card on a section | Interactive card on sub-section | `bg-amber-surface-container-lowest` on `bg-amber-surface-container-low` |
| Section anchoring | Tonal background change | `bg-amber-surface-variant` |
| Accessibility-required boundary | Ghost border (15% opacity) | `.apiary-ghost-border` |
| Log list item spacing | Vertical white space | `gap: var(--amber-space-4)` (1.4rem) |

### 3.3 Rules

- **R3.1** `border` is only permitted on `<input>`, `<select>`, interactive controls, and the `.apiary-input-field` bottom-bar. Never for sectioning.
- **R3.2** `.apiary-ghost-border` is the ONLY acceptable outline for when a boundary is required for accessibility. It MUST NOT exceed 15% opacity.
- **R3.3** Horizontal dividers in lists are replaced by `var(--amber-space-4)` (1.4rem) vertical gap between items.
- **R3.4** Any PR introducing `border` for visual sectioning MUST be rejected.

---

## 4. Typography: Manrope + Work Sans

### 4.1 Font Assignments

| Font Family | CSS Variable | Tailwind | Used For |
|---|---|---|---|
| Manrope | `--amber-font-display` | `font-display` | Display, headlines, metrics, hero |
| Work Sans | `--amber-font-body` | `font-body` | Body text, titles, form labels, UI text |

### 4.2 Type Scale

| Token | Size | Usage |
|---|---|---|
| `--amber-display-lg` | 3.5rem | Singular high-impact metrics (e.g., Total Honey Yield) |
| `--amber-display-md` | 2.25rem | Section hero headings |
| `--amber-display-sm` | 1.5rem | Data point anchors on cards |
| `--amber-title-lg` | 1.125rem | Card headers |
| `--amber-title-md` | 1rem | Subsection titles |
| `--amber-title-sm` | 0.875rem | Inline titles |
| `--amber-body-lg` | 1rem | Primary body text |
| `--amber-body-md` | 0.875rem | Log entries, hive notes, form text |
| `--amber-body-sm` | 0.8125rem | Secondary body text |
| `--amber-label-lg` | 0.8125rem | Form labels |
| `--amber-label-md` | 0.75rem | Badge text |
| `--amber-label-sm` | 0.6875rem | Metadata, timestamps |

### 4.3 Rules

- **R4.1** Headlines and display text MUST use `font-display` (Manrope). Never Geist or system-ui for display.
- **R4.2** Body text and form content MUST use `font-body` (Work Sans).
- **R4.3** Never use arbitrary typography values like `text-[44px]`. Always reference a `--amber-display-*` / `--amber-title-*` / `--amber-body-*` / `--amber-label-*` token.
- **R4.4** A single high-impact metric on a card or hero area MUST use `display-lg` (3.5rem).
- **R4.5** Metadata (timestamps, author, category) MUST use `label-sm` (0.6875rem) in `text-amber-on-surface-variant`.

---

## 5. Elevation & Depth: Tonal Layering

### 5.1 The Stack (light → dark = front → back)

```
Layer 3 (Front)  : --amber-surface-container-lowest  (#ffffff)
Layer 2 (Mid)    : --amber-surface-container-low     (#eff3ff)
Layer 1 (Base)   : --amber-surface                   (#f9f9ff)
Layer 0 (Page)   : --amber-surface-dim               (#d9d9e1)
```

### 5.2 Shadow Rules

| Context | Specification |
|---|---|
| Floating modals / overlays | `.apiary-ambient-shadow` — 32px blur, 0px offset, 6% opacity of `--amber-on-surface` |
| Cards on surfaces | No shadow. Elevation defined by surface color shift only. |
| Hover states | Background shift to `--amber-surface-container-high`, no shadow. |

### 5.3 Rules

- **R5.1** Depth is defined by background color, not shadow. Apply the Layer Stack in order.
- **R5.2** Interactive cards MUST use `--amber-surface-container-lowest` on a `--amber-surface-container-low` parent.
- **R5.3** Shadows are ONLY permitted on floating elements (modals, popovers, tooltips). Use `.apiary-ambient-shadow`.
- **R5.4** Never use `shadow-sm`, `shadow-md`, `shadow-lg` Tailwind utilities in Amber-styled components.
- **R5.5** Hover elevation on cards uses `--amber-surface-container-high` background + `--amber-radius-lg` (0.5rem). No shadow.

---

## 6. Spacing

### 6.1 Scale

| Token | Value | Usage |
|---|---|---|
| `--amber-space-1` | 0.25rem | Tight internal gaps (icon + label) |
| `--amber-space-2` | 0.5rem | Inline spacing |
| `--amber-space-3` | 1rem | Card internal padding |
| `--amber-space-4` | 1.4rem | Log list item vertical gap (NO dividers) |
| `--amber-space-5` | 1.5rem | Component-level spacing |
| `--amber-space-6` | 2rem | Section internal spacing |
| `--amber-space-7` | 2.5rem | Section internal spacing (generous) |
| `--amber-space-8` | 3rem | Between content groups |
| `--amber-space-9` | 3.5rem | Sub-section separation |
| `--amber-space-10/11/12` | 4rem | Major section separation ("let data breathe") |

### 6.2 Rules

- **R6.1** Card internal padding MUST use `--amber-space-3` (1rem).
- **R6.2** Status badge horizontal padding MUST use `--amber-space-3` minimum.
- **R6.3** Major section gaps MUST use `--amber-space-12` (4rem).
- **R6.4** Never use raw Tailwind spacing (`gap-4`, `p-6`) in Amber-styled components. Always use `--amber-space-*` variables.
- **R6.5** Hexagonal hive map gap MUST use `--amber-space-1` (0.25rem).

---

## 7. Component Rules

### 7.1 Data Visualization Cards

| Property | Value |
|---|---|
| Background | `bg-amber-surface-container-lowest` |
| Border | None (see R3.1) |
| Internal padding | `padding: var(--amber-space-3)` |
| Header text | `--amber-title-md` (1rem) |
| Data value | `--amber-display-sm` (1.5rem) in `text-amber-primary` |

### 7.2 Status Badges

| State | Background | Text | Radius | Icon |
|---|---|---|---|---|
| Healthy | `bg-amber-tertiary-container` | `text-amber-on-tertiary-container` | `--amber-radius-full` | None |
| Warning | `bg-amber-primary-fixed` | `text-amber-on-primary-fixed` | `--amber-radius-full` | None |
| Critical | `bg-amber-error-container` | `text-amber-on-error` | `--amber-radius-full` | Warning icon only |
| Text size | `--amber-label-md` (0.75rem) | | | |
| Horizontal padding | `--amber-space-3` (1rem) minimum | | | |

**R7.2.1** Never add icons to Healthy or Warning badges. Only Critical may carry an icon.
**R7.2.2** Never use `bg-amber-primary` as a badge background. Use `--amber-primary-fixed` for warning state.

### 7.3 Fluid Log List

| Property | Value |
|---|---|
| Item separator | NO dividers (R3.1). Use `gap: var(--amber-space-4)` |
| Hover state | `.apiary-log-item` (shifts to `--amber-surface-container-high`, `--amber-radius-lg`) |
| Horizontal lines | Strictly prohibited |

**R7.3.1** Any `<ul>` or `<div>` list styled as a log MUST use `.apiary-log-item` on each child and `gap: var(--amber-space-4)` on the container.

### 7.4 Input Fields

| Property | Value |
|---|---|
| Background | `--amber-surface-container-low` |
| Focus indicator | 2px bottom bar in `--amber-primary` (no focus ring) |
| Class | `.apiary-input-field` |
| Border (rest) | None |

**R7.4.1** Never use `ring-2 ring-ring` or `focus-visible:ring-*` on Amber input fields. Always use `.apiary-input-field`.
**R7.4.2** Never use `border border-input` on Amber input fields.

### 7.5 Buttons

| Variant | Fill | Text | Radius |
|---|---|---|---|
| Primary | `.apiary-signature-gradient` (135deg, primary → primary-container) | `text-amber-on-primary` | `--amber-radius-md` (0.375rem) |
| Secondary | `bg-amber-surface-variant` | `text-amber-on-surface` | `--amber-radius-md` |

**R7.5.1** Primary buttons MUST use `.apiary-signature-gradient`. Never a flat `bg-amber-primary`.
**R7.5.2** Secondary buttons MUST NOT have borders.

### 7.6 Hive Map (Hexagonal Grid)

| Property | Value |
|---|---|
| Empty hex | `bg-amber-surface-container-highest` |
| Active hive | `bg-amber-primary-fixed` |
| Gap | `--amber-space-1` (0.25rem) |

---

## 8. Layout: Asymmetry & White Space

### 8.1 Rules

- **R8.1** Layout SHOULD use intentional asymmetry: large metric card left, smaller summaries right ("magazine" feel).
- **R8.2** Major sections MUST be separated by `--amber-space-12` (4rem) minimum.
- **R8.3** Layer surfaces: place `--amber-surface-container-lowest` elements on `--amber-surface-container-low` backgrounds.
- **R8.4** Never crowd UI elements. When in doubt, increase spacing rather than decrease.

---

## 9. Glassmorphism & Signature Effects

| Class | Purpose |
|---|---|
| `.apiary-signature-gradient` | Hero stats, main action cards (135deg, primary → primary-container) |
| `.apiary-glass` | Floating overlays (80% opacity surface + 12px backdrop-blur) |
| `.apiary-ambient-shadow` | Floating modals (32px blur, 6% opacity glow) |
| `.apiary-ghost-border` | Accessibility boundary when required (outline-variant at 15%) |

### Rules

- **R9.1** `.apiary-signature-gradient` is ONLY for hero-level elements. Never on regular buttons or list items.
- **R9.2** `.apiary-glass` MUST NOT stack more than 2 layers deep (performance).
- **R9.3** `.apiary-ambient-shadow` is ONLY for modals/popovers. Never for static cards.

---

## 10. Dark Mode

### 10.1 Rules

- **R10.1** Every new `:root` Amber token MUST have a corresponding `.dark` override.
- **R10.2** Dark mode is class-based (`.dark` on `<html>`). Driven by `@custom-variant dark`.
- **R10.3** Dark surfaces maintain the same layer hierarchy (lowest → low → base → dim) with appropriately darkened values.
- **R10.4** Text contrast in dark mode MUST be verified manually. `--amber-on-surface` (#e3e2e9) on `--amber-surface` (#121c2a) is the baseline.

---

## 11. Enforcement Checklist

Every PR touching Amber-styled UI MUST verify:

- [ ] No `1px solid` borders for sectioning (R3.1)
- [ ] No hardcoded hex colors — all via `--amber-*` tokens (R1.1)
- [ ] No `#000` or `black` for backgrounds — use `--amber-inverse-surface` (R2.1)
- [ ] No `shadow-sm/md/lg` — use `.apiary-ambient-shadow` only for modals (R5.4)
- [ ] No `divide-y/x` or `<Separator>` in log lists — use gap (R3.3, R7.3.1)
- [ ] No arbitrary `text-[Npx]` — use `--amber-*-sm/md/lg` tokens (R4.3)
- [ ] No `ring-2 ring-ring` on Amber inputs — use `.apiary-input-field` (R7.4.1)
- [ ] No icons on Healthy/Warning badges — only Critical (R7.2.1)
- [ ] Badge horizontal padding ≥ `--amber-space-3` (R6.2)
- [ ] Major section gap ≥ `--amber-space-12` (R6.3)
- [ ] Both `:root` and `.dark` token values present for any new token (R10.1)
- [ ] `config/theme.ts` `amberTokens` updated for any new token (R1.3)
- [ ] `@theme inline` bridge updated for any new token (R1.2)

---

## 12. File Map

| File | Role |
|---|---|
| `app/globals.css` `:root` | Light-mode Amber token definitions |
| `app/globals.css` `.dark` | Dark-mode Amber token definitions |
| `app/globals.css` `@theme inline` | Tailwind bridge (`--color-amber-*`, `--font-display/body`) |
| `app/globals.css` `@layer components` | `.apiary-*` utility classes |
| `config/theme.ts` | Runtime token reference (`amberTokens`) |
| This file | Discipline and enforcement rules |
