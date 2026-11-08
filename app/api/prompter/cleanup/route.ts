import { NextResponse } from "next/server";

import { deleteExpiredShares } from "@/lib/prompter/shares";

/* Runs once a day from the Vercel cron in vercel.json. Deletes shared scripts
   whose links were never opened, so nothing sits on the server past the TTL.
   Vercel sends `Authorization: Bearer $CRON_SECRET` when CRON_SECRET is set. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const removed = await deleteExpiredShares();
  return NextResponse.json({ removed });
}
