"use client";

import { Star, Play } from "lucide-react";

import type { Testimonial } from "./page";

function Stars() {
  return (
    <div className="stars" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="ci" aria-hidden />
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function attribution(t: Testimonial) {
  return [t.who, t.where].filter(Boolean).join(" · ");
}

/* Featured card with media. Photo cards (Mark, Carlos, Andre, Dave) and the
   video card (Adrian) share the exact same size — the clip just sits where the
   photo would. */
function TestimonialCard({ t }: { t: Testimonial }) {
  const sub = attribution(t);
  const avatar = t.photo || t.poster;
  return (
    <figure className="tcard">
      {t.videoSrc ? (
        <div className="tmedia">
          <video
            className="tvideo"
            src={t.videoSrc}
            poster={t.poster}
            controls
            playsInline
            preload="metadata"
          />
          <span className="vbadge"><Play className="ci" aria-hidden /> Video</span>
        </div>
      ) : (
        t.photo && (
          <img
            className="tphoto"
            src={t.photo}
            alt={sub ? `${t.name} of ${t.who}` : t.name}
            width={1080}
            height={1350}
            loading="lazy"
          />
        )
      )}
      <Stars />
      {t.quote && <blockquote className="tquote">&ldquo;{t.quote}&rdquo;</blockquote>}
      {t.stat && <figcaption className="tstat">{t.stat}</figcaption>}
      <div className="tmeta">
        {avatar ? (
          <img className="tavatar" src={avatar} alt="" width={44} height={44} loading="lazy" />
        ) : (
          <span className="tavatar" aria-hidden>{initials(t.name)}</span>
        )}
        <div>
          <div className="tname">{t.name}</div>
          {sub && <div className="twho">{sub}</div>}
        </div>
      </div>
    </figure>
  );
}

/* Clean, real-feeling quote card for text-only testimonials — no gray-initial
   avatar, just the quote and a name (and a market only when we actually have one). */
function QuoteCard({ t }: { t: Testimonial }) {
  const sub = attribution(t);
  return (
    <figure className="qcard">
      <Stars />
      <blockquote className="tquote">&ldquo;{t.quote}&rdquo;</blockquote>
      {t.stat && <figcaption className="tstat">{t.stat}</figcaption>}
      <div className="qattr">
        <span className="qname">{t.name}</span>
        {sub && <span className="qwho">{sub}</span>}
      </div>
    </figure>
  );
}

export function TestimonialWall({ items }: { items: Testimonial[] }) {
  // Featured media cards up top (photos + the video, all the same size), then
  // the text-only cards. Everything is shown — no collapse/expand.
  const media = items.filter((t) => t.photo || t.video || t.featured);
  const text = items.filter((t) => !t.photo && !t.video && !t.featured);

  return (
    <>
      {media.length > 0 && (
        <div className="wall">
          {media.map((t, i) => (
            <TestimonialCard t={t} key={`m${i}`} />
          ))}
        </div>
      )}

      {text.length > 0 && (
        <div className="wall">
          {text.map((t, i) => (
            <QuoteCard t={t} key={`t${i}`} />
          ))}
        </div>
      )}
    </>
  );
}
