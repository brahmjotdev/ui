// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { ContentSidebar } from "./content-sidebar";
import { ScrollArea } from "@/cli/components";

// ------------------------------------------------
// CONTENT LAYOUT
// ------------------------------------------------

export default function ContentLayout({ children }: LayoutProps<"/">) {
  return (
    <div data-content-layout className="flex min-h-0 flex-1">
      <ContentSidebar />
      <ScrollArea.Root type="scroll" className="flex flex-1">
        <ScrollArea.Content>{children}</ScrollArea.Content>
        <ScrollArea.Scrollbar orientation="vertical" className="mr-px w-2">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
}
