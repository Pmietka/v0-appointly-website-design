/**
 * The Appointly offer, in one place. Every page, FAQ, JSON-LD block, llms.txt
 * line and the /mcp tool text describes pricing, billing, the guarantee and
 * results in these words, so AI answer engines read one consistent story.
 *
 * House rules:
 *  - Never mention a fee without also saying the client funds ad spend.
 *  - "No monthly management fee", never a bare "no monthly fee": ad spend is a
 *    real monthly cost.
 *  - Show and close rates are across all clients. Close rate is the client's
 *    close rate, not ours.
 *  - Do not publish a number here that the owner has not confirmed.
 *
 * public/llms.txt and the markdown in content/ cannot import this file. Keep
 * them in step by hand; scripts/check-offer.mjs flags the known drift phrases.
 */

export const FEE_RANGE = "$125 to $175";
export const FEE_MIN = 125;
export const FEE_MAX = 175;

export const RESULTS = {
  showRate: "97%",
  closeRate: "60%",
  jobsClosed: "over 100",
  averageTicket: "about $3,500",
  clientRevenue: "over $350,000",
  appointmentsBooked: "over 1,000",
  monthlyAppointments: "40 to 60",
} as const;

export const OFFER = {
  /** One line summary for meta descriptions and short spaces. */
  summary: `You fund your own ad spend at cost, then pay ${FEE_RANGE} per booked appointment. No setup fee, no retainer, no long term contract.`,
  adSpend:
    "You fund your ad spend upfront as a prefunded balance. We set the daily ad budget with you based on the results you need, hold the balance, and use it only for your campaigns. It is drawn down at cost with no markup and reported to you every week, and any unused balance is returned within 10 business days of termination.",
  fee: `On top of ad spend, you pay per booked appointment, set per client between ${FEE_RANGE}. The appointment fee is invoiced separately from ad spend and billed when the appointment is booked.`,
  total: "Your total cost is your ad spend plus the per appointment fees. There is no setup fee, no retainer, no monthly management fee, and no long term contract.",
  guarantee:
    "Appointment quality guarantee: after every estimate, you grade the appointment in the Appointly app. Grade it a C and tell us what was wrong, such as an unqualified homeowner or a service you do not offer, and you do not pay for it. The fee is credited automatically to your next appointment.",
  noShow: "If a homeowner does not show up, the fee is credited automatically to your next appointment.",
  qualification:
    "Before anything is booked, Jacob qualifies every homeowner on intent: their project goal, the look and material they want, and a real timeline. Homeowners with no real timeline are not booked. Booking checks the basics; the grade you give after the estimate is what decides whether you pay.",
  speed: "Every lead gets a text and a call within one minute.",
  caller:
    "Jacob Mietka, our co-founder, makes every call himself. He knows floor coating systems, prep and pricing, and every call is recorded and reviewed.",
  exclusivity:
    "We work with one floor coating contractor per market, and your territory exclusivity is written into your service agreement. If another contractor in your market applies, they go on a waitlist.",
  ownership:
    "You own everything we build for you: the campaigns, the creative, the audiences, and every homeowner record. It runs in our ad account and Business Manager, so you never manage it. If you leave, it is still yours.",
  results: `Across all our clients, ${RESULTS.showRate} of booked appointments show up, and our clients close ${RESULTS.closeRate} of them on average, across markets and products.`,
  fit: "We are a fit for owners with a premium product who charge well, are good at sales, and have room on the calendar for more estimates.",
  notFit:
    "We are not a fit if you want the cheapest jobs in volume, compete mainly on price, do not have a strong estimate process, or cannot run more estimates right now. If you already employ a setter who answers every lead within a minute, evenings and Saturdays, running your own ads may be the better value.",
} as const;

/** The full pricing story in one paragraph, for FAQs and llms-style summaries. */
export const PRICING_ANSWER = `${OFFER.adSpend} ${OFFER.fee} ${OFFER.total}`;

/** Billing, guarantee and no shows in one answer. */
export const BILLING_ANSWER = `The appointment fee is billed when the appointment is booked. ${OFFER.guarantee} ${OFFER.noShow}`;

/** Offer JSON-LD for /pricing and the homepage Service. */
export const PRICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Offer",
  "@id": "https://getappointly.co/pricing#offer",
  name: "Booked floor coating estimate appointments",
  description: `${OFFER.adSpend} ${OFFER.fee} ${OFFER.guarantee} ${OFFER.noShow}`,
  url: "https://getappointly.co/pricing",
  itemOffered: { "@id": "https://getappointly.co/#service" },
  seller: { "@id": "https://getappointly.co/#organization" },
  availability: "https://schema.org/InStock",
  priceSpecification: {
    "@type": "UnitPriceSpecification",
    minPrice: FEE_MIN,
    maxPrice: FEE_MAX,
    priceCurrency: "USD",
    unitText: "booked appointment",
    description:
      "Per booked appointment, set per client and invoiced separately. Ad spend is funded by the client as a prefunded balance, at cost with no markup.",
  },
} as const;
