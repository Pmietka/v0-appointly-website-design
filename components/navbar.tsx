"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2.5">
          <Image
            src="/images/appointly-logo.png"
            alt="Appointly logo"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="text-xl font-bold font-display text-foreground">
            Appointly
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#results"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Results
          </a>
          <a
            href="#problem"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            The Problem
          </a>
          <a
            href="#solution"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Our System
          </a>
          <a
            href="https://client.getappointly.co/strategy-calendar"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
          >
            Book a Call
          </a>
        </div>

        <button
          type="button"
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4">
          <a
            href="#results"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Results
          </a>
          <a
            href="#problem"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            The Problem
          </a>
          <a
            href="#solution"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Our System
          </a>
          <a
            href="https://client.getappointly.co/strategy-calendar"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
          >
            Book a Call
          </a>
        </div>
      )}
    </nav>
  );
}
