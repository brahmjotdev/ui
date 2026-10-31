// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type { UseRenderComponentProps } from "../../utils";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

export interface ButtonProps extends UseRenderComponentProps<"button"> {
  loading?: boolean;
}
