# Library principles (sourced lenses)

Cite principles; do not invent verbatim quotes. Confidence: `high` (official docs), `moderate` (widely documented patterns), `low` (inference).

## Base UI

- Headless / unstyled primitives; behavior and a11y in the primitive, styling left to the consumer (`high` — Base UI positioning).
- Composition and predictable prop surfaces over magic variants (`moderate`).

## Radix Themes / Primitives

- Accessible primitives with WAI-ARIA patterns; compose parts via context (`high` — Radix docs).
- `asChild` / slot patterns for polymorphism (`high`).

## shadcn/ui

- Copy-into-project ownership; Tailwind variants; build on accessible primitives (`high` — shadcn docs).
- DX: clear demos, predictable file structure (`moderate`).

## MUI

- Comprehensive component API; theming and density; strong defaults with escape hatches (`high` — MUI docs).
- Risk lens: over-abstraction and prop explosion (`moderate`).
