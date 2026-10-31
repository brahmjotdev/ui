# Component Name

| Field    | Value                                                                                                                 |
| -------- | --------------------------------------------------------------------------------------------------------------------- |
| Status   | Not Started \| Spec Draft \| Spec Ready \| In Progress \| Completed \| In Review \| Shipped \| Archived \| Deprecated |
| Pattern  | `single` \| `compound`                                                                                                |
| Spec     | `specs/components/<name>.md`                                                                                          |
| Headless | `src/package/ui/components/<name>/`                                                                                   |
| CLI      | `src/cli/components/<name>.tsx` (if any)                                                                              |
| Docs     | `src/app/(content)/components/<name>/`                                                                                |

---

## Definition of Ready (DoR)

Mark **Spec Ready** only when all are checked:

- [ ] What / when to use / non-goals written
- [ ] Pattern chosen (`single` `compound`)
- [ ] Parts table filled (compound) or N/A (single)
- [ ] Behavior: controlled/uncontrolled, defaults, edge cases
- [ ] Public API per part (props, `render`, events)
- [ ] A11y + keyboard
- [ ] Data attributes / slots
- [ ] Headless vs CLI surface
- [ ] File map listed (including `*.test.tsx`)
- [ ] Out of scope listed
- [ ] Open questions empty (or parked with confirmed `[Likely]`/`[Guessing]` defaults)

---

## What / when / non-goals

---

## Parts (compound only)

| Part | Responsibility | Status      | Detail |
| ---- | -------------- | ----------- | ------ |
| Root |                | Not Started |        |
| …    |                |             |        |

**Rollup:** Component status = Completed only when every part is Completed.

---

## Behavior

- Controlled / uncontrolled:
- Defaults:
- Edge cases:

---

## Public API

### Root (or single component)

| Prop | Type | Default | Notes |
| ---- | ---- | ------- | ----- |
|      |      |         |       |

### Other parts

---

## A11y + keyboard

---

## Data attributes / slots

---

## Headless vs CLI

| Concern            | Headless | CLI        |
| ------------------ | -------- | ---------- |
| Behavior / a11y    | Yes      | Wraps only |
| Variants / visuals | No       | Yes        |

---

## File map

**Single:**

```
src/package/ui/components/<name>/
  a11y.ts
  attrs.ts
  types.ts
  <name>.tsx
  index.ts
  <name>.test.tsx
src/cli/components/<name>.tsx   # if styled
```

**Compound:**

```
src/package/ui/components/<name>/
  context/           # types, context.tsx (Provider), hooks, index — sibling, not under root/
  root/              # anatomy files; composes Provider
  <part>/            # trigger, content, … (+ optional part-local hooks.ts)
  index.ts
  <name>.test.tsx
src/cli/components/<name>.tsx
```

---

## Out of scope

---

## Open questions

---

## Known limits / adversarial cases

| Case | Status | Test / Won’t-fix |
| ---- | ------ | ---------------- |
|      |        |                  |

(Filled after rival + break at component Completed.)

---

## Review log

| Date | Rival | Break | Verdict |
| ---- | ----- | ----- | ------- |
|      |       |       |         |
