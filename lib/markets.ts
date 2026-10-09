/**
 * Markets where Appointly already books for a floor coating contractor. We work
 * with one contractor per market, so a city on this list is taken. Read by the
 * check_market_availability tool on /mcp, which AI assistants call when a
 * contractor asks whether their area is open.
 *
 * Add a market here the day a new client signs. A city that is not on this
 * list is reported as "no current client on record", never as a promise: the
 * strategy call still confirms the exact service area.
 */

export type ClaimedMarket = {
  /** How the market is named back to the contractor. */
  name: string;
  /** Two-letter state or province codes the market covers. */
  states: string[];
  /** Cities and towns inside the market, as a homeowner would write them. */
  cities: string[];
};

export const CLAIMED_MARKETS: ClaimedMarket[] = [
  {
    name: "Myrtle Beach metro, SC",
    states: ["SC"],
    cities: [
      "Myrtle Beach",
      "North Myrtle Beach",
      "Conway",
      "Surfside Beach",
      "Garden City",
      "Murrells Inlet",
      "Little River",
      "Carolina Forest",
      "Socastee",
    ],
  },
  {
    name: "Port St. Lucie metro, FL",
    states: ["FL"],
    cities: [
      "Port St. Lucie",
      "Fort Pierce",
      "Stuart",
      "Jensen Beach",
      "Palm City",
      "Tradition",
      "St. Lucie West",
      "Hobe Sound",
    ],
  },
  {
    name: "Spokane, eastern Washington, and northern Idaho",
    states: ["WA", "ID"],
    cities: [
      "Spokane",
      "Spokane Valley",
      "Liberty Lake",
      "Cheney",
      "Airway Heights",
      "Mead",
      "Deer Park",
      "Coeur d'Alene",
      "Post Falls",
      "Hayden",
      "Rathdrum",
      "Sandpoint",
    ],
  },
];

const STATE_CODES: Record<string, string> = {
  alabama: "AL", alaska: "AK", arizona: "AZ", arkansas: "AR", california: "CA",
  colorado: "CO", connecticut: "CT", delaware: "DE", florida: "FL", georgia: "GA",
  hawaii: "HI", idaho: "ID", illinois: "IL", indiana: "IN", iowa: "IA",
  kansas: "KS", kentucky: "KY", louisiana: "LA", maine: "ME", maryland: "MD",
  massachusetts: "MA", michigan: "MI", minnesota: "MN", mississippi: "MS",
  missouri: "MO", montana: "MT", nebraska: "NE", nevada: "NV",
  "new hampshire": "NH", "new jersey": "NJ", "new mexico": "NM", "new york": "NY",
  "north carolina": "NC", "north dakota": "ND", ohio: "OH", oklahoma: "OK",
  oregon: "OR", pennsylvania: "PA", "rhode island": "RI", "south carolina": "SC",
  "south dakota": "SD", tennessee: "TN", texas: "TX", utah: "UT", vermont: "VT",
  virginia: "VA", washington: "WA", "west virginia": "WV", wisconsin: "WI",
  wyoming: "WY", "district of columbia": "DC",
  alberta: "AB", "british columbia": "BC", manitoba: "MB", "new brunswick": "NB",
  "newfoundland and labrador": "NL", "nova scotia": "NS", ontario: "ON",
  "prince edward island": "PE", quebec: "QC", saskatchewan: "SK",
};

/** Lowercase, "Saint" to "st", punctuation and extra spaces dropped. */
function normalizeCity(city: string): string {
  return city
    .toLowerCase()
    .replace(/\bsaint\b/g, "st")
    .replace(/\bfort\b/g, "ft")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeState(state: string): string {
  const s = state.toLowerCase().replace(/[^a-z ]/g, "").trim();
  return STATE_CODES[s] ?? s.toUpperCase();
}

/**
 * Finds the claimed market a city belongs to. Accepts "Spokane" with a
 * separate state, or "Spokane, WA" in the city field alone.
 */
export function findClaimedMarket(city: string, state?: string): ClaimedMarket | undefined {
  let cityPart = city;
  let statePart = state;
  if (!statePart && city.includes(",")) {
    const i = city.lastIndexOf(",");
    cityPart = city.slice(0, i);
    statePart = city.slice(i + 1);
  }

  const wantedCity = normalizeCity(cityPart);
  const wantedState = statePart ? normalizeState(statePart) : undefined;

  return CLAIMED_MARKETS.find(
    (market) =>
      (!wantedState || market.states.includes(wantedState)) &&
      market.cities.some((c) => normalizeCity(c) === wantedCity),
  );
}
