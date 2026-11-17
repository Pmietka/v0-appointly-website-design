"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";

import { BookingLink, BOOKING_URL } from "@/components/booking-link";

// BOOKING_URL lives in components/booking-link.tsx; re-exported here so
// existing imports keep working.
export { BOOKING_URL };

// Single source of truth for the company phone number, surfaced site-wide.
export const PHONE_DISPLAY = "651-299-3265";
export const PHONE_HREF = "tel:+16512993265";

// Links are root-relative so the nav works from any page built on the
// homepage design (/, /case-studies), not only from the homepage itself.
const links = [
  { href: "/#results", label: "Results" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/#how-it-works", label: "How It Works" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="snav" aria-label="Primary">
      <div className="snav-in">
        <a href="/" className="snav-logo" aria-label="Appointly Solutions home">
          <Image src="/images/appointly-logo-lockup.png" alt="Appointly Solutions" width={129} height={45} priority />
        </a>

        <div className="snav-right">
          <div className="snav-links">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
          <a className="snav-call" href={PHONE_HREF}>
            <Phone className="h-4 w-4" aria-hidden />
            {PHONE_DISPLAY}
          </a>
          <BookingLink className="btn">Book a Call</BookingLink>
          <button
            type="button"
            className="snav-burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="snav-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div id="snav-mobile" className={`snav-mobile${open ? " open" : ""}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href={PHONE_HREF} onClick={() => setOpen(false)}>
          Call {PHONE_DISPLAY}
        </a>
      </div>
    </nav>
  );
}
