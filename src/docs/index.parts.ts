// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { DocsPage } from "./layout/page";
import { DocsHeader } from "./layout/header";
import { DocsBody } from "./layout/body";
import { Section } from "./layout/section";
import { DemoRoot, DemoPreview } from "./demo";
import { APIRef } from "./api/api";
import { DocsFooter } from "./layout/footer";

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export const Docs = {
  Page: DocsPage,
  Header: DocsHeader,
  Body: DocsBody,
  Section: Section,
  Demo: {
    Root: DemoRoot,
    Preview: DemoPreview,
  },
  API: APIRef,
  Footer: DocsFooter,
};
