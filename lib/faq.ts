import type { FaqItem } from "@/components/faq-block";

/**
 * The four questions contractors ask before anything else. Kept in one place so
 * the homepage, About, and /faq give answer engines the same wording.
 */
export const coreFaqItems: FaqItem[] = [
  {
    question: "What does a booked appointment cost?",
    answer:
      "Between $125 and $199 per booked estimate, depending on your market and the work you install. You pay that flat fee only when a qualified homeowner is confirmed on your calendar, never for a raw lead or a form fill. Every appointment is vetted before it is booked: the homeowner owns the property, wants floor coating work, is inside your service area, and has agreed to a time that fits your route.",
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
      "You get credited. If a confirmed homeowner does not show up for the estimate, that appointment does not count against you, and the same applies to any appointment that turns out not to meet the qualification criteria we agreed on. The credit policy is deliberately generous, because the model only works if you are paying for estimates you can actually run.",
  },
];
