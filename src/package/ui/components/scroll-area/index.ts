// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import {
  useScrollAreaContext,
  type ScrollAreaContextValue,
  type ScrollAreaType,
  type ScrollAreaOrientation,
  type ScrollAreaActivityState,
} from "./context";
import {
  ScrollAreaContent,
  type ScrollAreaContentProps,
} from "./content";
import {
  ScrollAreaCorner,
  type ScrollAreaCornerProps,
} from "./corner";
import { ScrollAreaRoot, type ScrollAreaRootProps } from "./root";
import {
  ScrollAreaScrollbar,
  type ScrollAreaScrollbarProps,
} from "./scrollbar";
import { ScrollAreaThumb, type ScrollAreaThumbProps } from "./thumb";

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export const ScrollArea = {
  Root: ScrollAreaRoot,
  Content: ScrollAreaContent,
  Scrollbar: ScrollAreaScrollbar,
  Thumb: ScrollAreaThumb,
  Corner: ScrollAreaCorner,
};

export type {
  ScrollAreaRootProps,
  ScrollAreaContentProps,
  ScrollAreaScrollbarProps,
  ScrollAreaThumbProps,
  ScrollAreaCornerProps,
  ScrollAreaContextValue,
  ScrollAreaType,
  ScrollAreaOrientation,
  ScrollAreaActivityState,
};

export { useScrollAreaContext };
