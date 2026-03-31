"use client";

import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Mike Reynolds",
    role: "Owner, Reynolds Insulation Co.",
    quote:
      "I was skeptical, but the pay-per-lead model made the decision easy. No retainer, no risk. Closed 6 of the first 10 leads we got. ROI paid back in week one.",
    rating: 5,
    initial: "M",
  },
  {
    name: "Sarah Chen",
    role: "Operations Manager, ThermalPro",
    quote:
      "The difference from Angi leads is massive. These homeowners are actually ready to book. Our close rate went from 25% to over 60% because we're not racing competitors to the phone.",
    rating: 5,
    initial: "S",
  },
  {
    name: "James Hartwell",
    role: "Founder, ComfortFirst Insulation",
    quote:
      "The GMB setup alone was worth it. We started getting inbound calls we never had before. Add the Facebook leads on top and the pipeline filled up fast. The NFC cards keep the reviews coming in too.",
    rating: 5,
    initial: "J",
  },
];

const results = [
  {
    src: "/images/result-1.jpg",
    alt: "Appointly Solutions dashboard showing 47 booked insulation estimate appointments in one month",
    caption: "47 Qualified Leads Delivered in a Single Month",
    tag: "Pipeline",
  },
  {
    src: "/images/result-2.jpg",
    alt: "Qualified insulation contractor lead pipeline managed by Appointly Solutions",
    caption: "8–12x Average ROI on Lead Cost",
    tag: "ROI",
  },
  {
    src: "/images/result-3.jpg",
    alt: "Appointly Solutions lead delivery within 24 to 48 hours of campaign launch",
    caption: "First Leads Within 24–48 Hours of Launch",
    tag: "Speed",
  },
];

export function Results() {
  return (
    <section id="results" className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-500 mb-4">
            Proven Results
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-balance leading-tight">
            Real Results From{" "}
            <span className="text-[#5f57e8]">
              Real Businesses
            </span>
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Don{"'"}t take our word for it. See what our clients are saying and
            the numbers behind their growth.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-5xl font-serif leading-none text-[#5f57e8]/20 mb-4 select-none">
                &#8220;
              </div>

              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={`star-${t.name}-${i}`}
                    className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="text-sm leading-relaxed text-gray-600 flex-1">
                {t.quote}
              </p>

              <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-3">
                <div className="flex items-center justify-center h-9 w-9 rounded-full bg-[#5f57e8] text-xs font-bold text-white flex-shrink-0">
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

        {/* Results screenshots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {results.map((r) => (
            <div
              key={r.caption}
              className="group rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={r.src || "/placeholder.svg"}
                  alt={r.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 right-3 text-xs font-semibold bg-white/90 border border-gray-200 text-[#5f57e8] px-2.5 py-1 rounded-full">
                  {r.tag}
                </span>
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-gray-900">{r.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
