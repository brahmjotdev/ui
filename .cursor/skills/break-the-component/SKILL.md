---
name: break-the-component
description: >-
  Adversarial pass to find component limits (misuse, a11y, SSR, state races).
  Use once when component status is Completed (In Review), or when the user asks
  to break a component. Feed findings into Vitest or Won’t-fix in the MD.
  Methodology adapted from adversarial-reviewer (MIT).
---

# Break the component

## When

After component **Completed** (all parts), before Shipped. Not per chunk unless asked.

## Personas (each must find ≥1 issue or justify clean with 3 principles satisfied)

1. **Saboteur** — production breaks: double-toggle, controlled without onChange, disabled races.
2. **New Hire** — confusing API, missing docs edge cases, bad composition.
3. **A11y auditor** — keyboard traps, wrong ARIA, focus loss, hidden content still focusable.

## Output

- Severity: BLOCK / CONCERNS / CLEAN (promote when 2+ personas concur).
- Every confirmed break → MD “Known limits” + Vitest case **or** Won’t-fix + reason.
- Record in Review log.

## Attribution

Inspired by [adversarial-reviewer](https://github.com/alirezarezvani/claude-skills/tree/main/engineering-team/skills/adversarial-reviewer) (MIT).
