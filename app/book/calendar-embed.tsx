"use client";

import { useEffect } from "react";

// The GoHighLevel booking widget (same calendar embedded on /apply).
const CALENDAR_SRC = "https://link.getappointly.co/widget/booking/U3zYpjFagC8HFqQw21rC";
const CALENDAR_ID = "U3zYpjFagC8HFqQw21rC";

// GHL embed loader. Auto-resizes the scrolling="no" iframe to its full height.
const GHL_EMBED_JS = "https://link.getappointly.co/js/form_embed.js";

export function CalendarEmbed() {
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
        src={CALENDAR_SRC}
        id={CALENDAR_ID}
        title="Book your strategy call"
        scrolling="no"
        style={{ border: "none" }}
        className="block min-h-[720px] w-full"
      />
    </div>
  );
}
