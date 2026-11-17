import type { ReactNode } from "react";

import { BookingLink } from "@/components/booking-link";
import { TrustRow } from "@/components/proof";

/* Homepage hero. Layout, type and spacing are fixed; the words come in as
   props so they can be changed without touching the markup. */
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
};

export function HomeHero({ eyebrow, headline, subheadline, intro, ctaText }: HeroCopy) {
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
        <TrustRow />
      </div>
    </section>
  );
}
