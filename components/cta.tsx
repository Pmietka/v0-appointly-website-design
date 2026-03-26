import { ArrowRight, CheckCircle } from "lucide-react";

const bullets = [
  "No long-term contracts",
  "Performance-based model",
  "White-glove onboarding",
];

export function CTA() {
  return (
    <section id="cta" className="py-24 md:py-32 section-divider relative overflow-hidden">
      {/* Deep background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.04] to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-primary/[0.08] blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent/[0.05] blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Card inner glow border */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background:
                "linear-gradient(135deg, hsl(199 89% 48% / 0.15) 0%, transparent 50%, hsl(172 66% 50% / 0.1) 100%)",
              border: "1px solid hsl(199 89% 48% / 0.2)",
            }}
          />

          <div className="relative bg-white/[0.02] backdrop-blur-sm p-12 md:p-20 text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-4 px-3 py-1 rounded-full border border-primary/20 bg-primary/[0.06]">
              Ready to Grow?
            </span>

            <h2 className="mt-2 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
              Stop Chasing Leads.{" "}
              <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-primary via-cyan-300 to-accent bg-clip-text text-transparent">
                Start Booking Estimates.
              </span>
            </h2>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Book a free strategy call and we{"'"}ll show you exactly how our
              system can fill your calendar with qualified homeowners ready for
              insulation estimates.
            </p>

            {/* Bullets */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              {bullets.map((b) => (
                <div key={b} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="https://client.getappointly.co/strategy-calendar"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-10 py-4 text-base font-bold text-primary-foreground hover:opacity-90 transition-opacity"
                style={{
                  boxShadow:
                    "0 0 60px hsl(199 89% 48% / 0.4), 0 4px 30px hsl(199 89% 48% / 0.25)",
                }}
              >
                Book a Call Now
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <p className="mt-5 text-sm text-muted-foreground/60">
              No commitment. No pressure. Just a real conversation about growing
              your business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
