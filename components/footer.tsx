import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";

import { PHONE_DISPLAY, PHONE_HREF } from "@/components/site-nav";

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

const solutionLinks = [
  { href: "/insulation-contractor-leads", label: "Floor Coating Leads" },
  { href: "/exclusive-insulation-leads", label: "Exclusive Appointments" },
  { href: "/pay-per-lead-insulation", label: "The Appointly Model" },
  { href: "/insulation-marketing-agency", label: "Agency Alternative" },
  { href: "/spray-foam-contractor-leads", label: "Epoxy & Concrete Coatings" },
  { href: "/insulation-contractor-leads-small-markets", label: "Small Markets" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center">
              <Image
                src="/images/appointly-logo-lockup.png"
                alt="Appointly Solutions"
                width={173}
                height={60}
                className="h-12 w-auto"
              />
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              Booked estimates for home service contractors, built around the
              Appointly Model — you just show up and close.
            </p>
            <a
              href={PHONE_HREF}
              className="mt-4 flex items-center gap-2 text-base font-semibold text-slate-900 transition-colors hover:text-slate-600"
            >
              <Phone className="h-4 w-4 text-slate-400" aria-hidden />
              {PHONE_DISPLAY}
            </a>
            <a
              href="mailto:patrick@getappointly.co"
              className="mt-2 block text-sm text-slate-500 transition-colors hover:text-slate-700"
            >
              patrick@getappointly.co
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
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
                Solutions
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {solutionLinks.map((link) => (
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
            <Image src="/images/appointly-logo-icon.png" alt="" aria-hidden="true" width={24} height={24} className="h-6 w-6" />
            Performance-based appointment generation
          </div>
        </div>
      </div>
    </footer>
  );
}
