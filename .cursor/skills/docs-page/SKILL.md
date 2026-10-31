---
name: docs-page
description: >-
  App Router docs pages under src/app that compose src/docs kit components and
  CLI demos. Use when adding or editing component documentation routes.
  Read node_modules/next/dist/docs/ before Next APIs.
---

# Docs page

## Instructions

1. Route: `src/app/(content)/components/<name>/page.tsx` (or agreed app structure).
2. Build page chrome with **`src/docs`** kit components; do not reinvent Preview/Props tables in the page file.
3. Prefer CLI imports for live demos; headless when documenting API.
4. `cn` / icons in docs-kit: direct imports — not via `package/ui/libs`.
5. Read installed Next docs under `node_modules/next/dist/docs/` before using Next APIs.
6. Headless `DocsAPI` prop lists: use `baseProps` from `@/docs` — order is `ref` → optional `render` → component `props` → optional `disabled` / `className` / `children` → `...props` (tag-typed). Opt in with booleans (`render`, `disabled`, `className`, `children`); only `ref` + `...props` are always included. Do not hand-roll those shared rows.
7. Boolean prop defaults: omit `defaultValue` when it is `false` — `Docs.API` treats unset boolean defaults as `false`. Only set `defaultValue` for non-`false` defaults (or non-booleans).
8. `DocsAPI` attr lists: use `baseAttrs` from `@/docs` — always `data-slot` (description = `"<slot>"`) → `data-<slot>` → component `attrs`. Pass kebab `slot` (e.g. `"button"`, `"collapsible-trigger"`). Do not hand-roll the slot / identity rows.
9. Presence lifecycle attrs (`data-open` / `data-closed` / starting… / `data-state`): use `presenceAttrs()` from `@/docs` inside `baseAttrs({ attrs: presenceAttrs() })`. Do not hand-roll those rows.
10. CSS vars: define `cssVars` on the component’s own `api.tsx` using **product** names (e.g. `--collapsible-content-*` from the Collapsible facade). Do not document Disclosure default names (`--disclosure-content-*`) on the Collapsible page. Do not share a cross-component Disclosure helper in `src/docs`.
11. API copy: props use **`detail?: ReactNode` only** (no `description`). Attrs / a11y / css vars use a one-line string **`description`** in the table plus optional **`detail?: ReactNode`** in the expand panel. Author JSX in `api.tsx`; do not use markdown strings.
12. API ref visuals: edit the **DOCS API** block at the bottom of [`src/styles/globals.css`](src/styles/globals.css) (`--docs-api-*` + `.docs-api-*` via `@apply`). Keep it in globals — a separate CSS file with `@apply` fails under `@tailwindcss/turbopack` (unknown utility / missing `@reference`) and wipes page styles.
