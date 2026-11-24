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
3. Before the API freezes, do a library pass (`library-pass.mdc`): current Base UI and Radix docs, plus one of React Aria, Ark UI, or MUI. Record basics we will ship and nice-to-haves we will not, with a one-line why, in the component MD. Cite the doc. Do not invent props. Leave out a feature that fights a locked decision or a current platform guide.
4. Walk DoR checklist depth-first until open questions are empty.
5. Park unknowns only with `[Likely]`/`[Guessing]` and user confirm.
6. When DoR is satisfied, set status **Spec Ready** and stop — do not start coding unless asked.
