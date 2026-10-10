import Image from "next/image";
import { Award, CalendarSync, Check, CircleCheck, Megaphone, MessageCircle, Phone, X } from "lucide-react";

/* ============================================================================
   "Who are these guys?" The two founders, then the phone team that actually
   talks to your homeowners. Shared by /connect and /lander; styles live in
   app/lander/lander.css (.founders, .phoneteam).
   ============================================================================ */

/* A villain-vs-us contrast, grayscale. The stakes come first, then the proof
   points pay them off. */
const PHONE_LOSE = [
  "A cheap call center reading a script",
  "Mispronounces your business, sounds offshore",
  "Books anyone to hit a quota",
  "Your customer's first impression of you, wasted",
];
const PHONE_WIN = [
  "A trained closer who sounds like your company",
  "Native English speakers, no friction",
  "Presells your service so they arrive half sold",
  "Only books the homeowners actually ready to buy",
];

// Each credential reframed with a close-rate payoff line.
const PHONE_CREDS = [
  { Icon: Award, label: "Trained sales professionals", payoff: "Not a call center, your brand sounds the part" },
  { Icon: Phone, label: "1,000s of calls taken", payoff: "They know how to handle a hesitant homeowner" },
  { Icon: Megaphone, label: "We presell your services", payoff: "Prospects arrive half sold, you close easier" },
  { Icon: MessageCircle, label: "Native English speakers", payoff: "No friction, no “let me transfer you”" },
  { Icon: CalendarSync, label: "We handle reschedules", payoff: "We chase the flakes so your calendar stays full" },
];

export function FounderCards() {
  return (
    <div className="founders">
      <article className="founder">
        <Image className="fphoto" src="/images/team/jacob.jpg" alt="Jacob Mietka, co-founder of Appointly Solutions" width={150} height={150} sizes="150px" loading="lazy" />
        <div>
          <div className="fname">Jacob Mietka</div>
          <div className="frole">Co-founder</div>
          <p className="fbio">
            Runs our booking team and speed to lead. Jacob has scaled 20+
            home service businesses, and he&apos;s the one you&apos;ll talk to on
            your strategy call.
          </p>
        </div>
      </article>
      <article className="founder">
        <Image className="fphoto" src="/images/team/patrick.jpg" alt="Patrick Mietka, co-founder of Appointly Solutions" width={150} height={150} sizes="150px" loading="lazy" />
        <div>
          <div className="fname">Patrick Mietka</div>
          <div className="frole">Co-founder</div>
          <p className="fbio">
            Runs the ad campaigns and the numbers. Patrick builds and tunes the
            Meta ads behind $1M+ in revenue for our floor coating clients.
          </p>
        </div>
      </article>
    </div>
  );
}

export function PhoneTeam() {
  return (
    <div className="phoneteam">
      <div className="pthead">
        <h3 className="ptheadline">
          The person on the phone can win or lose the job before you ever
          show up.
        </h3>
        <p className="ptsub">
          Most agencies hand your customers to a cheap call center and
          quietly cost you deals. We put trained closers on every call, so
          homeowners show up warmer and you close more of them.
        </p>
      </div>

      <div className="ptbody">
        <div className="ptcontrast">
          <div className="ptcol lose">
            <p className="ptcolhd">What most agencies put on the phone</p>
            <ul>
              {PHONE_LOSE.map((t) => (
                <li key={t}><X className="ptmark" aria-hidden /><span>{t}</span></li>
              ))}
            </ul>
          </div>
          <div className="ptcol win">
            <p className="ptcolhd">What we put on the phone</p>
            <ul>
              {PHONE_WIN.map((t) => (
                <li key={t}><Check className="ptmark" aria-hidden /><span>{t}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ul className="ptproof">
        {PHONE_CREDS.map((c) => {
          const Icon = c.Icon;
          return (
            <li className="ptproofitem" key={c.label}>
              <span className="ptprooficon"><Icon aria-hidden /></span>
              <span className="ptprooftext">
                <span className="ptprooflabel">{c.label}</span>
                <span className="ptproofpayoff">{c.payoff}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* What we are, and what we are not. Kills the "so you sell leads?" assumption
   before it ever reaches the call. */
const IS_NOT = [
  {
    t: "Not a lead seller.",
    d: "We never sell you a name and a phone number. You get a booked estimate with a qualified homeowner, or you pay nothing.",
  },
  {
    t: "Not a monthly fee agency.",
    d: "No management fee and no paying for effort or promises. One flat fee for each estimate we book onto your calendar.",
  },
  {
    t: "A booking partner.",
    d: "We own the ads, the speed to lead, the qualifying call and the booking. You run the estimate and close the job.",
  },
];

export function WhatWeAre() {
  return (
    <div className="isnot">
      {IS_NOT.map((x, i) => (
        <div className={`isnot-card${i === IS_NOT.length - 1 ? " yes" : ""}`} key={x.t}>
          <span className="isnot-ic" aria-hidden>{i === IS_NOT.length - 1 ? <Check /> : <X />}</span>
          <p className="isnot-t">{x.t}</p>
          <p className="isnot-d">{x.d}</p>
        </div>
      ))}
    </div>
  );
}

/* ── About us, bragging edition (/connect) ────────────────────────────────────
   Left: who we are and the headline number. Right: what we're experts at.
   Then the founder cards. Pass a call to action (e.g. the survey button). */
const EXPERT_AT = [
  "Built for floor coating and epoxy contractors, nothing else",
  "Meta ads that bring in homeowners ready to buy",
  "Every lead called within 60 seconds, before they cool off",
  "Qualified on area, project and budget, so you only meet buyers",
  "Estimates booked straight onto your calendar",
  "Your close data fed back in, so every month gets sharper",
];

export function AboutUs({ cta }: { cta?: React.ReactNode }) {
  return (
    <>
      <div className="about">
        <div className="aboutcopy">
          <span className="aboutpill">Co-founders · Chicago</span>
          <h2 className="abouth">
            Meet <span className="hl">Jacob &amp; Patrick</span>
          </h2>
          <p className="aboutsub">The floor coating appointment experts</p>
          <div className="aboutstat">
            <b>$1M+</b>
            <span>in revenue collected for our floor coating clients</span>
          </div>
          <p className="aboutp">
            Two brothers from Chicago who do one thing better than anyone: fill
            floor coating calendars with homeowners who are ready to buy. One
            contractor per market, one market at a time.
          </p>
          <p className="aboutp">
            While you run estimates and lay floors, we run the ads, the phones
            and the calendar. You only pay when a qualified homeowner is booked.
          </p>
          {cta && <div className="aboutcta">{cta}</div>}
        </div>
        <div className="aboutbox">
          <p className="aboutbox-t">What we&apos;re experts at</p>
          <ul>
            {EXPERT_AT.map((x) => (
              <li key={x}><CircleCheck aria-hidden />{x}</li>
            ))}
          </ul>
        </div>
      </div>
      <FounderCards />
    </>
  );
}
