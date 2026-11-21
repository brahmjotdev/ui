---
name: a11y-component
description: >-
  Accessibility for single and compound components (roles, ARIA, keyboard,
  focus). Use when writing a11y.ts, implementing interactive parts, or reviewing
  headless components for WCAG. Point at a11y-audit methodology when available.
---

# A11y component

## Instructions

1. Native semantics first (`button`, `a`); ARIA only when needed.
2. Compound: wire `aria-expanded`, `aria-controls`, ids via context. If a peer unmounts (app-composed exclusive swap via `usePresence`), document orphaned ARIA refs.
3. Keyboard: Enter/Space for buttons; document focus order in the spec MD.
4. Loading/disabled: reflect in ARIA and data attrs per component spec.
5. Challenge missing labels, click-only controls, and aria that fights native roles.
6. Prefer declarative `applyA11y` maps; functions when context/ids required.
