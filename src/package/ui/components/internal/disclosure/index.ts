// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { useDisclosureContext, type DisclosureContextValue } from "./context";
import {
  DisclosureContent,
  type DisclosureContentProps,
  type DisclosureContentSizeCssVars,
} from "./content";
import { DisclosureRoot, type DisclosureRootProps } from "./root";
import { DisclosureTrigger, type DisclosureTriggerProps } from "./trigger";

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export const Disclosure = {
  Root: DisclosureRoot,
  Trigger: DisclosureTrigger,
  Content: DisclosureContent,
};

export type {
  DisclosureRootProps,
  DisclosureTriggerProps,
  DisclosureContentProps,
  DisclosureContentSizeCssVars,
  DisclosureContextValue,
};

export { useDisclosureContext };
