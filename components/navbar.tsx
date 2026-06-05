"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";


const navLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pay-per-lead-insulation", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center" aria-label="Appointly Solutions home">
          <img
            src="/images/appointly-logo-lockup.png"
            alt="Appointly Solutions"
            width={132}
            height={46}
            className="h-9 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-600 transition-colors hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://client.getappointly.co/strategy-calendar"
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Book A Call
          </a>
        </div>

        <button
          type="button"
          className="text-gray-900 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="flex flex-col gap-5 border-t border-gray-200 px-6 py-5 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-gray-600 transition-colors hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://client.getappointly.co/strategy-calendar"
            onClick={() => setMobileOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Book A Call
          </a>
        </div>
      )}
    </nav>
  );
}
