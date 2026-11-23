// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { createContext } from "react";

import type { AccordionContextValue, AccordionProviderProps } from "./types";

// ------------------------------------------------
// CONTEXT
// ------------------------------------------------

const AccordionContext = createContext<AccordionContextValue | undefined>(
  undefined,
);

// ------------------------------------------------
// PROVIDER
// ------------------------------------------------

function AccordionProvider({ contextValue, children }: AccordionProviderProps) {
  return (
    <AccordionContext.Provider value={contextValue}>
      {children}
    </AccordionContext.Provider>
  );
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { AccordionContext, AccordionProvider };
