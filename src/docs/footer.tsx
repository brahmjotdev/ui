// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { cn } from "cn";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getNavNeighbors, type NavItem } from "@/app/(content)/nav";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface DocsFooterProps extends React.ComponentProps<"div"> {
  prev?: NavItem | null;
  next?: NavItem | null;
}

// ------------------------------------------------
// PREV PATH
// ------------------------------------------------

function PrevPath({ item }: { item: NavItem }) {
  return (
    <Link
      href={item.href}
      className="flex flex-col rounded-xl border px-4 py-3"
    >
      <span className="text-xs text-muted-foreground">Prev</span>
      <span className="text-sm font-medium text-foreground">{item.label}</span>
    </Link>
  );
}

// ------------------------------------------------
// NEXT PATH
// ------------------------------------------------

function NextPath({ item }: { item: NavItem }) {
  return (
    <Link
      href={item.href}
      className="flex flex-col rounded-xl border px-4 py-3"
    >
      <span className="text-xs text-muted-foreground">Next</span>
      <span className="text-sm font-medium text-foreground">{item.label}</span>
    </Link>
  );
}

// ------------------------------------------------
// FOOTER
// ------------------------------------------------

export function DocsFooter({
  className,
  prev: prevProp,
  next: nextProp,
  ...props
}: DocsFooterProps) {
  const pathname = usePathname();
  const neighbors = getNavNeighbors(pathname);
  const prev = prevProp === undefined ? neighbors.prev : prevProp;
  const next = nextProp === undefined ? neighbors.next : nextProp;

  return (
    <div
      data-docs-footer
      className={cn(
        "flex items-center justify-between border-t pt-16",
        className,
      )}
      {...props}
    >
      {prev && <PrevPath item={prev} />}
      {next && <NextPath item={next} />}
    </div>
  );
}
