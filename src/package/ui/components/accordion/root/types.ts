// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type { UseRenderComponentProps } from "../../../utils";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface AccordionRootSharedProps extends UseRenderComponentProps<"div"> {
  disabled?: boolean;
}

interface AccordionRootSingleProps extends AccordionRootSharedProps {
  type?: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

interface AccordionRootMultipleProps extends AccordionRootSharedProps {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

type AccordionRootProps = AccordionRootSingleProps | AccordionRootMultipleProps;

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export type {
  AccordionRootMultipleProps,
  AccordionRootProps,
  AccordionRootSharedProps,
  AccordionRootSingleProps,
};
