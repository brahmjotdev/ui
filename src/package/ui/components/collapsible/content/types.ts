// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type { DisclosureContentProps } from "../../internal/disclosure";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

export type CollapsibleContentProps = Omit<
  DisclosureContentProps,
  "sizeCssVars"
>;
