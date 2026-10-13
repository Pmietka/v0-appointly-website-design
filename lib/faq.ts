import type { FaqItem } from "@/components/faq-block";

/**
 * The four questions contractors ask before anything else. Kept in one place so
 * the homepage, About, and /faq give answer engines the same wording.
 */
export const coreFaqItems: FaqItem[] = [
  {
    question: "How do the appointments reach my calendar?",
    answer:
      "We call every homeowner ourselves, confirm the details, and book them straight onto your calendar around the jobs you already have. You see the appointment the moment it is set, with the homeowner's name, address, phone number, and what they want coated. Before the estimate we send reminders by text and call again to confirm, so the day you wake up to is the day you actually run.",
  },
  {
    question: "Are the appointments exclusive or shared?",
    answer:
      "Exclusive. Every booked estimate belongs to you alone and is never sold, resold, or split with another contractor. We work with one floor coating contractor per market, so we are never booking the same homeowner for the company down the road.",
  },
  {
    question: "Who runs the Meta ad account?",
    answer:
      "We do. Appointly Solutions runs the campaigns from our own Meta ad account and Business Manager, so you never have to create an account, hand over logins, or manage a campaign. You keep your brand, your calendar, and your customer relationships while we run the advertising and the booking.",
  },
  {
    question: "What happens if a homeowner does not show up?",
    answer:
      "If a confirmed homeowner does not show up for the estimate, you earn a credit toward your next appointment. If an appointment turns out to be unqualified or a job you cannot bid, such as a service you do not offer, you grade it in the Appointly Solutions app with notes and pay nothing for it.",
  },
];
