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
7. Boolean prop defaults: omit `defaultValue` when it is `false` — `Docs.API` treats unset boolean defaults as `false`. Only set `defaultValue` for non-`false` defaults (or non-booleans). String defaults: include quotes in the value (e.g. `'"hover"'`) so `TypeTokens` paints them as `string`. Number defaults: pass a number (e.g. `600`) so they tokenize as `literal`. Token theme: `keyword` / `string` / `literal` share one color (`true`/`false` are keywords) so defaults match their type.
8. `DocsAPI` attr lists: use `baseAttrs` from `@/docs`. **Singles:** `baseAttrs({ slot: "button", attrs })` → `data-slot` (identity) → `attrs`. **Compounds:** `baseAttrs({ component: "collapsible", part: "root" | "trigger" | …, attrs })` → Root gets `data-slot` (identity) + `data-<component>-part` (part identity); other parts get only `data-<component>-part` (no `data-slot`). Do not emit `data-<slot>` boolean markers. Do not hand-roll those rows.
9. Shared boolean attrs: import catalog rows from `@/docs` — `disabledAttr`, `loadingAttr`, `openAttr` — instead of re-authoring the same `data-*` description. Presence lifecycle attrs (`data-open` / `data-closed` / starting… / `data-state`): use `presenceAttrs()` inside `baseAttrs({ attrs: presenceAttrs() })`. Expands to a bullet list (`name` + optional description); no prose description on the parent. Implementation lives in `src/docs/base/attrs.tsx`. Do not hand-roll those rows.
10. CSS vars: define `cssVars` on the component’s own `api.tsx` using **product** names (e.g. `--collapsible-content-*` from the Collapsible facade). Do not document Disclosure default names (`--disclosure-content-*`) on the Collapsible page. Do not share a cross-component Disclosure helper in `src/docs`.
11. API copy: one field, **`description?: ReactNode`**, on props, attrs, a11y, and css vars. No `detail` field. Props show it in the labeled Description panel. Attrs / a11y / css vars: the row body renders `description`. A string that looks like a type (`"button"`, unions, quotes, or `|`) is tokenized; other strings and JSX render as prose. A fragment may hold a type string and prose together; each part renders on its own. Author JSX in `api.tsx`; do not use markdown strings. The prose panel’s DOM hook stays `data-api-detail`.
12. Docs kit layout: `src/docs` chrome (`page` / `header` / `body` / `section` / `footer` / `demo`) + `base/` (props/attrs helpers) + `api/` (`ref`, `type-tokens`, `compose`) + [`src/docs/styles.css`](src/docs/styles.css). Wire styles from [`src/styles/globals.css`](src/styles/globals.css) via `@import "../docs/styles.css"`. Docs CSS must start with `@reference "../styles/theme.css";` (theme-only — **not** `globals.css`, which would recurse because globals imports docs). Without `@reference`, `@apply` fails under `@tailwindcss/turbopack` and wipes page styles.
