// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { Button } from "@/cli/components";
import Link from "next/link";

import { sidebarItems } from "./items";
import { itemHref } from "./nav";

// ------------------------------------------------
// CONTENT SIDEBAR
// ------------------------------------------------

export function ContentSidebar() {
  return (
    <div
      data-content-sidebar
      className="flex h-full w-64 shrink-0 flex-col gap-12 border-r px-6 py-16"
    >
      {sidebarItems.map(({ group, items }) => (
        <div key={group} data-group className="flex flex-col gap-1">
          <span
            data-group-name
            className="mb-1 px-2 text-sm font-medium text-muted-foreground"
          >
            {group}
          </span>
          <div data-group-items className="flex flex-col">
            {items.map((label) => {
              const href = itemHref(group, label);
              return (
                <Button
                  key={href}
                  variant="ghost"
                  className="h-fit justify-start px-2 py-1.25 hover:bg-secondary/75"
                  render={<Link href={href}>{label}</Link>}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
