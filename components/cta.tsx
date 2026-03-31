import { ArrowRight, CheckCircle } from "lucide-react";

const bullets = [
  "No long-term retainer",
  "Qualified homeowner leads only",
  "One contractor per market",
];

export function CTA() {
  return (
    <section id="cta" className="bg-[#eef0f8] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-sm md:p-20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            Ready for a better lead source?
          </p>

          <h2 className="font-display text-4xl font-bold leading-tight text-balance text-gray-900 md:text-5xl lg:text-6xl">
            Put more estimates on the calendar.{" "}
            <br className="hidden md:block" />
            <span className="text-primary">Pay only for qualified leads.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-600">
            Book a strategy call and we will look at your service area, job mix, and
            crew capacity to see whether this actually fits the kind of insulation work
            you want more of.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {bullets.map((bullet) => (
              <div key={bullet} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-sm text-gray-600">{bullet}</span>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="https://client.getappointly.co/strategy-calendar"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-10 py-4 text-base font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Book a Call Now
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-5 text-sm text-gray-500">
            No pressure. Just a straight conversation about whether your market is a fit.
          </p>
        </div>
      </div>
    </section>
  );
}
