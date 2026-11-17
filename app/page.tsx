import { HomeLanding } from "@/components/home/home-landing";
import type { HeroCopy } from "@/components/home/home-hero";
import { HOME_METADATA, HOME_VIEWPORT } from "@/components/home/home-metadata";
import { coreFaqItems } from "@/lib/faq";
import { PRICE_SCHEMA } from "@/lib/offer";

export const viewport = HOME_VIEWPORT;
export const metadata = HOME_METADATA;

/* LEAD TRADE SWAP HOOK
   Floor coating is the only trade Appointly works in and the hero headline
   noun. The value stays swappable for wording tests ("Garage Floor Jobs",
   "Epoxy Floor Jobs"); nothing else needs editing. Do not point it at a trade
   the business does not serve. */
const LEAD_TRADE = "Floor Coating Jobs";

// Homepage hero copy.
const HERO: HeroCopy = {
  headline: (
    <>
      We book {LEAD_TRADE}.{" "}
      <span className="hl">You just show up.</span>
    </>
  ),
  subheadline: (
    <>
      You fund your ads at cost, then pay per booked appointment. No setup
      fee, no retainer, no long term contract.
    </>
  ),
  intro: (
    <>
      Appointly Solutions is a pay per appointment Meta ads agency that
      books estimates for garage floor coating and concrete coating
      contractors. Floor coating is the only trade we work in.
    </>
  ),
  ctaText: "Book a Call",
};

export default function HomePage() {
  const homeSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://getappointly.co/#service",
      serviceType: "Pay per appointment Meta ads for floor coating contractors",
      name: "Booked floor coating jobs for contractors",
      provider: { "@id": "https://getappointly.co/#organization" },
      areaServed: ["US", "CA"],
      audience: {
        "@type": "Audience",
        audienceType:
          "Garage floor coating, epoxy, polyaspartic, and concrete coating contractors",
      },
      offers: { "@id": PRICE_SCHEMA["@id"] },
    },
    PRICE_SCHEMA,
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://getappointly.co/#faq",
      mainEntity: coreFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];

  return (
    <HomeLanding
      hero={HERO}
      schema={
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
        />
      }
    />
  );
}
