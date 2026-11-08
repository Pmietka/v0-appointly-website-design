import { NextResponse } from "next/server";

import { deleteExpiredShares } from "@/lib/prompter/shares";

/* Runs once a day from the Vercel cron in vercel.json. Deletes shared scripts
   whose links were never opened, so nothing sits on the server past the TTL.
   Vercel sends `Authorization: Bearer $CRON_SECRET` when CRON_SECRET is set. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    console.error("Prompter cleanup: CRON_SECRET is not set, so expired scripts are NOT being deleted. Add it in Vercel.");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }
  if (req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const removed = await deleteExpiredShares();
    return NextResponse.json({ removed });
  } catch (error) {
    console.error("Prompter cleanup failed", error);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
