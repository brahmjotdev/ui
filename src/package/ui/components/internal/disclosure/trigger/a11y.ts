// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface DisclosureTriggerA11yParams {
  open: boolean;
  contentId: string;
}

// ------------------------------------------------
// A11Y
// ------------------------------------------------

export function disclosureTriggerA11y({
  open,
  contentId,
}: DisclosureTriggerA11yParams) {
  return {
    "aria-expanded": open,
    "aria-controls": contentId,
  };
}
