import { NextResponse } from "next/server";

import { deleteShare, isShareID, loadShare } from "@/lib/prompter/shares";

/* The Prompter app (and the web prompter) read a shared script here, then
   delete it once it's safely in the app. The id is the only key, so anyone
   with the link can read it, the same as the link itself. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

const noStore = { "cache-control": "no-store", "x-robots-tag": "noindex" };

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  if (!isShareID(id)) {
    return NextResponse.json({ error: "not_found" }, { status: 404, headers: noStore });
  }
  try {
    const share = await loadShare(id);
    if (!share) {
      return NextResponse.json({ error: "not_found" }, { status: 404, headers: noStore });
    }
    return NextResponse.json(share, { headers: noStore });
  } catch (error) {
    console.error("Prompter share load failed", error);
    return NextResponse.json({ error: "unavailable" }, { status: 503, headers: noStore });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  if (!isShareID(id)) {
    return new NextResponse(null, { status: 204, headers: noStore });
  }
  try {
    await deleteShare(id);
  } catch (error) {
    console.error("Prompter share delete failed", error);
  }
  return new NextResponse(null, { status: 204, headers: noStore });
}
