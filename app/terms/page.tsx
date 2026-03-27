import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const lastUpdated = "March 27, 2026";

export const metadata: Metadata = {
  title: "Terms of Service | Appointly Solutions",
  description:
    "Read the Appointly Solutions Terms of Service covering service scope, eligibility, lead delivery, payment, liability, termination, and governing law.",
  alternates: {
    canonical: "https://getappointly.co/terms",
  },
  openGraph: {
    title: "Terms of Service | Appointly Solutions",
    description:
      "Review the terms that govern Appointly Solutions lead generation services.",
    url: "https://getappointly.co/terms",
    siteName: "Appointly Solutions",
    type: "website",
  },
};

const sections = [
  {
    title: "Service Description",
    body:
      "Appointly Solutions provides lead generation services for insulation contractors using a cost per qualified lead model. Services may include campaign management, lead intake, qualification workflows, follow up, scheduling support, and related reporting.",
  },
  {
    title: "Eligibility",
    body:
      "Services are intended for United States based insulation contractors and related home service businesses that are legally able to enter into binding agreements and operate in their service areas.",
  },
  {
    title: "Lead Delivery Terms",
    body:
      "Lead qualification standards, target areas, and delivery expectations are defined during onboarding and may vary by market. Appointly Solutions will use commercially reasonable efforts to deliver leads that meet agreed criteria, but close rates and job revenue remain dependent on the contractor’s own sales process and operations.",
  },
  {
    title: "Payment Terms",
    body:
      "Clients agree to pay for qualified leads according to the pricing and billing terms established in their service agreement. Late payments, disputes, and credits are handled according to the same agreement and any related written policies.",
  },
  {
    title: "Intellectual Property",
    body:
      "All branding, website content, campaign materials, systems, processes, and related intellectual property created or used by Appointly Solutions remain the property of Appointly Solutions unless a written agreement states otherwise.",
  },
  {
    title: "Limitation Of Liability",
    body:
      "To the maximum extent permitted by law, Appointly Solutions is not liable for indirect, incidental, special, consequential, or punitive damages arising from the use of the website or services. Total liability is limited to the amount paid for services during the applicable claim period unless law requires otherwise.",
  },
  {
    title: "Termination",
    body:
      "Either party may terminate the service relationship according to the applicable agreement. Upon termination, outstanding payment obligations survive, and both parties remain responsible for obligations that by nature continue after the relationship ends.",
  },
  {
    title: "Governing Law",
    body:
      "These terms are governed by the laws of the applicable state identified in the service agreement, without regard to conflict of law principles.",
  },
];

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              These Terms of Service govern the use of the Appointly Solutions
              website and lead generation services. Last updated {lastUpdated}.
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
                  <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                    {section.body}
                  </p>
                </article>
              ))}

              <article className="glass-card rounded-3xl p-8 md:p-10">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Contact Information
                </h2>
                <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                  Questions about these terms can be sent to{" "}
                  <a
                    href="mailto:legal@getappointly.co"
                    className="text-primary hover:text-[#a5abff] transition-colors"
                  >
                    legal@getappointly.co
                  </a>
                  .
                </p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                  For information about data practices, please review the{" "}
                  <Link href="/privacy" className="text-primary hover:text-[#a5abff] transition-colors">
                    Privacy Policy
                  </Link>
                  .
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
