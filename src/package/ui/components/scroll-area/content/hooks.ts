// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import {
  useLayoutEffect,
  type Ref,
  type UIEvent,
} from "react";

import { useScrollAreaContext } from "../context";
import { scrollAreaContentAttrs } from "./attrs";
import {
  ensureNativeScrollbarHiddenStyles,
  readScrollMetrics,
} from "./utils";

import { useMergeRefs } from "../../../utils";

// ------------------------------------------------
// HOOKS
// ------------------------------------------------

function useScrollAreaContentState(ref?: Ref<HTMLElement>) {
  const ctx = useScrollAreaContext();
  const { contentRef, setScrollMetrics } = ctx;
  const mergedRef = useMergeRefs([ref, contentRef]);

  useLayoutEffect(() => {
    ensureNativeScrollbarHiddenStyles();
  }, []);

  useLayoutEffect(() => {
    const element = contentRef.current;
    if (!element) return undefined;

    function update() {
      if (!element) return;
      setScrollMetrics(readScrollMetrics(element, ctx.dir));
    }

    update();

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(update);
    if (!resizeObserver) return undefined;

    resizeObserver.observe(element);
    for (const child of element.children) {
      resizeObserver.observe(child);
    }

    return () => resizeObserver.disconnect();
  }, [contentRef, ctx.dir, setScrollMetrics]);

  return {
    ref: mergedRef,
    id: ctx.contentId,
    attrs: scrollAreaContentAttrs({
      overflowX: ctx.overflowX,
      overflowY: ctx.overflowY,
      overflowTop: ctx.overflowTop,
      overflowBottom: ctx.overflowBottom,
      overflowLeft: ctx.overflowLeft,
      overflowRight: ctx.overflowRight,
    }),
    onScroll(event: UIEvent<HTMLElement>) {
      const element = event.currentTarget as HTMLElement;
      ctx.setScrollMetrics(readScrollMetrics(element, ctx.dir));
      ctx.notifyScroll();
    },
  };
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { useScrollAreaContentState };
