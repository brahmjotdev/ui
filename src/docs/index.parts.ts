// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { DocsPage } from "./page";
import { DocsHeader } from "./header";
import { DocsBody } from "./body";
import { Section } from "./section";
import { DemoRoot, DemoPreview, DemoControls, DemoCode } from "./demo";
import { APIRef } from "./api-ref";
import { DocsFooter } from "./footer";

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
    Controls: DemoControls,
    Code: DemoCode,
  },
  API: APIRef,
  Footer: DocsFooter,
};
