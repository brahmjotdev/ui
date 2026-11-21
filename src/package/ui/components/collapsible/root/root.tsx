// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { Disclosure } from "../../internal/disclosure";
import { collapsibleRootAttrs } from "./attrs";
import type { CollapsibleRootProps } from "./types";

import { mergeProps } from "../../../utils";

// ------------------------------------------------
// COMPONENT
// ------------------------------------------------

export function CollapsibleRoot(props: CollapsibleRootProps) {
  return <Disclosure.Root {...mergeProps(collapsibleRootAttrs(), props)} />;
}
