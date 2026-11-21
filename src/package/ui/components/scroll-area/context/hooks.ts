// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import {
  use,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import { ScrollAreaContext } from "./context";
import type {
  ScrollAreaContextValue,
  ScrollAreaDir,
  ScrollAreaOrientation,
  ScrollAreaProviderValueParams,
  ScrollMetrics,
} from "./types";

// ------------------------------------------------
// CONSTANTS
// ------------------------------------------------

const INITIAL_METRICS: ScrollMetrics = {
  overflowX: false,
  overflowY: false,
  overflowTop: false,
  overflowBottom: false,
  overflowLeft: false,
  overflowRight: false,
  scrollRatioX: 0,
  scrollRatioY: 0,
  thumbSizeX: 1,
  thumbSizeY: 1,
};

// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface ScrollAreaLatest {
  scrollHideDelay: number;
  dir: ScrollAreaDir;
}

// ------------------------------------------------
// HOOKS
// ------------------------------------------------

function useScrollAreaProviderValue({
  type = "hover",
  scrollHideDelay = 600,
}: ScrollAreaProviderValueParams): ScrollAreaContextValue {
  const contentId = useId();
  const contentRef = useRef<HTMLElement | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [dir, setDirState] = useState<ScrollAreaDir>("ltr");
  const [hovering, setHovering] = useState(false);
  const [scrollbarHovering, setScrollbarHovering] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [metrics, setMetrics] = useState<ScrollMetrics>(INITIAL_METRICS);
  const [scrollbarAxes, setScrollbarAxes] = useState({
    vertical: false,
    horizontal: false,
  });

  const latestRef = useRef<ScrollAreaLatest>({
    scrollHideDelay,
    dir,
  });

  useLayoutEffect(() => {
    latestRef.current = { scrollHideDelay, dir };
  });

  const [api] = useState(() => {
    function clearHideTimer() {
      if (hideTimerRef.current !== null) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    }

    function scheduleHide() {
      clearHideTimer();
      hideTimerRef.current = setTimeout(() => {
        setScrolling(false);
        hideTimerRef.current = null;
      }, latestRef.current.scrollHideDelay);
    }

    function notifyScroll() {
      setScrolling(true);
      scheduleHide();
    }

    function onScrollbarPointerEnter() {
      clearHideTimer();
      setScrollbarHovering(true);
    }

    function onScrollbarPointerLeave() {
      setScrollbarHovering(false);
      notifyScroll();
    }

    const setDir: Dispatch<SetStateAction<ScrollAreaDir>> = (value) => {
      setDirState(value);
    };

    return {
      contentRef,
      setDir,
      setHovering,
      setScrollbarHovering,
      onScrollbarPointerEnter,
      onScrollbarPointerLeave,
      setInteracting,
      notifyScroll,
      setScrollMetrics: setMetrics,
      registerScrollbar(orientation: ScrollAreaOrientation) {
        setScrollbarAxes((prev) =>
          prev[orientation] ? prev : { ...prev, [orientation]: true },
        );
      },
      unregisterScrollbar(orientation: ScrollAreaOrientation) {
        setScrollbarAxes((prev) =>
          !prev[orientation] ? prev : { ...prev, [orientation]: false },
        );
      },
      scrollToRatio(orientation: ScrollAreaOrientation, ratio: number) {
        const element = contentRef.current;
        if (!element) return;
        const clamped = Math.min(1, Math.max(0, ratio));
        if (orientation === "vertical") {
          const max = element.scrollHeight - element.clientHeight;
          element.scrollTop = clamped * max;
        } else {
          const max = element.scrollWidth - element.clientWidth;
          const next = clamped * max;
          element.scrollLeft =
            latestRef.current.dir === "rtl" ? -next : next;
        }
        notifyScroll();
      },
      pageScroll(orientation: ScrollAreaOrientation, direction: 1 | -1) {
        const element = contentRef.current;
        if (!element) return;

        if (orientation === "vertical") {
          const delta = direction * element.clientHeight;
          if (typeof element.scrollBy === "function") {
            element.scrollBy({ top: delta });
          } else {
            element.scrollTop += delta;
          }
        } else {
          const delta = direction * element.clientWidth;
          const signed =
            latestRef.current.dir === "rtl" ? -delta : delta;
          if (typeof element.scrollBy === "function") {
            element.scrollBy({ left: signed });
          } else {
            element.scrollLeft += signed;
          }
        }
        notifyScroll();
      },
    };
  });

  function scrollbarVisible(orientation: ScrollAreaOrientation) {
    const overflow =
      orientation === "vertical" ? metrics.overflowY : metrics.overflowX;
    if (!overflow) return false;
    if (type === "always") return true;
    if (type === "hover") {
      return hovering || scrolling || interacting || scrollbarHovering;
    }
    return scrolling || interacting || scrollbarHovering;
  }

  return {
    type,
    scrollHideDelay,
    contentId,
    contentRef: api.contentRef,
    dir,
    setDir: api.setDir,
    hovering,
    setHovering: api.setHovering,
    scrollbarHovering,
    setScrollbarHovering: api.setScrollbarHovering,
    onScrollbarPointerEnter: api.onScrollbarPointerEnter,
    onScrollbarPointerLeave: api.onScrollbarPointerLeave,
    scrolling,
    interacting,
    setInteracting: api.setInteracting,
    activityState: scrolling || interacting ? "scrolling" : "idle",
    notifyScroll: api.notifyScroll,
    ...metrics,
    setScrollMetrics: api.setScrollMetrics,
    scrollbarVisible,
    cornerVisible:
      scrollbarAxes.vertical &&
      scrollbarAxes.horizontal &&
      metrics.overflowX &&
      metrics.overflowY &&
      (type === "always" ||
        hovering ||
        scrolling ||
        interacting ||
        scrollbarHovering),
    registerScrollbar: api.registerScrollbar,
    unregisterScrollbar: api.unregisterScrollbar,
    hasScrollbar(orientation) {
      return scrollbarAxes[orientation];
    },
    scrollToRatio: api.scrollToRatio,
    pageScroll: api.pageScroll,
  };
}

function useScrollAreaContext(): ScrollAreaContextValue {
  const context = use(ScrollAreaContext);
  if (!context) {
    throw new Error("ScrollArea parts must be used within ScrollArea.Root");
  }
  return context;
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { useScrollAreaContext, useScrollAreaProviderValue };
