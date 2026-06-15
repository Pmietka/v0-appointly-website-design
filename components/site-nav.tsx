"use client";

import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

// Single source of truth for the booking calendar. Do not introduce a second
// booking system; every CTA on the homepage points here.
export const BOOKING_URL = "https://client.getappointly.co/strategy-calendar";

// Single source of truth for the company phone number, surfaced site-wide.
export const PHONE_DISPLAY = "651-299-3265";
export const PHONE_HREF = "tel:+16512993265";

const links = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#is-this-for-you", label: "Is This For You" },
  { href: "#proof", label: "Proof" },
  { href: "#what-you-get", label: "What You Get" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="snav" aria-label="Primary">
      <div className="snav-in">
        <a href="#top" className="snav-logo" aria-label="Appointly Solutions home">
          <img src="/images/appointly-logo-lockup.png" alt="Appointly Solutions" width={129} height={45} />
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
          <a className="btn" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book a Call
          </a>
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
