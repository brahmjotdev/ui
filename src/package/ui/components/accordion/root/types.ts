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

interface AccordionRootMultipleProps extends AccordionRootSharedProps {
  type?: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

interface AccordionRootSingleProps extends AccordionRootSharedProps {
  type: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

type AccordionRootProps = AccordionRootMultipleProps | AccordionRootSingleProps;

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export type {
  AccordionRootMultipleProps,
  AccordionRootProps,
  AccordionRootSharedProps,
  AccordionRootSingleProps,
};
