// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type { CSSProperties } from "react";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

type AnyProps = Record<string, unknown>;
type PropsInput = AnyProps | object | undefined;

// ------------------------------------------------
// HELPERS
// ------------------------------------------------

function isEventHandler(key: string, value: unknown): boolean {
  const code0 = key.charCodeAt(0);
  const code1 = key.charCodeAt(1);
  const code2 = key.charCodeAt(2);

  return (
    code0 === 111 /* o */ &&
    code1 === 110 /* n */ &&
    code2 >= 65 /* A */ &&
    code2 <= 90 /* Z */ &&
    typeof value === "function"
  );
}

function mergeClassNames(
  left: string | undefined,
  right: string | undefined,
): string | undefined {
  if (right) {
    if (left) {
      return `${left} ${right}`;
    }
    return right;
  }
  return left;
}

function mergeStyles(
  left: CSSProperties | undefined,
  right: CSSProperties | undefined,
): CSSProperties | undefined {
  if (!left && !right) return undefined;
  if (!left) return right;
  if (!right) return left;
  return { ...left, ...right };
}

function isDefaultPrevented(args: unknown[]): boolean {
  const event = args[0];
  return (
    typeof event === "object" &&
    event !== null &&
    "defaultPrevented" in event &&
    Boolean((event as { defaultPrevented: boolean }).defaultPrevented)
  );
}

function mergeEventHandlers(
  left: ((...args: unknown[]) => unknown) | undefined,
  right: ((...args: unknown[]) => unknown) | undefined,
): ((...args: unknown[]) => unknown) | undefined {
  if (!left) return right;
  if (!right) return left;

  return (...args: unknown[]) => {
    right(...args);
    if (isDefaultPrevented(args)) return;
    left(...args);
  };
}

function mergeInto(merged: AnyProps, incoming: object): AnyProps {
  const source = incoming as AnyProps;

  for (const key in source) {
    if (!Object.prototype.hasOwnProperty.call(source, key)) continue;

    // useRender owns refs — never merge them here
    if (key === "ref") continue;

    const value = source[key];

    if (value === undefined) continue;

    if (key === "className") {
      merged[key] = mergeClassNames(
        merged.className as string | undefined,
        value as string | undefined,
      );
      continue;
    }

    if (key === "style") {
      merged[key] = mergeStyles(
        merged.style as CSSProperties | undefined,
        value as CSSProperties | undefined,
      );
      continue;
    }

    if (isEventHandler(key, value)) {
      merged[key] = mergeEventHandlers(
        merged[key] as ((...args: unknown[]) => unknown) | undefined,
        value as ((...args: unknown[]) => unknown) | undefined,
      );
      continue;
    }

    merged[key] = value;
  }

  return merged;
}

// ------------------------------------------------
// UTIL: MERGE PROPS
// ------------------------------------------------

export function mergeProps<T extends AnyProps = AnyProps>(
  ...inputs: PropsInput[]
): T {
  const merged: AnyProps = {};

  for (const input of inputs) {
    if (!input) continue;
    mergeInto(merged, input);
  }

  return merged as T;
}
