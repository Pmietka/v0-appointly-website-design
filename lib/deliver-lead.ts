import { GHL_WEBHOOK_URL } from "@/lib/tracking-config";

// Server first (adds real IP). If it fails or takes over 6s, post straight from the browser.
// A rare double post is fine: GHL dedupes the contact by phone/email and Meta dedupes by event_id.
export async function deliverLead(payload: Record<string, string>): Promise<"server" | "direct" | "failed"> {
  try {
    await Promise.race([
      fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).then((r) => {
        if (!r.ok) throw new Error(`api/lead ${r.status}`);
      }),
      new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 6000)),
    ]);
    return "server";
  } catch (err) {
    console.error("server lead delivery failed, falling back to direct", err);
  }
  try {
    await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, delivery: "direct" }),
      keepalive: true,
    });
    return "direct";
  } catch (err) {
    console.error("direct lead delivery failed", err);
    return "failed";
  }
}
