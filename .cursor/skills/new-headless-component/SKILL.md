---
name: new-headless-component
description: >-
  Primary skill for build-from-MD: read a Spec Ready specs/components/*.md,
  present a chunked plan, implement one chunk with anatomy rules, update INDEX
  and part statuses. Use when the user asks to build a component from its spec.
---

# New headless component (build from MD)

## Instructions

1. Confirm MD status is **Spec Ready** (DoR). If Spec Draft, run `grill-spec` instead.
2. Read the MD as the product contract (+ library rules/skills).
3. Present ordered chunks; wait for “do chunk N.” One chunk per turn.
4. Implement under `src/package/ui/components/<name>/` per anatomy rules.
5. Update part statuses in the MD and rollup in `specs/components/INDEX.md`.
6. After all parts **Completed**: move component to Completed → In Review → run rival + break once → Shipped.
7. Challenge outdated requests in the MD in the chunk plan before coding.
