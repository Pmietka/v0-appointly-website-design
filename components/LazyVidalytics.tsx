"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================================
   LazyVidalytics

   The Vidalytics Smart Player loads several megabytes and runs a lot of
   main-thread JS when it initializes. Running that during the initial paint
   delays the hero (the LCP element). This component keeps the heavy loader off
   the critical path WITHOUT changing playback behavior:

   - It renders a poster placeholder (the video's own Vidalytics thumbnail) at the
     exact 16:9 player dimensions, reserving the space so swapping in the real
     player causes zero layout shift.
   - It auto-initializes the player — it never gates playback behind a click.
     These are autoplay-muted VSLs that must start on load; the player shows its
     own "click to unmute" overlay. Initialization is simply deferred to just
     after the hero paints (IntersectionObserver for near-viewport, plus an idle
     fallback) so the player's init work yields to first paint.

   The injected loader is the verbatim dashboard snippet, so the player behaves
   exactly as configured (autoplay, unmute overlay, etc.).
   ============================================================================ */

type LazyVidalyticsProps = {
  /** The Vidalytics embed id, e.g. "pPhKygFs09UtbTBO". */
  embedId: string;
  /** Poster shown until the player mounts (the embed's own Vidalytics thumbnail). */
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

  // Promote the placeholder to the real player automatically, just after first
  // paint. No user interaction is required, so autoplay-muted still works.
  useEffect(() => {
    if (activated) return;
    let done = false;
    const go = () => {
      if (!done) {
        done = true;
        setActivated(true);
      }
    };

    // Near-viewport trigger (fires immediately for an above-the-fold hero, and
    // pre-loads a below-the-fold video as it is scrolled toward).
    let observer: IntersectionObserver | undefined;
    const el = wrapRef.current;
    if (el && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            go();
            observer?.disconnect();
          }
        },
        { rootMargin: "600px" },
      );
      observer.observe(el);
    }

    // Idle fallback so an above-the-fold hero starts promptly even before any
    // scroll, while still yielding the main thread to the first paint.
    const ric: (cb: () => void, opts?: { timeout: number }) => number =
      (typeof window !== "undefined" && (window as typeof window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      }).requestIdleCallback) ||
      ((cb: () => void) => window.setTimeout(cb, 500));
    const idleId = ric(go, { timeout: 1500 });

    return () => {
      observer?.disconnect();
      if (typeof window !== "undefined" && window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId);
      }
    };
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
    // Same box the dashboard snippet produces; the player builds itself inside
    // and autoplays / shows its own "click to unmute" overlay as configured.
    return <div id={containerId} style={BOX_STYLE} />;
  }

  // Poster-only placeholder (no play button): looks like the muted video's first
  // frame so the swap to the autoplaying player is seamless and shift-free.
  return (
    <div ref={wrapRef} style={BOX_STYLE} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
