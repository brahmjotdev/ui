// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { Disclosure } from "../../internal/disclosure";
import { accordionTriggerAttrs } from "./attrs";
import type { AccordionTriggerProps } from "./types";

import { mergeProps } from "../../../utils";

// ------------------------------------------------
// COMPONENT
// ------------------------------------------------

export function AccordionTrigger(props: AccordionTriggerProps) {
  return <Disclosure.Trigger {...mergeProps(accordionTriggerAttrs(), props)} />;
}
