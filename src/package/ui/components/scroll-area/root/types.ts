// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type { UseRenderComponentProps } from "../../../utils";
import type { ScrollAreaType } from "../context";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

export interface ScrollAreaRootProps extends UseRenderComponentProps<"div"> {
  type?: ScrollAreaType;
  scrollHideDelay?: number;
}
