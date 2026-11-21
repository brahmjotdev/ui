// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { Collapsible } from "@/cli/components";

import { ChevronDown } from "lucide-react";

// ------------------------------------------------
// DEMO
// ------------------------------------------------

export function CollapsibleDemo() {
  return (
    <Collapsible.Root className="mx-auto w-full max-w-sm">
      <Collapsible.Trigger
        variant="secondary"
        className="group justify-between"
      >
        When can I expect my order?
        <ChevronDown className="size-4 transition-all duration-200 ease-in-out group-data-open:rotate-180" />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className="mt-4 ml-0.5 border-l-4 px-3 py-2 text-sm text-muted-foreground">
          Usually all of our orders are shipped within 24 hours. You will
          receive an email with your tracking number when it is on its way.
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
