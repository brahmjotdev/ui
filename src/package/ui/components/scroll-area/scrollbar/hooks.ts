// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import {
  useEffect,
  useRef,
  type PointerEvent,
  type Ref,
} from "react";

import { readScrollMetrics } from "../content/utils";
import { useScrollAreaContext } from "../context";
import { scrollAreaScrollbarA11y } from "./a11y";
import { scrollAreaScrollbarAttrs } from "./attrs";
import type { ScrollAreaScrollbarProps } from "./types";

import {
  presenceShouldRender,
  useMergeRefs,
  usePresence,
} from "../../../utils";

// ------------------------------------------------
// HOOKS
// ------------------------------------------------

function useScrollAreaScrollbarState({
  orientation,
  keepMounted = false,
  ref,
}: {
  orientation: ScrollAreaScrollbarProps["orientation"];
  keepMounted?: boolean;
  ref?: Ref<HTMLElement>;
}) {
  const ctx = useScrollAreaContext();
  const { registerScrollbar, unregisterScrollbar } = ctx;
  const localRef = useRef<HTMLElement | null>(null);
  const visible = ctx.scrollbarVisible(orientation);
  const { ref: presenceRef, mounted, presenceStates } = usePresence(visible);
  const mergedRef = useMergeRefs([ref, localRef, presenceRef]);
  const shouldRender = presenceShouldRender(visible, mounted, keepMounted);
  const ratio =
    orientation === "vertical" ? ctx.scrollRatioY : ctx.scrollRatioX;

  useEffect(() => {
    registerScrollbar(orientation);
    return () => unregisterScrollbar(orientation);
  }, [orientation, registerScrollbar, unregisterScrollbar]);

  function directionTowardPointer(
    clientX: number,
    clientY: number,
  ): 1 | -1 | null {
    const track = localRef.current;
    const content = ctx.contentRef.current;
    if (!track || !content) return null;

    const rect = track.getBoundingClientRect();
    const metrics = readScrollMetrics(content, ctx.dir);

    if (orientation === "vertical") {
      const thumbStart =
        metrics.scrollRatioY *
        (rect.height - metrics.thumbSizeY * rect.height);
      const thumbEnd = thumbStart + metrics.thumbSizeY * rect.height;
      const y = clientY - rect.top;
      if (y < thumbStart) return -1;
      if (y > thumbEnd) return 1;
      return null;
    }

    const thumbStart =
      metrics.scrollRatioX * (rect.width - metrics.thumbSizeX * rect.width);
    const thumbEnd = thumbStart + metrics.thumbSizeX * rect.width;
    const x = clientX - rect.left;
    if (x < thumbStart) return -1;
    if (x > thumbEnd) return 1;
    return null;
  }

  return {
    ref: mergedRef,
    visible,
    shouldRender,
    inert: visible ? undefined : true,
    attrs: scrollAreaScrollbarAttrs({ orientation, presenceStates }),
    a11y: scrollAreaScrollbarA11y({
      orientation,
      contentId: ctx.contentId,
      valueNow: ratio,
    }),
    onPointerEnter(event: PointerEvent<HTMLElement>) {
      if (event.pointerType === "mouse" || event.pointerType === "pen") {
        ctx.onScrollbarPointerEnter();
      }
    },
    onPointerLeave() {
      ctx.onScrollbarPointerLeave();
    },
    onPointerDown(event: PointerEvent<HTMLElement>) {
      if (event.button !== 0) return;
      const track = localRef.current;
      if (!track) return;

      const target = event.target as HTMLElement;
      if (target.closest('[data-scroll-area-part="thumb"]')) return;

      const direction = directionTowardPointer(event.clientX, event.clientY);
      if (direction === null) return;

      ctx.pageScroll(orientation, direction);
      track.setPointerCapture?.(event.pointerId);
      ctx.setInteracting(true);
    },
    onPointerUp(event: PointerEvent<HTMLElement>) {
      ctx.setInteracting(false);
      try {
        localRef.current?.releasePointerCapture?.(event.pointerId);
      } catch {
        // already released / unsupported
      }
    },
  };
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { useScrollAreaScrollbarState };
