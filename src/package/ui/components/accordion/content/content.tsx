// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { Disclosure } from "../../internal/disclosure";
import { accordionContentAttrs } from "./attrs";
import type { AccordionContentProps } from "./types";

import { mergeProps } from "../../../utils";

// ------------------------------------------------
// CSS VARS
// ------------------------------------------------

const accordionContentSizeCssVars = {
  width: "--accordion-content-width",
  height: "--accordion-content-height",
} as const;

// ------------------------------------------------
// COMPONENT
// ------------------------------------------------

export function AccordionContent({
  keepMounted,
  ...props
}: AccordionContentProps) {
  return (
    <Disclosure.Content
      keepMounted={keepMounted}
      sizeCssVars={accordionContentSizeCssVars}
      {...mergeProps(accordionContentAttrs(), props)}
    />
  );
}
