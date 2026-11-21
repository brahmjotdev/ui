// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { useScrollAreaThumbState } from "./hooks";
import type { ScrollAreaThumbProps } from "./types";

import { mergeProps, useRender } from "../../../utils";

// ------------------------------------------------
// COMPONENT
// ------------------------------------------------

export function ScrollAreaThumb({
  ref,
  render,
  className,
  children,
  style,
  ...props
}: ScrollAreaThumbProps) {
  const state = useScrollAreaThumbState(ref);

  return useRender({
    defaultTagName: "div",
    ref: state.ref,
    render,
    props: mergeProps(
      {
        className,
        children,
        style: { ...state.style, ...style },
        onPointerDown: state.onPointerDown,
        onPointerMove: state.onPointerMove,
        onPointerUp: state.onPointerUp,
        onPointerCancel: state.onPointerUp,
      },
      state.attrs,
      props,
    ),
  });
}
