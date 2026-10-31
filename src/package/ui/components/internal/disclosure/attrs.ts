// ------------------------------------------------
// TYPES
// ------------------------------------------------

type DisclosureSharedAttrValues = {
  open?: boolean;
  disabled?: boolean;
};

// ------------------------------------------------
// ATTRS
// ------------------------------------------------

function disclosureSharedAttrs({
  open,
  disabled,
}: DisclosureSharedAttrValues) {
  const result: Record<string, true> = {};
  if (open) result["data-open"] = true;
  if (disabled) result["data-disabled"] = true;
  return result;
}

const disclosureSharedAttrStates = ["open", "disabled"] as const;

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { disclosureSharedAttrs, disclosureSharedAttrStates };
