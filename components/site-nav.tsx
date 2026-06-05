"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

// Single source of truth for the booking calendar. Do not introduce a second
// booking system; every CTA on the homepage points here.
export const BOOKING_URL = "https://client.getappointly.co/strategy-calendar";

const links = [
  { href: "#proof", label: "Proof" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#is-this-for-you", label: "Is This For You" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="snav" aria-label="Primary">
      <div className="snav-in">
        <a href="#top" className="snav-logo" aria-label="Appointly Solutions home">
          <img src="/images/appointly-logo-lockup.png" alt="Appointly Solutions" width={86} height={30} />
        </a>

        <div className="snav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="snav-right">
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
      </div>
    </nav>
  );
}
