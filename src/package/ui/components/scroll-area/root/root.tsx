// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { ScrollAreaProvider } from "../context";
import { useScrollAreaRoot, useScrollAreaRootHost } from "./hooks";
import type { ScrollAreaRootProps } from "./types";

import { mergeProps, useRender } from "../../../utils";

// ------------------------------------------------
// HOST
// ------------------------------------------------

function ScrollAreaRootHost({
  ref,
  render,
  className,
  children,
  style,
  ...props
}: Omit<ScrollAreaRootProps, "type" | "scrollHideDelay">) {
  const { ref: hostRef, attrs, onPointerEnter, onPointerLeave } =
    useScrollAreaRootHost(ref);

  return useRender({
    defaultTagName: "div",
    ref: hostRef,
    render,
    props: mergeProps(
      {
        className,
        children,
        style: { position: "relative", ...style },
        onPointerEnter,
        onPointerLeave,
      },
      attrs,
      props,
    ),
  });
}

// ------------------------------------------------
// COMPONENT
// ------------------------------------------------

export function ScrollAreaRoot(props: ScrollAreaRootProps) {
  const { contextValue, hostProps } = useScrollAreaRoot(props);

  return (
    <ScrollAreaProvider contextValue={contextValue}>
      <ScrollAreaRootHost {...hostProps} />
    </ScrollAreaProvider>
  );
}
