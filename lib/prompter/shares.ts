import { randomBytes } from "node:crypto";

import { del, get, list, put } from "@vercel/blob";
import { z } from "zod";

/* A "share" is one script plus prompter settings that an AI assistant set up
   for someone (through the MCP connector at /prompter/mcp). It lives in a
   private Vercel Blob until the Prompter app imports it, and links that are
   never opened are deleted after SHARE_TTL_DAYS by /api/prompter/cleanup. */

export const SHARE_TTL_DAYS = 7;
const PREFIX = "prompter-shares/";
const SITE = "https://getappointly.co";

export const settingsSchema = z.object({
  speed: z.number().int().min(1).max(12).optional(),
  fontSize: z.number().int().min(24).max(80).optional(),
  countdown: z.union([z.literal(0), z.literal(3), z.literal(5)]).optional(),
  camera: z.enum(["front", "back"]).optional(),
  mirror: z.boolean().optional(),
});

export const shareSchema = z.object({
  v: z.literal(1),
  title: z.string().max(120),
  script: z.string().min(1).max(15000),
  settings: settingsSchema,
  createdAt: z.string(),
});

export type Share = z.infer<typeof shareSchema>;
export type ShareSettings = z.infer<typeof settingsSchema>;

/** 22 url safe characters, 128 bits: unguessable, so the link is the key. */
export function newShareID(): string {
  return randomBytes(16).toString("base64url");
}

export function isShareID(id: string): boolean {
  return /^[A-Za-z0-9_-]{22}$/.test(id);
}

export const shareLink = (id: string) => `${SITE}/prompter/s/${id}`;

// Local development without a Blob store keeps shares in memory so the whole
// flow can be tried with `next dev`. Production always needs the store.
const memoryHost = globalThis as typeof globalThis & { __prompterShares?: Map<string, string> };
const memory = (memoryHost.__prompterShares ??= new Map<string, string>());
function useMemory(): boolean {
  // Either a read-write token or Vercel's OIDC store binding (BLOB_STORE_ID).
  if (process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID) return false;
  if (process.env.NODE_ENV === "production" && !process.env.PROMPTER_SHARES_IN_MEMORY) {
    throw new Error("No Blob store is connected (BLOB_READ_WRITE_TOKEN or BLOB_STORE_ID). Connect a private Vercel Blob store to the project.");
  }
  return true;
}

export async function saveShare(share: Share): Promise<string> {
  const id = newShareID();
  const body = JSON.stringify(shareSchema.parse(share));
  if (useMemory()) {
    memory.set(id, body);
    return id;
  }
  await put(`${PREFIX}${id}.json`, body, {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: false,
  });
  return id;
}

export async function loadShare(id: string): Promise<Share | null> {
  if (!isShareID(id)) return null;
  let raw: string | undefined;
  if (useMemory()) {
    raw = memory.get(id);
  } else {
    const result = await get(`${PREFIX}${id}.json`, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200) return null;
    raw = await new Response(result.stream).text();
  }
  if (!raw) return null;
  const parsed = shareSchema.safeParse(JSON.parse(raw));
  if (!parsed.success) return null;
  if (isExpired(parsed.data.createdAt)) {
    await deleteShare(id);
    return null;
  }
  return parsed.data;
}

export async function deleteShare(id: string): Promise<void> {
  if (!isShareID(id)) return;
  if (useMemory()) {
    memory.delete(id);
    return;
  }
  await del(`${PREFIX}${id}.json`);
}

export function isExpired(createdAt: string, now = Date.now()): boolean {
  const created = Date.parse(createdAt);
  return !Number.isFinite(created) || now - created > SHARE_TTL_DAYS * 24 * 60 * 60 * 1000;
}

/** Deletes every share older than the TTL. Returns how many were removed. */
export async function deleteExpiredShares(): Promise<number> {
  if (useMemory()) return 0;
  let cursor: string | undefined;
  let removed = 0;
  const cutoff = Date.now() - SHARE_TTL_DAYS * 24 * 60 * 60 * 1000;
  do {
    const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
    const stale = page.blobs.filter((blob) => blob.uploadedAt.getTime() < cutoff).map((blob) => blob.url);
    for (let i = 0; i < stale.length; i += 100) {
      const chunk = stale.slice(i, i + 100);
      await del(chunk);
      removed += chunk.length;
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return removed;
}

/** Strips what assistants sometimes add anyway: markdown, labels, stage directions. */
export function cleanScript(raw: string): string {
  // Control characters (other than newlines and tabs) have no place in a script.
  // eslint-disable-next-line no-control-regex
  let text = raw.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "").trim();
  text = text.replace(/^```[a-z]*\n?/i, "").replace(/\n?```$/, "");
  text = text
    .split("\n")
    // Headings and bare section labels ("Hook:", "Call to action") are never spoken.
    .filter((line) => !/^\s*#{1,6}\s/.test(line))
    .filter((line) => !/^\s*(\*\*)?(hook|intro|introduction|opening|body|main points?|outro|closing|close|cta|call to action|scene \d+|part \d+)(\*\*)?\s*:?\s*(\*\*)?\s*$/i.test(line))
    .map((line) =>
      line
        .replace(/^\s*(hook|intro|outro|cta|call to action)\s*:\s+/i, "")
        .replace(/^\s*[-*•]\s+/, "")
        .replace(/\*\*(.+?)\*\*/g, "$1")
        .replace(/__(.+?)__/g, "$1")
        .replace(/^\s*\[[^\]]*\]\s*$/, "")
        .replace(/^\s*\([^)]*\)\s*$/, "")
        .trimEnd(),
    )
    .join("\n");
  text = text.replace(/\n{3,}/g, "\n\n").trim();
  if (text.length > 1 && /^["“]/.test(text) && /["”]$/.test(text)) text = text.slice(1, -1).trim();
  return text;
}

export function titleFor(script: string): string {
  const first = script.split("\n").map((line) => line.trim()).find(Boolean) ?? "Untitled script";
  return first.length > 60 ? `${first.slice(0, 60)}…` : first;
}
