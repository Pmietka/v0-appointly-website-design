"use client";

import { useEffect, useState } from "react";

import { getCalendarTrackingParams } from "@/lib/tracking";

// The GoHighLevel booking widget (same calendar embedded on /apply).
const CALENDAR_SRC = "https://link.getappointly.co/widget/booking/U3zYpjFagC8HFqQw21rC";
const CALENDAR_ID = "U3zYpjFagC8HFqQw21rC";

// GHL embed loader. Auto-resizes the scrolling="no" iframe to its full height.
const GHL_EMBED_JS = "https://link.getappointly.co/js/form_embed.js";

export function CalendarEmbed() {
  // Pass stored UTMs / click ids to the widget so GHL's calendar attribution
  // matches the original ad click, same as the /connect survey.
  const [src, setSrc] = useState(CALENDAR_SRC);
  useEffect(() => {
    const qs = new URLSearchParams(getCalendarTrackingParams()).toString();
    if (qs) setSrc(`${CALENDAR_SRC}?${qs}`);
  }, []);

  useEffect(() => {
    if (document.getElementById("ghl-embed-js")) return;
    const s = document.createElement("script");
    s.id = "ghl-embed-js";
    s.src = GHL_EMBED_JS;
    s.type = "text/javascript";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white shadow-[0_24px_54px_-30px_rgba(15,23,42,0.3)]">
      <iframe
        src={src}
        id={CALENDAR_ID}
        title="Book your strategy call"
        scrolling="no"
        style={{ border: "none" }}
        className="block min-h-[720px] w-full"
      />
    </div>
  );
}
