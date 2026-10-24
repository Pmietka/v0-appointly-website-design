import { FEE_RANGE } from "@/lib/offer";

/**
 * How the common lead generation models for floor coating contractors compare.
 * Categories only, never named agencies, and only what each model's own
 * public pricing structure makes true. Rendered as a plain HTML table so
 * answer engines can read and quote it.
 */
const MODELS = [
  "Appointly Solutions",
  "Retainer marketing agency",
  "Pay per lead Meta agency",
  "Shared lead marketplaces (Angi, HomeAdvisor, Thumbtack)",
  "Google Local Services Ads",
] as const;

const ROWS: { label: string; vals: string[] }[] = [
  {
    label: "What you are billed for",
    vals: [
      `Each booked appointment, ${FEE_RANGE}`,
      "A monthly fee, whether or not estimates book",
      "Each lead",
      "Each lead",
      "Each lead, priced by Google",
    ],
  },
  {
    label: "Ad spend",
    vals: [
      "You fund it, at cost with no markup, reported weekly",
      "Usually paid by you on top of the fee",
      "Varies: separate, or built into the lead price",
      "Built into the lead price",
      "Built into the lead price",
    ],
  },
  {
    label: "Who calls the lead",
    vals: ["Jacob, by text and call within one minute", "You", "You", "You, racing other contractors", "You"],
  },
  {
    label: "Territory",
    vals: [
      "One contractor per market, in writing",
      "Usually yours alone",
      "Usually yours alone",
      "Usually shared with several contractors",
      "Your lead, but competitors show in the same results",
    ],
  },
  {
    label: "A bad appointment or lead",
    vals: [
      "Grade it a C and you do not pay for it",
      "Your cost",
      "Your cost, unless they credit it",
      "Your cost, unless the platform credits it",
      "You can dispute invalid leads with Google",
    ],
  },
  {
    label: "A no show",
    vals: ["Credited automatically to your next appointment", "Your cost", "Your cost", "Your cost", "Your cost"],
  },
];

export function CompareModels() {
  return (
    <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white">
      <table className="w-full min-w-[860px] text-left text-sm">
        <caption className="sr-only">
          How Appointly Solutions compares with other ways floor coating contractors buy leads and appointments
        </caption>
        <thead>
          <tr className="border-b border-gray-200">
            <th scope="col" className="p-4 font-semibold text-slate-500" />
            {MODELS.map((m, i) => (
              <th
                key={m}
                scope="col"
                className={`p-4 font-semibold ${i === 0 ? "bg-primary/10 text-slate-950" : "text-slate-700"}`}
              >
                {m}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.label} className="border-b border-gray-100 last:border-0">
              <th scope="row" className="p-4 font-semibold text-slate-950">
                {r.label}
              </th>
              {r.vals.map((v, i) => (
                <td key={i} className={`p-4 leading-6 ${i === 0 ? "bg-primary/10 font-medium text-slate-950" : "text-slate-600"}`}>
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
