# Accordion

| Field    | Value                                     |
| -------- | ----------------------------------------- |
| Status   | Spec Ready                                |
| Pattern  | `compound`                                |
| Spec     | `specs/components/accordion.md`           |
| Headless | `src/package/ui/components/accordion/`    |
| CLI      | `src/cli/components/accordion.tsx`        |
| Docs     | `src/app/(content)/components/accordion/` |

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
- [x] Open questions empty (parked defaults below)

---

## What / when / non-goals

**What:** A stack of disclosure items. Each item is a thin facade over internal [Disclosure](./internal/disclosure.md): open bit, trigger↔content a11y, presence, `keepMounted`, and content size measure. Accordion root owns the group list. It does not wrap [Collapsible](./collapsible.md). [Certain]

**When:** FAQs, settings stacks, and other pages where several headings stay visible and their sections show and hide.

**Non-goals:** One panel with no group (Collapsible). Exclusivity inside Disclosure. A height-animation primitive. Tabs. A headless icon. Public `sizeCssVars`.

---

## Parts

| Part     | Responsibility                                                            | Status      | Detail |
| -------- | ------------------------------------------------------------------------- | ----------- | ------ |
| context/ | Group value, `exclusive`, root `disabled`, `toggle`; not a public part    | Not Started |        |
| Root     | Group host. Owns `value` / `defaultValue` / `exclusive` / `disabled`      | Not Started |        |
| Item     | One Disclosure root. Required `value`. Item `disabled`                    | Not Started |        |
| Header   | Heading wrapper around Trigger. Default `h3`. No toggle of its own        | Not Started |        |
| Trigger  | Disclosure trigger + accordion attrs. Default `button`                    | Not Started |        |
| Content  | Disclosure content. Injects `--accordion-content-*`. Public `keepMounted` | Not Started |        |

**Rollup:** Component Completed only when every part is Completed.

**Naming:** **Content**, aligned with Disclosure and Collapsible. **Header** is the heading. Trigger stays the button inside it when a heading is used. Header may be omitted when the item is not a page section.

Item context aliases Disclosure (`useAccordionItemContext`). Group context is separate (`useAccordionContext`).

---

## Behavior

- **Uncontrolled:** `defaultValue: string[]`, default `[]`. Root stores the open list.
- **Controlled:** `value` + `onValueChange(value: string[])`.
- **`exclusive`:** default `false`. Several items may stay open, and the last open item may close.
  - `false`: toggle adds or removes that item’s `value`.
  - `true`: opening sets the list to `[value]`. Closing the open item sets `[]`.
- **Uncontrolled + `exclusive` + `defaultValue` with more than one entry:** keep the first entry and drop the rest at init.
- **Controlled + `exclusive` + a list of several values:** render every listed item open. `exclusive` changes the next toggle (replace with one, or clear). Do not clamp a controlled list during render.
- **`disabled` on Root:** every trigger is non-interactive. Open list frozen.
- **`disabled` on Item:** that trigger is non-interactive. Other items still toggle. Root `disabled` wins over the item.
- Trigger click / Enter / Space toggles that item (native button).
- Closed Content follows Disclosure → `usePresence` (exit, then unmount unless `keepMounted`). Trigger stays mounted.
- **Size CSS vars** (Content injects, not a public prop): `--accordion-content-width` / `--accordion-content-height`. Same measure path as Collapsible. CLI demo animates height.
- **Ids:** item values must be unique within one Root. Duplicates are misuse: every item with that `value` follows the same open bit.
- **Edge:** controlled without `onValueChange` — render from `value`; toggles do not change state (warn in docs).
- **Edge:** `disabled` while open stays open; the trigger does not toggle.
- **Keyboard:** Tab through triggers. Enter / Space activate. No roving `tabindex`, arrow-key moves, Home, or End. Arrow keys stay with page scroll. [Certain] — modern-web-guidance `accordion` (retrieved 2026-11-23).
- **Find-in-page:** closed content unmounts unless `keepMounted`. Mounted closed content is `inert` (Disclosure). This spec does not add `hidden="until-found"`.

---

## Public API

### Root

| Prop          | Type                      | Default | Notes                          |
| ------------- | ------------------------- | ------- | ------------------------------ |
| ref           | Ref                       | —       |                                |
| render        | useRender                 | —       | Default `div`                  |
| value         | string[]                  | —       | Controlled open list           |
| defaultValue  | string[]                  | `[]`    | Uncontrolled                   |
| onValueChange | (value: string[]) => void | —       |                                |
| exclusive     | boolean                   | `false` | One open at a time when `true` |
| disabled      | boolean                   | `false` |                                |
| className     | string                    | —       |                                |
| children      | ReactNode                 | —       | Items                          |
| …props        | div attrs                 | —       |                                |

### Item

| Prop      | Type      | Default | Notes                          |
| --------- | --------- | ------- | ------------------------------ |
| ref       | Ref       | —       |                                |
| render    | useRender | —       | Default `div`                  |
| value     | string    | —       | **Required.** Stable item id   |
| disabled  | boolean   | `false` | Or root `disabled`             |
| className | string    | —       |                                |
| children  | ReactNode | —       | Header and/or Trigger, Content |
| …props    | div attrs | —       |                                |

### Header

| Prop      | Type      | Default | Notes        |
| --------- | --------- | ------- | ------------ |
| ref       | Ref       | —       |              |
| render    | useRender | —       | Default `h3` |
| className | string    | —       |              |
| children  | ReactNode | —       | Trigger      |
| …props    | h3 attrs  | —       |              |

### Trigger

| Prop      | Type         | Default | Notes            |
| --------- | ------------ | ------- | ---------------- |
| ref       | Ref          | —       |                  |
| render    | useRender    | —       | Default `button` |
| className | string       | —       |                  |
| children  | ReactNode    | —       |                  |
| …props    | button attrs | —       |                  |

### Content

| Prop        | Type      | Default | Notes                        |
| ----------- | --------- | ------- | ---------------------------- |
| ref         | Ref       | —       |                              |
| render      | useRender | —       | Default `div`                |
| keepMounted | boolean   | `false` | Passed to Disclosure.Content |
| className   | string    | —       |                              |
| children    | ReactNode | —       |                              |
| …props      | div attrs | —       | `sizeCssVars` omitted        |

Export: `Accordion.Root`, `.Item`, `.Header`, `.Trigger`, `.Content` + named prop types (`AccordionRootProps`, …). **No** TypeScript `namespace`. Also `useAccordionContext` and `useAccordionItemContext`. Content props are `Omit<DisclosureContentProps, "sizeCssVars">` plus no extra open props (the item value drives open).

---

## A11y + keyboard

- Header: heading (`h3` or `render`). The button is inside the heading when Header is used. Do not put a heading inside Trigger.
- Trigger: `button`; `aria-expanded`; `aria-controls` the content id; `disabled` when the item or root is disabled.
- Content: `id` from the item’s Disclosure context. No per-item `region` landmark.
- Root: not a landmark. The consumer names the group (`aria-labelledby` / `aria-label`) when the accordion is a page section.
- Keyboard: native button only. No roving tabindex.
- Ids: Disclosure `useId()` per item. Item `value` is the group key, not the DOM id.

---

## Data attributes / slots

Compound convention via `applyAttrs(..., { part })`:

- Root: `data-slot="accordion"`, `data-accordion-part="root"`, `data-disabled`, `data-exclusive` when `exclusive`
- Item: `data-accordion-part="item"`, `data-open`, `data-disabled`
- Header: `data-accordion-part="header"`
- Trigger: `data-accordion-part="trigger"`, `data-open`, `data-disabled`
- Content: `data-accordion-part="content"`, `data-open`, plus Disclosure presence attrs

Disclosure still sets its own behavioral attrs on the item hosts. Accordion adds the product attrs, same merge as Collapsible.

---

## Headless vs CLI

| Concern             | Headless | CLI                                           |
| ------------------- | -------- | --------------------------------------------- |
| Open state / a11y   | Yes      | Wrap parts                                    |
| Chevron / animation | No       | Chevron on Trigger; height from the size vars |
| Exclusive default   | `false`  | Demo stays non-exclusive                      |

No CLI variant or size props.

---

## File map

```
src/package/ui/components/accordion/
  context/
    types.ts
    context.tsx
    hooks.ts             # useAccordionContext
    index.ts
  root/
    attrs.ts types.ts root.tsx index.ts
  item/
    attrs.ts types.ts item.tsx index.ts
    hooks.ts             # useAccordionItemContext (Disclosure alias)
  header/
    attrs.ts types.ts header.tsx index.ts
  trigger/
    attrs.ts types.ts trigger.tsx index.ts
  content/
    attrs.ts types.ts content.tsx index.ts
  index.ts
  accordion.test.tsx
src/cli/components/accordion.tsx
src/app/(content)/components/accordion/
```

---

## Out of scope

- Forcing one item to stay open
- Expand-all / collapse-all
- Arrow-key roving tabindex, Home, End
- Horizontal accordion
- Implementing the group as native `details` / `summary` (`name` exclusivity is not the controlled React API)
- `hidden="until-found"`
- Nested accordion coordination
- Headless Icon
- Changes to Collapsible’s public API or Disclosure’s exclusivity

---

## Open questions

_(none)_

Parked: several items may stay open; `exclusive` defaults `false`; the last item may close; value is always `string[]`; Header is an optional `h3`; keyboard is Tab + Enter/Space; find-in-page for closed panels needs `keepMounted`.

---

## Known limits / adversarial cases

| Case                                                                                   | Status    | Test / Won’t-fix                                                                                                               |
| -------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Closed content is absent from find-in-page unless `keepMounted`                        | Won’t-fix | Disclosure unmounts. `inert` while mounted closed. `hidden="until-found"` is out of scope (Safari still treats it as `hidden`) |
| Duplicate item `value`                                                                 | Won’t-fix | Misuse. Those items share one open bit                                                                                         |
| Controlled `exclusive` list with several values stays multi-open until the next toggle | Document  | Root does not rewrite controlled state during render                                                                           |

(Rival + break fill the rest at Completed.)

---

## Review log

| Date | Rival | Break | Verdict |
| ---- | ----- | ----- | ------- |
|      |       |       |         |

---

## Build chunks (after go)

1. Group context + Root
2. Item facade over Disclosure
3. Header + Trigger
4. Content (`keepMounted` + `--accordion-content-*`)
5. `accordion.test.tsx` + package export → parts Completed
6. CLI wrappers
7. Docs page
8. In Review (rival + break once) → Shipped
