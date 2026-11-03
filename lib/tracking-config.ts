/*
 * Universal tracking config for getappointly.co (B2B).
 * Mirrors the client landing page template used in the Home Comfort Pros sub
 * account, pointed at the Appointly sub account and the B2B pixel.
 */

// B2B Meta pixel / dataset (Appointly business portfolio).
export const META_PIXEL_ID = "985991997226201";

// Namespace for localStorage / cookie keys. Must match the pixel snippet's visitor id key.
export const TRACKING_CLIENT_KEY = "appointly";

// "b2b - 00b - Intake Landing Page" inbound webhook in the Appointly sub account.
export const GHL_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/bv8PsVl3lvidD0j8bBqP/webhook-trigger/69c59715-edb9-4231-bf64-1d2b255fa681";

export const TRACKING_COUNTRY = "us";

// Offer = the niche the B2B lead came in for. Checked in order: URL ?offer=,
// then page path, then campaign / ad set / ad names. First match wins.
export const DEFAULT_OFFER = "floor_coating";
export const OFFER_KEYWORDS: Record<string, string[]> = {
  insulation: ["insulation"],
  walk_in_tub: ["walk in tub", "walk-in tub", "tub"],
  floor_coating: ["epoxy", "coating", "floor"],
};
