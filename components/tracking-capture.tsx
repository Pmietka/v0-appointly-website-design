"use client";

import { useEffect } from "react";

import { captureTracking } from "@/lib/tracking";

// Mounted once in the root layout. Stores first touch and last touch
// attribution (UTMs, Meta ad ids, click ids, landing URL, referrer) on every
// page, so a visitor who lands on a blog post and books from /connect a day
// later still carries the original ad click.
export function TrackingCapture() {
  useEffect(() => {
    // Prompter script links carry private ids; keep them out of attribution.
    if (window.location.pathname.startsWith("/prompter")) return;
    captureTracking();
  }, []);
  return null;
}
