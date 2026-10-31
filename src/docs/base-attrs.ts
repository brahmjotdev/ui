// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type { DocsAPIAttr } from "./types";

// ------------------------------------------------
// HELPERS
// ------------------------------------------------

function withOverride(
  attr: DocsAPIAttr,
  override?: Partial<DocsAPIAttr>,
): DocsAPIAttr {
  return override ? { ...attr, ...override, name: attr.name } : attr;
}

// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface BaseAttrsOptions {
  slot: string;
  attrs?: DocsAPIAttr[];
  overrides?: {
    slot?: Partial<DocsAPIAttr>;
    identity?: Partial<DocsAPIAttr>;
  };
}

// ------------------------------------------------
// BASE ATTRS
// ------------------------------------------------

function baseAttrs({
  slot,
  attrs = [],
  overrides,
}: BaseAttrsOptions): DocsAPIAttr[] {
  return [
    withOverride(
      { name: "data-slot", description: `"${slot}"` },
      overrides?.slot,
    ),
    withOverride({ name: `data-${slot}` }, overrides?.identity),
    ...attrs,
  ];
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { baseAttrs };
export type { BaseAttrsOptions };
