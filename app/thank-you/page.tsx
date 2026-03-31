import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Calendar, Clock, Target } from "lucide-react";

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
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at -10% 110%, hsl(235 60% 30% / 0.4) 0%, transparent 70%)",
          }}
        />
        <div className="absolute top-0 right-0 h-[700px] w-[700px] rounded-full bg-[#7d87f7]/[0.05] blur-[140px]" />
        <div className="absolute inset-0 dot-grid opacity-30" />
      </div>

      <nav className="border-b border-white/[0.05] bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3">
            <Image
              src="/images/appointly-logo.png"
              alt="Appointly Solutions logo"
              width={38}
              height={38}
              className="rounded-xl"
            />
            <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-foreground">
              Appointly
            </span>
          </a>
          <a
            href="https://client.getappointly.co/strategy-calendar"
            className="text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            Book A Call
          </a>
        </div>
      </nav>

      <section className="pt-20 pb-10 md:pt-28 md:pb-14">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            You&apos;re In
          </p>

          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-balance md:text-5xl lg:text-6xl">
            Your Call Is Booked. Here&apos;s Why That Was the{" "}
            <span className="bg-gradient-to-r from-[#a5abff] via-[#7d87f7] to-[#8b78f8] bg-clip-text text-transparent">
              Right Move.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Most contractors are tired of paying agencies thousands a month with
            nothing to show for it. You just took the first step toward a model
            where you only pay when a real lead hits your phone. Watch the short
            video below so you show up to our call ready to hit the ground
            running.
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <div
            className="relative flex aspect-video items-center justify-center overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm"
            style={{
              boxShadow:
                "0 0 80px rgb(125 135 247 / 0.08), inset 0 0 40px rgb(125 135 247 / 0.03)",
            }}
          >
            <div className="relative z-10 px-8 text-center">
              <div
                className="mx-auto mb-5 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border border-primary/30 bg-primary/10 transition-all duration-200 hover:scale-105 hover:bg-primary/20"
                style={{ boxShadow: "0 0 40px rgb(125 135 247 / 0.25)" }}
              >
                <div className="ml-1 h-0 w-0 border-t-[10px] border-b-[10px] border-l-[18px] border-t-transparent border-b-transparent border-l-primary" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                Strategy overview video - watch before your call
              </p>
              <p className="mt-1 text-xs text-muted-foreground/50">~8 minutes</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider pt-16 pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Before Your Call
            </p>
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Show Up Ready to{" "}
              <span className="bg-gradient-to-r from-[#7d87f7] to-[#a5abff] bg-clip-text text-transparent">
                Hit the Ground Running
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              The more prepared you are, the more value you get from our 30
              minutes together.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {callPrep.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 transition-all duration-300 hover:border-[#7d87f7]/20 hover:bg-[#7d87f7]/[0.03]"
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
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              style={{
                boxShadow:
                  "0 0 40px rgb(125 135 247 / 0.35), 0 4px 20px rgb(125 135 247 / 0.15)",
              }}
            >
              View or Reschedule Your Booking
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.05] py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <div className="flex items-center gap-3">
            <Image
              src="/images/appointly-logo.png"
              alt="Appointly Solutions logo"
              width={24}
              height={24}
              className="rounded-lg"
            />
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
