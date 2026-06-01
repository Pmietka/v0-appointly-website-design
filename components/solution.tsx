import {
  ArrowRight,
  CalendarCheck2,
  CreditCard,
  Megaphone,
  ShieldCheck,
  Zap,
} from "lucide-react";

const steps = [
  {
    icon: Megaphone,
    title: "We generate the lead",
    description:
      "We run Meta ads in your service area aimed at homeowners who actually want floor coating, epoxy, or concrete coating work done.",
  },
  {
    icon: Zap,
    title: "Speed to lead",
    description:
      "We contact every lead immediately, before they can shop other contractors. The first one to reach them is usually the one who books the job.",
  },
  {
    icon: CalendarCheck2,
    title: "We book the appointment",
    description:
      "We set the estimate into a time that works for you, either on the spot or as soon as we reach them, and drop it straight onto your calendar.",
  },
  {
    icon: ShieldCheck,
    title: "Exclusive to your market",
    description:
      "We only work with one contractor per service area, so the appointments we book are never shared with a competitor down the road.",
  },
  {
    icon: CreditCard,
    title: "Simple, results-based pricing",
    description:
      "A retainer covers our labor and effort. On top of that, you pay a per-appointment fee for each booked estimate that lands on your calendar.",
  },
];

export function Solution() {
  return (
    <section id="solution" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            Our System
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight text-balance text-gray-900 md:text-4xl lg:text-5xl">
            How the <span className="marker-highlight">Appointly Model</span> works
          </h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            We do the complete job of filling your calendar with booked estimates. All
            you do is show up, run the estimate, do the job, and collect the cash.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-gray-100">
                  <step.icon className="h-5 w-5 text-gray-900" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Step {index + 1}
                </span>
              </div>

              <h3 className="mb-2 font-display text-base font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
            </div>
          ))}

          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground">
            <div>
              <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-primary-foreground/70">
                The Result
              </span>
              <h3 className="mb-3 font-display text-xl font-bold leading-tight text-primary-foreground">
                Booked estimates on your calendar. You just show up and close.
              </h3>
              <p className="text-sm leading-relaxed text-primary-foreground/80">
                One contractor per market, appointments booked for you, and pricing that
                stays tied to the estimates that actually land on your calendar.
              </p>
            </div>

            <a
              href="https://client.getappointly.co/strategy-calendar"
              className="mt-6 inline-flex self-start items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition-opacity hover:opacity-90"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
