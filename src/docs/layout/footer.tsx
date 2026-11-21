// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getNavNeighbors, type NavItem } from "@/app/(content)/nav";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface DocsFooterProps extends React.ComponentProps<"div"> {
  prev?: NavItem;
  next?: NavItem;
}

// ------------------------------------------------
// HELPER
// ------------------------------------------------

function resolveNeighbor(
  override: NavItem | null | undefined,
  fallback: NavItem | null,
) {
  return override === undefined ? fallback : override;
}

// ------------------------------------------------
// HOOK
// ------------------------------------------------

function useFooterNav(
  prevProp: NavItem | null | undefined,
  nextProp: NavItem | null | undefined,
) {
  const pathname = usePathname();
  const neighbors = getNavNeighbors(pathname);
  return {
    prev: resolveNeighbor(prevProp, neighbors.prev),
    next: resolveNeighbor(nextProp, neighbors.next),
  };
}

// ------------------------------------------------
// PREV PATH
// ------------------------------------------------

function PrevPath({ item }: { item: NavItem }) {
  return (
    <Link href={item.href} data-link>
      <span data-link-label>Prev</span>
      <span data-link-title>{item.label}</span>
    </Link>
  );
}

// ------------------------------------------------
// NEXT PATH
// ------------------------------------------------

function NextPath({ item }: { item: NavItem }) {
  return (
    <Link href={item.href} data-link className="ml-auto">
      <span data-link-label className="text-right">
        Next
      </span>
      <span data-link-title>{item.label}</span>
    </Link>
  );
}

// ------------------------------------------------
// FOOTER
// ------------------------------------------------

export function DocsFooter({
  prev: prevProp,
  next: nextProp,
  className,
  ...props
}: DocsFooterProps) {
  const { prev, next } = useFooterNav(prevProp, nextProp);

  return (
    <div data-docs-footer className={className} {...props}>
      {prev && <PrevPath item={prev} />}
      {next && <NextPath item={next} />}
    </div>
  );
}
