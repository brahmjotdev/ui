// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { toKebabCase } from "@cerevialabs/ui/utils";

import { sidebarItems } from "./items";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

export interface NavItem {
  label: string;
  href: string;
}

// ------------------------------------------------
// HELPERS
// ------------------------------------------------

export function itemHref(group: string, label: string) {
  const slug = toKebabCase(label);
  return group === "Components"
    ? `/components/${slug}`
    : group === "Overview"
      ? `/overview/${slug}`
      : `/${slug}`;
}

export function flattenNav(items = sidebarItems): NavItem[] {
  return items.flatMap(({ group, items: labels }) =>
    labels.map((label) => ({
      label,
      href: itemHref(group, label),
    })),
  );
}

export function getNavNeighbors(
  pathname: string,
  items = flattenNav(),
): { prev: NavItem | null; next: NavItem | null } {
  const index = items.findIndex((item) => item.href === pathname);
  if (index === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: index > 0 ? items[index - 1]! : null,
    next: index < items.length - 1 ? items[index + 1]! : null,
  };
}
