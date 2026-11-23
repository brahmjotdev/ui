// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { Docs } from "@/docs";

import { accordionAPI } from "./api";
import { AccordionDemo } from "./demo";

// ------------------------------------------------
// PAGE
// ------------------------------------------------

export default function AccordionPage() {
  return (
    <Docs.Page>
      <Docs.Header
        title="Accordion"
        description="A stack of sections. Several can stay open, or one can open at a time."
      />
      <Docs.Body>
        <Docs.Section id="demo" title="Demo">
          <Docs.Demo.Root>
            <Docs.Demo.Preview
              demo={<AccordionDemo />}
              className="items-center justify-center"
            />
          </Docs.Demo.Root>
        </Docs.Section>
        <Docs.Section id="api" title="API Reference">
          <Docs.API api={accordionAPI} />
        </Docs.Section>
      </Docs.Body>
    </Docs.Page>
  );
}
