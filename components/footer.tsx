import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/appointment-setting-for-contractors", label: "Appointment Setting" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

const floorCoatingLinks = [
  { href: "/floor-coating-contractor-marketing", label: "Floor Coating Appointments" },
  { href: "/epoxy-floor-coating-appointments", label: "Epoxy Coatings" },
  { href: "/garage-floor-coating-appointments", label: "Garage Floor Coatings" },
  { href: "/exclusive-floor-coating-appointments", label: "Exclusive Market" },
  { href: "/floor-coating-marketing-agency", label: "Agency Alternative" },
];

const insulationLinks = [
  { href: "/insulation-contractor-leads", label: "Insulation Appointments" },
  { href: "/spray-foam-contractor-leads", label: "Spray Foam" },
  { href: "/insulation-contractor-leads-small-markets", label: "Small Markets" },
  { href: "/insulation-marketing-agency", label: "Agency Alternative" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm">
                <BrandMark className="h-9 w-9" />
              </div>
              <div>
                <span className="font-display text-sm font-bold uppercase tracking-[0.18em] text-slate-950">
                  Appointly
                </span>
                <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                  Solutions
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              Performance-based appointment booking for home service contractors. We fill
              your estimate calendar — you run the jobs and collect the cash.
            </p>
            <a
              href="mailto:patrick@getappointly.co"
              className="mt-3 block text-sm text-slate-500 transition-colors hover:text-slate-700"
            >
              patrick@getappointly.co
            </a>
            <a
              href="https://client.getappointly.co/strategy-calendar"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Book a free strategy call
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Company
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {companyLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-slate-950"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Floor Coatings
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                Featured
              </p>
              <div className="mt-3 flex flex-col gap-3">
                {floorCoatingLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-slate-950"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Insulation
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {insulationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-slate-950"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Legal
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-slate-950"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-100 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Appointly Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
            <BrandMark className="h-6 w-6 text-slate-950" />
            Performance-based appointment booking
          </div>
        </div>
      </div>
    </footer>
  );
}
