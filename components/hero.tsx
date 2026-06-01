import { ArrowRight, MapPin, ShieldCheck, TrendingUp } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--surface-subtle))] pb-24 pt-32 md:pb-32 md:pt-44">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            Booked Estimates for Floor Coating Contractors
          </p>

          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance text-gray-900 md:text-6xl lg:text-7xl">
            Keep your calendar full of{" "}
            <span className="marker-highlight">booked floor coating estimates.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
            We run the Meta ads, reach every homeowner the second they raise their
            hand, and book the estimate straight onto your calendar. All you do is
            show up, run the estimate, do the job, and collect the cash.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="https://client.getappointly.co/strategy-calendar"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Book a Free Strategy Call
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#solution"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-8 py-4 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
            >
              See How It Works
            </a>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-gray-100">
              <ShieldCheck className="h-5 w-5 text-gray-900" />
            </div>
            <span className="font-display text-3xl font-bold text-gray-900">100%</span>
            <span className="text-center text-sm text-gray-500">
              Exclusive coverage — one contractor per market
            </span>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-gray-100">
              <TrendingUp className="h-5 w-5 text-gray-900" />
            </div>
            <span className="font-display text-3xl font-bold text-gray-900">8x</span>
            <span className="text-center text-sm text-gray-500">
              Average return on ad spend
            </span>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-gray-100">
              <MapPin className="h-5 w-5 text-gray-900" />
            </div>
            <span className="font-display text-3xl font-bold text-gray-900">24-48h</span>
            <span className="text-center text-sm text-gray-500">
              Typical first booked estimate after launch
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
