"use client";

import Script from "next/script";

import { LazyExternalScript } from "@/components/deferred-loader";

/* ============================================================================
   Meta Pixel for /booked-call.

   This page is shown once a lead has scheduled a call, so on load it fires the
   standard Meta "Schedule" conversion event (in addition to PageView). Same
   pixel id and deferred-load pattern as the /connect survey: the inline base
   code defines fbq and queues init + PageView + Schedule, and fbevents.js is
   loaded lazily (first interaction / short timeout) so the queued events send
   once the library is ready without blocking the initial paint.
   ============================================================================ */

// Meta Pixel / dataset id (same pixel used by the /connect survey).
const META_PIXEL_ID = "985991997226201";

// A real pixel id is all digits. Anything else (a placeholder) keeps it off.
const pixelReady = /^\d+$/.test(META_PIXEL_ID);

export function BookedCallPixel() {
  if (!pixelReady) return null;
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,n){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[]}(window,document,'script');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
fbq('track', 'Schedule');`}
      </Script>
      {/* fbevents.js is deferred to first interaction / short timeout to keep it
          off the initial load (TBT) window. The fbq() calls above queue and are
          sent once the library loads. */}
      <LazyExternalScript id="meta-pixel-lib" src="https://connect.facebook.net/en_US/fbevents.js" />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=Schedule&noscript=1`}
        />
      </noscript>
    </>
  );
}
