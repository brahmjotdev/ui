// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { use, useId, useLayoutEffect, useRef, useState } from "react";

import { ScrollAreaContext } from "./context";
import type {
  ScrollAreaContextValue,
  ScrollAreaDir,
  ScrollAreaOrientation,
  ScrollAreaProviderValueParams,
  ScrollMetrics,
} from "./types";
import {
  axisOverflow,
  cornerShown,
  pageScrollOn,
  pointerActive,
  scrollToRatioOn,
  scrollbarShown,
  type ScrollbarAxes,
} from "./utils";

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

const INITIAL_AXES: ScrollbarAxes = {
  vertical: false,
  horizontal: false,
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

function useScrollLatest(scrollHideDelay: number, dir: ScrollAreaDir) {
  const latestRef = useRef<ScrollAreaLatest>({ scrollHideDelay, dir });

  useLayoutEffect(() => {
    latestRef.current = { scrollHideDelay, dir };
  });

  return latestRef;
}

function useScrollActivity(latestRef: { current: ScrollAreaLatest }) {
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [scrolling, setScrolling] = useState(false);
  const [scrollbarHovering, setScrollbarHovering] = useState(false);

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

    return {
      notifyScroll,
      onScrollbarPointerEnter,
      onScrollbarPointerLeave,
    };
  });

  return {
    scrolling,
    scrollbarHovering,
    setScrollbarHovering,
    ...api,
  };
}

function useScrollbarAxes() {
  const [axes, setAxes] = useState<ScrollbarAxes>(INITIAL_AXES);

  const [api] = useState(() => ({
    registerScrollbar(orientation: ScrollAreaOrientation) {
      setAxes((prev) =>
        prev[orientation] ? prev : { ...prev, [orientation]: true },
      );
    },
    unregisterScrollbar(orientation: ScrollAreaOrientation) {
      setAxes((prev) =>
        prev[orientation] ? { ...prev, [orientation]: false } : prev,
      );
    },
  }));

  return { axes, ...api };
}

function useScrollCommands(
  contentRef: { current: HTMLElement | null },
  latestRef: { current: ScrollAreaLatest },
  notifyScroll: () => void,
) {
  const [api] = useState(() => ({
    scrollToRatio(orientation: ScrollAreaOrientation, ratio: number) {
      const element = contentRef.current;
      if (!element) return;
      scrollToRatioOn(element, orientation, ratio, latestRef.current.dir);
      notifyScroll();
    },
    pageScroll(orientation: ScrollAreaOrientation, direction: 1 | -1) {
      const element = contentRef.current;
      if (!element) return;
      pageScrollOn(element, orientation, direction, latestRef.current.dir);
      notifyScroll();
    },
  }));

  return api;
}

function useScrollAreaProviderValue({
  type = "hover",
  scrollHideDelay = 600,
}: ScrollAreaProviderValueParams): ScrollAreaContextValue {
  const autoContentId = useId();
  const [contentId, setContentId] = useState(autoContentId);
  const contentRef = useRef<HTMLElement | null>(null);
  const [dir, setDir] = useState<ScrollAreaDir>("ltr");
  const [hovering, setHovering] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [metrics, setScrollMetrics] = useState<ScrollMetrics>(INITIAL_METRICS);

  const latestRef = useScrollLatest(scrollHideDelay, dir);
  const activity = useScrollActivity(latestRef);
  const axes = useScrollbarAxes();
  const commands = useScrollCommands(
    contentRef,
    latestRef,
    activity.notifyScroll,
  );

  const active = pointerActive(
    activity.scrolling,
    interacting,
    activity.scrollbarHovering,
  );
  const shown = scrollbarShown(type, hovering, active);

  return {
    type,
    scrollHideDelay,
    autoContentId,
    contentId,
    setContentId,
    contentRef,
    dir,
    setDir,
    hovering,
    setHovering,
    scrollbarHovering: activity.scrollbarHovering,
    setScrollbarHovering: activity.setScrollbarHovering,
    onScrollbarPointerEnter: activity.onScrollbarPointerEnter,
    onScrollbarPointerLeave: activity.onScrollbarPointerLeave,
    scrolling: activity.scrolling,
    interacting,
    setInteracting,
    activityState: activity.scrolling || interacting ? "scrolling" : "idle",
    notifyScroll: activity.notifyScroll,
    ...metrics,
    setScrollMetrics,
    scrollbarVisible(orientation) {
      return axisOverflow(metrics, orientation) && shown;
    },
    cornerVisible: cornerShown(axes.axes, metrics, shown),
    registerScrollbar: axes.registerScrollbar,
    unregisterScrollbar: axes.unregisterScrollbar,
    hasScrollbar(orientation) {
      return axes.axes[orientation];
    },
    scrollToRatio: commands.scrollToRatio,
    pageScroll: commands.pageScroll,
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
