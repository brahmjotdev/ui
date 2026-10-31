// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type { DocsAPIAttr } from "./types";

// ------------------------------------------------
// PRESENCE ATTRS
// ------------------------------------------------

const presenceAttrChildren: DocsAPIAttr[] = [
  {
    name: "data-state",
    description: '"opening" | "open" | "closing" | "closed"',
  },
  { name: "data-open" },
  { name: "data-closed" },
  { name: "data-animating" },
  { name: "data-idle" },
  { name: "data-starting" },
  { name: "data-started" },
  { name: "data-ending" },
  { name: "data-ended" },
  { name: "data-hidden" },
];

export function presenceAttrs(extra: DocsAPIAttr[] = []): DocsAPIAttr[] {
  return [
    {
      name: "...presenceAttrs",
      description:
        "List of all other attrs passed by presence. Click to expand.",
      children: [...presenceAttrChildren, ...extra],
    },
  ];
}
