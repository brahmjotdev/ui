// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import type { UIEvent } from "react";

import { useScrollAreaContentState } from "./hooks";
import type { ScrollAreaContentProps } from "./types";

import { mergeProps, useRender } from "../../../utils";

// ------------------------------------------------
// COMPONENT
// ------------------------------------------------

export function ScrollAreaContent({
  ref,
  render,
  className,
  children,
  style,
  onScroll,
  ...props
}: ScrollAreaContentProps) {
  const state = useScrollAreaContentState(ref);

  return useRender({
    defaultTagName: "div",
    ref: state.ref,
    render,
    props: mergeProps(
      {
        id: state.id,
        className,
        children,
        style: {
          overflow: "auto",
          width: "100%",
          height: "100%",
          ...style,
        },
        onScroll: (event: UIEvent<HTMLDivElement>) => {
          state.onScroll(event);
          onScroll?.(event);
        },
      },
      state.attrs,
      props,
    ),
  });
}
