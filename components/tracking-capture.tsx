"use client";

import { useEffect } from "react";

import { captureTracking } from "@/lib/tracking";

// Mounted once in the root layout. Stores first touch and last touch
// attribution (UTMs, Meta ad ids, click ids, landing URL, referrer) on every
// page, so a visitor who lands on a blog post and books from /connect a day
// later still carries the original ad click.
export function TrackingCapture() {
  useEffect(() => {
    captureTracking();
  }, []);
  return null;
}
