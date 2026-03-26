import { ArrowRight, CalendarCheck, Users, TrendingUp } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      {/* Mesh gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-[#7d87f7]/[0.06] blur-[130px]" />
        <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] rounded-full bg-[#7d87f7]/[0.04] blur-[100px]" />
        {/* Dot grid overlay */}
        <div className="absolute inset-0 dot-grid opacity-50" />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Eyebrow label */}
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-6">
            Meet Appointly
          </p>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-balance text-foreground">
            We Scale Your Business,{" "}
            <span className="bg-gradient-to-r from-[#a5abff] via-[#7d87f7] to-[#8b78f8] bg-clip-text text-transparent">
              No Risk to You
            </span>
          </h1>

          <p className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl">
            Most contractors are tired of paying agencies thousands a month with
            nothing to show for it. Find out how to take the first step toward a
            model where you only pay when a real lead hits your phone. Watch the
            short video below so you know how our system works.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <a
              href="https://client.getappointly.co/strategy-calendar"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              style={{
                boxShadow:
                  "0 0 40px rgb(125 135 247 / 0.4), 0 4px 20px rgb(125 135 247 / 0.2)",
              }}
            >
              Book a Strategy Call
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#solution"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-8 py-4 text-sm font-semibold text-foreground hover:bg-white/[0.08] hover:border-white/[0.15] transition-all backdrop-blur-sm"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm p-7 hover:border-[#7d87f7]/30 hover:bg-[#7d87f7]/[0.04] transition-all duration-300">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-primary/10 border border-primary/20">
              <CalendarCheck className="h-5 w-5 text-primary" />
            </div>
            <span className="text-3xl font-bold font-display bg-gradient-to-r from-[#7d87f7] to-[#a5abff] bg-clip-text text-transparent">
              250+
            </span>
            <span className="text-sm text-muted-foreground text-center">
              Estimates Booked Monthly
            </span>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm p-7 hover:border-[#7d87f7]/30 hover:bg-[#7d87f7]/[0.04] transition-all duration-300">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-primary/10 border border-primary/20">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <span className="text-3xl font-bold font-display bg-gradient-to-r from-[#7d87f7] to-[#a5abff] bg-clip-text text-transparent">
              95%
            </span>
            <span className="text-sm text-muted-foreground text-center">
              Lead Contact Rate
            </span>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm p-7 hover:border-[#7d87f7]/30 hover:bg-[#7d87f7]/[0.04] transition-all duration-300">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-primary/10 border border-primary/20">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <span className="text-3xl font-bold font-display bg-gradient-to-r from-[#7d87f7] to-[#a5abff] bg-clip-text text-transparent">
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
