// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { Accordion } from "@/cli/components";

// ------------------------------------------------
// DEMO
// ------------------------------------------------

export function AccordionDemo() {
  return (
    <Accordion.Root className="mx-auto w-full max-w-sm">
      <Accordion.Item value="shipping">
        <Accordion.Header>
          <Accordion.Trigger>When can I expect my order?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <div className="px-3 py-2 text-sm text-muted-foreground">
            Orders ship within 24 hours. You will get an email with the tracking
            number when it is on its way.
          </div>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="returns">
        <Accordion.Header>
          <Accordion.Trigger>What is your return policy?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <div className="px-3 py-2 text-sm text-muted-foreground">
            You can return an unused item within 30 days. Both sections can stay
            open.
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
