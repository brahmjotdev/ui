// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { createContext } from "react";

import type {
  DisclosureContextValue,
  DisclosureProviderProps,
} from "./types";

// ------------------------------------------------
// CONTEXT
// ------------------------------------------------

const DisclosureContext = createContext<DisclosureContextValue | undefined>(
  undefined,
);

// ------------------------------------------------
// PROVIDER
// ------------------------------------------------

function DisclosureProvider({
  contextValue,
  children,
}: DisclosureProviderProps) {
  return (
    <DisclosureContext.Provider value={contextValue}>
      {children}
    </DisclosureContext.Provider>
  );
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { DisclosureContext, DisclosureProvider };
