---
name: grill-spec
description: >-
  One-question-at-a-time DoR interrogation for Spec Draft component MDs until
  Spec Ready. Use when a component spec is incomplete, open questions remain,
  or the user wants to be grilled on a component design. Adapted from Matt
  Pocock grill-me (MIT) via alirezarezvani/claude-skills methodology.
---

# Grill spec

## Instructions

1. Ask **one** question per turn with a **recommended answer** + brief why.
2. Explore the codebase before asking if evidence exists.
3. Walk DoR checklist depth-first until open questions are empty.
4. Park unknowns only with `[Likely]`/`[Guessing]` and user confirm.
5. When DoR is satisfied, set status **Spec Ready** and stop — do not start coding unless asked.
