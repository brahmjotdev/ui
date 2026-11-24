// ------------------------------------------------
// TYPES
// ------------------------------------------------

type AccordionType = "single" | "multiple";

// ------------------------------------------------
// UTILS
// ------------------------------------------------

function toOpenList(
  type: AccordionType,
  value: string | string[] | undefined,
): string[] | undefined {
  if (value === undefined) return undefined;
  if (type === "single") {
    return value === "" ? [] : [value as string];
  }
  return value as string[];
}

function toDefaultList(
  type: AccordionType,
  value: string | string[] | undefined,
): string[] {
  return toOpenList(type, value) ?? [];
}

function toPublicValue(
  type: AccordionType,
  openValues: readonly string[],
): string | string[] {
  if (type === "single") return openValues[0] ?? "";
  return [...openValues];
}

function nextOpenValues(
  current: readonly string[],
  itemValue: string,
  open: boolean,
  type: AccordionType,
): string[] {
  if (itemValue === "") return [...current];

  if (!open) {
    if (type === "single") return current.length === 0 ? [...current] : [];
    if (!current.includes(itemValue)) return [...current];
    return current.filter((entry) => entry !== itemValue);
  }

  if (type === "single") {
    if (current.length === 1 && current[0] === itemValue) return [...current];
    return [itemValue];
  }

  if (current.includes(itemValue)) return [...current];
  return [...current, itemValue];
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { nextOpenValues, toDefaultList, toOpenList, toPublicValue };
export type { AccordionType };
