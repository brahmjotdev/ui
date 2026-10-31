---
name: modern-web-components
description: >-
  Applies modern HTML/CSS/component guidance and challenges anti-patterns when
  designing or implementing UI components, markup, or styles. Use when building
  or reviewing headless/CLI components, docs demos, or any HTML/CSS in this repo.
  Prefer the installed modern-web-guidance skill when available.
---

# Modern web components

## Instructions

1. Before inventing markup/CSS patterns, consult modern web guidance (user/plugin `modern-web-guidance` skill if present).
2. Prefer semantic HTML, progressive enhancement, and accessible defaults over div soup.
3. Challenge outdated patterns (e.g. click-only without keyboard, missing labels, layout hacks).
4. For this library: visuals live in `src/cli`; behavior in `src/package/ui`.
