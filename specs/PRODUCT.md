# Product

## Problem

Teams need a broad, accessible React component set that is headless by default and easy for both humans and AI agents to extend—without locking styles into the npm package.

## Who

- Product engineers building React + TypeScript apps
- Design-system owners who want copyable styled variants
- AI coding agents that must follow a strict component anatomy

## Versioning

- **Current package:** `0.2.0` — first real slice (Button + Collapsible + CLI wrappers + docs + agent rules). Not a major release.
- **While building the catalog (0.x):** each shipped component or meaningful library change → **minor** bump (`0.3.0`, `0.4.0`, …). Patches for fixes within a slice.
- **`1.0.0` only when:** the full component catalog in [INDEX.md](./components/INDEX.md) has package + CLI ready. That is the first major “ready” release.
- Do not call the Button/Collapsible milestone v1 / 1.0 — that label is reserved for full-catalog readiness.

## Success (current / 0.x slice)

- Ship **Button** (single) and **Collapsible** (compound) as headless package components
- Ship shared utils including **`usePresence`** (lifecycle; not a catalog component)
- Ship styled variants under `src/cli` for Button and Collapsible
- Ship docs pages in this Next.js app for those components
- Spec-first workflow enforced: no component code without a Spec Ready MD
- Internal **Disclosure** supports Collapsible (and later Accordion); not a public catalog product

## Current / 0.x in scope

- Headless: Button, Collapsible
- Util: `usePresence` (+ helpers) under `src/package/ui/utils` — used by Disclosure and later Floating/overlays
- Internal: Disclosure (composed by Collapsible; not docs/CLI product)
- CLI styled wrappers for Button, Collapsible
- Docs site pages for Button, Collapsible (`src/app` + docs-kit under `src/docs`)
- Shared utils (`mergeProps`, `useRender`, `dataAttrs`, `applyA11y`, `applyAttrs`, `useControllableState`, `usePresence`, …)
- Vitest colocated with headless components and utils
- Agent rules + skills for build-from-MD workflow

## Current / 0.x out of scope

- **Presence compound component** (`Presence.Root` / `.Trigger` / `.Content`) — deleted; use util + composition
- Rest of the component catalog in [INDEX.md](./components/INDEX.md) (backlog only)
- Real CLI binary / `npx` install pipeline / npm publish
- Fallow or other codebase-intelligence gates
- Design-token theming beyond existing CSS variables

## Non-goals

- Matching every competitor feature in the current slice
- Card-heavy marketing docs site
- Replacing Next.js `AGENTS.md` auto-notice

## Stack

- React 19, Next.js 16 (App Router), TypeScript (strict)
- Tailwind CSS 4, React Compiler
- Vitest + Testing Library for headless tests

## Distribution model (intent)

- **Headless** via `@cerevialabs/ui` (source today under `src/package/ui`)
- **Styled** via CLI templates under `src/cli` (tooling later)
