import { ArrowRight, CheckCircle } from "lucide-react";

const bullets = [
  "No monthly retainer",
  "Pay per qualified lead only",
  "One contractor per market",
];

export function CTA() {
  return (
    <section id="cta" className="py-24 md:py-32 bg-[#eef0f8]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="bg-white rounded-3xl p-12 md:p-20 text-center border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-500 mb-4">
            Ready to Grow?
          </p>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-balance leading-tight">
            Stop Paying for Retainers.{" "}
            <br className="hidden md:block" />
            <span className="text-[#5f57e8]">
              Pay Only When We Deliver.
            </span>
          </h2>

          <p className="mt-6 text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            Book a free strategy call and we{"'"}ll map out your market, walk through
            how the pay-per-lead system works, and show you what it looks like to
            get exclusive, qualified leads in your area.
          </p>

          {/* Bullets */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {bullets.map((b) => (
              <div key={b} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#5f57e8] flex-shrink-0" />
                <span className="text-sm text-gray-600">{b}</span>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="https://client.getappointly.co/strategy-calendar"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5f57e8] px-10 py-4 text-base font-bold text-white hover:opacity-90 transition-opacity"
            >
              Book a Call Now
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-5 text-sm text-gray-400">
            No commitment. No pressure. Just a real conversation about growing
            your business.
          </p>
        </div>
      </div>
    </section>
  );
}
