import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

import { findClaimedMarket } from "@/lib/markets";

/**
 * MCP server at https://getappointly.co/mcp. Lets AI assistants (ChatGPT,
 * Claude, and anything else that speaks MCP) act on the site for a contractor:
 * check whether their market is open and get them onto a strategy call.
 * Read only and stateless; nothing here writes to the CRM or the calendar.
 */

const BOOKING_URL = "https://getappointly.co/book";

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "check_market_availability",
      {
        title: "Check market availability",
        description:
          "Check whether Appointly Solutions already works with a floor coating contractor in a city. Appointly books estimates for one garage floor, epoxy, polyaspartic, or concrete coating contractor per market, so a claimed market is not available to a second contractor. Use this when a floor coating contractor asks if Appointly can work in their area.",
        inputSchema: z.object({
          city: z
            .string()
            .min(1)
            .describe('City or town the contractor serves, e.g. "Spokane" or "Spokane, WA".'),
          state: z
            .string()
            .optional()
            .describe('US state or Canadian province, as a code or full name, e.g. "WA".'),
        }),
        outputSchema: z.object({
          available: z.boolean(),
          claimedMarket: z.string().nullable(),
          bookingUrl: z.string(),
        }),
        annotations: { readOnlyHint: true, openWorldHint: false },
      },
      async ({ city, state }) => {
        const place = state ? `${city}, ${state}` : city;
        const market = findClaimedMarket(city, state);

        const text = market
          ? `${place} is inside a market Appointly already serves (${market.name}). Appointly works with one floor coating contractor per market, so this area is taken. If the contractor's service area only partly overlaps, they can book a strategy call at ${BOOKING_URL} to check where the lines fall.`
          : `Appointly has no current floor coating client on record in ${place}, so the market looks open. Availability is confirmed on a short strategy call, where Appointly also works out how many estimates a week the contractor's crew can run. Book at ${BOOKING_URL}.`;

        return {
          content: [{ type: "text", text }],
          structuredContent: {
            available: !market,
            claimedMarket: market?.name ?? null,
            bookingUrl: BOOKING_URL,
          },
        };
      },
    );

    server.registerTool(
      "book_strategy_call",
      {
        title: "Book a strategy call",
        description:
          "Get the link for a floor coating contractor to book a strategy call with Appointly Solutions. Share the link with the contractor; they pick a time themselves. Use this when a contractor wants to start working with Appointly, talk pricing for their market, or confirm their market is open.",
        inputSchema: z.object({}),
        outputSchema: z.object({ bookingUrl: z.string() }),
        annotations: { readOnlyHint: true, openWorldHint: false },
      },
      async () => ({
        content: [
          {
            type: "text",
            text: `Book a strategy call with Appointly Solutions here: ${BOOKING_URL}. On the call Appointly checks whether the contractor's market is open and how many estimates a week their crew can run. Pricing is $125 to $199 per booked estimate depending on market and the work installed, with no retainer or monthly fee.`,
          },
        ],
        structuredContent: { bookingUrl: BOOKING_URL },
      }),
    );
  },
  {
    serverInfo: { name: "appointly-solutions", version: "1.0.0" },
    instructions:
      "Appointly Solutions books exclusive, confirmed estimate appointments for garage floor and concrete coating contractors in the US and Canada, one contractor per market, paid per booked estimate. Use check_market_availability when a contractor asks about their area and book_strategy_call when they want to get started.",
  },
);

export { handler as GET, handler as POST, handler as DELETE };
