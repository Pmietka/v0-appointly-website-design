"use client";

import { useState } from "react";
import { Star, Play } from "lucide-react";

import type { Testimonial } from "./page";

// Hard-number text cards stay visible; the rest collapse behind "see more".
const TEXT_VISIBLE = 4;

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

/* Featured card with a photo (Mark, Carlos, Andre, and Dave once his photo is in). */
function TestimonialCard({ t }: { t: Testimonial }) {
  const sub = attribution(t);
  return (
    <figure className="tcard">
      {t.photo && (
        <img
          className="tphoto"
          src={t.photo}
          alt={sub ? `${t.name} of ${t.who}` : t.name}
          width={1080}
          height={1350}
          loading="lazy"
        />
      )}
      <Stars />
      <blockquote className="tquote">&ldquo;{t.quote}&rdquo;</blockquote>
      {t.stat && <figcaption className="tstat">{t.stat}</figcaption>}
      <div className="tmeta">
        {t.photo ? (
          <img className="tavatar" src={t.photo} alt="" width={44} height={44} loading="lazy" />
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

/* Video testimonial card (Adrian). Same card shape/style as Mark's clip; renders
   a real, playable <video> when a source is present. */
function VideoTestimonial({ t }: { t: Testimonial }) {
  const sub = attribution(t);
  return (
    <figure className="vtcard">
      <div className="vthumb">
        {t.videoSrc ? (
          <video
            className="vvideo"
            src={t.videoSrc}
            poster={t.poster}
            controls
            playsInline
            preload="metadata"
          />
        ) : (
          <button type="button" className="vthumb-btn" aria-label={`Play ${t.name}'s video testimonial`}>
            {t.photo && <img src={t.photo} alt="" aria-hidden />}
            <span className="vplay" aria-hidden><span className="vplay-btn" /></span>
          </button>
        )}
        <span className="vbadge"><Play className="ci" aria-hidden /> Video</span>
      </div>
      <figcaption className="vtbody">
        <Stars />
        {t.quote && <blockquote className="tquote">&ldquo;{t.quote}&rdquo;</blockquote>}
        {t.stat && <span className="tstat">{t.stat}</span>}
        <div className="tmeta">
          {t.photo ? (
            <img className="tavatar" src={t.photo} alt="" width={44} height={44} loading="lazy" />
          ) : (
            <span className="tavatar" aria-hidden>{initials(t.name)}</span>
          )}
          <div>
            <div className="tname">{t.name}</div>
            {sub && <div className="twho">{sub}</div>}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

export function TestimonialWall({ items }: { items: Testimonial[] }) {
  const [expanded, setExpanded] = useState(false);

  // Featured media cards up top (photo cards, then the video), text-only below.
  const media = items.filter((t) => !t.video && (t.photo || t.featured));
  const videos = items.filter((t) => t.video);
  const text = items.filter((t) => !t.video && !t.photo && !t.featured);

  const visibleText = expanded ? text : text.slice(0, TEXT_VISIBLE);
  const hiddenCount = text.length - TEXT_VISIBLE;

  return (
    <>
      {media.length > 0 && (
        <div className="wall">
          {media.map((t, i) => (
            <TestimonialCard t={t} key={`m${i}`} />
          ))}
        </div>
      )}

      {videos.map((t, i) => (
        <VideoTestimonial t={t} key={`v${i}`} />
      ))}

      {text.length > 0 && (
        <>
          <div className="wall">
            {visibleText.map((t, i) => (
              <QuoteCard t={t} key={`t${i}`} />
            ))}
          </div>

          {!expanded && hiddenCount > 0 && (
            <div className="wallmore">
              <button type="button" className="btn ghost" onClick={() => setExpanded(true)}>
                See {hiddenCount} more {hiddenCount === 1 ? "testimonial" : "testimonials"}
                <span className="arr">&darr;</span>
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
