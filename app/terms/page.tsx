import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { pageMetadata } from "@/lib/seo";

const lastUpdated = "October 24, 2026";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service | Appointly Solutions",
  description:
    "Appointly Solutions Terms of Service: client funded ad spend at cost, $125 to $175 per booked appointment, the appointment quality guarantee, no show credits, territory exclusivity, data ownership, and termination.",
  path: "/terms",
  ogDescription:
    "Review the terms that govern Appointly Solutions appointment generation services.",
});

const sections = [
  {
    title: "Service Description",
    body:
      "Appointly Solutions provides appointment generation services for floor coating contractors. Services include Meta ad campaign management, lead intake, a text and call to every lead within one minute, qualification of the homeowner, appointment booking, reminders, and weekly reporting.",
  },
  {
    title: "Eligibility",
    body:
      "Services are intended for United States and Canada based floor coating contractors that are legally able to enter into binding agreements and operate in their service areas.",
  },
  {
    title: "Ad Spend",
    body:
      "The client funds ad spend upfront as a prefunded balance. Appointly Solutions holds the balance and uses it only for the client's campaigns, at a daily ad budget set with the client based on the results the client needs. Ad spend is drawn down at cost with no markup and reported to the client weekly. Any unused balance is returned to the client within 10 business days of termination.",
  },
  {
    title: "Appointment Fees",
    body:
      "In addition to ad spend, the client pays a fee per booked appointment, set per client between $125 and $175 and stated in the client's service agreement. The appointment fee is invoiced separately from ad spend and is billed when the appointment is booked. There is no setup fee, no retainer, and no monthly management fee.",
  },
  {
    title: "Appointment Quality Guarantee and Credits",
    body:
      "After each estimate, the client grades the appointment in the Appointly Solutions app. If the client grades an appointment a C and states what was wrong, such as an unqualified homeowner or a service the client does not offer, the client does not pay for that appointment, and the fee is credited automatically to the client's next appointment. If a homeowner does not show up for a booked estimate, the fee is likewise credited automatically to the client's next appointment.",
  },
  {
    title: "Territory Exclusivity",
    body:
      "Appointly Solutions works with one floor coating contractor per market. The client's territory is defined in the client's service agreement, and while the agreement is in effect Appointly Solutions will not book floor coating appointments for another contractor in that territory. Other contractors in the territory who apply are placed on a waitlist.",
  },
  {
    title: "Appointment Delivery Terms",
    body:
      "Appointment standards, target areas, and delivery expectations are defined during onboarding and may vary by market. Appointly Solutions will use commercially reasonable efforts to book estimates that meet agreed criteria, but close rates and job revenue remain dependent on the contractor's own sales process and operations.",
  },
  {
    title: "Payment Terms",
    body:
      "Clients agree to pay ad spend and appointment fees according to these terms and the pricing established in their service agreement. Late payments and disputes are handled according to the same agreement and any related written policies.",
  },
  {
    title: "Ownership of Campaigns and Data",
    body:
      "The client owns the campaigns, creative, audiences, and homeowner records Appointly Solutions creates for the client. They run in the Appointly Solutions ad account and Business Manager, and they remain the client's if the relationship ends.",
  },
  {
    title: "Intellectual Property",
    body:
      "Apart from the client owned campaigns and data described above, Appointly Solutions branding, website content, systems, processes, and related intellectual property remain the property of Appointly Solutions unless a written agreement states otherwise.",
  },
  {
    title: "Limitation Of Liability",
    body:
      "To the maximum extent permitted by law, Appointly Solutions is not liable for indirect, incidental, special, consequential, or punitive damages arising from the use of the website or services. Total liability is limited to the amount paid for services during the applicable claim period unless law requires otherwise.",
  },
  {
    title: "Termination",
    body:
      "There is no long term contract. Either party may terminate the service relationship according to the applicable agreement. Upon termination, any unused ad balance is returned within 10 business days, outstanding payment obligations survive, and both parties remain responsible for obligations that by nature continue after the relationship ends.",
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
            <div className="absolute top-0 right-0 h-[660px] w-[660px] rounded-full bg-primary/[0.06] blur-[140px]" />
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
              website and appointment generation services. Last updated {lastUpdated}.
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
                    className="text-primary transition-opacity hover:opacity-80"
                  >
                    legal@getappointly.co
                  </a>
                  .
                </p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                  For information about data practices, please review the{" "}
                  <Link href="/privacy" className="text-primary transition-opacity hover:opacity-80">
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
