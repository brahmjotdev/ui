// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { Docs } from "@/docs";

import { scrollAreaAPI } from "./api";
import { ScrollAreaDemo } from "./demo";

// ------------------------------------------------
// PAGE
// ------------------------------------------------

export default function ScrollAreaPage() {
  return (
    <Docs.Page>
      <Docs.Header
        title="Scroll Area"
        description="A scrollable region with optional custom scrollbar chrome."
      />
      <Docs.Body>
        <Docs.Section id="demo" title="Demo">
          <Docs.Demo.Root>
            <Docs.Demo.Preview
              demo={<ScrollAreaDemo />}
              className="items-center justify-center"
            />
          </Docs.Demo.Root>
        </Docs.Section>
        <Docs.Section id="api" title="API Reference">
          <Docs.API api={scrollAreaAPI} />
        </Docs.Section>
      </Docs.Body>
    </Docs.Page>
  );
}
