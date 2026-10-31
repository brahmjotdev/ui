// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface DisclosureContentA11yParams {
  contentId: string;
}

// ------------------------------------------------
// A11Y
// ------------------------------------------------

export function disclosureContentA11y({
  contentId,
}: DisclosureContentA11yParams) {
  return {
    id: contentId,
  };
}
