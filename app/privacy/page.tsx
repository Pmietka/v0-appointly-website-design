import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const lastUpdated = "March 27, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy | Appointly Solutions",
  description:
    "Read the Appointly Solutions privacy policy covering data collection, Google Analytics usage, cookies, retention, security, and privacy rights.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://getappointly.co/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Appointly Solutions",
    description:
      "Review how Appointly Solutions collects, uses, stores, and protects personal information.",
    url: "https://getappointly.co/privacy",
    siteName: "Appointly Solutions",
    type: "website",
  },
};

const sections = [
  {
    title: "Information We Collect",
    body: [
      "Appointly Solutions may collect personal information you provide through our booking form or strategy calendar, including your name, email address, phone number, company information, and service area details.",
      "We also collect analytics information through Google Analytics property G-MM0NQN3HP0, which may include pages viewed, referral sources, approximate location data, device information, and general usage behavior.",
    ],
  },
  {
    title: "How We Use Information",
    body: [
      "We use collected information to respond to inquiries, deliver lead generation services, schedule calls, improve our site performance, and understand how visitors interact with our pages.",
      "Appointly Solutions may also use your information to communicate service updates, share relevant follow up information, and support business operations related to lead delivery.",
    ],
  },
  {
    title: "Third Party Services",
    body: [
      "We use third party providers to operate parts of our service, including Google Analytics for website measurement and an external booking calendar for scheduling strategy calls.",
      "These providers may process data according to their own privacy policies and security practices while helping Appointly Solutions deliver the website and service experience.",
    ],
  },
  {
    title: "Cookies And Tracking",
    body: [
      "Our site may use cookies and similar technologies to support analytics, remember preferences, and understand aggregate traffic patterns.",
      "You can manage cookies through your browser settings, though some site functionality may be reduced if certain cookies are disabled.",
    ],
  },
  {
    title: "Data Retention And Security",
    body: [
      "We retain information for as long as needed to provide services, comply with legal obligations, resolve disputes, and maintain business records.",
      "Appointly Solutions uses reasonable administrative and technical safeguards to protect information, but no online transmission or storage method can be guaranteed to be fully secure.",
    ],
  },
  {
    title: "Your Rights",
    body: [
      "Depending on your location, you may have the right to request access to the personal information we hold about you, request correction, or request deletion where applicable.",
      "To make a privacy related request, contact us using the details below and we will review your request in line with applicable law.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-[660px] w-[660px] rounded-full bg-[#7d87f7]/[0.05] blur-[140px]" />
          </div>

          <div className="mx-auto max-w-4xl px-6">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-6">
              Legal
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
              Privacy Policy
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              This Privacy Policy explains how Appointly Solutions collects, uses,
              and protects information through this website and related lead generation
              services. Last updated {lastUpdated}.
            </p>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto max-w-4xl px-6">
            <div className="space-y-6">
              {sections.map((section) => (
                <article key={section.title} className="glass-card rounded-3xl p-8 md:p-10">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-4">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-7 text-muted-foreground md:text-base">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}

              <article className="glass-card rounded-3xl p-8 md:p-10">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Contact Us
                </h2>
                <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                  For privacy questions or requests related to your information, contact
                  Appointly Solutions at{" "}
                  <a
                    href="mailto:privacy@getappointly.co"
                    className="text-primary hover:text-[#a5abff] transition-colors"
                  >
                    privacy@getappointly.co
                  </a>
                  .
                </p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                  You can also review our{" "}
                  <Link href="/terms" className="text-primary hover:text-[#a5abff] transition-colors">
                    Terms of Service
                  </Link>{" "}
                  for additional information about how the service relationship works.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
