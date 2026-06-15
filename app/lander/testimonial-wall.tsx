"use client";

import { useState } from "react";
import { Star, Play } from "lucide-react";

import type { Testimonial } from "./page";

const INITIAL_VISIBLE = 6;

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

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="tcard">
      {t.photo && (
        <img
          className="tphoto"
          src={t.photo}
          alt={`${t.name} of ${t.who}`}
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
          <div className="twho">{t.who} &middot; {t.where}</div>
        </div>
      </div>
    </figure>
  );
}

/* The highlighted video testimonial that sits above the wall. Mark speaking to
   camera about his experience. Poster = his photo until the real clip is in. */
function VideoTestimonial({ t }: { t: Testimonial }) {
  return (
    <figure className="vtcard">
      {/*
        VIDEO TESTIMONIAL SLOT — drop Mark's clip here. Replace the .vthumb block
        with one of:
          <video className="vthumb" src="/videos/mark.mp4" poster="/images/proof/mark-afab.webp" controls playsInline />
          <div className="vthumb"><iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Mark's testimonial" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /></div>
      */}
      <div className="vthumb" role="button" tabIndex={0} aria-label={`Play ${t.name}'s video testimonial`}>
        {t.photo && <img src={t.photo} alt="" aria-hidden />}
        <span className="vbadge"><Play className="ci" aria-hidden /> Video</span>
        <span className="vplay" aria-hidden><span className="vplay-btn" /></span>
      </div>
      <figcaption className="vtbody">
        <Stars />
        <blockquote className="tquote">&ldquo;{t.quote}&rdquo;</blockquote>
        {t.stat && <span className="tstat">{t.stat}</span>}
        <div className="tmeta">
          {t.photo ? (
            <img className="tavatar" src={t.photo} alt="" width={44} height={44} loading="lazy" />
          ) : (
            <span className="tavatar" aria-hidden>{initials(t.name)}</span>
          )}
          <div>
            <div className="tname">{t.name}</div>
            <div className="twho">{t.who} &middot; {t.where}</div>
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

export function TestimonialWall({ items }: { items: Testimonial[] }) {
  const [expanded, setExpanded] = useState(false);

  // The video testimonial (Mark) is highlighted above the masonry; the rest
  // fill the grid, collapsed to the first six until "see more" is pressed.
  const featured = items.find((t) => t.video);
  const rest = items.filter((t) => !t.video);
  const visible = expanded ? rest : rest.slice(0, INITIAL_VISIBLE);
  const hiddenCount = rest.length - INITIAL_VISIBLE;

  return (
    <>
      {featured && <VideoTestimonial t={featured} />}

      <div className="wall">
        {visible.map((t, i) => (
          <TestimonialCard t={t} key={i} />
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
  );
}
