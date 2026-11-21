// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { createContext } from "react";

import type {
  ScrollAreaContextValue,
  ScrollAreaProviderProps,
} from "./types";

// ------------------------------------------------
// CONTEXT
// ------------------------------------------------

const ScrollAreaContext = createContext<ScrollAreaContextValue | undefined>(
  undefined,
);

// ------------------------------------------------
// PROVIDER
// ------------------------------------------------

function ScrollAreaProvider({
  contextValue,
  children,
}: ScrollAreaProviderProps) {
  return (
    <ScrollAreaContext.Provider value={contextValue}>
      {children}
    </ScrollAreaContext.Provider>
  );
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { ScrollAreaContext, ScrollAreaProvider };
