"use client";

import { useEffect, useState, type ReactNode } from "react";

import { getBookingParams } from "@/lib/tracking";

// Single source of truth for the booking calendar. Do not introduce a second
// booking system; every CTA on the homepage points here.
export const BOOKING_URL = "https://client.getappointly.co/strategy-calendar";

/** BOOKING_URL with the visitor's ad params and landing_page appended. */
export function withBookingParams(url: string = BOOKING_URL): string {
  const qs = new URLSearchParams(getBookingParams()).toString();
  if (!qs) return url;
  return `${url}${url.includes("?") ? "&" : "?"}${qs}`;
}

/* Booking CTA. Renders the plain BOOKING_URL on the server, then adds the
   visitor's UTMs, Meta ad ids and landing_page once it mounts, so the GHL
   calendar receives the same attribution the visitor arrived with. */
export function BookingLink({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const [href, setHref] = useState(BOOKING_URL);
  useEffect(() => {
    setHref(withBookingParams(BOOKING_URL));
  }, []);
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      {children}
    </a>
  );
}
