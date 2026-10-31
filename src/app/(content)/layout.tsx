// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { ContentSidebar } from "./content-sidebar";

// ------------------------------------------------
// CONTENT LAYOUT
// ------------------------------------------------

export default function ContentLayout({ children }: LayoutProps<"/">) {
  return (
    <div data-content-layout className="flex min-h-0 flex-1">
      <ContentSidebar />
      <div data-content-main className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
