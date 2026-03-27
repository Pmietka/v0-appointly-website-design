"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.05] bg-background/60 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-3">
          <Image
            src="/images/appointly-logo.png"
            alt="Appointly Solutions logo"
            width={56}
            height={56}
            className="rounded-xl"
          />
          <span className="text-sm font-bold font-display tracking-[0.2em] text-foreground uppercase">
            Appointly
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          <a
            href="#results"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Results
          </a>
          <a
            href="#problem"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            The Problem
          </a>
          <a
            href="#solution"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Our System
          </a>
          <a
            href="https://client.getappointly.co/strategy-calendar"
            className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            Book A Call
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
        <div className="md:hidden border-t border-white/[0.05] bg-background/90 backdrop-blur-xl px-6 py-5 flex flex-col gap-5">
          <a
            href="#results"
            onClick={() => setMobileOpen(false)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Results
          </a>
          <a
            href="#problem"
            onClick={() => setMobileOpen(false)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            The Problem
          </a>
          <a
            href="#solution"
            onClick={() => setMobileOpen(false)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Our System
          </a>
          <a
            href="https://client.getappointly.co/strategy-calendar"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            Book A Call
          </a>
        </div>
      )}
    </nav>
  );
}
