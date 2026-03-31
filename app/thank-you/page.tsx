import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, CheckCircle, Clock, Target } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";

export const metadata: Metadata = {
  title: "Thank You | Appointly Solutions",
  description:
    "Appointment confirmed with Appointly Solutions. Review your booking details and prepare for your strategy call.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

const callPrep = [
  {
    icon: Calendar,
    title: "What To Have Ready",
    items: [
      "Your current monthly job volume",
      "Average job value (estimate)",
      "Your service area (city/radius)",
    ],
  },
  {
    icon: Target,
    title: "What We'll Cover",
    items: [
      "Your current lead generation setup",
      "Where qualified leads are slipping",
      "Exactly how our system fills your calendar",
    ],
  },
  {
    icon: Clock,
    title: "What To Expect",
    items: [
      "30-minute strategy conversation",
      "No sales pressure - real talk only",
      "A clear next step either way",
    ],
  },
];

export default function ThankYouPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[hsl(var(--surface-subtle))]" />
        <div className="absolute right-0 top-0 h-[700px] w-[700px] rounded-full bg-primary/[0.06] blur-[140px]" />
        <div className="absolute inset-0 dot-grid opacity-30" />
      </div>

      <nav className="border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm">
              <BrandMark className="h-8 w-8" />
            </div>
            <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-foreground">
              Appointly
            </span>
          </a>
          <a
            href="https://client.getappointly.co/strategy-calendar"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Book A Call
          </a>
        </div>
      </nav>

      <section className="pb-10 pt-20 md:pb-14 md:pt-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            You're In
          </p>

          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-balance md:text-5xl lg:text-6xl">
            Your call is booked. Here is how to get the most out of it.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            You just took the next step toward a lead system that is built around
            real estimate opportunities. Watch the short video below so we can spend
            the call on your market, your service area, and your actual growth plan.
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="relative z-10 px-8 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border border-primary/30 bg-primary/10 transition-all duration-200 hover:scale-105 hover:bg-primary/20">
                <div className="ml-1 h-0 w-0 border-b-[10px] border-l-[18px] border-t-[10px] border-b-transparent border-l-primary border-t-transparent" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                Strategy overview video - watch before your call
              </p>
              <p className="mt-1 text-xs text-muted-foreground/70">~8 minutes</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider pb-24 pt-16 md:pb-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Before Your Call
            </p>
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Show up ready to hit the ground running
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              The more prepared you are, the more value you get from our 30 minutes together.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {callPrep.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                    <section.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {section.title}
                  </h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="mb-5 text-sm text-muted-foreground">
              Need to reschedule? No problem.
            </p>
            <a
              href="https://client.getappointly.co/strategy-calendar"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              View or Reschedule Your Booking
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <div className="flex items-center gap-3">
            <BrandMark className="h-6 w-6 text-slate-950" />
            <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-foreground">
              Appointly
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Appointly Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
