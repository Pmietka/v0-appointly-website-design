import Image from "next/image";

import { CLIENT_LOGOS } from "@/lib/testimonials";

/* ============================================================================
   Client logos as an endless scrolling strip. CSS only: the logo set is laid
   out four times and the track slides left by half its width, so the loop is
   seamless at any screen width. Pauses on hover; with reduced motion it is a
   plain wrapped row. Add a client in lib/testimonials.ts. Styles: app/sales.css.
   ============================================================================ */

export function LogoMarquee({ title = "Trusted by floor coating companies across the country" }: { title?: string }) {
  const loop = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <div className="lmq">
      {title && <p className="logos-title">{title}</p>}
      <div className="lmq-view">
        <ul className="lmq-track" aria-label="Our clients">
          {loop.map((l, i) => (
            <li
              key={`${l.name}-${i}`}
              className={`lmq-item${l.dark ? " dark" : ""}${i >= CLIENT_LOGOS.length ? " dupe" : ""}`}
              aria-hidden={i >= CLIENT_LOGOS.length || undefined}
            >
              <Image
                className="lmq-img"
                src={l.src}
                alt={i >= CLIENT_LOGOS.length ? "" : `${l.name} logo`}
                width={l.width}
                height={l.height}
                sizes="220px"
                loading="eager"
              />
              <span className="lmq-cap">{l.market ?? l.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
