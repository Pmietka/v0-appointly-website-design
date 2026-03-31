import { AlertTriangle, DollarSign, Star, Users, Wrench } from "lucide-react";

const problems = [
  {
    icon: DollarSign,
    title: "Slow weeks still cost money",
    text: "When the phones are quiet, your crews, trucks, and payroll still need work. A couple empty days on the schedule adds up fast.",
  },
  {
    icon: Users,
    title: "Shared leads turn into price shopping",
    text: "If the same homeowner talks to four insulation companies, the job often becomes a race to the bottom instead of a clean estimate conversation.",
  },
  {
    icon: Star,
    title: "Weak reviews cost you calls",
    text: "Homeowners compare ratings before they ever pick up the phone. If your Google profile looks stale, the next contractor gets that call.",
  },
  {
    icon: Wrench,
    title: "You are busy running installs",
    text: "Attics, crawlspaces, callbacks, and crew scheduling leave little time to chase every web lead while you are still in the field.",
  },
  {
    icon: AlertTriangle,
    title: "Retainers feel disconnected from jobs booked",
    text: "Most companies want a monthly fee whether the calendar fills up or not. Contractors usually want the spend tied closer to actual estimate opportunities.",
  },
];

export function Problem() {
  return (
    <section id="problem" className="bg-[hsl(var(--surface-subtle))] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <div className="lg:sticky lg:top-32">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
              Sound Familiar?
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-balance text-gray-900 md:text-4xl lg:text-5xl">
              What insulation contractors are up against every week
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-600">
              Between estimates, installs, crew management, and follow-up, it is easy
              for good homeowner leads to cool off before anyone calls them back.
            </p>

            <div className="mt-8 rounded-2xl border border-primary/20 bg-white p-5 shadow-sm">
              <p className="text-sm leading-relaxed text-gray-700">
                The real problem is not just lead volume. It is getting the right
                homeowner in the right area at the right time, before the job goes to
                someone else.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {problems.map((problem, index) => (
              <div
                key={problem.title}
                className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-sm"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/15">
                  <problem.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {problem.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {problem.text}
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
