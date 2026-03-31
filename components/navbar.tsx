"use client";

import Image from "next/image";
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
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#11162f]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
            <Image
              src="/images/appointly-logo.png"
              alt="Appointly Solutions logo"
              width={34}
              height={34}
              className="h-auto w-auto"
              priority
            />
          </div>
          <div className="leading-none">
            <span className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">
              Appointly
            </span>
            <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/45">
              Solutions
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/72 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://client.getappointly.co/strategy-calendar"
            className="rounded-full bg-[#5f57e8] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Book A Call
          </a>
        </div>

        <button
          type="button"
          className="text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="flex flex-col gap-5 border-t border-white/10 px-6 py-5 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-white/72 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://client.getappointly.co/strategy-calendar"
            onClick={() => setMobileOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-[#5f57e8] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Book A Call
          </a>
        </div>
      )}
    </nav>
  );
}
