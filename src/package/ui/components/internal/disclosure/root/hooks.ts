// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import {
  useDisclosureContext,
  useDisclosureProviderValue,
} from "../context";
import { disclosureRootAttrs } from "./attrs";
import type { DisclosureRootProps } from "./types";

// ------------------------------------------------
// HOOKS
// ------------------------------------------------

function useDisclosureRoot({
  open,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  ...hostProps
}: DisclosureRootProps) {
  const contextValue = useDisclosureProviderValue({
    open,
    defaultOpen,
    onOpenChange,
    disabled,
  });

  return { contextValue, hostProps };
}

function useDisclosureRootHost() {
  const { open, disabled } = useDisclosureContext();

  return {
    attrs: disclosureRootAttrs({ open, disabled }),
  };
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { useDisclosureRoot, useDisclosureRootHost };
