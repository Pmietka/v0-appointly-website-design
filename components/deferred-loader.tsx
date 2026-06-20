"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

/* ============================================================================
   Lazy third-party loading

   Heavy analytics libraries (GA4's gtag.js ~156 KiB, Meta's fbevents.js ~102 KiB)
   parse and execute on the main thread during the initial load window, which is
   the single largest contributor to Total Blocking Time on the landing pages.

   We keep lightweight stubs running early (afterInteractive) so events are still
   captured — `gtag(...)` pushes to `dataLayer`, `fbq(...)` pushes to its queue —
   and defer the actual library download/execution until the first user
   interaction OR a short timeout, whichever comes first. When the library loads
   it flushes the queued calls, so PageView and CTA Lead events are preserved;
   only their network send shifts a beat later, out of the TBT window.
   ============================================================================ */

// Fire once on the first interaction, or after `timeout` ms — whichever is first.
// The timeout is set past a typical mobile TTI so the heavy libraries execute
// outside the Total Blocking Time window when there is no early interaction.
export function useLazyTrigger(timeout = 2500) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (ready) return;
    let fired = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      cleanup();
      setReady(true);
    };
    const events = ["pointerdown", "keydown", "touchstart", "scroll"];
    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, fire));
      window.clearTimeout(timer);
    };
    events.forEach((e) =>
      window.addEventListener(e, fire, { once: true, passive: true }),
    );
    const timer = window.setTimeout(fire, timeout);
    return cleanup;
  }, [ready, timeout]);
  return ready;
}

// Loads an external script via next/script once the lazy trigger fires.
export function LazyExternalScript({ id, src }: { id: string; src: string }) {
  const ready = useLazyTrigger();
  if (!ready) return null;
  return <Script id={id} src={src} strategy="afterInteractive" />;
}
