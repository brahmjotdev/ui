// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import {
  useRef,
  type CSSProperties,
  type PointerEvent,
  type Ref,
} from "react";

import { useScrollAreaContext } from "../context";
import { useScrollAreaScrollbarContext } from "../scrollbar";
import { scrollAreaThumbAttrs } from "./attrs";

import { useMergeRefs } from "../../../utils";

// ------------------------------------------------
// CONSTANTS
// ------------------------------------------------

const THUMB_HEIGHT_VAR = "--scroll-area-thumb-height";
const THUMB_WIDTH_VAR = "--scroll-area-thumb-width";

// ------------------------------------------------
// HOOKS
// ------------------------------------------------

function useScrollAreaThumbState(ref?: Ref<HTMLElement>) {
  const ctx = useScrollAreaContext();
  const { orientation } = useScrollAreaScrollbarContext();
  const localRef = useRef<HTMLElement | null>(null);
  const mergedRef = useMergeRefs([ref, localRef]);
  const dragRef = useRef<{
    pointerId: number;
    startPos: number;
    startRatio: number;
  } | null>(null);

  const thumbSize =
    orientation === "vertical" ? ctx.thumbSizeY : ctx.thumbSizeX;
  const scrollRatio =
    orientation === "vertical" ? ctx.scrollRatioY : ctx.scrollRatioX;
  const translatePercent =
    thumbSize <= 0 ? 0 : scrollRatio * (1 / thumbSize - 1) * 100;
  const sizePercent = `${thumbSize * 100}%`;

  const style: CSSProperties =
    orientation === "vertical"
      ? {
          width: "100%",
          height: `var(${THUMB_HEIGHT_VAR})`,
          transform: `translate3d(0, ${translatePercent}%, 0)`,
          ...({ [THUMB_HEIGHT_VAR]: sizePercent } as CSSProperties),
        }
      : {
          height: "100%",
          width: `var(${THUMB_WIDTH_VAR})`,
          transform: `translate3d(${translatePercent}%, 0, 0)`,
          ...({ [THUMB_WIDTH_VAR]: sizePercent } as CSSProperties),
        };

  function onPointerDown(event: PointerEvent<HTMLElement>) {
    if (event.button !== 0) return;
    event.stopPropagation();
    const thumb = localRef.current;
    if (!thumb) return;
    thumb.setPointerCapture(event.pointerId);
    ctx.setInteracting(true);
    dragRef.current = {
      pointerId: event.pointerId,
      startPos: orientation === "vertical" ? event.clientY : event.clientX,
      startRatio: scrollRatio,
    };
  }

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const track = localRef.current?.parentElement;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const trackSize = orientation === "vertical" ? rect.height : rect.width;
    const thumbPx = thumbSize * trackSize;
    const movable = Math.max(1, trackSize - thumbPx);
    const current = orientation === "vertical" ? event.clientY : event.clientX;
    const delta = (current - drag.startPos) / movable;
    ctx.scrollToRatio(orientation, drag.startRatio + delta);
  }

  function onPointerUp(event: PointerEvent<HTMLElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    ctx.setInteracting(false);
    try {
      localRef.current?.releasePointerCapture(event.pointerId);
    } catch {
      // already released
    }
  }

  return {
    ref: mergedRef,
    attrs: scrollAreaThumbAttrs(),
    style,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { useScrollAreaThumbState };
