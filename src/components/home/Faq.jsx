import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function Faq() {
  const qnas = [
    {
      q: `What is Feedpack?`,
      a: `Feedpack is a SaaS which helps you gather feedback, prioritize the right features, and build products users truly want.`,
    },
    {
      q: `How can I get started with Feedpack?`,
      a: `You can get started with Feedpack by signing up for an account on our website, creating a new board, and share the publishable link to collect feedback from your users.`,
    },
    {
      q: `Does Feedpack offer free plan?`,
      a: `No, we start with a Basic plan for $3 per month. You can use the plan to test our platform and see if it meets your needs.`,
    },
    {
      q: `What are the key features of Feedpack?`,
      a: `Feedpack offers user feedback collection, feature prioritization tools, and user voting capabilities.`,
    },
    {
      q: `Does Feedpack offer refunds?`,
      a: `Yes, we offer refunds within 14 days of payment.`,
    },
    {
      q: `How can I contact customer support?`,
      a: `I'm here to help with any questions or concerns! Reach out to me at support@feedpack.xyz, and I'll respond as quickly as possible.`,
    },
    {
      q: `What happens if I forget to cancel my subscription and overpay?`,
      a: `If you forget to cancel your subscription and make the next payment, no worries! We'll refund your last subscription, no questions asked. Just email us at support@feedpack.xyz, and we'll cancel subscriptions for you.`,
    },
  ];
  return (
    <div className="container mx-auto my-20" id="faq">
      <h2 className="text-center md:text-6xl text-4xl font-black mb-10">
        Frequently asked questions
      </h2>
      <div className="max-w-3xl mx-auto px-2">
        <Accordion type="single" collapsible className="w-full">
          {qnas.map((qna, i) => (
            <AccordionItem value={`item-${i}`} key={i}>
              <AccordionTrigger className="text-left">{qna.q}</AccordionTrigger>
              <AccordionContent className="text-left">{qna.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
