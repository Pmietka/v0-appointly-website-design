import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { servicePages } from "@/lib/seo-resources";

export const metadata: Metadata = {
  title: "Page Not Found | Appointly Solutions",
  robots: { index: false, follow: true },
};

const links = [
  { href: servicePages.floorCoatingLeads, label: "Floor coating leads, booked as estimates" },
  { href: servicePages.pricing, label: "Pricing" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/blog", label: "Blog for floor coating contractors" },
  { href: "/faq", label: "FAQ" },
];

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <section className="relative pb-20 pt-32 md:pb-28 md:pt-44">
          <div className="mx-auto max-w-3xl px-6">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              404
            </p>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              That page is not on the calendar.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              The link you followed may be old. Every page on the site was moved to a
              floor coating URL, so here are the pages people usually want.
            </p>
            <ul className="mt-10 space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-base font-semibold text-primary transition-opacity hover:opacity-80"
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
