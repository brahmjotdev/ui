# Components

## Status vocabulary

`Not Started` → `Spec Draft` → `Spec Ready` → `In Progress` → `Completed` → `In Review` → `Shipped` → `Archived` | `Deprecated`

- **Spec Ready:** DoR checklist complete in the component MD; code allowed.
- **Completed:** Every part Completed (single: headless + tests done for that surface).
- **In Review:** Rival + break once after Completed; then Shipped.
- Part-level status lives in each component MD; this table is one rollup row per component.

## Current / 0.x (in scope)

| Group | Component   | Status      | Spec                               |
| ----- | ----------- | ----------- | ---------------------------------- |
| -     | Button      | Shipped     | [button.md](./button.md)           |
| -     | Collapsible | Shipped     | [collapsible.md](./collapsible.md) |

**Shared utils (not catalog components):** e.g. `usePresence` at `src/package/ui/utils/use-presence.ts` — no per-util Spec MDs; see package source + tests.

## Backlog (outside current 0.x — do not implement without product scope change)

| Group    | Component    | Status      | Spec                                      |
| -------- | ------------ | ----------- | ----------------------------------------- |
| AI       | Chat         | Not Started |                                           |
| AI       | Context      | Not Started |                                           |
| AI       | JSX          | Not Started |                                           |
| Charts   | Area         | Not Started |                                           |
| Charts   | Bar          | Not Started |                                           |
| Code     | Block        | Not Started |                                           |
| Code     | Inline       | Not Started |                                           |
| Code     | Snippet      | Not Started |                                           |
| Code     | Terminal     | Not Started |                                           |
| Data     | Calendar     | Not Started |                                           |
| Data     | Chart        | Not Started |                                           |
| Data     | Gantt        | Not Started |                                           |
| Data     | Grid         | Not Started |                                           |
| Data     | Kanban       | Not Started |                                           |
| Data     | List         | Not Started |                                           |
| Data     | Map          | Not Started |                                           |
| Data     | Table        | Not Started |                                           |
| Data     | Tree         | Not Started |                                           |
| Inputs   | Checkbox     | Not Started |                                           |
| Inputs   | Choicebox    | Not Started |                                           |
| Inputs   | Color        | Not Started |                                           |
| Inputs   | Combobox     | Not Started |                                           |
| Inputs   | Date Time    | Not Started |                                           |
| Inputs   | Email        | Not Started |                                           |
| Inputs   | File         | Not Started |                                           |
| Inputs   | Number       | Not Started |                                           |
| Inputs   | OTP          | Not Started |                                           |
| Inputs   | Password     | Not Started |                                           |
| Inputs   | Radio        | Not Started |                                           |
| Inputs   | Range        | Not Started |                                           |
| Inputs   | Search       | Not Started |                                           |
| Inputs   | Select       | Not Started |                                           |
| Inputs   | Switch       | Not Started |                                           |
| Inputs   | Tel          | Not Started |                                           |
| Inputs   | Text         | Not Started |                                           |
| Inputs   | Textarea     | Not Started |                                           |
| Inputs   | Url          | Not Started |                                           |
| Media    | Audio        | Not Started |                                           |
| Media    | Image        | Not Started |                                           |
| Media    | Video        | Not Started |                                           |
| -        | Accordion    | Not Started |                                           |
| -        | Alert        | Not Started |                                           |
| -        | Avatar       | Not Started |                                           |
| -        | Badge        | Not Started |                                           |
| -        | Breadcrumb   | Not Started |                                           |
| -        | Button Group | Not Started |                                           |
| -        | Canvas       | Not Started |                                           |
| -        | Card         | Not Started |                                           |
| -        | Carousel     | Not Started |                                           |
| -        | Context Menu | Not Started |                                           |
| -        | Dialog       | Not Started |                                           |
| -        | Drawer       | Not Started |                                           |
| -        | Dropdown     | Not Started |                                           |
| -        | Empty        | Not Started |                                           |
| -        | Field        | Not Started |                                           |
| -        | Form         | Not Started |                                           |
| -        | Hover Card   | Not Started |                                           |
| -        | Input Group  | Not Started |                                           |
| -        | Kbd          | Not Started |                                           |
| -        | Label        | Not Started |                                           |
| -        | Loader       | Not Started |                                           |
| -        | Meter        | Not Started |                                           |
| -        | Popover      | Not Started |                                           |
| -        | Progress     | Not Started |                                           |
| -        | QR Code      | Not Started |                                           |
| -        | Resizeable   | Not Started |                                           |
| -        | Scroll Area  | Not Started |                                           |
| -        | Separator    | Not Started |                                           |
| -        | Skeleton     | Not Started |                                           |
| -        | Speed Dial   | Not Started |                                           |
| -        | Stepper      | Not Started |                                           |
| -        | Swipeable    | Not Started |                                           |
| -        | Tabs         | Not Started |                                           |
| -        | Tag          | Not Started |                                           |
| -        | Text Editor  | Not Started |                                           |
| -        | Timeline     | Not Started |                                           |
| -        | Toast        | Not Started |                                           |
| -        | Toggle       | Not Started |                                           |
| -        | Toggle Group | Not Started |                                           |
| -        | Tour         | Not Started |                                           |
| -        | Tooltip      | Not Started |                                           |
| Internal | Disclosure   | Completed   | [disclosure.md](./internal/disclosure.md) |
| Internal | Floating     | Not Started |                                           |

Details: [components](./) directory. Template: [_template.md](./_template.md).
