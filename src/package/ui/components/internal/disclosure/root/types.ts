// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type { UseRenderComponentProps } from "../../../../utils";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

export interface DisclosureRootProps extends UseRenderComponentProps<"div"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}
