---
name: typescript-api-surface
description: >-
  Strict public TypeScript API patterns (ComponentProps, named Props interfaces,
  prop order). Use when defining or changing component types.ts, index exports,
  or public props for @cerevialabs/ui.
---

# TypeScript API surface

## Instructions

1. Public props via interfaces in `types.ts`. Expose the component/parts as values; consumers type with **`ComponentProps<typeof Button>`** / **`ComponentProps<typeof Disclosure.Root>`**. Also export named `ButtonProps` / `DisclosureRootProps` for `extends` and docs. **No TypeScript `namespace`.**
2. Do not fake `Component.Props` via runtime objects — types erase; that pattern needs namespaces and fails eslint.
3. Component-owned state hooks: named exports. Never `Component.Hooks`. Cross-component lifecycle (`usePresence`) → `src/package/ui/utils`.
4. Public context: `useXContext` + `XContextValue` named exports.
5. Keep prop order: `ref`, `render`, custom, native, `disabled`, `className`, `children`, `...props`.
6. Prefer `UseRenderComponentProps<"tag">` for polymorphic hosts.
7. Challenge `any`, loose index signatures, and exporting internal helpers as public API.
