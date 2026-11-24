// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { Accordion } from "@/cli/components";

import { ChevronDown } from "lucide-react";

// ------------------------------------------------
// DEMO DATA
// ------------------------------------------------

const faqItems = [
  {
    value: "platform-overview",
    title: "What is this platform and how does it work?",
    content:
      "Our platform brings your tools, workflows, and information into one organized workspace. It helps you manage tasks, stay focused, and get more done without constantly switching between different apps.",
  },
  {
    value: "pricing-and-plans",
    title: "Is it free to use?",
    content:
      "You can get started for free and explore the core features without any upfront cost. If you need more advanced tools or additional capabilities, you can upgrade to a plan that fits your needs.",
  },
  {
    value: "device-compatibility",
    title: "Can I use it on my phone and desktop?",
    content:
      "Yes, the platform works across desktop, tablet, and mobile devices. Your workspace stays accessible wherever you are, so you can easily pick up where you left off.",
  },
  {
    value: "customer-support",
    title: "How can I get help if something goes wrong?",
    content:
      "Our support team is here whenever you need assistance. Reach out through our support channels, describe the issue you're experiencing, and we'll help you find a solution as quickly as possible.",
  },
];

// ------------------------------------------------
// DEMO
// ------------------------------------------------

export function AccordionDemo() {
  return (
    <Accordion.Root
      defaultValue="pricing-and-plans"
      className="mx-auto w-full max-w-lg"
    >
      {faqItems.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
          <Accordion.Header>
            <Accordion.Trigger className="group">
              {item.title}
              <ChevronDown className="ml-auto size-4 text-muted-foreground transition-all duration-200 group-data-open:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <div className="px-3 pb-4 text-sm">{item.content}</div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
