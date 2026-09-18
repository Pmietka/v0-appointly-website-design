import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { CASE_STUDIES, type CaseStudy } from "@/lib/case-studies";
import { CLIENT_LOGOS, FEATURED_TESTIMONIALS, type Testimonial } from "@/lib/testimonials";
import "@/app/proof.css";

/* ── Stars ─────────────────────────────────────────────────────────────────── */
export function Stars({ className = "" }: { className?: string }) {
  return (
    <div className={`stars ${className}`.trim()} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="ci" aria-hidden />
      ))}
    </div>
  );
}

function attribution(t: Testimonial) {
  return [t.who, t.where].filter(Boolean).join(" · ");
}

/* ── Client logos ───────────────────────────────────────────────────────────
   Real client logos only. Add a client in lib/testimonials.ts and it shows up
   everywhere the strip is rendered. */
export function ClientLogos({
  title = "Trusted by floor coating companies across the country",
  showMore = true,
  linkTiles = true,
}: {
  title?: string | null;
  showMore?: boolean;
  linkTiles?: boolean;
}) {
  return (
    <div className="logos">
      {title && <p className="logos-title">{title}</p>}
      <div className="logos-row">
        {CLIENT_LOGOS.map((l) => {
          const cls = `logo-tile${l.dark ? " dark" : ""}`;
          const inner = (
            <>
              <Image
                className="logo-img"
                src={l.src}
                alt={`${l.name} logo`}
                width={l.width}
                height={l.height}
                sizes="(max-width: 640px) 60vw, 240px"
                loading="lazy"
              />
              <span className="logo-cap">{l.market}</span>
            </>
          );
          return linkTiles && l.href ? (
            <Link key={l.name} href={l.href} className={cls} aria-label={`${l.name} case study`}>
              {inner}
            </Link>
          ) : (
            <div key={l.name} className={cls}>
              {inner}
            </div>
          );
        })}
      </div>
      {showMore && (
        <Link href="/case-studies" className="logos-more">
          See their results <span className="arr">&rarr;</span>
        </Link>
      )}
    </div>
  );
}

/* ── Case study result cards ────────────────────────────────────────────────
   One card per case study: the lead number, three supporting figures, the one
   line headline, and a link into the full write up. */
function CaseStudyCard({ c }: { c: CaseStudy }) {
  return (
    <Link href={`/case-studies#${c.slug}`} className="cscard">
      <div className="cslogo">
        <Image
          className={c.logo.dark ? "dark" : undefined}
          src={c.logo.src}
          alt={`${c.company} logo`}
          width={c.logo.width}
          height={c.logo.height}
          sizes="150px"
          loading="lazy"
        />
        <span className="csmkt">{c.marketTag}</span>
      </div>
      <div>
        <div className="cslead">{c.glance.lead.value}</div>
        <div className="csleadl">{c.glance.lead.label}</div>
      </div>
      <div className="csrow">
        {c.glance.cardStats.map((s) => (
          <div className="csk" key={s.label}><b>{s.value}</b><span>{s.label}</span></div>
        ))}
      </div>
      <p className="cshead">{c.headline}</p>
      <span className="cslink">Read the case study <span className="arr">&rarr;</span></span>
    </Link>
  );
}

export function CaseStudyCards() {
  return (
    <div className="cscards">
      {CASE_STUDIES.map((c) => (
        <CaseStudyCard key={c.slug} c={c} />
      ))}
    </div>
  );
}

/* ── Quote card ─────────────────────────────────────────────────────────────── */
export function QuoteCard({ t }: { t: Testimonial }) {
  const sub = attribution(t);
  const avatar = t.avatar || t.photo;
  return (
    <figure className="qcard">
      <Stars />
      <blockquote className="tquote">&ldquo;{t.quote}&rdquo;</blockquote>
      {t.stat && <span className="tstat">{t.stat}</span>}
      <figcaption className="qattr">
        {avatar && (
          <Image className="qavatar" src={avatar} alt="" width={40} height={40} sizes="40px" loading="lazy" />
        )}
        <div>
          <div className="qname">{t.name}</div>
          {sub && <div className="qwho">{sub}</div>}
        </div>
      </figcaption>
    </figure>
  );
}

export function TestimonialWall({ items, columns = 3 }: { items: Testimonial[]; columns?: 3 | 4 }) {
  return (
    <div className={`wall${columns === 4 ? " four" : ""}`}>
      {items.map((t, i) => (
        <QuoteCard t={t} key={`${t.name}-${i}`} />
      ))}
    </div>
  );
}

/* ── Inline featured quote: proof parked next to the claim it backs up ─────── */
export function FeaturedQuote({ t, align = "center" }: { t: Testimonial; align?: "center" | "left" }) {
  const sub = attribution(t);
  const avatar = t.avatar || t.photo;
  return (
    <figure className={`fquote${align === "left" ? " left" : ""}`}>
      <span className="fqmark" aria-hidden>&ldquo;</span>
      <Stars />
      <blockquote className="fq">{t.quote}</blockquote>
      <figcaption className="fattr">
        {avatar && (
          <Image className="favatar" src={avatar} alt="" width={52} height={52} sizes="52px" loading="lazy" />
        )}
        <span className="fwho">
          <strong>{t.name}</strong>
          {sub && <span className="fwsub">{sub}</span>}
        </span>
        {t.stat && <span className="fstat">{t.stat}</span>}
      </figcaption>
    </figure>
  );
}

/* ── Reported feedback: what a client told us, never shown in quotation marks ─ */
export function ClientNote({
  label,
  text,
  who,
  avatar,
}: {
  label: string;
  text: string;
  who: string;
  avatar?: { src: string; alt: string };
}) {
  return (
    <div className="cnote">
      {avatar && (
        <Image className="cnavatar" src={avatar.src} alt={avatar.alt} width={56} height={56} sizes="56px" loading="lazy" />
      )}
      <div>
        <div className="cnlabel">{label}</div>
        <p className="cntext">{text}</p>
        <div className="cnwho">{who}</div>
      </div>
    </div>
  );
}

/* ── Hero trust row ─────────────────────────────────────────────────────────── */
export function TrustRow() {
  const faces = [
    ...FEATURED_TESTIMONIALS.filter((t) => t.photo).slice(0, 3).map((t) => ({ src: t.photo as string, alt: t.name })),
    { src: "/images/case-studies/phil-adikes.webp", alt: "Phil A." },
  ];
  return (
    <div className="trust">
      <div className="tav" aria-hidden>
        {faces.map((f) => (
          <Image key={f.src} src={f.src} alt="" width={38} height={38} sizes="38px" priority />
        ))}
      </div>
      <div className="ttext">
        <Stars />
        <span className="tline">
          50 to 70% close rates on booked appointments. <Link href="/case-studies">See the case studies</Link>
        </span>
      </div>
    </div>
  );
}
