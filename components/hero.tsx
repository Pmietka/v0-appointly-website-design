import { ArrowRight, CalendarCheck, Users, TrendingUp } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      {/* Mesh gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 right-0 w-[900px] h-[900px] rounded-full bg-primary/[0.08] blur-[140px]" />
        <div className="absolute bottom-0 -left-40 w-[700px] h-[700px] rounded-full bg-accent/[0.06] blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-violet-500/[0.04] blur-[100px]" />
        {/* Dot grid overlay */}
        <div className="absolute inset-0 dot-grid opacity-40" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-2 mb-8 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
            <span className="text-xs font-semibold tracking-wide text-primary uppercase">
              Built for Home Insulation Businesses
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-balance">
            Fill Your Calendar{" "}
            <br className="hidden sm:block" />
            With{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-300 to-accent bg-clip-text text-transparent">
              Qualified Estimates
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-2xl">
            We help insulation businesses fill their calendar with qualified
            estimates — without wasting time on tire-kickers — using our
            perfect homeowner capture &amp; convert system.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <a
              href="https://client.getappointly.co/strategy-calendar"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              style={{
                boxShadow:
                  "0 0 40px hsl(199 89% 48% / 0.35), 0 4px 20px hsl(199 89% 48% / 0.2)",
              }}
            >
              Book a Strategy Call
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#solution"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-8 py-4 text-base font-semibold text-foreground hover:bg-white/[0.08] hover:border-white/[0.15] transition-all backdrop-blur-sm"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm p-7 hover:border-primary/30 hover:bg-primary/[0.04] transition-all duration-300">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-primary/10 border border-primary/20">
              <CalendarCheck className="h-5 w-5 text-primary" />
            </div>
            <span className="text-3xl font-bold font-display bg-gradient-to-r from-primary to-cyan-300 bg-clip-text text-transparent">
              250+
            </span>
            <span className="text-sm text-muted-foreground text-center">
              Estimates Booked Monthly
            </span>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm p-7 hover:border-accent/30 hover:bg-accent/[0.04] transition-all duration-300">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-accent/10 border border-accent/20">
              <Users className="h-5 w-5 text-accent" />
            </div>
            <span className="text-3xl font-bold font-display bg-gradient-to-r from-accent to-cyan-300 bg-clip-text text-transparent">
              95%
            </span>
            <span className="text-sm text-muted-foreground text-center">
              Lead Contact Rate
            </span>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm p-7 hover:border-primary/30 hover:bg-primary/[0.04] transition-all duration-300">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-primary/10 border border-primary/20">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <span className="text-3xl font-bold font-display bg-gradient-to-r from-primary to-cyan-300 bg-clip-text text-transparent">
              3x
            </span>
            <span className="text-sm text-muted-foreground text-center">
              More Booked Jobs
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
