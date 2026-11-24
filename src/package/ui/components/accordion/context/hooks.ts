// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { use } from "react";

import { AccordionContext } from "./context";
import type {
  AccordionContextValue,
  AccordionProviderValueParams,
} from "./types";
import {
  nextOpenValues,
  toDefaultList,
  toOpenList,
  toPublicValue,
  type AccordionType,
} from "./utils";

import { useControllableState } from "../../../utils";

// ------------------------------------------------
// HOOKS
// ------------------------------------------------

function useAccordionProviderValue(
  props: AccordionProviderValueParams,
): AccordionContextValue {
  const type: AccordionType = props.type === "multiple" ? "multiple" : "single";
  const disabled = props.disabled ?? false;
  const onValueChange = props.onValueChange;

  const [openValues, setOpenValues] = useControllableState({
    value: toOpenList(type, props.value),
    defaultValue: toDefaultList(type, props.defaultValue),
    onChange(next) {
      if (type === "single") {
        (onValueChange as ((value: string) => void) | undefined)?.(
          (toPublicValue("single", next) as string) ?? "",
        );
        return;
      }
      (onValueChange as ((value: string[]) => void) | undefined)?.(
        toPublicValue("multiple", next) as string[],
      );
    },
  });

  const value = toPublicValue(type, openValues);

  function toggle(itemValue: string, open: boolean) {
    setOpenValues((current) => nextOpenValues(current, itemValue, open, type));
  }

  function isOpen(itemValue: string) {
    return openValues.includes(itemValue);
  }

  if (type === "single") {
    return {
      type,
      value: value as string,
      disabled,
      isOpen,
      toggle,
    };
  }

  return {
    type,
    value: value as string[],
    disabled,
    isOpen,
    toggle,
  };
}

function useAccordionContext(): AccordionContextValue {
  const context = use(AccordionContext);
  if (!context) {
    throw new Error("Accordion parts must be used within Accordion.Root");
  }
  return context;
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { useAccordionContext, useAccordionProviderValue };
