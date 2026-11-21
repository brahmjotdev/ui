// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { useDisclosureContext } from "../../internal/disclosure";

import type { CollapsibleContextValue } from "./types";

// ------------------------------------------------
// HOOKS
// ------------------------------------------------

export function useCollapsibleContext(): CollapsibleContextValue {
  return useDisclosureContext();
}
