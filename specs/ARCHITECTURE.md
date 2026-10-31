# Architecture

## Monorepo layout (single repo)

```
src/
  package/ui/          # Headless publishable surface (@cerevialabs/ui/*)
    components/        # One folder per component
    utils/             # Shared headless helpers
    libs/              # Re-exports of libs used to *build* headless behavior (e.g. Floating UI)
  cli/                 # Styled wrappers / future CLI templates
    components/
  docs/                # Docs-kit UI (Preview, Props table, etc.) used by app pages — not the product library
  app/                 # Docs website routes (Next.js App Router)
  styles/              # Global CSS / tokens
specs/                 # Product, architecture, component contracts
.cursor/rules/         # Agent hard law
.cursor/skills/        # Agent personas / workflows
```

Path aliases ([`tsconfig.json`](../tsconfig.json)):

- `@/*` → `src/*`
- `@cerevialabs/ui/*` → `src/package/ui/*`

Canonical component path: `src/package/ui/components/<name>/` (not `package/components`).

## Boundaries

| From → To                                               | Allowed                                      |
| ------------------------------------------------------- | -------------------------------------------- |
| `cli` → `package/ui`                                    | Yes (wrap headless)                          |
| `app` → `cli`                                           | Yes (demos use styled)                       |
| `app` → `docs`                                          | Yes (page chrome / docs-kit)                 |
| `app` → `package/ui`                                    | Yes when documenting headless API            |
| `docs` → `cli` / `package/ui`                           | Yes when embedding demos                     |
| `docs` → `app/(content)/nav`                            | Yes — footer neighbor lookup only            |
| `package/ui` → `cli`, `app`, or `docs`                  | **No**                                       |
| Headless components → behavior libs (Floating UI, etc.) | **Only** via `package/ui/libs/`              |
| CLI / docs-kit → `cn`, `lucide-react`                   | **Direct** npm imports — **not** via `libs/` |

## `libs/` vs styled deps

- **`package/ui/libs`:** libraries required to implement headless behavior (e.g. `@floating-ui/*` for Popover). Components import from `@cerevialabs/ui/libs/...`, never from the npm package name directly.
- **Not in `libs/`:** `cn`, `lucide-react`, and other styling/icon helpers for CLI or docs-kit — import those directly in `src/cli` / `src/docs`.

## Component patterns

- **Single:** one part, e.g. `<Button />` — flat folder `components/button/` with anatomy files
- **Compound:** part folders + sibling **`context/`** — e.g. `Collapsible.Root` / `.Trigger` / `.Content`
- **Groups:** nest folders, e.g. `components/charts/bar/`

### Compound layout

```
components/collapsible/
  context/                 # shared state — NOT inside root/
    types.ts
    context.tsx            # createContext + Provider
    hooks.ts               # useCollapsibleContext (+ shared hooks)
    index.ts
  root/                    # host + composes Provider (public API stays Root)
    a11y.ts attrs.ts types.ts root.tsx index.ts
    hooks.ts               # optional part-local
  trigger/
    …                      # optional hooks.ts for trigger-only logic
  content/
    …                      # optional hooks.ts / utils.ts for part-local logic
  index.ts                 # parts + named prop types + context hooks
  collapsible.test.tsx
```

- **`context/`** owns the Provider and shared value (open state, ids, disabled, callbacks). No visuals. **Facade alias** (e.g. Collapsible over Disclosure): Spec Ready MD may omit `context.tsx` and only re-export / alias hooks + types.
- **Public API:** still `<Collapsible.Root>` — Root wraps/composes the Provider so consumers do **not** double-wrap with a separate Provider.
- **Public exports:** named prop types and context hooks — **not** TypeScript `namespace` bags. See `.cursor/rules/components/index.mdc`.
- **Shared utils:** live under `package/ui/utils` (e.g. `usePresence`) — not catalog components and **not** Spec Draft MDs. Contract = TypeScript + colocated tests; consumer component MDs name which util they import. Part-local pure helpers stay in that part’s `utils.ts`.
- **Part-local `hooks.ts` / `utils.ts`:** allowed under each part folder when logic is not shared. Hooks use role names (`useXState`, `useXVars`).
- Do **not** put `context.tsx` only under `root/`; the context module is a first-class sibling.

## Headless file anatomy

**Single:** Required `attrs.ts`, `types.ts`, `<name>.tsx`, `index.ts`, `<name>.test.tsx`. Optional: `a11y.ts` (omit when the part has no ARIA of its own), `utils.ts`, `hooks.ts`, `events.ts`.

**Compound parts** (`root/`, `trigger/`, …): same required set per part (file names match the part); `a11y.ts` optional when the part has no ARIA of its own. Shared context lives in `context/` as above.

Attrs/a11y: declarative config + `applyAttrs` / `applyA11y` utils (functions OK when reading context).

## CLI

Styled React files under `src/cli/components/`. Variants, sizes, visuals live here. Behavior and a11y stay in headless. Real CLI binary is post-1.0. Import `cn` / `lucide-react` directly.

## Docs site vs docs kit

- **`src/app`:** routes/pages for the documentation website
- **`src/docs`:** reusable docs-kit components (layout chrome, API tables, preview frames, etc.) that pages compose via `@/docs`
- Prefer CLI imports for live demos on pages
- Site coupling: docs-kit footer may import `@/app/(content)/nav` for prev/next neighbors only

## Testing

- Runner: **Vitest** + Testing Library + jsdom
- Colocate: `src/package/ui/components/<name>/<name>.test.tsx`
- Script: `npm test`
- Required before marking a part/component **Completed**
- Prefer behavior/a11y assertions over className snapshots

## Status rollup

See [components/INDEX.md](./components/INDEX.md). Component **Completed** only when every part is **Completed**. Rival + break once at Completed → In Review → Shipped.
