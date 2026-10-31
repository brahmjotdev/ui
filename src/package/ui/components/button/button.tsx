// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { buttonA11ySpec } from "./a11y";
import { buttonAttrStates } from "./attrs";
import type { ButtonProps } from "./types";

import { applyA11y, applyAttrs, mergeProps, useRender } from "../../utils";

// ------------------------------------------------
// COMPONENT
// ------------------------------------------------

export function ButtonComponent({
  ref,
  render,
  loading = false,
  type = "button",
  disabled = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return useRender({
    defaultTagName: "button",
    ref,
    render,
    props: mergeProps(
      { type, disabled, className, children },
      applyA11y(buttonA11ySpec, { loading }),
      applyAttrs("button", buttonAttrStates, { loading, disabled }),
      props,
      { disabled },
    ),
  });
}
