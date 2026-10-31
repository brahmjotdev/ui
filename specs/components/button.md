# Button

| Field    | Value                                  |
| -------- | -------------------------------------- |
| Status   | Shipped                                |
| Pattern  | `single`                               |
| Spec     | `specs/components/button.md`           |
| Headless | `src/package/ui/components/button/`    |
| CLI      | `src/cli/components/button.tsx`        |
| Docs     | `src/app/(content)/components/button/` |

---

## Definition of Ready (DoR)

- [x] What / when to use / non-goals written
- [x] Pattern chosen (`single`)
- [x] Parts table N/A (single)
- [x] Behavior: controlled/uncontrolled, defaults, edge cases
- [x] Public API (props, `render`, events)
- [x] A11y + keyboard
- [x] Data attributes / slots
- [x] Headless vs CLI surface
- [x] File map listed (including `*.test.tsx`)
- [x] Out of scope listed
- [x] Open questions empty

---

## What / when / non-goals

**What:** Native-feeling button with optional loading state, `render` polymorphism, and data attributes for styling hooks.

**When:** Actions that submit, trigger, or navigate via a button control.

**Non-goals:** Link-styled-as-button (use `render` / as-child patterns later); button groups; toggle pressed state (Toggle component).

---

## Parts

N/A — single component.

---

## Behavior

- **loading** (`false` default): when true, headless sets `aria-busy` + `aria-disabled` via a11y spec; does **not** force native `disabled` (caller/CLI may). CLI forces `disabled={disabled \|\| loading}` and swaps children for spinner/`loadingText`.
- **disabled**: native disabled; reflected as `data-disabled`.
- **type**: default `"button"`.
- **render**: `useRender` — swap host element while keeping props merge.
- Edge: `loading` + `disabled` both true → both data attrs; a11y loading attrs still apply.

---

## Public API (headless)

| Prop      | Type              | Default    | Notes                          |
| --------- | ----------------- | ---------- | ------------------------------ |
| ref       | Ref               | —          | First in prop order            |
| render    | useRender render  | —          | Polymorphism                   |
| loading   | boolean           | false      | Custom prop                    |
| type      | button type       | `"button"` | Native                         |
| disabled  | boolean           | false      | Native; merged last so it wins |
| className | string            | —          |                                |
| children  | ReactNode         | —          |                                |
| …props    | button HTML attrs | —          | Rest                           |

Prop / `mergeProps` order: `ref`, `render`, custom (`loading`), native (`type`), `disabled`, `className`, `children`, `...props` — then merge a11y + attrs; final `{ disabled }` override as today.

Types: named `ButtonProps` export; consumers may also use `ComponentProps<typeof Button>`. **No** TypeScript `namespace`.

---

## Public API (CLI)

Extends headless props plus:

| Prop        | Type                                               | Default        | Notes                               |
| ----------- | -------------------------------------------------- | -------------- | ----------------------------------- |
| variant     | primary \| secondary \| outline \| ghost \| danger | —              | `data-variant`                      |
| size        | xs \| sm \| md \| lg                               | md             | `data-size`                         |
| iconOnly    | boolean                                            | false          | When true requires `aria-label`     |
| loadingText | string                                             | `"Loading..."` | Shown when loading and not iconOnly |

---

## A11y + keyboard

- Host: native `<button>` (or `render` target); keyboard from platform.
- When `loading`: `aria-busy=true`, `aria-disabled=true` (declarative `buttonA11ySpec`).
- `iconOnly` (CLI): require `aria-label`.
- Loader icon: `aria-hidden`.

---

## Data attributes / slots

Via `applyAttrs("button", buttonAttrStates, state)`:

- `data-slot="button"`, `data-button`
- `data-loading`, `data-disabled` when true

CLI adds: `data-variant`, `data-size`, `data-icon-only`.

---

## Headless vs CLI

| Concern            | Headless | CLI                                |
| ------------------ | -------- | ---------------------------------- |
| Behavior / a11y    | Yes      | Wraps; couples disabled to loading |
| Variants / visuals | No       | Tailwind variants/sizes/loader     |

---

## File map

```
src/package/ui/components/button/
  a11y.ts              # buttonA11ySpec (declarative)
  attrs.ts             # buttonAttrStates
  types.ts
  button.tsx
  index.ts
  button.test.tsx
src/cli/components/button.tsx   # cn + lucide-react imported directly
```

---

## Out of scope

- Toggle / pressed
- Button group
- Async onClick helpers
- Form submission orchestration beyond native `type`

---

## Open questions

_(none)_

---

## Known limits / adversarial cases

| Case | Status | Test / Won’t-fix |
| ---- | ------ | ---------------- |
| Headless `loading` sets `aria-*` but not native `disabled` — still clickable | Won’t-fix | Spec intentional; CLI couples `disabled \|\| loading`. Covered in `button.test.tsx` |
| CLI `iconOnly` without `aria-label` | Won’t-fix | TypeScript discriminated union enforces `aria-label` |
| Link-as-button | Won’t-fix | Out of scope — use `render` |

---

## Review log

| Date | Rival | Break | Verdict |
| ---- | ----- | ----- | ------- |
| 2026-10-31 | Base UI: Adopt (headless + `render` + data attrs). Radix: Adopt with changes (no `asChild` — use `render`). shadcn: Adopt (CLI variants/sizes/loader). MUI: Adopt with changes (small API; no density/theme — intentional headless). | Saboteur: CLI `{...props}` after `disabled` could clear loading-disabled → fixed (spread before). New Hire: `ButtonProps` / `iconOnly` union clear. A11y: headless loading still activatable — documented Won’t-fix. Severity CLEAN after CLI fix. | Shipped |

---

## Build chunks (reconcile)

1. Utils `applyA11y` / `applyAttrs` + migrate headless Button + `button.test.tsx` — done
2. CLI wrappers + disabled/`loading` coupling — done
3. Docs page — done
4. In Review (rival + break once) → Shipped
