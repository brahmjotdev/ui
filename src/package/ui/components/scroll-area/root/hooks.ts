// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import {
  useLayoutEffect,
  useRef,
  type PointerEvent,
  type Ref,
} from "react";

import {
  useScrollAreaContext,
  useScrollAreaProviderValue,
} from "../context";
import { scrollAreaRootAttrs } from "./attrs";
import type { ScrollAreaRootProps } from "./types";

import { useMergeRefs } from "../../../utils";

// ------------------------------------------------
// HOOKS
// ------------------------------------------------

function useScrollAreaRoot({
  type = "hover",
  scrollHideDelay = 600,
  ...hostProps
}: ScrollAreaRootProps) {
  const contextValue = useScrollAreaProviderValue({ type, scrollHideDelay });
  return { contextValue, hostProps };
}

function useScrollAreaRootHost(ref?: Ref<HTMLElement>) {
  const ctx = useScrollAreaContext();
  const { setDir } = ctx;
  const localRef = useRef<HTMLElement | null>(null);
  const mergedRef = useMergeRefs([ref, localRef]);

  useLayoutEffect(() => {
    const element = localRef.current;
    if (!element) return;
    const computed = getComputedStyle(element).direction;
    if (computed === "rtl" || computed === "ltr") {
      setDir(computed);
    }
  }, [setDir]);

  return {
    ref: mergedRef,
    attrs: scrollAreaRootAttrs({
      type: ctx.type,
      idle: ctx.activityState === "idle",
      scrolling: ctx.scrolling || ctx.interacting,
      hovering: ctx.hovering,
      interacting: ctx.interacting,
      activityState: ctx.activityState,
    }),
    onPointerEnter(event: PointerEvent<HTMLElement>) {
      if (event.pointerType === "mouse" || event.pointerType === "pen") {
        ctx.setHovering(true);
      }
    },
    onPointerLeave() {
      ctx.setHovering(false);
    },
  };
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { useScrollAreaRoot, useScrollAreaRootHost };
