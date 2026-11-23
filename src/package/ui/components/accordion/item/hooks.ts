// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { useDisclosureContext } from "../../internal/disclosure";
import { useAccordionContext } from "../context";
import { accordionItemAttrs } from "./attrs";

import type { DisclosureContextValue } from "../../internal/disclosure";

// ------------------------------------------------
// HOOKS
// ------------------------------------------------

function useAccordionItem({
  value,
  disabled = false,
}: {
  value: string;
  disabled?: boolean;
}) {
  const group = useAccordionContext();
  const itemDisabled = group.disabled || disabled;

  return {
    open: group.isOpen(value),
    disabled: itemDisabled,
    attrs: accordionItemAttrs(),
    onOpenChange(open: boolean) {
      if (itemDisabled) return;
      group.toggle(value, open);
    },
  };
}

function useAccordionItemContext(): DisclosureContextValue {
  return useDisclosureContext();
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { useAccordionItem, useAccordionItemContext };
export type { DisclosureContextValue as AccordionItemContextValue };
