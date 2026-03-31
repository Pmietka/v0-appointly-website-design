import { ArrowRight, MapPin, ShieldCheck, TrendingUp } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden bg-[#eef0f8]">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Eyebrow label */}
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-500 mb-6">
            Pay-Per-Lead for Insulation Contractors
          </p>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-balance text-gray-900">
            Get Qualified Insulation Leads.{" "}
            <span className="text-[#5f57e8]">
              Pay Per Lead. Or Nothing.
            </span>
          </h1>

          <p className="mt-6 text-base md:text-lg leading-relaxed text-gray-600 max-w-2xl">
            We set up your GMB, run your Facebook ads, and send you pre-qualified
            homeowners ready to book estimates. You only pay when we deliver a lead
            that meets every qualification criteria.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <a
              href="https://client.getappointly.co/strategy-calendar"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5f57e8] px-8 py-4 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Book a Free Strategy Call
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#solution"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white shadow-sm p-7 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-[#5f57e8]/10">
              <ShieldCheck className="h-5 w-5 text-[#5f57e8]" />
            </div>
            <span className="text-3xl font-bold font-display text-[#5f57e8]">
              100%
            </span>
            <span className="text-sm text-gray-500 text-center">
              Exclusive — One Contractor Per Market
            </span>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white shadow-sm p-7 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-[#5f57e8]/10">
              <TrendingUp className="h-5 w-5 text-[#5f57e8]" />
            </div>
            <span className="text-3xl font-bold font-display text-[#5f57e8]">
              8–12x
            </span>
            <span className="text-sm text-gray-500 text-center">
              Average Contractor ROI on Lead Cost
            </span>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white shadow-sm p-7 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-[#5f57e8]/10">
              <MapPin className="h-5 w-5 text-[#5f57e8]" />
            </div>
            <span className="text-3xl font-bold font-display text-[#5f57e8]">
              24–48h
            </span>
            <span className="text-sm text-gray-500 text-center">
              First Leads After Campaign Launch
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
