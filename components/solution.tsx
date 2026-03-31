import {
  ArrowRight,
  CreditCard,
  MapPin,
  Megaphone,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Google profile and market setup",
    description:
      "We tighten up your Google Business Profile and service area positioning so homeowners can actually find and trust you when they search locally.",
  },
  {
    icon: Megaphone,
    title: "Ads built around estimate requests",
    description:
      "We run local campaigns aimed at homeowners who need attic insulation, spray foam, or removal work in the areas you actually want to service.",
  },
  {
    icon: ShieldCheck,
    title: "Lead screening before handoff",
    description:
      "We screen for homeowner status, service area, project type, and fit before the lead reaches your team, so you spend less time on bad calls.",
  },
  {
    icon: Smartphone,
    title: "Review system after completed jobs",
    description:
      "We send review cards your team can hand out after a clean install so your Google profile gets stronger as more jobs are completed.",
  },
  {
    icon: CreditCard,
    title: "Pay when approved leads are delivered",
    description:
      "You are paying for qualified leads that match the agreed criteria, not for vague monthly activity reports or a long contract.",
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
            How the <span className="text-primary">lead system</span> works
          </h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            The goal is simple: more qualified estimate opportunities on the calendar
            without asking your team to become full-time marketers.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15">
                  <step.icon className="h-5 w-5 text-primary" />
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
                More estimate calls on the schedule. No shared lead chaos.
              </h3>
              <p className="text-sm leading-relaxed text-primary-foreground/80">
                One contractor per market, screened homeowner leads, and a pricing model
                that stays tied to actual delivery.
              </p>
            </div>

            <a
              href="https://client.getappointly.co/strategy-calendar"
              className="mt-6 inline-flex self-start items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition-opacity hover:opacity-90"
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
