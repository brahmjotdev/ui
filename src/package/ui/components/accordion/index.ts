// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { useAccordionContext, type AccordionContextValue } from "./context";
import { AccordionContent, type AccordionContentProps } from "./content";
import { AccordionHeader, type AccordionHeaderProps } from "./header";
import {
  AccordionItem,
  useAccordionItemContext,
  type AccordionItemContextValue,
  type AccordionItemProps,
} from "./item";
import { AccordionRoot, type AccordionRootProps } from "./root";
import { AccordionTrigger, type AccordionTriggerProps } from "./trigger";

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Header: AccordionHeader,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};

export type {
  AccordionRootProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionContextValue,
  AccordionItemContextValue,
};

export { useAccordionContext, useAccordionItemContext };
