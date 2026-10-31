// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type { UseRenderComponentProps } from "../../../../utils";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface DisclosureContentSizeCssVars {
  width: string;
  height: string;
}

interface DisclosureContentProps extends UseRenderComponentProps<"div"> {
  keepMounted?: boolean;
  sizeCssVars?: DisclosureContentSizeCssVars;
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export type { DisclosureContentProps, DisclosureContentSizeCssVars };
