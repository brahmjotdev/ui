// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { useAccordionContext, useAccordionProviderValue } from "../context";
import { accordionRootAttrs } from "./attrs";
import type { AccordionRootProps } from "./types";

// ------------------------------------------------
// HOOKS
// ------------------------------------------------

function useAccordionRoot(props: AccordionRootProps) {
  const contextValue = useAccordionProviderValue({
    type: props.type,
    value: props.value,
    defaultValue: props.defaultValue,
    onValueChange: props.onValueChange,
    disabled: props.disabled,
  });

  const hostProps = { ...props };
  delete hostProps.type;
  delete hostProps.value;
  delete hostProps.defaultValue;
  delete hostProps.onValueChange;
  delete hostProps.disabled;

  return { contextValue, hostProps };
}

function useAccordionRootHost() {
  const { type, disabled } = useAccordionContext();

  return {
    attrs: accordionRootAttrs({ type, disabled }),
  };
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { useAccordionRoot, useAccordionRootHost };
