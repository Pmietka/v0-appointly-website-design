import { NextResponse, type NextRequest } from "next/server";

import { GHL_WEBHOOK_URL } from "@/lib/tracking-config";

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

  const res = await fetch(GHL_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    return NextResponse.json({ ok: false, status: res.status }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
