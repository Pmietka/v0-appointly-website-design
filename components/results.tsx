"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Andre",
    role: "Insulation contractor",
    quote:
      "In my second month with Appointly, I was able to get 6 new residential clients.",
    result: "6 new clients in month 2",
    rating: 5,
    initial: "A",
  },
  {
    name: "Wojtek",
    role: "Insulation contractor",
    quote:
      "I was already paying for leads with zero consistency. Three months with Appointly gave me 6 closed jobs every single month.",
    result: "6 closed jobs/month for 3 months straight",
    rating: 5,
    initial: "W",
  },
];

export function Results() {
  return (
    <section id="results" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            Client Results
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight text-balance text-gray-900 md:text-4xl lg:text-5xl">
            What insulation contractors <span className="text-primary">actually say</span>
          </h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            Straight contractor feedback about what happened after the leads started coming in.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name + testimonial.role}
              className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 select-none font-serif text-5xl leading-none text-primary/20">
                &#8220;
              </div>

              <div className="mb-5 flex gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star
                    key={`star-${testimonial.name}-${index}`}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="flex-1 text-base font-medium leading-relaxed text-gray-700">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="mt-5 inline-flex self-start items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                {testimonial.result}
              </div>

              <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {testimonial.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
