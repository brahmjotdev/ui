// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { Disclosure } from "../../internal/disclosure";
import { collapsibleContentAttrs } from "./attrs";
import type { CollapsibleContentProps } from "./types";

import { mergeProps } from "../../../utils";

// ------------------------------------------------
// CSS VARS
// ------------------------------------------------

const collapsibleContentSizeCssVars = {
  width: "--collapsible-content-width",
  height: "--collapsible-content-height",
} as const;

// ------------------------------------------------
// COMPONENT
// ------------------------------------------------

export function CollapsibleContent({
  keepMounted,
  ...props
}: CollapsibleContentProps) {
  return (
    <Disclosure.Content
      keepMounted={keepMounted}
      sizeCssVars={collapsibleContentSizeCssVars}
      {...mergeProps(collapsibleContentAttrs(), props)}
    />
  );
}
