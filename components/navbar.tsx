"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { BOOKING_URL } from "@/components/site-nav";

// Matches the homepage SiteNav look so the header is consistent across the
// whole site. These are page links (Blog, FAQ, etc. stay their own pages).
const navLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pay-per-lead-insulation", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

const FONT = '"Geist","Helvetica Neue",Arial,sans-serif';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      aria-label="Primary"
      style={{ fontFamily: FONT }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[#e5e5e5] bg-[#fafafa]/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between gap-4 px-5 sm:px-10 md:h-[78px]">
        <Link href="/" className="flex items-center" aria-label="Appointly Solutions home">
          <img
            src="/images/appointly-logo-lockup.png"
            alt="Appointly Solutions"
            width={158}
            height={55}
            className="h-9 w-auto md:h-11"
          />
        </Link>

        <div className="flex items-center gap-5 md:gap-8">
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] font-medium text-[#525252] transition-colors hover:text-[#171717]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[10px] bg-[#171717] px-[18px] py-[10px] text-sm font-semibold text-white transition-colors hover:bg-black"
          >
            Book a Call
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="primary-mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] border border-[#e5e5e5] bg-white text-[#171717] md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="primary-mobile-menu"
          className="border-t border-[#e5e5e5] bg-[#fafafa]/97 px-5 pb-4 pt-1 backdrop-blur-md md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block border-b border-[#e5e5e5] py-[13px] text-base font-medium text-[#525252] transition-colors last:border-b-0 hover:text-[#171717]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
