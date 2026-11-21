// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { useDisclosureTrigger } from "./hooks";
import type { DisclosureTriggerProps } from "./types";

import { mergeProps, useRender } from "../../../../utils";

// ------------------------------------------------
// COMPONENT
// ------------------------------------------------

export function DisclosureTrigger({
  ref,
  render,
  type = "button",
  disabled: disabledProp,
  className,
  children,
  onClick,
  ...props
}: DisclosureTriggerProps) {
  const trigger = useDisclosureTrigger({
    disabled: disabledProp,
    onClick,
  });

  return useRender({
    defaultTagName: "button",
    ref,
    render,
    props: mergeProps(
      {
        type,
        disabled: trigger.disabled,
        className,
        children,
        onClick: trigger.onClick,
      },
      trigger.a11y,
      trigger.attrs,
      props,
    ),
  });
}
