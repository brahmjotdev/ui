// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type { ReactNode } from "react";

import type { AccordionType } from "./utils";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface AccordionContextBase {
  disabled: boolean;
  isOpen: (itemValue: string) => boolean;
  toggle: (itemValue: string, open: boolean) => void;
}

type AccordionContextValue =
  | (AccordionContextBase & { type: "single"; value: string })
  | (AccordionContextBase & { type: "multiple"; value: string[] });

interface AccordionProviderProps {
  contextValue: AccordionContextValue;
  children: ReactNode;
}

interface AccordionProviderValueParams {
  type?: AccordionType;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: ((value: string) => void) | ((value: string[]) => void);
  disabled?: boolean;
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export type {
  AccordionContextValue,
  AccordionProviderProps,
  AccordionProviderValueParams,
  AccordionType,
};
