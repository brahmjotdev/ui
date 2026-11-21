// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { Disclosure } from "../../internal/disclosure";
import { collapsibleTriggerAttrs } from "./attrs";
import type { CollapsibleTriggerProps } from "./types";

import { mergeProps } from "../../../utils";

// ------------------------------------------------
// COMPONENT
// ------------------------------------------------

export function CollapsibleTrigger(props: CollapsibleTriggerProps) {
  return (
    <Disclosure.Trigger {...mergeProps(collapsibleTriggerAttrs(), props)} />
  );
}
