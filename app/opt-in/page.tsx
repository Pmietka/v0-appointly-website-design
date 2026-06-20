import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Get Started | Appointly Solutions",
  description:
    "Start a conversation with Appointly Solutions. We book qualified floor coating estimates onto your calendar. Pay per appointment, no shared leads.",
  alternates: {
    canonical: "https://getappointly.co/opt-in",
  },
};

export default function OptInPage() {
  return (
    <>
      {/* Minimal header. Logo only, no links, no phone, no nav. */}
      <header className="border-b border-[#e5e5e5] bg-[#fafafa]">
        <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-center px-5 sm:px-10 md:h-[78px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/appointly-logo-lockup.png"
            alt="Appointly Solutions"
            width={158}
            height={55}
            className="h-9 w-auto md:h-11"
          />
        </div>
      </header>

      <main className="overflow-hidden">
        <section className="relative pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-[720px] w-[720px] rounded-full bg-primary/[0.06] blur-[140px]" />
            <div className="absolute inset-0 dot-grid opacity-40" />
          </div>

          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Get started
            </p>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
              Let&apos;s get booked estimates on <span className="gradient-text">your calendar.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              We run the ads, qualify every homeowner, and book the estimate for
              you. You pay per appointment, never for a shared lead. Send us a
              message using the chat in the corner and we will tell you whether
              your market is open.
            </p>
          </div>
        </section>
      </main>

      {/* Minimal footer. Wordmark only, no links, no phone. */}
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Appointly Solutions
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            More booked jobs. Less chasing leads.
          </p>
        </div>
      </footer>

      {/* LeadConnector chat widget. Loads the floating chat in the corner. */}
      <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="6a36e6d1d896e3ca464fdad8"
        data-source="WEB_USER"
        strategy="afterInteractive"
      />
    </>
  );
}
