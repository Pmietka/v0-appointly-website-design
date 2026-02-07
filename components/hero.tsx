import { ArrowRight, CalendarCheck, Users, TrendingUp } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 mb-8">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-xs font-medium text-muted-foreground">
              Built for Home Insulation Businesses
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight text-balance">
            Fill Your Calendar With{" "}
            <span className="text-primary">Qualified Estimates</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-2xl">
            We help insulation businesses fill their calendar with qualified
            estimates without wasting time on tire-kickers using our perfect
            homeowner capture & convert system.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#cta"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
            >
              Book a Call
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#solution"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-7 py-3.5 text-base font-semibold text-foreground hover:bg-secondary transition-colors"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
              <CalendarCheck className="h-5 w-5 text-primary" />
            </div>
            <span className="text-2xl font-bold font-display text-foreground">
              250+
            </span>
            <span className="text-sm text-muted-foreground">
              Estimates Booked Monthly
            </span>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-accent/10">
              <Users className="h-5 w-5 text-accent" />
            </div>
            <span className="text-2xl font-bold font-display text-foreground">
              95%
            </span>
            <span className="text-sm text-muted-foreground">
              Lead Contact Rate
            </span>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <span className="text-2xl font-bold font-display text-foreground">
              3x
            </span>
            <span className="text-sm text-muted-foreground">
              More Booked Jobs
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
