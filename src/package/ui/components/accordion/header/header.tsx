// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { accordionHeaderAttrs } from "./attrs";
import type { AccordionHeaderProps } from "./types";

import { mergeProps, useRender } from "../../../utils";

// ------------------------------------------------
// COMPONENT
// ------------------------------------------------

export function AccordionHeader({
  ref,
  render,
  className,
  children,
  ...props
}: AccordionHeaderProps) {
  return useRender({
    defaultTagName: "h3",
    ref,
    render,
    props: mergeProps({ className, children }, accordionHeaderAttrs(), props),
  });
}
