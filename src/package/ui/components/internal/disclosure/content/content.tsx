// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import {
  useDisclosureContentSize,
  useDisclosureContentState,
} from "./hooks";
import type { DisclosureContentProps } from "./types";

import { mergeProps, useMergeRefs, useRender } from "../../../../utils";

// ------------------------------------------------
// COMPONENT
// ------------------------------------------------

export function DisclosureContent({
  ref,
  render,
  keepMounted = false,
  sizeCssVars,
  style,
  className,
  children,
  ...props
}: DisclosureContentProps) {
  const state = useDisclosureContentState({ keepMounted });
  const mergedRef = useMergeRefs([ref, state.presenceRef]);
  useDisclosureContentSize({
    open: state.open,
    mounted: state.mounted,
    shouldRender: state.shouldRender,
    elementRef: state.presenceRef,
    sizeCssVars,
  });

  return useRender({
    defaultTagName: "div",
    ref: mergedRef,
    render,
    enabled: state.shouldRender,
    props: mergeProps(
      { style, className, children, inert: state.inert },
      state.a11y,
      state.attrs,
      props,
    ),
  });
}
