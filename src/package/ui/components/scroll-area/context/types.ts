// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type { Dispatch, ReactNode, RefObject, SetStateAction } from "react";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

type ScrollAreaType = "hover" | "scroll" | "always";
type ScrollAreaOrientation = "vertical" | "horizontal";
type ScrollAreaActivityState = "idle" | "scrolling";
type ScrollAreaDir = "ltr" | "rtl";

interface ScrollMetrics {
  overflowX: boolean;
  overflowY: boolean;
  overflowTop: boolean;
  overflowBottom: boolean;
  overflowLeft: boolean;
  overflowRight: boolean;
  scrollRatioX: number;
  scrollRatioY: number;
  thumbSizeX: number;
  thumbSizeY: number;
}

interface ScrollAreaContextValue extends ScrollMetrics {
  type: ScrollAreaType;
  scrollHideDelay: number;
  autoContentId: string;
  contentId: string;
  setContentId: Dispatch<SetStateAction<string>>;
  contentRef: RefObject<HTMLElement | null>;
  dir: ScrollAreaDir;
  setDir: Dispatch<SetStateAction<ScrollAreaDir>>;
  hovering: boolean;
  setHovering: (value: boolean) => void;
  scrollbarHovering: boolean;
  setScrollbarHovering: (value: boolean) => void;
  onScrollbarPointerEnter: () => void;
  onScrollbarPointerLeave: () => void;
  scrolling: boolean;
  interacting: boolean;
  setInteracting: (value: boolean) => void;
  activityState: ScrollAreaActivityState;
  notifyScroll: () => void;
  setScrollMetrics: (metrics: ScrollMetrics) => void;
  scrollbarVisible: (orientation: ScrollAreaOrientation) => boolean;
  cornerVisible: boolean;
  registerScrollbar: (orientation: ScrollAreaOrientation) => void;
  unregisterScrollbar: (orientation: ScrollAreaOrientation) => void;
  hasScrollbar: (orientation: ScrollAreaOrientation) => boolean;
  scrollToRatio: (orientation: ScrollAreaOrientation, ratio: number) => void;
  pageScroll: (orientation: ScrollAreaOrientation, direction: 1 | -1) => void;
}

interface ScrollAreaProviderProps {
  contextValue: ScrollAreaContextValue;
  children: ReactNode;
}

interface ScrollAreaProviderValueParams {
  type?: ScrollAreaType;
  scrollHideDelay?: number;
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export type {
  ScrollAreaActivityState,
  ScrollAreaContextValue,
  ScrollAreaDir,
  ScrollAreaOrientation,
  ScrollAreaProviderProps,
  ScrollAreaProviderValueParams,
  ScrollAreaType,
  ScrollMetrics,
};
