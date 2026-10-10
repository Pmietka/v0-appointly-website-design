import type { Metadata, Viewport } from "next";

import { ChevronDown } from "lucide-react";

import ApplyClient from "./apply-client";
import { ApplyButton } from "./apply-button";
import { FounderCards, PhoneTeam, WhatWeAre } from "@/components/sales/founders";
import { HiddenWall, ProofHeader } from "@/components/sales/proof-section";
import { CompareTable, ModelFaq, ProcessTimeline } from "@/components/sales/process";
import { LogoMarquee } from "@/components/sales/logo-marquee";
import { StoryChapters, StoryHero, StoryStats } from "@/app/case-studies/story";
import { getCaseStudy } from "@/lib/case-studies";
import { CFC_STORY } from "@/lib/cfc-case-study";
import "../home.css";
import "../lander/lander.css";
import "../case-studies/case-studies.css";
import "./apply.css";
import "../sales.css";

export const viewport: Viewport = {
  themeColor: "#fafafa",
};

// Paid landing page for cold traffic, so keep it out of the index (same as
// /lander). Follow is left on so link equity still flows to /privacy etc.
export const metadata: Metadata = {
  title: "Appointly Solutions | Apply to work with us",
  description:
    "We book floor coating estimates onto your calendar. We run the ads and you pay only when a qualified homeowner is booked. Apply to work with us.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://getappointly.co/connect",
  },
};

/* The page, top to bottom:
     1. Proof: the three video case studies, then Phil's (Clean Floor
        Coatings) full story from /case-studies, chapter by chapter, then the
        rest of the wall behind a "show me more" button
     2. How it works, the comparison table, and who's on the phone
     3. The model as click-to-open questions
     4. Who are these guys
   The hero, survey modal and closing CTA live in ApplyClient. */
export default function ConnectPage() {
  const cfc = getCaseStudy(CFC_STORY.slug)!;
  return (
    <ApplyClient>
      {/* Client logos, right under the hero */}
      <section className="lmqband" id="clients" aria-label="Clients">
        <div className="wrap">
          <LogoMarquee />
        </div>
      </section>

      {/* 1 · Proof: the three clients and their testimonials */}
      <section className="sec pwsec" id="proof">
        <div className="wrap pwwide">
          <ProofHeader
            title={<>Don&apos;t take our word for it. <span className="hl">Take theirs.</span></>}
            sub="Our clients on camera, in their own messages, and on their own calendars. Brand new clients and some of our very first. Click anything."
          />

          {/* Bridge from the three cards into Phil's full story below */}
          <div className="pwbridge">
            <h3>Hear from Phil himself</h3>
            <a className="pwbridge-arrow" href="#cfc-story" aria-label="Jump to Phil's story">
              <ChevronDown aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* Phil's full story, exactly as on /case-studies/clean-floor-coatings:
          video hero, stat bar, chapter by chapter clips, calendar proof and
          the transcript. Wrapped in .csp so the case study styles apply. */}
      <div className="dscroll csp cfcstory">
        <StoryHero story={CFC_STORY} cs={cfc} eyebrow={`Case study · ${cfc.company}`} sectionId="cfc-story" />
        <StoryStats story={CFC_STORY} cs={cfc} />
        <StoryChapters story={CFC_STORY} cs={cfc} level="h3" />
      </div>

      {/* The rest of the wall, only when asked for */}
      <section className="sec pwsec tint" id="more-proof">
        <div className="wrap pwwide">
          <div className="pwhead">
            <p className="eyebrow">Want more?</p>
            <h2>There&apos;s a <span className="hl">whole wall</span> of it.</h2>
            <p className="sub">
              Every interview clip, client message, number and calendar we have, in one place.
            </p>
          </div>
          <div className="pwreveal">
            <HiddenWall />
          </div>
          <div className="midcta">
            <p>We take one floor coating contractor per market. Find out if yours is still open.</p>
            <ApplyButton main="Claim Your Market" />
          </div>
        </div>
      </section>

      {/* 2 · How it works, start to finish */}
      <section className="sec" id="how-it-works">
        <div className="orb b" />
        <div className="wrap">
          <p className="eyebrow">How it works</p>
          <h2>
            Exactly how this works, <span className="hl">start to finish.</span>
          </h2>
          <p className="sub">
            No surprises on the call. Here&apos;s the whole thing: what we do,
            what you do, and what happens at every step.
          </p>
          <ProcessTimeline />
        </div>
      </section>

      {/* What makes us different: the comparison (desktop only, as before) */}
      <section className="sec tint cmpsec applycmp" id="why-us">
        <div className="wrap">
          <p className="cmpeyebrow">What makes us different</p>
          <h2>Not DIY. Not an agency. <span className="hl">A partner.</span></h2>
          <p className="cmpsub">
            We run the campaigns, qualify every homeowner, and book appointments
            straight onto your calendar. You just show up and close.
          </p>
          <CompareTable />
          <p className="payoff">You are paying for <strong>booked appointments.</strong></p>
        </div>
      </section>

      {/* The person on the phone */}
      <section className="sec phonesec" id="phone-team">
        <div className="wrap">
          <PhoneTeam />
        </div>
      </section>

      {/* 3 · The model, as click-to-open questions */}
      <section className="sec tint" id="model">
        <div className="wrap wallhead">
          <p className="eyebrow">The model</p>
          <h2>How you pay, and <span className="hl">everything that comes with it.</span></h2>
        </div>
        <div className="wrap">
          <ModelFaq />
        </div>
      </section>

      {/* 4 · Who are these guys? */}
      <section className="sec" id="who">
        <div className="orb a" />
        <div className="wrap">
          <p className="eyebrow">Who are these guys?</p>
          <h2>
            Two brothers from Chicago who{" "}
            <span className="hl">book estimates for a living.</span>
          </h2>
          <p className="sub">
            We&apos;re Jacob and Patrick Mietka. Appointly does one thing: we run
            Meta ads for floor coating contractors, call every homeowner who
            responds, and book the good ones onto your calendar. You only pay
            when one is booked.
          </p>
          <FounderCards />
          <WhatWeAre />
        </div>
      </section>
    </ApplyClient>
  );
}
