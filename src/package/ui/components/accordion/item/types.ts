// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type { UseRenderComponentProps } from "../../../utils";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

export interface AccordionItemProps extends UseRenderComponentProps<"div"> {
  value: string;
  disabled?: boolean;
}
