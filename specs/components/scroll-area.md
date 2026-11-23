# Scroll Area

| Field    | Value                                       |
| -------- | ------------------------------------------- |
| Status   | Shipped                                     |
| Pattern  | `compound`                                  |
| Spec     | `specs/components/scroll-area.md`           |
| Headless | `src/package/ui/components/scroll-area/`    |
| CLI      | `src/cli/components/scroll-area.tsx`        |
| Docs     | `src/app/(content)/components/scroll-area/` |

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
- [x] Open questions empty (parked defaults confirmed)

---

## What / when / non-goals

**What:** Headless overflow region with optional custom scrollbars (track + thumb). Content is a real scrollport; native OS scrollbar chrome is always hidden. Custom bars appear only when `Scrollbar` / `Thumb` are composed.

**When:** Bounded panels, sidebars, code/docs demos, any surface that needs consistent cross-browser scrollbar chrome or hide/show policy — or scrollable content with no visible bars.

**Non-goals:** Virtualization / windowing; scroll-spy / scroll-linked animation API; infinite scroll / pull-to-refresh; replacing every native overflow; horizontal carousel / snap (Carousel later); controlled `scrollTop` / `scrollLeft`.

---

## Parts

| Part      | Responsibility                                                                          | Status    | Detail |
| --------- | --------------------------------------------------------------------------------------- | --------- | ------ |
| context/  | Provider: type, scrollHideDelay, content ref/id, overflow, activity, scrollbar registry | Completed |        |
| Root      | Size host; owns type / scrollHideDelay / activity attrs; pointer hover tracking         | Completed |        |
| Content   | Scrolling element (`overflow`); hide native scrollbar; overflow measure attrs           | Completed |        |
| Scrollbar | Track; required `orientation`; presence mount + `keepMounted`; track page; a11y         | Completed |        |
| Thumb     | Draggable indicator inside Scrollbar                                                    | Completed |        |
| Corner    | Intersection filler when both axes overflow / show bars                                 | Completed |        |

**Rollup:** Component Completed only when every public part is Completed.

**Naming:** **Content** (not Viewport) — aligned with Collapsible/Disclosure.

---

## Behavior

- **Scroll position:** uncontrolled. Content is a native overflow node; consumers use `ref` + `scrollTop` / `scrollTo` / native events. `onScroll` passthrough on Content OK. No controlled `scrollTop` / `scrollLeft` props.
- **Root `type`:** `"hover" | "scroll" | "always"` — default `"hover"`.
  - `hover` — show bars when pointer over Root (incl. bars) or while interacting / scrolling activity.
  - `scroll` — show while scrolling, interacting, or pointer over Scrollbar; after activity ends (incl. Scrollbar pointer leave), hide after `scrollHideDelay`. Pointer over Scrollbar must not hide the bar.
  - `always` — always visible when that axis overflows.
- **Root `scrollHideDelay`:** number, default `600` (ms). Used by `type="scroll"` idle hide and related visibility timing (incl. leave-Scrollbar delay). Public Root prop → context.
- **Scrollbar mount:** `usePresence(open)` where `open === scrollbarVisible(orientation)`; unmount when not open and exit finished unless `keepMounted`. Same `presenceShouldRender` semantics as Collapsible/Disclosure Content. Corner stays opacity / `pointer-events` hide (no presence, no `keepMounted` this pass).
- **Native scrollbar:** always hidden on Content (headless styles). Custom bars only when Scrollbar (+ Thumb) composed; omit Scrollbar ⇒ scrollable with no visible chrome.
- **Headless host styles (minimal):** Root — `position: relative`. Content — `overflow: auto`, `width/height: 100%`. Scrollbar — `position: absolute`. Thumb — no default `position`; offset via `transform: translate3d(...)`; **vertical** → `width: 100%`, `height: var(--scroll-area-thumb-height)`; **horizontal** → `height: 100%`, `width: var(--scroll-area-thumb-width)`. Size CSS vars written on Thumb as percentages of the track.
- **Overflow:** bars for an axis only when that axis overflows (`scrollWidth > clientWidth` / `scrollHeight > clientHeight`).
- **Edge overflow (Content attrs):** presence bools for clipped content per edge — `data-overflow-top` / `bottom` / `left` / `right`. On from **≥1px** off that edge (1px epsilon). Clears within 1px of the opposite end. Horizontal left/right are **physical** edges (`dir` aware: LTR start=left, RTL start=right). Not a scroll-progress / mask API — consumers style fades via CSS. No public `edgeThreshold` prop.
- **Pointer:** Thumb drag (pointer capture) updates Content scroll (instant). Track press (Scrollbar, not Thumb): **page** once toward the press (instant `scrollBy`). Honor `dir` (prop or nearest ancestor) for horizontal thumb position.
- **Activity (Root):** presence-like flags — `idle`, `scrolling`, `hovering`, `interacting` + `data-state` `"idle" | "scrolling"`.
- **Edge:** no Content → no scrollport (document; no required throw). Thumb outside Scrollbar → invalid composition (document).
- **Edge:** Corner only meaningful with both orientations; still optional to compose.

---

## Public API

### Root

| Prop            | Type                              | Default   | Notes             |
| --------------- | --------------------------------- | --------- | ----------------- |
| ref             | Ref                               | —         |                   |
| render          | useRender                         | —         | Default `div`     |
| type            | `"hover" \| "scroll" \| "always"` | `"hover"` | Visibility policy |
| scrollHideDelay | number                            | `600`     | ms; context       |
| className       | string                            | —         |                   |
| children        | ReactNode                         | —         |                   |
| …props          | div attrs                         | —         |                   |

### Content

| Prop      | Type      | Default | Notes                     |
| --------- | --------- | ------- | ------------------------- |
| ref       | Ref       | —       |                           |
| render    | useRender | —       | Default `div`             |
| className | string    | —       |                           |
| children  | ReactNode | —       |                           |
| …props    | div attrs | —       | `onScroll` passthrough OK |

### Scrollbar

| Prop        | Type                         | Default | Notes                                               |
| ----------- | ---------------------------- | ------- | --------------------------------------------------- |
| ref         | Ref                          | —       |                                                     |
| render      | useRender                    | —       | Default `div`                                       |
| orientation | `"vertical" \| "horizontal"` | —       | **Required**                                        |
| keepMounted | boolean                      | `false` | Stay mounted when hidden (Collapsible Content same) |
| className   | string                       | —       |                                                     |
| children    | ReactNode                    | —       | Typically Thumb                                     |
| …props      | div attrs                    | —       |                                                     |

### Thumb

| Prop      | Type      | Default | Notes         |
| --------- | --------- | ------- | ------------- |
| ref       | Ref       | —       |               |
| render    | useRender | —       | Default `div` |
| className | string    | —       |               |
| children  | ReactNode | —       |               |
| …props    | div attrs | —       |               |

### Corner

| Prop      | Type      | Default | Notes         |
| --------- | --------- | ------- | ------------- |
| ref       | Ref       | —       |               |
| render    | useRender | —       | Default `div` |
| className | string    | —       |               |
| children  | ReactNode | —       |               |
| …props    | div attrs | —       |               |

Export: `ScrollArea.Root`, `.Content`, `.Scrollbar`, `.Thumb`, `.Corner` + named prop types (`ScrollAreaRootProps`, …) + `useScrollAreaContext`. **No** TypeScript `namespace`.

---

## A11y + keyboard

- **Content:** real scrollport; wheel / touch / keyboard scrolling stay native once Content or a focusable descendant can receive focus. No invented arrow-key handlers on Root.
- **Scrollbar:** `role="scrollbar"`, `aria-controls` → Content id, `aria-orientation`, `aria-valuemin={0}`, `aria-valuemax={100}`, `aria-valuenow` from scroll ratio. Not in tab order (pointer/drag only).
- **Thumb / Corner:** no extra interactive roles; Thumb is presentational inside the scrollbar.
- Stable ids from Root context (`useId`) unless consumer passes `id` on Content.

---

## Data attributes / slots

Catalog convention (compounds): Root gets `data-slot` + `data-<component>-part="root"`; other parts get only `data-<component>-part="<part>"` (no `data-slot`). Via `applyAttrs` / `dataAttrs` with `{ part }`.

| Part      | Attrs                                                                                                                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Root      | `data-slot="scroll-area"`, `data-scroll-area-part="root"`, `data-type`, activity: `data-idle`, `data-scrolling`, `data-hovering`, `data-interacting`, `data-state` (`idle` \| `scrolling`)             |
| Content   | `data-scroll-area-part="content"`, `data-overflow-x` / `data-overflow-y` (axis can scroll), `data-overflow-top` / `bottom` / `left` / `right` (edge clipped; 1px epsilon; left/right physical + `dir`) |
| Scrollbar | `data-scroll-area-part="scrollbar"`, `data-orientation`, presence lifecycle (`presenceAttrs`): `data-state` (`opening` \| `open` \| `closing` \| `closed`) + open/closed/starting/… flags              |
| Thumb     | `data-scroll-area-part="thumb"`                                                                                                                                                                        |
| Corner    | `data-scroll-area-part="corner"`, `data-state` (`visible` \| `hidden`) — opacity hide; not presence                                                                                                    |

Scrollbar `data-state` is presence lifecycle (like Collapsible Content). Corner `data-state` remains chrome visibility. Both are distinct from Root activity `data-state`.

---

## Public API (CLI)

Same props as headless. No variant or size props.

Visual defaults in `src/cli/components/scroll-area.tsx`:

- Scrollbar: vertical track `w-1` along the right; horizontal track `h-1` along the bottom
- Thumb: rounded, `bg-foreground/25`, hover `bg-foreground/50`
- Root, Content, Corner: `className` passthrough

---

## Headless vs CLI

| Concern            | Headless | CLI                                              |
| ------------------ | -------- | ------------------------------------------------ |
| Behavior / a11y    | Yes      | Wraps                                            |
| Variants / visuals | No       | Default track and thumb chrome; no variant props |
| Docs demos         | —        | CLI import                                       |

---

## File map

```
src/package/ui/components/scroll-area/
  context/
    types.ts
    context.tsx
    hooks.ts
    index.ts
  root/
    attrs.ts types.ts a11y.ts? root.tsx index.ts
  content/
    attrs.ts types.ts content.tsx index.ts
  scrollbar/
    attrs.ts types.ts a11y.ts scrollbar.tsx index.ts
  thumb/
    attrs.ts types.ts thumb.tsx index.ts
  corner/
    attrs.ts types.ts corner.tsx index.ts
  index.ts
  scroll-area.test.tsx
src/cli/components/scroll-area.tsx
src/app/(content)/components/scroll-area/
```

---

## Out of scope

- Virtualization, scroll-spy, infinite scroll
- Controlled scroll position props
- `type="auto"`
- Keyboard-operable Thumb
- Corner presence / `keepMounted` (opacity hide only for now)
- Carousel / snap scrolling

---

## Open questions

_(none — grilling locked)_

---

## Known limits / adversarial cases

| Case                                                                              | Status    | Test / Won’t-fix                                                                                                          |
| --------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------- |
| Horizontal thumb drawn and dragged from the left in `rtl`                         | Fixed     | `thumbTranslatePercent` / `dragScrollRatio` / `pageDirectionAt`; `context/utils.test.ts`                                  |
| Consumer `id` on Content left `aria-controls` on the generated id                 | Fixed     | `scroll-area.test.tsx`                                                                                                    |
| Scrollbar `role="scrollbar"` is pointer-only                                      | Won’t-fix | Spec: no keyboard thumb. Content keeps native scrolling once it or a descendant can take focus. `tabIndex` passes through |
| `dir` is read from computed style when Root mounts                                | Won’t-fix | A later `dir` change needs a remount                                                                                      |
| Thumb drag measures `parentElement` as the track                                  | Won’t-fix | Thumb is a direct child of Scrollbar                                                                                      |
| `data-scrolling` stays through `scrollHideDelay` after the pointer leaves the bar | Won’t-fix | That timer is the scroll-idle hide. It is not a second activity flag                                                      |

---

## Review log

| Date       | Rival                                                                                                                                                                                                                                                                                                                                         | Break                                                                                                                                                                                                                                                                                     | Verdict |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| 2026-11-23 | Base UI: Adopt with changes (headless behavior; Content is not forced into tab order — `tabIndex` passes through). Radix: Adopt with changes (`render`, not `asChild`; scrollbar stays pointer-only per spec). shadcn: Adopt (CLI track/thumb chrome, demo + API page). MUI: Adopt with changes (no theme or density — intentional headless). | Saboteur: rtl thumb geometry and consumer content `id` were wrong → fixed and tested. New Hire: drag assumes Thumb is a direct child of Scrollbar — documented. A11y: hidden scrollbar is `inert`; keyboard scrolling stays on the native scrollport. Severity CLEAN after the two fixes. | Shipped |

---

## Build chunks (after Spec Ready + go)

1. Attrs util (`dataAttrs` / `applyAttrs` part option) + Collapsible/Disclosure migration + rules/docs `baseAttrs`
2. Scroll Area context + Root
3. Content
4. Scrollbar + Thumb
5. Corner + visibility wiring
6. Tests + docs page + CLI demo
