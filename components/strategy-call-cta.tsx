import Link from "next/link";
import { ArrowRight } from "lucide-react";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

/**
 * Full-width call to action rendered at the end of every guide and blog
 * post, so no article page ends without a clear next step.
 */
export function StrategyCallCta({
  heading = "Want floor coating estimates booked on your calendar?",
}: {
  heading?: string;
}) {
  return (
    <section className="section-divider py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 px-6 py-12 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)] md:px-14 md:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
              Next step
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white md:text-5xl">
              {heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/75 md:text-lg">
              We run the Meta ads, call every homeowner within minutes, qualify them, and book
              the estimate on your calendar. You show up and run it. We work with one floor
              coating contractor per market.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={bookingUrl}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition-opacity hover:opacity-90"
              >
                Book a strategy call
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                See how it works
              </Link>
            </div>
            <p className="mt-5 text-sm text-white/55">
              On the call we check whether your market is open and how many estimates a week
              your crew can run.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
