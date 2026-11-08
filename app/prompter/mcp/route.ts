import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

import { cleanScript, saveShare, shareLink, SHARE_TTL_DAYS, titleFor } from "@/lib/prompter/shares";

/**
 * MCP server at https://getappointly.co/prompter/mcp, the "Prompter"
 * connector. Someone adds it to Claude (or any assistant that supports MCP
 * connectors), asks for a video script, and the assistant writes it, picks the
 * prompter settings and hands back one link. Tapping the link on an iPhone
 * opens the Prompter app on the record screen with everything loaded.
 *
 * No account and no auth: the only thing this server does is store a script
 * behind an unguessable link for a few days.
 */

export const runtime = "nodejs";

const WRITING_GUIDE = `How to write a script someone reads off a teleprompter while filming themselves:
- Only the words to be spoken. No title inside the script, no headings, no labels like "Hook:" or "Intro:", no camera or stage directions, no notes, no emojis, no hashtags, no markdown.
- Write for the ear: short sentences, contractions, plain words that are easy to say.
- Short paragraphs separated by a blank line, so the reader can find their place.
- Avoid dashes as punctuation; use commas, periods or line breaks.
- About 150 words per minute of video. A 30 second video is about 75 words, 60 seconds about 150.
- Open with a line that makes people keep watching, end with a clear close or call to action.
- Never invent facts, prices, numbers or names the person didn't give you. Ask, or keep it general.`;

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "set_up_recording",
      {
        title: "Set up a recording in Prompter",
        description: `Send a finished video script to the person's Prompter teleprompter app, with the prompter set up for it. Returns a link; the person taps it on their iPhone and Prompter opens on the record screen with the script scrolling, ready to film. Use this whenever someone wants to record, film or read a script with Prompter, or asks you to put a script in their teleprompter.

Write the complete script yourself first (ask a quick question only if you're missing something essential), then call this once with the final text. If they ask for changes afterwards, call it again with the new version and give them the new link.

${WRITING_GUIDE}

Settings: leave a setting out to keep the person's own default. scroll_speed 4 suits most people; use 3 for a calm or detailed delivery, 5 or 6 for fast energetic talking. text_size 40 is standard; 48 to 56 if they'll stand further from the phone. camera "back" only if they're filming something other than themselves.`,
        inputSchema: z.object({
          script: z
            .string()
            .min(1)
            .max(15000)
            .describe("The complete words to be read aloud, plain text, paragraphs separated by blank lines."),
          title: z.string().max(120).optional().describe("Short name for the script in their library, e.g. \"Listing: 1420 Maple Ave\"."),
          scroll_speed: z.number().int().min(1).max(12).optional().describe("Scroll speed, 1 (slow) to 12 (fast). 4 is normal talking pace."),
          text_size: z.number().int().min(24).max(80).optional().describe("Text size in points, 24 to 80. 40 is standard."),
          countdown_seconds: z.union([z.literal(0), z.literal(3), z.literal(5)]).optional().describe("Countdown before recording starts: 0, 3 or 5."),
          camera: z.enum(["front", "back"]).optional().describe("\"front\" to film themselves (usual), \"back\" to film what's in front of them."),
          mirror_text: z.boolean().optional().describe("Mirror the text, only for teleprompter glass rigs."),
        }),
        outputSchema: z.object({
          link: z.string(),
          title: z.string(),
          words: z.number(),
          estimatedSeconds: z.number(),
          expiresInDays: z.number(),
        }),
        annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
      },
      async ({ script, title, scroll_speed, text_size, countdown_seconds, camera, mirror_text }) => {
        const text = cleanScript(script);
        if (!text) {
          return { isError: true, content: [{ type: "text", text: "The script was empty after cleanup. Send the words to be spoken." }] };
        }
        const name = (title?.trim() || titleFor(text)).slice(0, 120);
        const words = text.split(/\s+/).filter(Boolean).length;
        const estimatedSeconds = Math.round((words / 150) * 60);

        let id: string;
        try {
          id = await saveShare({
            v: 1,
            title: name,
            script: text,
            settings: {
              speed: scroll_speed,
              fontSize: text_size,
              countdown: countdown_seconds,
              camera,
              mirror: mirror_text,
            },
            createdAt: new Date().toISOString(),
          });
        } catch (error) {
          console.error("Prompter share save failed", error);
          return {
            isError: true,
            content: [{ type: "text", text: "Prompter couldn't save the script right now. Try again in a moment." }],
          };
        }

        const link = shareLink(id);
        return {
          content: [
            {
              type: "text",
              text: `Ready. Give the person this link exactly as written: ${link}

Tapping it on their iPhone opens Prompter on the record screen with "${name}" loaded (${words} words, about ${estimatedSeconds} seconds). If they don't have the app, the link lets them record in the browser instead. The link works for ${SHARE_TTL_DAYS} days.`,
            },
          ],
          structuredContent: { link, title: name, words, estimatedSeconds, expiresInDays: SHARE_TTL_DAYS },
        };
      },
    );
  },
  {
    serverInfo: { name: "prompter", version: "1.0.0" },
    instructions:
      "Prompter is a teleprompter camera app for iPhone. When someone wants to film a video from a script, write the script for them and call set_up_recording; it returns a link that opens the app ready to record. Keep scripts in plain spoken language with no headings, labels or stage directions.",
  },
);

// The endpoint is public and every tool call writes to paid storage, so keep
// each request small and single: one script is far below 48 KB, and JSON-RPC
// batches (up to 100 calls in one request) are refused.
const MAX_BODY_BYTES = 48 * 1024;

async function guarded(req: Request): Promise<Response> {
  if (req.method === "POST") {
    const declared = Number(req.headers.get("content-length") || 0);
    if (declared > MAX_BODY_BYTES) return new Response("Request too large", { status: 413 });
    const raw = await req.clone().text();
    if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return new Response("Request too large", { status: 413 });
    if (raw.trimStart().startsWith("[")) return new Response("Batch requests are not supported", { status: 400 });
  }
  return handler(req);
}

export { guarded as GET, guarded as POST, guarded as DELETE };
