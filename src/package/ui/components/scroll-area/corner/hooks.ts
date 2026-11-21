// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { useScrollAreaContext } from "../context";
import { scrollAreaCornerAttrs } from "./attrs";

// ------------------------------------------------
// HOOKS
// ------------------------------------------------

function useScrollAreaCornerState() {
  const ctx = useScrollAreaContext();
  return {
    visible: ctx.cornerVisible,
    attrs: scrollAreaCornerAttrs({ visible: ctx.cornerVisible }),
  };
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { useScrollAreaCornerState };
