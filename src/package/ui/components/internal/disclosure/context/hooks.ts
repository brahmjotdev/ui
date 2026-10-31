// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { use, useId } from "react";

import { DisclosureContext } from "./context";
import type {
  DisclosureContextValue,
  DisclosureProviderValueParams,
} from "./types";

import { useControllableState } from "../../../../utils";

// ------------------------------------------------
// HOOKS
// ------------------------------------------------

function useDisclosureProviderValue({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
}: DisclosureProviderValueParams): DisclosureContextValue {
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const contentId = useId();

  return {
    open,
    setOpen,
    disabled,
    contentId,
  };
}

function useDisclosureContext(): DisclosureContextValue {
  const context = use(DisclosureContext);
  if (!context) {
    throw new Error(
      "Disclosure parts must be used within Disclosure.Root",
    );
  }
  return context;
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { useDisclosureProviderValue, useDisclosureContext };
