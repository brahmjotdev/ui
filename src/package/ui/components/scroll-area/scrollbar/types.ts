// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type { UseRenderComponentProps } from "../../../utils";
import type { ScrollAreaOrientation } from "../context";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

export interface ScrollAreaScrollbarProps
  extends UseRenderComponentProps<"div"> {
  orientation: ScrollAreaOrientation;
  keepMounted?: boolean;
}
