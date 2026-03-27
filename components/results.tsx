"use client";

import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Mike Reynolds",
    role: "Owner, Reynolds Insulation Co.",
    quote:
      "Before Appointly Solutions, I was spending hours chasing down leads that never converted. Now my calendar stays full with homeowners who are actually ready to book. Revenue is up 40% in three months.",
    rating: 5,
    initial: "M",
  },
  {
    name: "Sarah Chen",
    role: "Operations Manager, ThermalPro",
    quote:
      "The difference is night and day. Every lead that gets put on our calendar is pre-qualified and actually wants an estimate. Our close rate went from 25% to over 60%.",
    rating: 5,
    initial: "S",
  },
  {
    name: "James Hartwell",
    role: "Founder, ComfortFirst Insulation",
    quote:
      "I was skeptical at first, but the results speak for themselves. We went from 8 estimates a week to 22. The system just works, and I can focus on doing the actual jobs.",
    rating: 5,
    initial: "J",
  },
];

const results = [
  {
    src: "/images/result-1.jpg",
    alt: "Appointly Solutions dashboard showing 47 booked insulation estimate appointments in one month",
    caption: "47 Booked Estimates in a Single Month",
    tag: "Pipeline",
  },
  {
    src: "/images/result-2.jpg",
    alt: "Qualified insulation contractor lead pipeline managed by Appointly Solutions",
    caption: "Qualified Lead Pipeline",
    tag: "Leads",
  },
  {
    src: "/images/result-3.jpg",
    alt: "Appointly Solutions automated follow-up conversation booking an insulation estimate",
    caption: "Automated Homeowner Follow-Up",
    tag: "Automation",
  },
];

export function Results() {
  return (
    <section id="results" className="py-24 md:py-32 section-divider relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#7d87f7]/[0.04] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-4">
            Proven Results
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance leading-tight">
            Real Results From{" "}
            <span className="bg-gradient-to-r from-[#7d87f7] to-[#a5abff] bg-clip-text text-transparent">
              Real Businesses
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Don{"'"}t take our word for it. See what our clients are saying and
            the numbers behind their growth.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 backdrop-blur-sm hover:border-[#7d87f7]/20 hover:bg-[#7d87f7]/[0.03] transition-all duration-300"
            >
              <div className="text-5xl font-serif leading-none text-primary/25 mb-4 select-none">
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

              <p className="text-sm leading-relaxed text-muted-foreground flex-1">
                {t.quote}
              </p>

              <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center gap-3">
                <div className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-br from-[#7d87f7] to-[#a5abff] text-xs font-bold text-white flex-shrink-0">
                  {t.initial}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
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
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden hover:border-[#7d87f7]/20 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={r.src || "/placeholder.svg"}
                  alt={r.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <span className="absolute top-3 right-3 text-xs font-semibold bg-primary/20 border border-primary/30 text-primary px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {r.tag}
                </span>
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-foreground">{r.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
