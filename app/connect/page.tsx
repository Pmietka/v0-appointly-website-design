import type { Metadata, Viewport } from "next";
import Image from "next/image";

import ApplyClient from "./apply-client";
import { ApplyButton } from "./apply-button";
import { FounderCards, PhoneTeam, WhatWeAre } from "@/components/sales/founders";
import { ProofSection } from "@/components/sales/proof-section";
import {
  CompareTable, ModelCards, PROOF_FACES, PROOF_STATS, ProcessTimeline, ResultsToExpect,
} from "@/components/sales/process";
import { ClientLogos } from "@/components/proof";
import "../home.css";
import "../lander/lander.css";
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

/* The page tells one story, top to bottom:
     1. Who are these guys?      (founders, the phone team, what we are not)
     2. A wall of proof          (every interview clip, message and number)
     3. How the whole thing works (process, the model, results, the comparison)
   The hero, survey modal and closing CTA live in ApplyClient. */
export default function ConnectPage() {
  return (
    <ApplyClient>
      {/* Proof bar: real numbers from the case studies */}
      <section className="sec proofbar" id="stats">
        <div className="wrap">
          <div className="pbnums">
            {PROOF_STATS.map((s) => (
              <div className="pbnum" key={s.l}>
                <span className="pbv">{s.v}</span>
                <span className="pbl">{s.l}</span>
              </div>
            ))}
          </div>
          <div className="pbfaces" aria-hidden>
            {PROOF_FACES.map((f) => (
              <Image className="pbface" key={f.src} src={f.src} alt="" width={54} height={54} sizes="54px" loading="lazy" />
            ))}
          </div>
          <p className="pbcap">Real floor coating contractors, real booked estimates.</p>
        </div>
      </section>

      {/* 1 · Who are these guys? */}
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
          <PhoneTeam />
        </div>
      </section>

      {/* 2 · The wall of proof */}
      <ProofSection
        tint
        eyebrow="Proof"
        title={<>Don&apos;t take our word for it. <span className="hl">Take theirs.</span></>}
        sub="Our clients on camera, in their own messages, and on their own calendars. Brand new clients and some of our very first. Click anything."
      >
        <div className="midcta">
          <p>We take one floor coating contractor per market. Find out if yours is still open.</p>
          <ApplyButton main="Claim Your Market" />
        </div>
      </ProofSection>

      {/* 3 · How it works, start to finish */}
      <section className="sec" id="how-it-works">
        <div className="orb b" />
        <div className="wrap">
          <p className="eyebrow">How it works</p>
          <h2>
            Exactly how this works, <span className="hl">start to finish.</span>
          </h2>
          <p className="sub">
            No surprises on the call. Here&apos;s the whole thing: what we do,
            what you do, how you pay, and what to expect.
          </p>
          <ProcessTimeline />

          <div className="subhd" id="model">
            <p className="eyebrow">The model</p>
            <h3>How you pay, and everything that comes with it.</h3>
          </div>
          <ModelCards />

          <div className="subhd" id="results">
            <p className="eyebrow">Results</p>
            <h3>What results to expect.</h3>
          </div>
          <ResultsToExpect />
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

      {/* Client logos, right before the closing call to action */}
      <section className="sec" id="clients">
        <div className="wrap">
          <ClientLogos showMore={false} linkTiles={false} />
        </div>
      </section>
    </ApplyClient>
  );
}
