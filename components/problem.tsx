import {
  DollarSign,
  Users,
  Star,
  Wrench,
  AlertTriangle,
} from "lucide-react";

const problems = [
  {
    icon: DollarSign,
    title: "Paying for Nothing",
    text: "You're writing checks to agencies every month — retainers, management fees, ad spend — with no guaranteed leads and nothing to show for it.",
  },
  {
    icon: Users,
    title: "Shared Leads Are a Race to the Phone",
    text: "Buying leads from Angi or HomeAdvisor means you're competing against 4+ other contractors calling the same homeowner at the same time.",
  },
  {
    icon: Star,
    title: "Your Google Profile Is Hurting You",
    text: "Your GMB is unclaimed or sitting at 3 stars because no one ever asked for reviews. That's lost trust and lost inbound calls every single day.",
  },
  {
    icon: Wrench,
    title: "You're Busy Running Jobs",
    text: "You're too busy on installs to run ads, follow up with inquiries, or figure out Facebook. Marketing falls through the cracks when you're in the field.",
  },
  {
    icon: AlertTriangle,
    title: "Agencies Charge Regardless of Results",
    text: "Most agencies are on retainer whether they deliver or not. You're the one carrying all the risk while they collect the monthly fee.",
  },
];

export function Problem() {
  return (
    <section id="problem" className="py-24 md:py-32 bg-[#eef0f8]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Empathy text */}
          <div className="lg:sticky lg:top-32">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-500 mb-4">
              Sound Familiar?
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-balance leading-tight">
              The Insulation{" "}
              <span className="text-[#5f57e8]">
                Contractor
              </span>{" "}
              Reality
            </h2>
            <p className="mt-5 text-gray-600 leading-relaxed max-w-lg text-base">
              You{"'"}re great at what you do. But between running jobs, managing
              crews, and trying to follow up with every inquiry — qualified
              homeowners are slipping through the cracks every single day.
            </p>

            <div className="mt-8 p-5 rounded-2xl border border-[#5f57e8]/20 bg-white shadow-sm">
              <p className="text-sm text-gray-700 leading-relaxed">
                The average insulation contractor wastes{" "}
                <span className="font-bold text-[#5f57e8]">$2,000–$5,000/month</span>{" "}
                on agencies or shared leads that never convert. There{"'"}s a better model.
              </p>
            </div>
          </div>

          {/* Right: Problem list */}
          <div className="flex flex-col gap-3">
            {problems.map((p, i) => (
              <div
                key={p.title}
                className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 hover:shadow-sm transition-shadow group"
              >
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-xl bg-[#5f57e8]/10">
                  <p.icon className="h-4 w-4 text-[#5f57e8]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm font-semibold text-gray-900">{p.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {p.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
