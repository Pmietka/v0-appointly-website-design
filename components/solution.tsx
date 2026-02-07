import {
  Target,
  Zap,
  ShieldCheck,
  CalendarPlus,
  RefreshCw,
} from "lucide-react";

const steps = [
  {
    icon: Target,
    title: "Targeted Ad Campaigns",
    description:
      "We generate insulation leads with targeted ads that reach homeowners actively looking for insulation services in your area.",
  },
  {
    icon: Zap,
    title: "Instant Lead Contact",
    description:
      "We contact every lead immediately within minutes, not hours so you never lose a hot prospect to slow response times.",
  },
  {
    icon: ShieldCheck,
    title: "Pre-Qualification",
    description:
      "We qualify every lead for fit and intent before they ever waste your time. Wrong area, wrong budget, renters filtered out.",
  },
  {
    icon: CalendarPlus,
    title: "Estimates Booked For You",
    description:
      "We book the estimate directly on your calendar, or hand them off completely ready to book. You just show up.",
  },
  {
    icon: RefreshCw,
    title: "Relentless Follow-Up",
    description:
      "We keep following up until they book or disqualify. No lead left behind, no opportunity wasted.",
  },
];

export function Solution() {
  return (
    <section id="solution" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Our System
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-foreground text-balance">
            The Homeowner Capture & Convert System
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            A done-for-you system that generates, qualifies, and books insulation
            estimates on your calendar so you can focus on closing jobs.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative flex flex-col rounded-xl border border-border bg-card p-6 hover:shadow-lg hover:shadow-primary/5 transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
            </div>
          ))}

          {/* Highlight card */}
          <div className="relative flex flex-col justify-center rounded-xl bg-primary p-6">
            <h3 className="font-display text-lg font-semibold text-primary-foreground mb-2">
              The Result?
            </h3>
            <p className="text-sm leading-relaxed text-primary-foreground/90">
              A full calendar of qualified estimates from homeowners who are
              ready to buy without you lifting a finger to generate or chase
              them.
            </p>
            <a
              href="#cta"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary-foreground px-5 py-2.5 text-sm font-semibold text-primary hover:opacity-90 transition-opacity self-start"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
