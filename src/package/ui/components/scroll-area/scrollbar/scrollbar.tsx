// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import {
  ScrollAreaScrollbarContext,
} from "./context";
import { useScrollAreaScrollbarState } from "./hooks";
import type { ScrollAreaScrollbarProps } from "./types";

import { mergeProps, useRender } from "../../../utils";

// ------------------------------------------------
// COMPONENT
// ------------------------------------------------

export function ScrollAreaScrollbar({
  ref,
  render,
  orientation,
  keepMounted = false,
  className,
  children,
  style,
  ...props
}: ScrollAreaScrollbarProps) {
  const state = useScrollAreaScrollbarState({
    orientation,
    keepMounted,
    ref,
  });

  return (
    <ScrollAreaScrollbarContext.Provider value={{ orientation }}>
      {useRender({
        defaultTagName: "div",
        ref: state.ref,
        render,
        enabled: state.shouldRender,
        props: mergeProps(
          {
            className,
            children,
            style: {
              position: "absolute",
              ...style,
            },
            inert: state.inert,
            onPointerEnter: state.onPointerEnter,
            onPointerLeave: state.onPointerLeave,
            onPointerDown: state.onPointerDown,
            onPointerUp: state.onPointerUp,
            onPointerCancel: state.onPointerUp,
          },
          state.attrs,
          state.a11y,
          props,
        ),
      })}
    </ScrollAreaScrollbarContext.Provider>
  );
}
