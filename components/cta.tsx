import { ArrowRight, CheckCircle } from "lucide-react";

const bullets = [
  "No monthly retainer",
  "Pay per qualified lead only",
  "One contractor per market",
];

export function CTA() {
  return (
    <section id="cta" className="py-24 md:py-32 section-divider relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[#7d87f7]/[0.03] to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-[#7d87f7]/[0.08] blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#7d87f7]/[0.05] blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="relative rounded-3xl overflow-hidden">
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background:
                "linear-gradient(135deg, rgb(125 135 247 / 0.12) 0%, transparent 50%, rgb(165 171 255 / 0.08) 100%)",
              border: "1px solid rgb(125 135 247 / 0.2)",
            }}
          />

          <div className="relative bg-white/[0.02] backdrop-blur-sm p-12 md:p-20 text-center">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-4">
              Ready to Grow?
            </p>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
              Stop Paying for Retainers.{" "}
              <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-[#a5abff] via-[#7d87f7] to-[#8b78f8] bg-clip-text text-transparent">
                Pay Only When We Deliver.
              </span>
            </h2>

            <p className="mt-6 text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Book a free strategy call and we{"'"}ll map out your market, walk through
              how the pay-per-lead system works, and show you what it looks like to
              get exclusive, qualified leads in your area.
            </p>

            {/* Bullets */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              {bullets.map((b) => (
                <div key={b} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="https://client.getappointly.co"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-10 py-4 text-base font-bold text-primary-foreground hover:opacity-90 transition-opacity"
                style={{
                  boxShadow:
                    "0 0 60px rgb(125 135 247 / 0.4), 0 4px 30px rgb(125 135 247 / 0.25)",
                }}
              >
                Book a Call Now
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <p className="mt-5 text-sm text-muted-foreground/50">
              No commitment. No pressure. Just a real conversation about growing
              your business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
