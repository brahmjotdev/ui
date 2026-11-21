// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type { MouseEventHandler } from "react";

import type { DisclosureContextValue } from "../context";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface DisclosureTriggerClickParams {
  disabled: boolean;
  setOpen: DisclosureContextValue["setOpen"];
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

// ------------------------------------------------
// EVENTS
// ------------------------------------------------

export function createDisclosureTriggerOnClick({
  disabled,
  setOpen,
  onClick,
}: DisclosureTriggerClickParams): MouseEventHandler<HTMLButtonElement> {
  return (event) => {
    onClick?.(event);
    if (event.defaultPrevented || disabled) return;
    setOpen((prev) => !prev);
  };
}
