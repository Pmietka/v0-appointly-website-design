"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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
  /** Poster shown until the player mounts (the embed's own Vidalytics thumbnail).
   *  Optional: when a new embed has no thumbnail URL yet, omit it and a neutral
   *  dark placeholder fills the same 16:9 box so there is still no layout shift. */
  poster?: string;
  /** Vidalytics account id. Same for every embed on this site. */
  accountId?: string;
  /** When the heavy player loads:
   *  - "load" (default): right after first paint, so muted autoplay starts on its own.
   *  - "interaction": on the visitor's first tap, scroll or key press (or a tap on
   *    the poster). Keeps the player's ~3s of main-thread work out of page load,
   *    which matters most on mobile ad traffic. */
  startOn?: "load" | "interaction";
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
  startOn = "load",
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

    // Interaction mode: wait for the first sign of a real visitor.
    if (startOn === "interaction") {
      const events = ["pointerdown", "touchstart", "keydown", "scroll"] as const;
      const onFirst = () => go();
      events.forEach((e) => window.addEventListener(e, onFirst, { once: true, passive: true }));
      return () => events.forEach((e) => window.removeEventListener(e, onFirst));
    }

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
  }, [activated, startOn]);

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

  // Poster placeholder (no play button): looks like the muted video's first frame
  // so the swap to the autoplaying player is seamless and shift-free. When no
  // poster URL is provided, fall back to a neutral dark box of the same size.
  if (startOn === "interaction") {
    // A real button over the poster, so a tap visibly starts the video.
    return (
      <button
        type="button"
        onClick={() => setActivated(true)}
        aria-label="Play video"
        style={{ ...BOX_STYLE, display: "block", border: 0, padding: "56.25% 0 0", margin: 0, cursor: "pointer", background: "#0b0f16" }}
      >
        {poster ? (
          // Served through next/image from our own origin and preloaded, so the
          // hero's largest image doesn't wait on a second connection.
          <Image src={poster} alt="" fill priority sizes="(min-width: 960px) 560px, 100vw" style={{ objectFit: "cover" }} />
        ) : null}
        <span
          aria-hidden="true"
          style={{
            position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", zIndex: 1,
            width: 76, height: 76, borderRadius: 999, background: "rgba(255,255,255,.95)",
            boxShadow: "0 18px 40px -12px rgba(0,0,0,.6)", display: "grid", placeItems: "center",
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#0f3d2e" style={{ marginLeft: 4 }}>
            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
          </svg>
        </span>
      </button>
    );
  }

  return (
    <div
      ref={wrapRef}
      style={{ ...BOX_STYLE, background: "#0b0f16" }}
      aria-hidden="true"
    >
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          fetchPriority="high"
          decoding="async"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : null}
    </div>
  );
}
