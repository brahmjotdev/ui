// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { componentRegistry } from "./components/components";

// ------------------------------------------------
// ITEMS
// ------------------------------------------------

const overviewGroup = {
  group: "Overview",
  items: [
    "Introduction",
    "Quick Start",
    "Changelog",
    "Roadmap",
    "Agentic UI",
    "Components",
  ],
};

const componentsGroup = {
  group: "Components",
  items: componentRegistry.flatMap((item) =>
    typeof item === "string" ? item : item.children.map((child) => child),
  ),
};

export const sidebarItems = [overviewGroup, componentsGroup];
