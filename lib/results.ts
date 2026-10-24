/**
 * Numbers for /results. Owner supplied, published exactly as given: never
 * round a figure up or turn "over" or "about" into a firmer claim.
 */
export const AGGREGATE_RESULTS = [
  { value: "97%", label: "of booked appointments show up, across all Appointly Solutions clients" },
  { value: "60%", label: "average client close rate on those appointments, across markets and products" },
  { value: "Over 1,000", label: "floor coating appointments booked for our clients" },
  { value: "Over 100", label: "jobs closed by Appointly Solutions clients" },
  { value: "About $3,500", label: "average ticket on those jobs" },
  { value: "Over $350,000", label: "in revenue for Appointly Solutions clients" },
] as const;

export type ResultCaseStudy = {
  clientName: string;
  company: string;
  city: string;
  /** Full URL of the client's website. */
  website: string;
  monthlyAppointments: string;
  closeRate: string;
  costPerSoldJob: string;
  /** Verbatim client quote. Never paraphrase or write one for them. */
  quote: string;
};

const TODO = "TODO";

/**
 * Reusable case study cards. Fill every field from real, client approved
 * numbers, then the card appears on /results. An entry that still holds a
 * TODO is skipped so a placeholder never ships to the live page.
 */
export const RESULT_CASE_STUDIES: ResultCaseStudy[] = [
  {
    clientName: TODO,
    company: TODO,
    city: TODO,
    website: TODO,
    monthlyAppointments: TODO,
    closeRate: TODO,
    costPerSoldJob: TODO,
    quote: TODO,
  },
];

export function isPublishable(study: ResultCaseStudy) {
  return Object.values(study).every((value) => value.trim() !== "" && !value.includes(TODO));
}
