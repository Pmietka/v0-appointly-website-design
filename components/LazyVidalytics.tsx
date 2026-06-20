"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

/* ============================================================================
   LazyVidalytics

   The Vidalytics Smart Player loads several megabytes and runs a lot of
   main-thread JS on init, which used to block the hero (the LCP element) from
   painting. This component defers all of that:

   - On first render it shows a lightweight placeholder at the exact 16:9 player
     dimensions (the video's own Vidalytics thumbnail + a centered play button).
     The box reserves its space with padding-top, so swapping in the real player
     causes zero layout shift.
   - The real Vidalytics loader is injected only when the user clicks the
     placeholder OR the section scrolls within ~600px of the viewport
     (IntersectionObserver). The observer path means a scrolling viewer finds the
     player already mounted while the hero still paints instantly.

   The players on this site do not autoplay (loader config autoplay.enabled:false),
   so behavior after init is identical to before: the viewer presses play.
   ============================================================================ */

type LazyVidalyticsProps = {
  /** The Vidalytics embed id, e.g. "pPhKygFs09UtbTBO". */
  embedId: string;
  /** Poster shown before the player mounts (the embed's own Vidalytics thumbnail). */
  poster: string;
  /** Vidalytics account id. Same for every embed on this site. */
  accountId?: string;
};

// Self-contained 16:9 box, identical for the placeholder and the mounted player
// so there is no layout shift when one replaces the other.
const BOX_STYLE = {
  width: "100%",
  position: "relative" as const,
  paddingTop: "56.25%",
};

export function LazyVidalytics({
  embedId,
  poster,
  accountId = "FeX1NGyU",
}: LazyVidalyticsProps) {
  const [activated, setActivated] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const containerId = `vidalytics_embed_${embedId}`;
  const scriptId = `vidalytics-loader-${embedId}`;
  const loaderBase = `https://fast.vidalytics.com/embeds/${accountId}/${embedId}/`;

  // Init when the section nears the viewport, before the user scrolls to it.
  useEffect(() => {
    if (activated) return;
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActivated(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [activated]);

  // Inject the Vidalytics loader once the target div is in the DOM. This is the
  // verbatim dashboard loader; React strips inline <script> from JSX, so it goes
  // in as a created <script> element. Idempotent by id.
  useEffect(() => {
    if (!activated) return;
    if (document.getElementById(scriptId)) return;

    const embedScript = `(function (v, i, d, a, l, y, t, c, s) {
    y='_'+d.toLowerCase();c=d+'L';if(!v[d]){v[d]={};}if(!v[c]){v[c]={};}if(!v[y]){v[y]={};}var vl='Loader',vli=v[y][vl],vsl=v[c][vl + 'Script'],vlf=v[c][vl + 'Loaded'],ve='Embed';
    if (!vsl){vsl=function(u,cb){
        if(t){cb();return;}s=i.createElement("script");s.type="text/javascript";s.async=1;s.src=u;
        if(s.readyState){s.onreadystatechange=function(){if(s.readyState==="loaded"||s.readyState=="complete"){s.onreadystatechange=null;vlf=1;cb();}};}else{s.onload=function(){vlf=1;cb();};}
        i.getElementsByTagName("head")[0].appendChild(s);
    };}
    vsl(l+'loader.min.js',function(){if(!vli){var vlc=v[c][vl];vli=new vlc();}vli.loadScript(l+'player.min.js',function(){var vec=v[d][ve];t=new vec();t.run(a);});});
})(window, document, 'Vidalytics', '${containerId}', '${loaderBase}');`;

    const s = document.createElement("script");
    s.id = scriptId;
    s.type = "text/javascript";
    s.text = embedScript;
    document.body.appendChild(s);
  }, [activated, scriptId, containerId, loaderBase]);

  if (activated) {
    // Same box the dashboard snippet produces; the player builds itself inside.
    return <div id={containerId} style={BOX_STYLE} />;
  }

  return (
    <div ref={wrapRef} style={BOX_STYLE}>
      <button
        type="button"
        onClick={() => setActivated(true)}
        aria-label="Play video"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          padding: 0,
          border: 0,
          cursor: "pointer",
          background: "#000",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <span
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
            borderRadius: "9999px",
            background: "#3974ff",
            boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
          }}
        >
          <Play
            aria-hidden="true"
            fill="#ffffff"
            color="#ffffff"
            style={{ width: 28, height: 28, marginLeft: 3 }}
          />
        </span>
      </button>
    </div>
  );
}
