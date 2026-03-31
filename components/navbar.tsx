"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pay-per-lead-insulation", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

function CalendarCheckIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="8" width="28" height="22" rx="3" fill="white" />
      <rect x="11" y="3" width="4" height="9" rx="2" fill="white" />
      <rect x="19" y="3" width="4" height="9" rx="2" fill="white" />
      <path d="M10 20.5L15.5 26L24 14" stroke="#5f57e8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10" style={{ backgroundColor: "#1a1f3e" }}>
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <CalendarCheckIcon />
          <span className="text-sm font-bold font-display tracking-[0.15em] text-white uppercase">
            Appointly
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://client.getappointly.co/strategy-calendar"
            className="text-sm font-semibold bg-[#5f57e8] text-white px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Book A Call
          </a>
        </div>

        <button
          type="button"
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 px-6 py-5 flex flex-col gap-5" style={{ backgroundColor: "#1a1f3e" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://client.getappointly.co/strategy-calendar"
            onClick={() => setMobileOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-[#5f57e8] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Book A Call
          </a>
        </div>
      )}
    </nav>
  );
}
