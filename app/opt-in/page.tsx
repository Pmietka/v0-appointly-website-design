import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Get Started | Appointly Solutions",
  description:
    "Start a conversation with Appointly Solutions. We book qualified floor coating estimates onto your calendar. Pay per appointment.",
  alternates: {
    canonical: "https://getappointly.co/opt-in",
  },
};

/* Business details for the SMS / carrier brand compliance footer. These must
   match the details used to verify the brand. */
const BUSINESS_NAME = "Appointly Solutions";
const BUSINESS_ADDRESS = "5350 N Neenah Ave, Chicago, IL, USA";
// CONFIRM: this must be the exact business email used to verify the brand.
const BUSINESS_EMAIL = "patrick@getappointly.co";
// CONFIRM: this must be the exact phone number used to verify the brand.
const BUSINESS_PHONE = "773-729-8807";

export default function OptInPage() {
  return (
    <>
      {/* Minimal header. Logo only, no nav. */}
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
              you. You only pay per booked appointment. Send us a message using
              the chat in the corner and we will tell you whether your market is
              open.
            </p>
          </div>
        </section>
      </main>

      {/* Compliance footer: business name, address, email, phone, and the
          required Terms and Privacy Policy links. */}
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-3xl px-6 text-center text-sm text-muted-foreground">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/80">
            {BUSINESS_NAME}
          </p>
          <p className="mt-3">{BUSINESS_ADDRESS}</p>
          <p className="mt-1">
            <a className="underline underline-offset-2 hover:text-foreground" href={`mailto:${BUSINESS_EMAIL}`}>
              {BUSINESS_EMAIL}
            </a>
            <span className="px-2">·</span>
            <a className="underline underline-offset-2 hover:text-foreground" href={`tel:${BUSINESS_PHONE.replace(/[^0-9+]/g, "")}`}>
              {BUSINESS_PHONE}
            </a>
          </p>
          <p className="mt-4">
            <a className="underline underline-offset-2 hover:text-foreground" href="/privacy">Privacy Policy</a>
            <span className="px-2">·</span>
            <a className="underline underline-offset-2 hover:text-foreground" href="/terms">Terms of Service</a>
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
