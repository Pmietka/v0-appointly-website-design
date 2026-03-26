import Image from "next/image";
import { ArrowRight, CheckCircle, Calendar, Clock, Target } from "lucide-react";

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
      "No sales pressure — real talk only",
      "A clear next step either way",
    ],
  },
];

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background — matches main site purple radial glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at -10% 110%, hsl(267 72% 30% / 0.4) 0%, transparent 70%)",
          }}
        />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-violet-600/[0.05] blur-[140px]" />
        <div className="absolute inset-0 dot-grid opacity-30" />
      </div>

      {/* Navbar */}
      <nav className="border-b border-white/[0.05] bg-background/60 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3">
            <Image
              src="/images/appointly-logo.png"
              alt="Appointly logo"
              width={38}
              height={38}
              className="rounded-xl"
            />
            <span className="text-sm font-bold font-display tracking-[0.2em] text-foreground uppercase">
              Appointly
            </span>
          </a>
          <a
            href="https://client.getappointly.co/strategy-calendar"
            className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            Book A Call
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-10 md:pt-28 md:pb-14">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-6">
            You&apos;re In
          </p>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-balance">
            Your Call Is Booked. Here&apos;s Why That Was the{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-fuchsia-400 bg-clip-text text-transparent">
              Right Move.
            </span>
          </h1>

          <p className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            Most contractors are tired of paying agencies thousands a month with
            nothing to show for it. You just took the first step toward a model
            where you only pay when a real lead hits your phone. Watch the short
            video below so you show up to our call ready to hit the ground
            running.
          </p>
        </div>
      </section>

      {/* Video */}
      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <div
            className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.03] aspect-video flex items-center justify-center backdrop-blur-sm"
            style={{
              boxShadow:
                "0 0 80px hsl(267 72% 55% / 0.08), inset 0 0 40px hsl(267 72% 55% / 0.03)",
            }}
          >
            <div className="text-center relative z-10 px-8">
              <div
                className="mx-auto mb-5 flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 border border-primary/30 cursor-pointer hover:bg-primary/20 hover:scale-105 transition-all duration-200"
                style={{ boxShadow: "0 0 40px hsl(267 72% 55% / 0.25)" }}
              >
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[18px] border-l-primary ml-1" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                Strategy overview video — watch before your call
              </p>
              <p className="text-xs text-muted-foreground/50 mt-1">~8 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Prep cards */}
      <section className="pb-24 md:pb-32 section-divider pt-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-4">
              Before Your Call
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Show Up Ready to{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Hit the Ground Running
              </span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-sm">
              The more prepared you are, the more value you get from our 30
              minutes together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {callPrep.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 hover:border-violet-500/20 hover:bg-violet-500/[0.03] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 border border-primary/20">
                    <section.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {section.title}
                  </h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
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
            <p className="text-sm text-muted-foreground mb-5">
              Need to reschedule? No problem.
            </p>
            <a
              href="https://client.getappointly.co/strategy-calendar"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              style={{
                boxShadow:
                  "0 0 40px hsl(267 72% 55% / 0.35), 0 4px 20px hsl(267 72% 55% / 0.15)",
              }}
            >
              View or Reschedule Your Booking
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/appointly-logo.png"
              alt="Appointly logo"
              width={24}
              height={24}
              className="rounded-lg"
            />
            <span className="text-xs font-bold font-display tracking-[0.2em] text-foreground uppercase">
              Appointly
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Appointly. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
