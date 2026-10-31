---
name: new-cli-wrapper
description: >-
  Styled CLI wrappers over headless components (variants, sizes, data-attrs,
  Tailwind). Use when creating or editing files under src/cli/components.
---

# New CLI wrapper

## Instructions

1. Wrap `@cerevialabs/ui` headless export; do not reimplement behavior.
2. Variants/sizes via Tailwind + `data-*` hooks; import `cn` / `lucide-react` **directly** (not via `libs/`).
3. Couple loading→disabled only when the component spec says so (Button does).
4. JSX prop order (later wins): `{...props}` first, then CLI-owned attrs (`data-*`, `loading`, `disabled={disabled || loading}`, `render`, `className={cn(..., className)}`). Never put `{...props}` after owned locks.
5. No colocated Vitest by default; headless owns the contract.
