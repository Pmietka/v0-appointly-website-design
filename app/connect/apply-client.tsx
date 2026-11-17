"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Phone, Check } from "lucide-react";

import { PHONE_DISPLAY, PHONE_HREF } from "@/components/site-nav";
import { LazyVidalytics } from "@/components/LazyVidalytics";
import { MetaPixel } from "@/components/meta-pixel";
import { QualifyModal } from "@/components/qualify-modal";
import { OPEN_APPLY_EVENT } from "./apply-button";

// The hero VSL (Vidalytics embed 60Fto44Te__2E98m).
const VSL_EMBED_ID = "60Fto44Te__2E98m";
// The VSL's own Vidalytics thumbnail, shown (and painted first) until the
// player loads, so the hero has a real image from the first frame.
const VSL_POSTER =
  "https://fast.vidalytics.com/video/FeX1NGyU/MjOZPRvNd3i3uuPf/315316/287016__FFMPEG/thumb/thumbnail-5_0.jpg";

/* ============================================================================
   CONFIGURABLE CONSTANTS. Edit these, nothing else, to wire the page up.
   ============================================================================ */

// Meta Pixel id, GHL webhook and all tracking live in lib/tracking-config.ts
// and lib/tracking.ts (same universal tracking as the client landing pages).

// The hero VSL is deferred via <LazyVidalytics> (see components/LazyVidalytics).
// To swap the video later, change VSL_EMBED_ID / VSL_POSTER above.

// The qualification survey modal (survey, lead delivery, booking calendar)
// lives in components/qualify-modal.tsx, shared with the ad landing pages.

// Trust badges under the hero CTA (mirrors the reference funnel's badge row).
const TRUST_BADGES = ["No contracts", "Bad appointments credited", "Exclusive leads"];

/* ============================================================================
   Page
   ============================================================================ */

/* The page shell: pixel, survey modal, header, hero, closing CTA and footer.
   Everything between the hero and the closing CTA (who we are, the wall of
   proof, the process) is server rendered in page.tsx and passed in as
   children; its buttons open the modal through OPEN_APPLY_EVENT. */
/* Hero copy. /connect uses the defaults; the Meta ad landing pages
   (/fb-ads-breakdown, /booked-estimates) pass their own so the hero matches
   the ad. ctaText is used by the hero button and the closing CTA. */
export type ConnectHero = {
  eyebrow?: string;
  headline?: React.ReactNode;
  subheadline?: React.ReactNode;
  ctaText?: string;
  /** Optional short line under the hero button. */
  note?: string;
};

const DEFAULT_HERO = {
  eyebrow: "For floor coating contractors",
  headline: (
    <>
      Keep Every Crew <span className="hl">Booked Weeks In Advance.</span>
    </>
  ),
  subheadline: (
    <>
      We run Facebook and Instagram ads in your area, call every homeowner
      within a minute, and book qualified estimates straight onto your calendar.
    </>
  ),
  ctaText: "Book a Call",
};

export default function ApplyClient({ children, hero = {} }: { children?: React.ReactNode; hero?: ConnectHero }) {
  const h = { ...DEFAULT_HERO, ...hero };
  const [open, setOpen] = useState(false);
  // Once opened, the modal stays mounted (hidden when closed). See QualifyModal.
  const [modalMounted, setModalMounted] = useState(false);

  const openModal = useCallback(() => {
    setModalMounted(true);
    setOpen(true);
  }, []);
  const closeModal = useCallback(() => setOpen(false), []);

  // Any ApplyButton on the page opens the survey.
  useEffect(() => {
    window.addEventListener(OPEN_APPLY_EVENT, openModal);
    return () => window.removeEventListener(OPEN_APPLY_EVENT, openModal);
  }, [openModal]);

  return (
    <div className="dscroll cnx">
      <MetaPixel />
      {modalMounted && <QualifyModal open={open} onClose={closeModal} />}

      {/* Header. Logo left; phone + apply CTA right. */}
      <nav className="snav applyhead" aria-label="Primary">
        <div className="snav-in">
          <a href="/" className="snav-logo" aria-label="Appointly Solutions home">
            <Image src="/images/appointly-logo-lockup.png" alt="Appointly Solutions" width={129} height={45} priority />
          </a>
          <div className="applynav-right">
            <a className="snav-call" href={PHONE_HREF}>
              <Phone className="h-4 w-4" aria-hidden />
              {PHONE_DISPLAY}
            </a>
            <button type="button" className="navcta" onClick={openModal}>
              Check Availability
            </button>
          </div>
        </div>
      </nav>

      {/* Hero. Pay-per-show hook, VSL, and the booking CTA side by side. */}
      <section className="sec applyhero herowide" id="top">
        <div className="orb a" />
        <div className="wrap">
          <p className="eyebrow">{h.eyebrow}</p>
          <h1>{h.headline}</h1>
          <p className="lead heropromise">{h.subheadline}</p>

          <div className="herorow">
            <div className="herovsl">
              <div className="vslvid">
                <LazyVidalytics embedId={VSL_EMBED_ID} poster={VSL_POSTER} startOn="click" />
              </div>
              <p className="vslnote">Watch how it works, then apply.</p>
            </div>
            <div className="heroform" id="apply">
              <p className="formkicker">
                <strong>Our clients get <span className="fknum">40 to 60</span> appointments a month.</strong>{" "}
                <span className="fksub">Unqualified estimate, you don&apos;t pay. No contracts. No BS.</span>
              </p>
              <button type="button" className="ctabtn" onClick={openModal}>
                <span className="ctabtn-main">{h.ctaText}</span>
              </button>
              {h.note && <p className="heronote">{h.note}</p>}
              <div className="trustbadges">
                {TRUST_BADGES.map((b) => (
                  <span className="trustbadge" key={b}><Check aria-hidden /> {b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {children}

      {/* Closing CTA. Links to the booking calendar. */}
      <section className="sec tint" id="book">
        <div className="wrap wallhead">
          <h2>Ready to <span className="hl">fill your calendar?</span></h2>
          <p className="wallsub">
            Book your strategy call. About 20 minutes &middot; No obligation
            &middot; By application only.
          </p>
          <div className="closingcta">
            <button type="button" className="ctabtn ctabtn-inline" onClick={openModal}>
              <span className="ctabtn-main">{h.ctaText}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Sticky apply CTA on mobile only. Keeps the primary action a thumb-tap
          away while the video plays, no matter how far the page is scrolled. */}
      <div className="mcta">
        <button type="button" className="mcta-btn" onClick={openModal}>
          Check Availability: Apply Now
        </button>
      </div>

      {/* Footer. Minimal: wordmark, phone, privacy, terms only */}
      <footer>
        <div className="wrap">
          <p className="fn">Appointly Solutions</p>
          <p className="fcall">
            Questions? Call us at <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
          </p>
          <div className="flinks">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
