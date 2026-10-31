# Disclosure (internal)

| Field    | Value                                                                     |
| -------- | ------------------------------------------------------------------------- |
| Status   | Completed                                                                 |
| Pattern  | `compound`                                                                |
| Spec     | `specs/components/internal/disclosure.md`                                 |
| Headless | `src/package/ui/components/internal/disclosure/` (internal — not catalog) |
| CLI      | None (consumers: Collapsible / Accordion CLI)                             |
| Docs     | None as product page (document via Collapsible / Accordion)               |

**Visibility:** Internal only. Not a front-facing peer of Collapsible. Listed under Internal in [INDEX.md](../INDEX.md).

---

## Definition of Ready (DoR)

- [x] What / when to use / non-goals written
- [x] Pattern chosen (`compound`)
- [x] Parts table filled
- [x] Behavior: controlled/uncontrolled, defaults, edge cases
- [x] Public API per part (internal package API)
- [x] A11y + keyboard
- [x] Data attributes / slots
- [x] Headless vs CLI surface
- [x] File map listed (including `*.test.tsx`)
- [x] Out of scope listed
- [x] Open questions empty (parked defaults confirmed below)

---

## What / when / non-goals

**What:** Shared keep-trigger-visible open/close primitive: context + Root + Trigger + Content. Collapsible and Accordion item compose this instead of duplicating open state, trigger↔content a11y, presence, `keepMounted`, or content size CSS vars.

**When:** Used only inside library components (Collapsible, Accordion item, …). App authors use **Collapsible** (or Accordion), not Disclosure directly.

**Non-goals:**

- Front-facing docs / CLI / catalog row as peer of Collapsible
- Exclusive trigger unmount as a library compound (no Presence component; apps compose `usePresence` from utils if needed)
- Accordion group exclusivity (Accordion root owns that; item uses Disclosure)
- Height animation **primitives** as a separate product (Content size CSS vars + part-local measure ≠ that product)

**Presence relationship:** Content uses **`usePresence(open)`** from `@cerevialabs/ui/utils` for exit-then-unmount + presence status attrs. `keepMounted` gates unmount via `presenceShouldRender`.

**Open state:** Root Provider uses `useControllableState` from `@cerevialabs/ui/utils`.

**Size:** Content owns measure (`content/utils.ts`) + size CSS vars (parameterized names). Facades pass names only — one var pair on the host.

---

## Parts

| Part     | Responsibility                                                                                 | Status    | Detail  |
| -------- | ---------------------------------------------------------------------------------------------- | --------- | ------- |
| context/ | Provider: open via `useControllableState`, ids, disabled, onOpenChange; `useDisclosureContext` | Completed | Chunk 1 |
| Root     | Host; composes Provider                                                                        | Completed | Chunk 2 |
| Trigger  | Always mountable while Root mounted; toggles open; button a11y                                 | Completed | Chunk 3 |
| Content  | Region with `usePresence`; `keepMounted`; measure + size CSS vars; `id` for `aria-controls`    | Completed | Chunk 4 |

**Rollup:** Internal Completed when Root, Trigger, and Content are Completed.

**Naming:** **Content** (aligned with Collapsible). Locked for current scope.

---

## Behavior

- **Uncontrolled:** `defaultOpen` (default `false`).
- **Controlled:** `open` + `onOpenChange(open: boolean)`.
- **disabled** on Root: Trigger non-interactive; state frozen.
- Trigger stays **mounted** while open (Disclosure a11y).
- Content: `usePresence(open)` — mount while open or exiting; presence data attrs; unmount after exit unless `keepMounted` (or immediately under reduced motion).
- Content sets **`inert` when `!open`** while still mounted (exit animation or `keepMounted`) so focusable descendants are not reachable.
- **Size CSS vars:** one pair on Content host via `sizeCssVars` names (height and/or width — vertical or horizontal collapse). Written **imperatively** (`setProperty`) in `useLayoutEffect` before presence’s enter rAF. Measure: in-flow child border boxes **plus outer margins** when host `clientWidth >= 1` (skip `display: none|contents` and `absolute|fixed`); if host is width-collapsed (`w-0`), temporary `width`/`height: auto` + `scroll*` for intrinsic size. Ceil subpixels; skip writing `0×0` (hidden/detached). **Never remasure while `data-animating` once a height var exists** (unlock mid-transition cancels CSS); remasure when `data-animating` clears. Observe **children** with `ResizeObserver` (resync on `childList`), not the host. Vars keep last measured `${n}px` while closed. **Consumer CSS:** collapse with `h-0` and/or `w-0`, expand with `data-open:h/w-(--var)` for the axes you animate. Prefer a BFC on the host (`overflow: hidden` / `flow-root`) so margins do not collapse through.
- Edge: controlled without `onOpenChange` — same as Collapsible.

---

## Public API (package-internal)

Collapsible / Accordion are thin naming/attrs facades over Disclosure; size measure lives here.

### Root

| Prop         | Type                    | Default | Notes             |
| ------------ | ----------------------- | ------- | ----------------- |
| ref          | Ref                     | —       |                   |
| render       | useRender               | —       | Default `div`     |
| open         | boolean                 | —       | Controlled        |
| defaultOpen  | boolean                 | false   | Uncontrolled      |
| onOpenChange | (open: boolean) => void | —       |                   |
| disabled     | boolean                 | false   |                   |
| className    | string                  | —       |                   |
| children     | ReactNode               | —       | Trigger + Content |
| …props       | div attrs               | —       |                   |

### Trigger

| Prop      | Type         | Default | Notes            |
| --------- | ------------ | ------- | ---------------- |
| ref       | Ref          | —       |                  |
| render    | useRender    | —       | Default `button` |
| className | string       | —       |                  |
| children  | ReactNode    | —       |                  |
| …props    | button attrs | —       |                  |

### Content

| Prop        | Type                                | Default                | Notes                                     |
| ----------- | ----------------------------------- | ---------------------- | ----------------------------------------- |
| ref         | Ref                                 | —                      | Merged with presence + measure ref        |
| render      | useRender                           | —                      | Default `div`                             |
| keepMounted | boolean                             | false                  | Stay mounted when closed                  |
| sizeCssVars | `{ width: string; height: string }` | disclosure names below | CSS custom property **names** only        |
| className   | string                              | —                      |                                           |
| children    | ReactNode                           | —                      |                                           |
| …props      | div attrs                           | —                      | Plus presence attrs; size vars in `style` |

**Default `sizeCssVars`:** `{ width: "--disclosure-content-width", height: "--disclosure-content-height" }`.

**Hooks (part `hooks.ts`):** `useDisclosureContentState`, `useDisclosureContentSize` (role-split; not one bag hook).

Export: `Disclosure.Root`, `.Trigger`, `.Content` + named prop types. **Not** re-exported from [`components/index.ts`](../../../src/package/ui/components/index.ts). Collapsible deep-imports from `components/internal/disclosure`. Locked.

---

## A11y + keyboard

- Trigger: `button` (or render); `aria-expanded={open}`; `aria-controls={contentId}`; `disabled` when root disabled.
- Content: `id={contentId}`; present via `usePresence` (not permanently `hidden`-only closed DOM).
- Keyboard: native button activation.
- Ids: stable `useId()` in context Provider.

---

## Data attributes / slots

**Locked:** Disclosure sets only behavioral attrs (`data-open`, `data-disabled`) plus Content presence attrs from `usePresence`. No `data-disclosure*` / disclosure `data-slot`. Collapsible facade sets product `data-slot` / `data-collapsible*` on the same hosts via merge.

**`data-state` (from `usePresence`):** `opening` while enter-animating (`starting`), `open` when idle open (`started`), `closing` while exit-animating (`ending`), `closed` when idle closed (`ended`). Boolean presence attrs (`data-open` / `data-starting` / …) remain.

---

## Headless vs CLI

| Concern           | Disclosure (internal) | CLI                         |
| ----------------- | --------------------- | --------------------------- |
| Open state / a11y | Yes                   | Via Collapsible / Accordion |
| Size CSS vars     | Yes (parameterized)   | Consumer styles transitions |
| Visuals           | No                    | Consumer CLI only           |

---

## File map

```
src/package/ui/components/internal/disclosure/
  context/
    types.ts
    context.tsx
    hooks.ts               # useDisclosureContext
    index.ts
  root/
    a11y.ts attrs.ts types.ts root.tsx index.ts
  trigger/
    a11y.ts attrs.ts types.ts trigger.tsx index.ts
  content/
    a11y.ts attrs.ts types.ts content.tsx index.ts
    hooks.ts               # useDisclosureContentState / useDisclosureContentSize
    utils.ts               # measureContentSize (part-local)
  index.ts
  disclosure.test.tsx
```

No CLI / docs route for Disclosure itself.

---

## Out of scope

- Front-facing Disclosure product
- Accordion exclusivity logic
- Height animation primitives as a separate product
- Global package `measureContentSize` (part-local `content/utils.ts` only)

---

## Open questions

_(none — path `internal/disclosure/`, Content naming, behavioral attrs only, `keepMounted`, parameterized `sizeCssVars`, part-local measure locked)_

---

## Known limits / adversarial cases

| Case | Status | Test / Won’t-fix |
| ---- | ------ | ---------------- |
|      |        |                  |

---

## Review log

| Date | Rival | Break | Verdict |
| ---- | ----- | ----- | ------- |
|      |       |       |         |

---

## Build chunks (after Spec Ready + go)

1. Prerequisite: `usePresence` util available (`@cerevialabs/ui/utils`) — done
2. `context/` (`useControllableState`) — done
3. Root — done
4. Trigger — done
5. Content (`usePresence`, then `keepMounted` + measure + size vars)
6. `disclosure.test.tsx` + named exports `index.ts` (no TypeScript `namespace`)
7. Collapsible facade over Disclosure (separate Collapsible chunks / MD)
