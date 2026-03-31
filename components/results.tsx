"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Andre",
    role: "Home Insulation Contractor",
    quote:
      "In my second month with Appointly, I was able to get 6 new residential clients.",
    result: "6 new clients in month 2",
    rating: 5,
    initial: "A",
  },
  {
    name: "Wojtek",
    role: "Home Insulation Contractor",
    quote:
      "I was already paying agencies with zero consistency — no way to predict my pipeline month to month. 3 months with Appointly: 6 closed jobs every single month without fail.",
    result: "6 closed jobs/month for 3 months straight",
    rating: 5,
    initial: "W",
  },
  {
    name: "Adrian",
    role: "Window Replacement Contractor",
    quote:
      "Appointly got me leads that actually convert.",
    result: "14 paying clients in first 3 months",
    rating: 5,
    initial: "A",
  },
];

export function Results() {
  return (
    <section id="results" className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-500 mb-4">
            Client Results
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-balance leading-tight">
            What Our Clients{" "}
            <span className="text-[#5f57e8]">Actually Say</span>
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Real contractors. Real results. No stock photos or made-up numbers.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name + t.role}
              className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-5xl font-serif leading-none text-[#5f57e8]/15 mb-4 select-none">
                &#8220;
              </div>

              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={`star-${t.name}-${i}`}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="text-base leading-relaxed text-gray-700 flex-1 font-medium">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Result badge */}
              <div className="mt-5 inline-flex self-start items-center gap-1.5 bg-[#5f57e8]/8 border border-[#5f57e8]/20 text-[#5f57e8] text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5f57e8] flex-shrink-0" />
                {t.result}
              </div>

              <div className="mt-5 pt-5 border-t border-gray-100 flex items-center gap-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#5f57e8] text-sm font-bold text-white flex-shrink-0">
                  {t.initial}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
