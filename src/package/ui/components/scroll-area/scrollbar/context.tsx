// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { createContext, use } from "react";

import type { ScrollAreaOrientation } from "../context";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface ScrollAreaScrollbarContextValue {
  orientation: ScrollAreaOrientation;
}

// ------------------------------------------------
// CONTEXT
// ------------------------------------------------

const ScrollAreaScrollbarContext = createContext<
  ScrollAreaScrollbarContextValue | undefined
>(undefined);

function useScrollAreaScrollbarContext(): ScrollAreaScrollbarContextValue {
  const context = use(ScrollAreaScrollbarContext);
  if (!context) {
    throw new Error(
      "ScrollArea.Thumb must be used within ScrollArea.Scrollbar",
    );
  }
  return context;
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export {
  ScrollAreaScrollbarContext,
  useScrollAreaScrollbarContext,
};
export type { ScrollAreaScrollbarContextValue };
