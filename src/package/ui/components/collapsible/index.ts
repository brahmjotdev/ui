// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import {
  useCollapsibleContext,
  type CollapsibleContextValue,
} from "./context";
import {
  CollapsibleContent,
  type CollapsibleContentProps,
} from "./content";
import { CollapsibleRoot, type CollapsibleRootProps } from "./root";
import {
  CollapsibleTrigger,
  type CollapsibleTriggerProps,
} from "./trigger";

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export const Collapsible = {
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
};

export type {
  CollapsibleRootProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
  CollapsibleContextValue,
};

export { useCollapsibleContext };
