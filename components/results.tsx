"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Mike Reynolds",
    role: "Owner, Reynolds Insulation Co.",
    quote:
      "Before Appointly, I was spending hours chasing down leads that never converted. Now my calendar stays full with homeowners who are actually ready to book. Revenue is up 40% in three months.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Operations Manager, ThermalPro",
    quote:
      "The difference is night and day. Every lead that gets put on our calendar is pre-qualified and actually wants an estimate. Our close rate went from 25% to over 60%.",
    rating: 5,
  },
  {
    name: "James Hartwell",
    role: "Founder, ComfortFirst Insulation",
    quote:
      "I was skeptical at first, but the results speak for themselves. We went from 8 estimates a week to 22. The system just works, and I can focus on doing the actual jobs.",
    rating: 5,
  },
];

const results = [
  {
    src: "/images/result-1.jpg",
    alt: "Dashboard showing 47 booked estimates in one month",
    caption: "47 Booked Estimates in a Single Month",
  },
  {
    src: "/images/result-2.jpg",
    alt: "Lead pipeline showing qualified leads progressing to booked estimates",
    caption: "Qualified Lead Pipeline",
  },
  {
    src: "/images/result-3.jpg",
    alt: "Automated follow-up conversation booking an estimate",
    caption: "Automated Homeowner Follow-Up",
  },
];

export function Results() {
  return (
    <section id="results" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Proven Results
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-foreground text-balance">
            Real Results From Real Insulation Businesses
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Don{"'"}t take our word for it. See what our clients are saying and
            the numbers behind their growth.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative flex flex-col rounded-xl border border-border bg-card p-6"
            >
              <Quote className="h-8 w-8 text-primary/20 mb-4" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={`star-${t.name}-${i}`}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground flex-1">
                {`"${t.quote}"`}
              </p>
              <div className="mt-6 pt-4 border-t border-border">
                <p className="font-semibold text-sm text-foreground">
                  {t.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Results screenshots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map((r) => (
            <div
              key={r.caption}
              className="group rounded-xl border border-border bg-card overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={r.src || "/placeholder.svg"}
                  alt={r.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-foreground">
                  {r.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
