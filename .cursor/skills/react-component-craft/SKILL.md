---
name: react-component-craft
description: >-
  React 19 and React Compiler-aware patterns for this library (useRender,
  composition, no default memo). Use when writing or reviewing headless or CLI
  React components under src/package/ui or src/cli.
---

# React component craft

## Instructions

1. Follow existing `useRender` + `mergeProps` patterns; do not invent parallel prop systems.
2. React Compiler is enabled — do not add `useMemo`/`useCallback` by default.
3. Prefer composition and context for compound parts over prop drilling.
4. Challenge class components, legacy lifecycle patterns, and unnecessary effects.
5. `"use client"` only when the module needs client hooks/browser APIs.
