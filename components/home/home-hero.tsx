import type { ReactNode } from "react";

import { BookingLink } from "@/components/booking-link";
import { TrustRow } from "@/components/proof";

/* Hero copy for the homepage and its ad landing variants (/fb-ads-breakdown,
   /booked-estimates). Layout, type and spacing are shared; only the words
   change, so each ad lands on a hero that matches it. */
export type HeroCopy = {
  /** Optional small kicker above the headline (styled like .eyebrow). */
  eyebrow?: string;
  /** h1. Wrap the payoff in <span className="hl"> for the highlight. */
  headline: ReactNode;
  /** The larger .lead line under the headline. */
  subheadline: ReactNode;
  /** Optional smaller .sub paragraph under the subheadline. */
  intro?: ReactNode;
  /** Button text for the hero CTA and the closing CTA. */
  ctaText: string;
  /** Optional short line under the hero button. */
  note?: string;
};

export function HomeHero({ eyebrow, headline, subheadline, intro, ctaText, note }: HeroCopy) {
  return (
    <section className="sec hero" id="top">
      <div className="orb a" />
      <div className="wrap">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{headline}</h1>
        <p className="lead">{subheadline}</p>
        {intro && <p className="sub">{intro}</p>}
        <BookingLink className="btn">
          {ctaText} <span className="arr">&rarr;</span>
        </BookingLink>
        {note && <p className="heronote">{note}</p>}
        <TrustRow />
      </div>
    </section>
  );
}
