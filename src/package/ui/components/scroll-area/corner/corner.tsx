// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { useScrollAreaCornerState } from "./hooks";
import type { ScrollAreaCornerProps } from "./types";

import { mergeProps, useRender } from "../../../utils";

// ------------------------------------------------
// COMPONENT
// ------------------------------------------------

export function ScrollAreaCorner({
  ref,
  render,
  className,
  children,
  style,
  ...props
}: ScrollAreaCornerProps) {
  const state = useScrollAreaCornerState();

  return useRender({
    defaultTagName: "div",
    ref,
    render,
    props: mergeProps(
      {
        className,
        children,
        style: {
          position: "absolute",
          ...style,
          ...(state.visible
            ? undefined
            : { pointerEvents: "none", opacity: 0 }),
        },
      },
      state.attrs,
      props,
    ),
  });
}
