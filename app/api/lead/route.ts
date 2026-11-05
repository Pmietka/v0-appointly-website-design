import { NextResponse, type NextRequest } from "next/server";

import { GHL_WEBHOOK_URL } from "@/lib/tracking-config";

// B2B lead gate (n8n). Holds the tracking data until the lead is graded in
// Slack. Kept in this server only file, not lib/tracking-config.ts, because
// that file ships to the browser.
const B2B_LEAD_GATE_URL = "https://n8n-m0rj.srv1124930.hstgr.cloud/webhook/b2b-lead-hold";
const B2B_LEAD_GATE_KEY = process.env.B2B_LEAD_GATE_KEY || "apg_7Qm2vX9rL4tK8nB3wZ6pH1sD";

// Server side lead delivery. Adds the visitor's real IP (Vercel edge headers)
// before forwarding to the GHL inbound webhook, same as the client landing
// pages in the Home Comfort Pros sub account.
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let data: Record<string, unknown>;
  try {
    data = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }
  if (!data || typeof data !== "object") {
    return NextResponse.json({ ok: false, error: "bad body" }, { status: 400 });
  }

  const xff = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim();
  const serverIp = req.headers.get("x-real-ip") || xff || "";
  const browserIp = typeof data.client_ip_browser === "string" ? data.client_ip_browser : "";

  const payload = {
    ...data,
    client_ip_server: serverIp,
    client_ip_address: browserIp || serverIp,
    delivery: "server",
  };

  // Forward to the n8n lead gate in parallel. Never blocks or changes GHL delivery.
  const gate = fetch(B2B_LEAD_GATE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-appointly-key": B2B_LEAD_GATE_KEY },
    body: JSON.stringify(payload),
  })
    .then((r) => {
      if (!r.ok) console.error(`B2B lead gate responded ${r.status}`);
    })
    .catch((err) => {
      console.error("B2B lead gate forward failed", err);
    });

  const res = await fetch(GHL_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  await gate;
  if (!res.ok) {
    return NextResponse.json({ ok: false, status: res.status }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
