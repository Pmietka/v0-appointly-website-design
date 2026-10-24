import type { FaqItem } from "@/components/faq-block";
import { BILLING_ANSWER, OFFER, PRICING_ANSWER } from "@/lib/offer";

/**
 * The questions contractors ask before anything else. Kept in one place so
 * the homepage, About, and /faq give answer engines the same wording.
 */
export const coreFaqItems: FaqItem[] = [
  {
    question: "How much does Appointly Solutions cost?",
    answer: PRICING_ANSWER,
  },
  {
    question: "What happens if an appointment is bad or the homeowner does not show up?",
    answer: BILLING_ANSWER,
  },
  {
    question: "How do the appointments reach my calendar?",
    answer: `${OFFER.speed} ${OFFER.caller} He qualifies the homeowner and books them straight onto your calendar around the jobs you already have. You see the appointment the moment it is set, with the homeowner's name, address, phone number, and what they want coated. Before the estimate we send reminders by text and call again to confirm.`,
  },
  {
    question: "Are the appointments exclusive or shared?",
    answer: `Exclusive. Every booked estimate belongs to you alone and is never sold, resold, or split with another contractor. ${OFFER.exclusivity}`,
  },
  {
    question: "Who runs the Meta ad account, and who owns the data?",
    answer: `We run the campaigns, so you never create an account, hand over logins, or manage a campaign. ${OFFER.ownership}`,
  },
  {
    question: "What show and close rates do Appointly clients get?",
    answer: `${OFFER.results} Close rate is your close rate: we qualify and book the homeowner, and you run the estimate. Our case studies show individual clients at about 70%, 57%, and 50%.`,
  },
];
