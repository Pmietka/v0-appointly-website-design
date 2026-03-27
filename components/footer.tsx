import Image from "next/image";
import Link from "next/link";

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
];

const solutionLinks = [
  { href: "/insulation-contractor-leads", label: "Insulation Leads" },
  { href: "/exclusive-insulation-leads", label: "Exclusive Leads" },
  { href: "/pay-per-lead-insulation", label: "Pay Per Lead" },
  { href: "/insulation-marketing-agency", label: "Agency Alternative" },
  { href: "/appointment-setting-for-contractors", label: "Appointment Setting" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col gap-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/appointly-logo.png"
              alt="Appointly Solutions logo"
              width={28}
              height={28}
              className="rounded-lg"
            />
            <span className="text-sm font-bold font-display tracking-widest text-foreground uppercase">
              Appointly
            </span>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Company
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {companyLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Solutions
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {solutionLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Legal
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/[0.06] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Appointly Solutions. All rights reserved.
          </p>
          <Image
            src="/images/appointly-logo.png"
            alt="Appointly Solutions logo mark"
            width={22}
            height={22}
            className="rounded-md opacity-70"
          />
        </div>
      </div>
    </footer>
  );
}
