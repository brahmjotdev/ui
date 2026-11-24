# Accordion

| Field    | Value                                     |
| -------- | ----------------------------------------- |
| Status   | Shipped                                   |
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

| Part     | Responsibility                                                            | Status    | Detail  |
| -------- | ------------------------------------------------------------------------- | --------- | ------- |
| context/ | Group value, `type`, root `disabled`, `toggle`; not a public part         | Completed | Chunk 1 |
| Root     | Group host. Owns `type` / `value` / `defaultValue` / `disabled`           | Completed | Chunk 1 |
| Item     | One Disclosure root. Required `value`. Item `disabled`                    | Completed | Chunk 2 |
| Header   | Heading wrapper around Trigger. Default `h3`. No toggle of its own        | Completed | Chunk 3 |
| Trigger  | Disclosure trigger + accordion attrs. Default `button`                    | Completed | Chunk 3 |
| Content  | Disclosure content. Injects `--accordion-content-*`. Public `keepMounted` | Completed | Chunk 4 |

**Rollup:** Component Completed only when every part is Completed.

**Naming:** **Content**, aligned with Disclosure and Collapsible. **Header** is the heading. Trigger stays the button inside it when a heading is used. Header may be omitted when the item is not a page section.

Item context aliases Disclosure (`useAccordionItemContext`). Group context is separate (`useAccordionContext`).

---

## Behavior

- **`type`:** `"single"` (default) or `"multiple"`. This is the public discriminant. There is no `exclusive` prop and no `string | string[]` value.
  - **`single`:** `value` / `defaultValue` are `string`. `defaultValue` defaults to `""` (none open). Opening sets that item’s `value`. Closing the open item sets `""`. `onValueChange(value: string)`.
  - **`multiple`:** `value` / `defaultValue` are `string[]`. `defaultValue` defaults to `[]`. Toggle adds or removes that item. `onValueChange(value: string[])`.
- Several items may stay open only when `type` is `multiple`. A single accordion can still close its open item. Forcing one item to stay open is out of scope, so there is no `collapsible` prop.
- Item `value` is a non-empty string. `""` is reserved for a closed single accordion.
- The root may store a list internally. The public props and callback stay on the `type` branch. A single accordion does not accept or emit `string[]`.
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

Shared on both modes: `ref`, `render`, `disabled` (default `false`), `className`, `children`, and other `div` attrs.

`AccordionRootProps` is the union. `type` defaults to `"single"` when omitted.

| Mode     | Prop          | Type                      | Default    | Notes                           |
| -------- | ------------- | ------------------------- | ---------- | ------------------------------- |
| single   | type          | `"single"`                | `"single"` | Optional on this branch         |
| single   | value         | string                    | —          | Controlled. `""` means closed   |
| single   | defaultValue  | string                    | `""`       | Uncontrolled. `""` means closed |
| single   | onValueChange | (value: string) => void   | —          |                                 |
| multiple | type          | `"multiple"`              | —          | Required literal                |
| multiple | value         | string[]                  | —          | Controlled open list            |
| multiple | defaultValue  | string[]                  | `[]`       | Uncontrolled                    |
| multiple | onValueChange | (value: string[]) => void | —          |                                 |

```ts
type AccordionRootProps =
  | ({
      type?: "single";
      value?: string;
      defaultValue?: string;
      onValueChange?: (value: string) => void;
    } & AccordionRootSharedProps)
  | ({
      type: "multiple";
      value?: string[];
      defaultValue?: string[];
      onValueChange?: (value: string[]) => void;
    } & AccordionRootSharedProps);
```

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

- Root: `data-slot="accordion"`, `data-accordion-part="root"`, `data-disabled`, `data-type="single" | "multiple"`
- Item: `data-accordion-part="item"`, `data-open`, `data-disabled`
- Header: `data-accordion-part="header"`
- Trigger: `data-accordion-part="trigger"`, `data-open`, `data-disabled`
- Content: `data-accordion-part="content"`, `data-open`, plus Disclosure presence attrs

Disclosure still sets its own behavioral attrs on the item hosts. Accordion adds the product attrs, same merge as Collapsible.

---

## Headless vs CLI

| Concern             | Headless   | CLI                                                                                   |
| ------------------- | ---------- | ------------------------------------------------------------------------------------- |
| Open state / a11y   | Yes        | Wrap parts                                                                            |
| Chevron / animation | No         | Docs demo composes the chevron on Trigger. Content animates height from the size vars |
| Type default        | `"single"` | Demo omits `type`                                                                     |

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

## Library pass

Checked 2026-11-23: [Base UI Accordion](https://base-ui.com/react/components/accordion), [Radix Accordion](https://www.radix-ui.com/primitives/docs/components/accordion), [React Aria DisclosureGroup](https://react-aria.adobe.com/DisclosureGroup), [Ark UI Accordion](https://ark-ui.com/docs/components/accordion). [Certain]

**Basics this spec already ships**

- Root, Item, Header, Trigger, Content. Radix and Base UI use the same stack (Base UI names the panel `Panel`).
- One-open vs many-open, with a different value type per mode. Radix uses `type: "single" | "multiple"`. Base UI uses `multiple` plus `Value[]` for both. React Aria uses `allowsMultipleExpanded` and a set of keys. This spec keeps the Radix discriminant so a single accordion cannot be given `string[]`.
- Controlled and uncontrolled value, root and item `disabled`, `keepMounted` (Radix `forceMount`, Ark `unmountOnExit`), content size CSS variables, `render` instead of `asChild`.
- Tab, Enter, and Space only. Base UI marks `loopFocus` and `orientation` deprecated because the APG removed roving focus ([aria-practices#3434](https://github.com/w3c/aria-practices/pull/3434)). Radix still documents Arrow, Home, and End. This spec follows the updated guidance.

**Left out**

- `collapsible={false}` (Radix and Ark default). That forces one item to stay open. This spec lets a single accordion close.
- Horizontal `orientation`, `dir`, and Arrow-key moves. Base UI no longer uses them for keyboard behavior. Layout direction is CSS and inherited `dir`.
- A headless indicator part (Ark `ItemIndicator`). The chevron is not a headless part. The docs demo composes it on Trigger, same as Collapsible.
- `onFocusChange`, `lazyMount` as a second mount API, and a MUI-style accordion that is only a single panel with its own `expanded`. Collapsible already covers one panel. Mount policy is `keepMounted` plus `usePresence`.

**Nice-to-have, not in this build**

- `hiddenUntilFound` (Base UI, on Root or Panel). Find-in-page can open a closed panel, and the panel stays mounted. It does not fit a thin Disclosure facade: closed content must stay in the DOM and must not be `inert` or `display: none`. Safari still treats the attribute as `hidden`. The known limit below stands until a later spec change.
- `data-index` (Base UI) and a Root-level `keepMounted` default. Content already accepts `keepMounted`. Add the index attr if a demo needs it.

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

Parked: `type` defaults to `"single"` (`string`, `""` when closed); `type: "multiple"` uses `string[]`; the last single item may close; Header is an optional `h3`; keyboard is Tab + Enter/Space; find-in-page for closed panels needs `keepMounted`.

---

## Known limits / adversarial cases

| Case                                                             | Status    | Test / Won’t-fix                                                                                                               |
| ---------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Closed content is absent from find-in-page unless `keepMounted`  | Won’t-fix | Disclosure unmounts. `inert` while mounted closed. `hidden="until-found"` is out of scope (Safari still treats it as `hidden`) |
| Duplicate item `value`                                           | Won’t-fix | Misuse. Those items share one open bit                                                                                         |
| Single `value` / `defaultValue` of `""` means no item is open    | Document  | Item ids are non-empty. There is no separate closed sentinel                                                                   |
| Closed, unmounted content leaves `aria-controls` on a missing id | Won’t-fix | Content unmounts unless `keepMounted`. The trigger keeps the Disclosure id. `inert` covers the mounted-closed case             |
| Changing `type` after mount                                      | Won’t-fix | The group list is created for the mode mounted first                                                                           |
| Styled Trigger replaces `render`                                 | Won’t-fix | The CLI trigger owns the button. The docs demo passes the chevron as children                                                  |
| Controlled value without `onValueChange` does not update         | Fixed     | `accordion.test.tsx`                                                                                                           |
| Root or item `disabled` leaves an open panel in place            | Fixed     | `accordion.test.tsx`                                                                                                           |

---

## Review log

| Date       | Rival                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Break                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Verdict |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| 2026-11-23 | Base UI: Adopt with changes (headless group; `type` splits `string` and `string[]`; `hiddenUntilFound` stays out). Radix: Adopt with changes (`render`, not `asChild`; a single accordion can close; no arrow-key roving after the APG update). shadcn: Adopt (CLI chevron and height var, demo on the docs page). MUI: Adopt with changes (one group value; no theme or density).                                                                                                                                                                                                                                                                                               | Saboteur: controlled-without-callback, disabled, and single close are tested. New Hire: public props stay on the `type` branch; context `value` matches that mode. A11y: trigger is a button with `aria-expanded` / `aria-controls`; closed `keepMounted` content is `inert`. Severity CLEAN.                                                                                                                                                                                                                                                 | Shipped |
| 2026-11-24 | Re-review after the default flipped to `"single"` and the chevron moved into the docs demo. Base UI: Adopt with changes (`multiple` defaults to false and `value` is always `Value[]`; this spec keeps the `type` split and `""` for a closed single accordion; `hiddenUntilFound` stays out). Radix: Adopt with changes (default `type` is `"single"`, matching Radix; a single accordion can still close; `render`, not `asChild`; no arrow-key roving). shadcn: Adopt with changes (height var stays on Content; the chevron is composed in the demo, same as Collapsible, not hardcoded in the CLI wrapper). MUI: Adopt with changes (one group value; no theme or density). | Saboteur: default single exclusivity, controlled `value="one"` without `onValueChange`, disabled, and close-to-`""` are tested. `setOpen(false)` on an already closed item does not call the group. New Hire: omitted `type` is the single branch; `multiple` requires the literal; context `value` matches that mode. A11y: trigger is a button with `aria-expanded` / `aria-controls`; closed `keepMounted` content is `inert`. An unmounted panel leaves `aria-controls` on a missing id — Won’t-fix, same unmount policy. Severity CLEAN. | Shipped |

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
