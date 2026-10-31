# Collapsible

| Field    | Value                                                               |
| -------- | ------------------------------------------------------------------- |
| Status   | Shipped                                                             |
| Pattern  | `compound`                                                          |
| Spec     | `specs/components/collapsible.md`                                   |
| Headless | `src/package/ui/components/collapsible/`                            |
| CLI      | `src/cli/components/collapsible.tsx` (wrappers for parts as needed) |
| Docs     | `src/app/(content)/components/collapsible/`                         |

---

## Definition of Ready (DoR)

- [x] What / when to use / non-goals written
- [x] Pattern chosen (`compound`)
- [x] Parts table filled
- [x] Behavior: controlled/uncontrolled, defaults, edge cases
- [x] Public API per part
- [x] A11y + keyboard
- [x] Data attributes / slots
- [x] Headless vs CLI surface
- [x] File map listed (including `*.test.tsx`)
- [x] Out of scope listed
- [x] Open questions empty (parked defaults confirmed below)

---

## What / when / non-goals

**What:** Show/hide a region of content toggled by a trigger. **Thin public facade** over internal [Disclosure](./internal/disclosure.md): product naming + `data-collapsible*` attrs. Open state, a11y, presence, `keepMounted`, content size measure, and parameterized size CSS vars are owned by Disclosure.Content — Collapsible Content passes `keepMounted` and injects product `sizeCssVars` (`--collapsible-content-*`); it does **not** expose `sizeCssVars` on the public API.

**When:** FAQs, optional sections, disclosure of secondary content without leaving the page.

**Non-goals:** Accordion (single/multiple exclusive groups — Accordion composes Disclosure directly, not Collapsible); height-animation **primitive product**; mobile drawer/sheet; exclusive trigger unmount as a library compound; headless Icon (chevron is CLI-only).

---

## Parts

| Part     | Responsibility                                                                 | Status    | Detail  |
| -------- | ------------------------------------------------------------------------------ | --------- | ------- |
| context/ | Alias of Disclosure context (`useCollapsibleContext`); not a public part       | Completed | Chunk 2 |
| Root     | Thin facade over `Disclosure.Root` + collapsible product attrs                 | Completed | Chunk 2 |
| Trigger  | Thin facade over `Disclosure.Trigger` + collapsible product attrs              | Completed | Chunk 3 |
| Content  | Thin facade over `Disclosure.Content`; `keepMounted` + product `sizeCssVars` (not public) | Completed | Chunk 4 |

**Rollup:** Component Completed only when Root, Trigger, and Content are Completed.

**Naming:** **Content** (aligned with Disclosure). Locked for current scope. **No headless Icon.**

---

## Behavior

- **Uncontrolled:** `defaultOpen` (default `false`); internal state (via Disclosure).
- **Controlled:** `open` + `onOpenChange(open: boolean)`.
- **disabled** on Root: Trigger non-interactive; state frozen.
- Trigger click / Enter / Space toggles (button).
- When closed: Content follows Disclosure → `usePresence` (exit-animate then unmount unless `keepMounted`). Trigger stays mounted (`aria-expanded`).
- **Size CSS vars** (Collapsible Content injects product names): `--collapsible-content-width` / `--collapsible-content-height` — last measured intrinsic px including in-flow child margins (kept while closed). Disclosure defaults remain `--disclosure-content-*` for other facades (e.g. Accordion). CLI demo animates height (`h-0` + `data-open:h-(--collapsible-content-height)` + `overflow-hidden`); consumers may animate only height or only width. Disclosure unlocks to measure when the host is width-collapsed so vars match children, not the `w-0` wrap. Collapsible does **not** expose `sizeCssVars` publicly.
- Edge: controlled without `onOpenChange` — still render from `open`; Trigger clicks no-op on state (warn in docs).
- Edge: `disabled` + controlled open stays open visually but Trigger ignored.

---

## Public API

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

| Prop        | Type      | Default | Notes                                   |
| ----------- | --------- | ------- | --------------------------------------- |
| ref         | Ref       | —       |                                         |
| render      | useRender | —       | Default `div`                           |
| keepMounted | boolean   | false   | Passed to Disclosure.Content            |
| className   | string    | —       |                                         |
| children    | ReactNode | —       |                                         |
| …props      | div attrs | —       | `sizeCssVars` omitted from public API   |

Export: `Collapsible.Root`, `.Trigger`, `.Content` + named prop types (`CollapsibleRootProps`, …). **No** TypeScript `namespace`. Also `useCollapsibleContext`. Content props are `Omit<DisclosureContentProps, "sizeCssVars">`.

---

## A11y + keyboard

- Trigger: `button` (or render); `aria-expanded={open}`; `aria-controls={contentId}`; `disabled` when root disabled.
- Content: `id={contentId}`; present via Disclosure → `usePresence`; role optional (current scope: Content `id` + Trigger `aria-controls` sufficient).
- Keyboard: native button activation (Enter/Space).
- Ids: stable `useId()` inside Disclosure context Provider (Collapsible aliases that context).

---

## Data attributes / slots

- Root: `data-slot="collapsible"`, `data-collapsible`, `data-open`, `data-disabled`
- Trigger: `data-slot="collapsible-trigger"`, `data-collapsible-trigger`, `data-open`, `data-disabled`
- Content: `data-slot="collapsible-content"`, `data-collapsible-content`, `data-open` (+ presence attrs from Disclosure)

---

## Headless vs CLI

| Concern             | Headless | CLI                                      |
| ------------------- | -------- | ---------------------------------------- |
| Open state / a11y   | Yes      | Wrap parts with Tailwind                 |
| Chevron / animation | No       | Optional in CLI (lucide + size CSS vars) |

---

## File map

```
src/package/ui/components/collapsible/
  context/
    types.ts
    hooks.ts             # useCollapsibleContext alias
    index.ts
  root/
    attrs.ts types.ts root.tsx index.ts
  trigger/
    attrs.ts types.ts trigger.tsx index.ts
  content/
    attrs.ts types.ts content.tsx index.ts
  index.ts               # Collapsible.Root / .Trigger / .Content
  collapsible.test.tsx
src/cli/components/collapsible.tsx
```

**Locked:** `context/` is a sibling of `root/` (alias only — no nested Collapsible Provider). Public API remains `Collapsible.Root` → `Disclosure.Root`. Measure lives in Disclosure `content/utils.ts`, not here.

---

## Out of scope

- Accordion exclusivity
- Height animation **primitives** as a separate product (size CSS vars + measure ≠ that product)
- Nested collapsible coordination
- Exclusive trigger-unmount compound (not a library product; compose `usePresence` in apps)
- Headless Icon part
- Global package `measureContentSize` util

---

## Open questions

_(none — facade over Disclosure; `keepMounted` + internal product `sizeCssVars`; `sizeCssVars` not public; no Icon)_

---

## Known limits / adversarial cases

| Case                                                                        | Status    | Test / Won’t-fix                                                                     |
| --------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------ |
| Closed Content still focusable while mounted (exit / `keepMounted`)         | Fixed     | Disclosure sets `inert` when `!open`; covered in `disclosure.test.tsx`               |
| Size CSS vars require consumer CSS (`height`/`width`/`overflow`) to animate | Won’t-fix | Headless honesty — vars only; CLI demo wires `h-(--collapsible-content-height)` |
| Nested Collapsibles do not coordinate                                       | Won’t-fix | Out of scope                                                                        |

---

## Review log

| Date       | Rival                                                                                                                                                                                                                                                                               | Break                                                                                                                                                                             | Verdict |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| 2026-10-26 | Base UI: Adopt (thin facade, behavior in Disclosure). Radix: Adopt with changes (document `keepMounted` + inert; no `asChild` — use `render`). shadcn: Adopt (CLI chevron + height var demo). MUI: Adopt with changes (small API; no density/theme surface — intentional headless). | Saboteur: controlled-without-onOpenChange covered. New Hire: context is Disclosure alias — documented. A11y: closed-mounted focus → fixed with `inert`. Severity CLEAN after fix. | Shipped |

---

## Build chunks (after go)

1. Find-or-write specs/rules (this MD + Disclosure + hooks/anatomy)
2. Disclosure.Content: `keepMounted`, measure utils, State/Size hooks, parameterized `sizeCssVars`
3. Collapsible `context/` + Root facade
4. Collapsible Trigger facade
5. Collapsible Content facade (`keepMounted` + product `sizeCssVars`; not public)
6. `collapsible.test.tsx` + package export → Completed
7. CLI wrappers
8. Docs page
9. In Review (rival + break once) → Shipped

**Note:** Do not invent a second open-state stack or second measure path in Collapsible.
