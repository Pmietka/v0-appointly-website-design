import {
  Target,
  Zap,
  ShieldCheck,
  CalendarPlus,
  RefreshCw,
  ArrowRight,
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
      "We contact every lead immediately — within minutes, not hours — so you never lose a hot prospect to slow response times.",
  },
  {
    icon: ShieldCheck,
    title: "Pre-Qualification",
    description:
      "We qualify every lead for fit and intent before they ever waste your time. Wrong area, wrong budget, renters — all filtered out.",
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
    <section id="solution" className="py-24 md:py-32 section-divider relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-[700px] h-[700px] rounded-full bg-accent/[0.05] blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/[0.06] blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent mb-3 px-3 py-1 rounded-full border border-accent/20 bg-accent/[0.06]">
            Our System
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance leading-tight">
            The Homeowner{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Capture &amp; Convert
            </span>{" "}
            System
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            A done-for-you system that generates, qualifies, and books insulation
            estimates on your calendar — so you can focus on closing jobs.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 hover:border-primary/20 hover:bg-primary/[0.03] transition-all duration-300 group"
            >
              {/* Step number watermark */}
              <span className="absolute top-5 right-5 text-4xl font-black text-white/[0.04] font-display select-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/15 transition-colors">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary/60">
                  Step {i + 1}
                </span>
              </div>

              <h3 className="font-display text-base font-semibold text-foreground mb-2">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
            </div>
          ))}

          {/* Highlight card */}
          <div
            className="relative flex flex-col justify-between rounded-2xl p-6 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, hsl(199 89% 48% / 0.9), hsl(172 66% 50% / 0.85))",
              boxShadow: "0 0 60px hsl(199 89% 48% / 0.2), 0 0 120px hsl(172 66% 50% / 0.1)",
            }}
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3 block">
                The Result
              </span>
              <h3 className="font-display text-xl font-bold text-white mb-3 leading-tight">
                A Calendar Full of Ready-to-Buy Homeowners
              </h3>
              <p className="text-sm leading-relaxed text-white/80">
                Without you lifting a finger to generate or chase them. Just show up
                and close.
              </p>
            </div>

            <a
              href="https://client.getappointly.co/strategy-calendar"
              className="relative z-10 mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-primary hover:opacity-90 transition-opacity self-start"
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
