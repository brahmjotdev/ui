// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type { DisclosureContextValue } from "../../internal/disclosure";
import type { UseRenderComponentProps } from "../../../utils";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

export type AccordionItemContextValue = DisclosureContextValue;

export interface AccordionItemProps extends UseRenderComponentProps<"div"> {
  value: string;
  disabled?: boolean;
}
