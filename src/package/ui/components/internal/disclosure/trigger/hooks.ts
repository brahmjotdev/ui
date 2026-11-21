// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { useDisclosureContext } from "../context";
import { disclosureTriggerA11y } from "./a11y";
import { disclosureSharedAttrs } from "./attrs";
import { createDisclosureTriggerOnClick } from "./events";
import type { DisclosureTriggerProps } from "./types";

// ------------------------------------------------
// HOOKS
// ------------------------------------------------

export function useDisclosureTrigger({
  disabled: disabledProp,
  onClick,
}: Pick<DisclosureTriggerProps, "disabled" | "onClick">) {
  const {
    open,
    setOpen,
    disabled: rootDisabled,
    contentId,
  } = useDisclosureContext();
  const disabled = rootDisabled || Boolean(disabledProp);

  return {
    disabled,
    onClick: createDisclosureTriggerOnClick({
      disabled,
      setOpen,
      onClick,
    }),
    a11y: disclosureTriggerA11y({ open, contentId }),
    attrs: disclosureSharedAttrs({ open, disabled: rootDisabled }),
  };
}
