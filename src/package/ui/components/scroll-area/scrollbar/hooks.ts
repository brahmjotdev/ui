// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { useEffect, useRef, type PointerEvent, type Ref } from "react";

import { useScrollAreaContext } from "../context";
import { pageDirectionAt } from "../context/utils";
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
    if (!track) return null;

    const rect = track.getBoundingClientRect();
    const vertical = orientation === "vertical";

    return pageDirectionAt(
      orientation,
      ctx.dir,
      vertical ? clientY - rect.top : clientX - rect.left,
      vertical ? rect.height : rect.width,
      vertical ? ctx.scrollRatioY : ctx.scrollRatioX,
      vertical ? ctx.thumbSizeY : ctx.thumbSizeX,
    );
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
