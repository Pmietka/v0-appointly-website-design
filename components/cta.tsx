import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section id="cta" className="py-20 md:py-28 bg-card">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative rounded-2xl bg-foreground p-10 md:p-16 text-center overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-3xl -z-0" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-accent/10 blur-3xl -z-0" />

          <div className="relative z-10">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Ready to Grow?
            </span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-bold text-background text-balance">
              Stop Chasing Leads.{" "}
              <span className="text-primary">Start Booking Estimates.</span>
            </h2>
            <p className="mt-6 text-lg text-background/70 max-w-xl mx-auto leading-relaxed">
              Book a free strategy call and we{"'"}ll show you exactly how our
              system can fill your calendar with qualified homeowners ready for
              insulation estimates.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://client.getappointly.co/strategy-calendar"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
              >
                Book a Call Now
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-4 text-sm text-background/50">
              No commitment. No pressure. Just a real conversation about growing
              your business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
