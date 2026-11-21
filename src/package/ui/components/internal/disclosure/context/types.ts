// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type { Dispatch, ReactNode, SetStateAction } from "react";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface DisclosureContextValue {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  disabled: boolean;
  contentId: string;
}

interface DisclosureProviderProps {
  contextValue: DisclosureContextValue;
  children: ReactNode;
}

interface DisclosureProviderValueParams {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export type {
  DisclosureContextValue,
  DisclosureProviderProps,
  DisclosureProviderValueParams,
};
