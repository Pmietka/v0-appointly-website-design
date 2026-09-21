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
    question: "Who owns the Meta ad account?",
    answer:
      "We do. Appointly runs the campaigns from our own Meta ad account and Business Manager, so you never have to create an account, hand over logins, or manage a campaign. You keep your brand, your calendar, and your customer relationships while we run the advertising and the booking.",
  },
  {
    question: "What happens if a homeowner no-shows?",
    answer:
      "You get credited. If a confirmed homeowner does not show up for the estimate, that appointment does not count against you, and the same applies to any appointment that turns out not to meet the qualification criteria we agreed on. The credit is not limited to no-shows either: if the homeowner shows up but the job turns out to be too small to be worth your time, that one is on us as well, free of charge. The policy is deliberately generous, because the model only works if you are paying for estimates you can actually run and actually sell.",
  },
];
