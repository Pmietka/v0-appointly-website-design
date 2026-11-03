/*
 * lib/tracking.ts
 * Universal tracking: ad click > getappointly.co > GHL > Meta CAPI.
 * Ported from the client landing page template in the Home Comfort Pros sub
 * account so B2B leads carry the exact same fields as client leads.
 * Browser only. Every export is a no-op on the server.
 */
import {
  TRACKING_CLIENT_KEY,
  DEFAULT_OFFER,
  OFFER_KEYWORDS,
  TRACKING_COUNTRY,
  META_PIXEL_ID,
} from "@/lib/tracking-config";

const IP_LOOKUP_URL = "https://api64.ipify.org?format=json";

export type Touch = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  campaign_id: string;
  campaign_name: string;
  adset_id: string;
  adset_name: string;
  ad_id: string;
  ad_name: string;
  placement: string;
  site_source: string;
  offer: string;
  fbclid: string;
  fbclid_at: number;
  gclid: string;
  gbraid: string;
  wbraid: string;
  ttclid: string;
  msclkid: string;
  landing_url: string;
  referrer: string;
  landed_at: string;
};

const EMPTY_TOUCH: Touch = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",
  campaign_id: "",
  campaign_name: "",
  adset_id: "",
  adset_name: "",
  ad_id: "",
  ad_name: "",
  placement: "",
  site_source: "",
  offer: "",
  fbclid: "",
  fbclid_at: 0,
  gclid: "",
  gbraid: "",
  wbraid: "",
  ttclid: "",
  msclkid: "",
  landing_url: "",
  referrer: "",
  landed_at: "",
};

const K = {
  firstTouch: `${TRACKING_CLIENT_KEY}_ft`,
  lastTouch: `${TRACKING_CLIENT_KEY}_lt`,
  visitorId: `${TRACKING_CLIENT_KEY}_vid`, // MUST match the pixel snippet (components/meta-pixel.tsx)
  ip: `${TRACKING_CLIENT_KEY}_ip`,
  sessionStart: `${TRACKING_CLIENT_KEY}_ss`,
  visits: `${TRACKING_CLIENT_KEY}_visits`,
  lastLeadEventId: `${TRACKING_CLIENT_KEY}_lead_eid`,
  scheduleFired: `${TRACKING_CLIENT_KEY}_sched_fired`,
};

/* ---------- helpers ---------- */

const isBrowser = () => typeof window !== "undefined";

// URLSearchParams already decodes + and %20. Trim, strip stray tabs, and drop
// unreplaced Meta macros like {{ad.id}}.
function clean(v: string | null | undefined): string {
  if (v == null) return "";
  const out = v.replace(/[\t\r\n]/g, "").trim();
  if (out.includes("{{") || out.includes("}}")) return "";
  return out;
}

function safeGet(store: Storage, key: string): string | null {
  try {
    return store.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(store: Storage, key: string, val: string): void {
  try {
    store.setItem(key, val);
  } catch {}
}

function readJSON<T>(store: Storage, key: string): T | null {
  const raw = safeGet(store, key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function getCookie(name: string): string {
  if (!isBrowser()) return "";
  const escaped = name.replace(/[.$?*|{}()[\]\\/+^]/g, "\\$&");
  const m = document.cookie.match(new RegExp("(?:^|; )" + escaped + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : "";
}

function setCookie(name: string, value: string, days: number): void {
  const exp = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${exp}; path=/; SameSite=Lax`;
}

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `id_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

async function sha256(value: string): Promise<string> {
  if (!value) return "";
  try {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return "";
  }
}

/* ---------- normalizers (Meta CAPI rules) ---------- */

export function phoneDigits(raw: string): string {
  let d = (raw || "").replace(/\D/g, "");
  if (d.length === 10) d = "1" + d;
  return d;
}

const normEmail = (s: string) => (s || "").trim().toLowerCase();
const normName = (s: string) => (s || "").trim().toLowerCase();

function deviceType(): string {
  const ua = navigator.userAgent || "";
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone/i.test(ua)) return "mobile";
  return "desktop";
}

/* ---------- URL capture ---------- */

function readTouchFromUrl(): Partial<Touch> | null {
  const p = new URLSearchParams(window.location.search);
  const g = (k: string) => clean(p.get(k));

  const t: Partial<Touch> = {
    utm_source: g("utm_source"),
    utm_medium: g("utm_medium"),
    utm_campaign: g("utm_campaign"),
    utm_term: g("utm_term"),
    utm_content: g("utm_content"),
    campaign_id: g("campaign_id") || g("utm_id"),
    campaign_name: g("campaign_name") || g("utm_campaign"),
    adset_id: g("adset_id"),
    adset_name: g("adset_name") || g("utm_term"),
    ad_id: g("ad_id"),
    ad_name: g("ad_name") || g("utm_content"),
    placement: g("placement"),
    site_source: g("site_source") || g("site_source_name"),
    offer: g("offer").toLowerCase(),
    fbclid: g("fbclid"),
    gclid: g("gclid"),
    gbraid: g("gbraid"),
    wbraid: g("wbraid"),
    ttclid: g("ttclid"),
    msclkid: g("msclkid"),
  };

  // Legacy ads: utm_source={{campaign.id}}&utm_medium={{ad.id}}
  const isId = (v?: string) => !!v && /^\d{6,}$/.test(v);
  if (!g("campaign_id") && isId(t.utm_source)) {
    t.campaign_id = t.utm_source;
    if (!t.ad_id && isId(t.utm_medium)) t.ad_id = t.utm_medium;
    t.utm_source = "facebook";
    t.utm_medium = "paid_social";
  }

  // utm_source={{site_source_name}} gives fb / ig / an / msg
  if (!t.site_source && ["fb", "ig", "an", "msg"].includes(t.utm_source || "")) {
    t.site_source = t.utm_source;
  }

  const hasAny = Object.values(t).some((v) => v !== "" && v !== undefined);
  return hasAny ? t : null;
}

/* ---------- public API ---------- */

export function getVisitorId(): string {
  if (!isBrowser()) return "";
  let id = safeGet(localStorage, K.visitorId) || getCookie(K.visitorId);
  if (!id) id = uuid();
  safeSet(localStorage, K.visitorId, id);
  setCookie(K.visitorId, id, 365);
  return id;
}

export async function lookupIp(timeoutMs = 2000): Promise<string> {
  if (!isBrowser()) return "";
  const cached = safeGet(sessionStorage, K.ip);
  if (cached) return cached;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    const r = await fetch(IP_LOOKUP_URL, { signal: ctrl.signal });
    clearTimeout(timer);
    const d = (await r.json()) as { ip?: string };
    if (d && d.ip) {
      safeSet(sessionStorage, K.ip, d.ip);
      return d.ip;
    }
  } catch {}
  return "";
}

/** Call once on app mount (root layout). Safe to call on every route. */
export function captureTracking(): void {
  if (!isBrowser()) return;
  const now = Date.now();
  const nowIso = new Date(now).toISOString();

  getVisitorId();

  if (!safeGet(sessionStorage, K.sessionStart)) {
    safeSet(sessionStorage, K.sessionStart, String(now));
    const visits = Number(safeGet(localStorage, K.visits) || "0") + 1;
    safeSet(localStorage, K.visits, String(visits));
  }

  const fromUrl = readTouchFromUrl();

  if (fromUrl) {
    const touch: Touch = {
      ...EMPTY_TOUCH,
      ...fromUrl,
      fbclid_at: fromUrl.fbclid ? now : 0,
      landing_url: window.location.href,
      referrer: document.referrer || "",
      landed_at: nowIso,
    };

    const prev = readJSON<Touch>(localStorage, K.lastTouch);
    if (prev && prev.fbclid && prev.fbclid === touch.fbclid) touch.fbclid_at = prev.fbclid_at;
    if (prev && prev.landing_url === touch.landing_url) touch.landed_at = prev.landed_at;

    safeSet(localStorage, K.lastTouch, JSON.stringify(touch));
    if (!readJSON<Touch>(localStorage, K.firstTouch)) {
      safeSet(localStorage, K.firstTouch, JSON.stringify(touch));
    }

    // Write _fbc ourselves. fbevents.js loads late on this site, so we cannot
    // count on Meta's library to have set it before the form is submitted.
    if (touch.fbclid) {
      const existing = getCookie("_fbc");
      if (!existing || !existing.endsWith(`.${touch.fbclid}`)) {
        setCookie("_fbc", `fb.1.${touch.fbclid_at}.${touch.fbclid}`, 90);
      }
    }
  } else if (!readJSON<Touch>(localStorage, K.lastTouch)) {
    const organic: Touch = {
      ...EMPTY_TOUCH,
      landing_url: window.location.href,
      referrer: document.referrer || "",
      landed_at: nowIso,
    };
    safeSet(localStorage, K.lastTouch, JSON.stringify(organic));
    if (!readJSON<Touch>(localStorage, K.firstTouch)) {
      safeSet(localStorage, K.firstTouch, JSON.stringify(organic));
    }
  }

  void lookupIp(4000);
}

// AI assistants and search engines, so organic leads show up as such in GHL instead of "referral".
const AI_PLATFORMS: Array<[string, RegExp]> = [
  ["chatgpt", /chatgpt\.com|chat\.openai\.com|openai/i],
  ["perplexity", /perplexity/i],
  ["claude", /claude\.ai|anthropic/i],
  ["gemini", /gemini\.google|bard\.google/i],
  ["copilot", /copilot\.microsoft|copilot\.cloud\.microsoft/i],
  ["meta_ai", /meta\.ai/i],
  ["grok", /grok\.com|x\.ai/i],
  ["deepseek", /deepseek/i],
  ["you", /(^|\/\/|\.)you\.com/i],
];

function detectAiPlatform(t: Touch): string {
  const haystack = `${t.utm_source} ${t.referrer}`;
  for (const [name, re] of AI_PLATFORMS) if (re.test(haystack)) return name;
  return "";
}

function isSearchEngine(referrer: string): boolean {
  return /(^https?:\/\/)?([a-z0-9-]+\.)*(google|bing|duckduckgo|yahoo|ecosia|brave)\.[a-z.]+/i.test(referrer || "");
}

/** Priority: offer URL param > URL path keyword > campaign/adset/ad name keyword > DEFAULT_OFFER */
export function detectOffer(t: Touch): string {
  if (t.offer) return t.offer;
  const path = window.location.pathname.toLowerCase();
  const names = `${t.campaign_name} ${t.adset_name} ${t.ad_name}`.toLowerCase();
  const entries = Object.entries(OFFER_KEYWORDS);
  for (const [offer, words] of entries) {
    if (words.some((w) => path.includes(w.toLowerCase()))) return offer;
  }
  for (const [offer, words] of entries) {
    if (words.some((w) => names.includes(w.toLowerCase()))) return offer;
  }
  return DEFAULT_OFFER;
}

export type LeadInput = {
  full_name: string;
  phone: string;
  email?: string;
  answers?: Record<string, unknown>;
};

export async function buildLeadPayload(input: LeadInput) {
  const now = Date.now();
  const lt = readJSON<Touch>(localStorage, K.lastTouch) || { ...EMPTY_TOUCH };
  const ft = readJSON<Touch>(localStorage, K.firstTouch) || lt;
  const eventId = uuid();

  const [first, ...rest] = (input.full_name || "").trim().split(/\s+/);
  const firstName = first || "";
  const lastName = rest.join(" ");
  const digits = phoneDigits(input.phone);
  const email = normEmail(input.email || "");

  const visitorId = getVisitorId();
  const fbc = getCookie("_fbc") || (lt.fbclid ? `fb.1.${lt.fbclid_at || now}.${lt.fbclid}` : "");
  const fbp = getCookie("_fbp");
  const ip = safeGet(sessionStorage, K.ip) || (await lookupIp(1500));
  const sessionStart = Number(safeGet(sessionStorage, K.sessionStart) || now);

  const offer = detectOffer(lt);
  const isMeta = !!(lt.campaign_id || lt.ad_id || lt.fbclid || ["fb", "ig", "an", "msg", "facebook", "instagram"].includes(lt.utm_source));
  const isGoogleAds = !!(lt.gclid || lt.gbraid || lt.wbraid);
  const aiPlatform = detectAiPlatform(lt);
  const leadSource = isMeta
    ? "meta_ads"
    : isGoogleAds
    ? "google_ads"
    : lt.ttclid
    ? "tiktok_ads"
    : lt.msclkid
    ? "microsoft_ads"
    : aiPlatform
    ? "ai_search"
    : isSearchEngine(lt.referrer)
    ? "organic_search"
    : lt.referrer
    ? "referral"
    : "direct";

  const [em_hash, ph_hash, fn_hash, ln_hash, country_hash, external_id_hash] = await Promise.all([
    sha256(email),
    sha256(digits),
    sha256(normName(firstName)),
    sha256(normName(lastName)),
    sha256(TRACKING_COUNTRY.toLowerCase()),
    sha256(visitorId),
  ]);
  // The B2B form does not collect an address, so city/state/zip hashes stay empty.
  const ct_hash = "";
  const st_hash = "";
  const zp_hash = "";

  const payload: Record<string, string> = {
    // Contact
    first_name: firstName,
    last_name: lastName,
    phone: digits ? `+${digits}` : "",
    email,
    country: TRACKING_COUNTRY.toUpperCase(),

    // Offer and source
    client: TRACKING_CLIENT_KEY,
    offer,
    lead_source: leadSource,
    ai_platform: aiPlatform,
    pixel_id: String(META_PIXEL_ID || ""),

    // Ad, last paid click
    campaign_id: lt.campaign_id,
    campaign_name: lt.campaign_name,
    adset_id: lt.adset_id,
    adset_name: lt.adset_name,
    ad_id: lt.ad_id,
    ad_name: lt.ad_name,
    placement: lt.placement,
    site_source: lt.site_source,

    // UTMs, raw
    utm_source: lt.utm_source,
    utm_medium: lt.utm_medium,
    utm_campaign: lt.utm_campaign,
    utm_term: lt.utm_term,
    utm_content: lt.utm_content,

    // Click IDs
    fbclid: lt.fbclid,
    gclid: lt.gclid,
    gbraid: lt.gbraid,
    wbraid: lt.wbraid,
    ttclid: lt.ttclid,
    msclkid: lt.msclkid,

    // Landing
    landing_page_url: lt.landing_url || window.location.href,
    page_url: window.location.href,
    page_path: window.location.pathname,
    referrer: lt.referrer,
    landed_at: lt.landed_at,

    // First touch
    ft_utm_source: ft.utm_source,
    ft_campaign_id: ft.campaign_id,
    ft_campaign_name: ft.campaign_name,
    ft_adset_id: ft.adset_id,
    ft_adset_name: ft.adset_name,
    ft_ad_id: ft.ad_id,
    ft_ad_name: ft.ad_name,
    ft_landing_url: ft.landing_url,
    ft_landed_at: ft.landed_at,

    // CAPI raw (never hash these)
    capi_event_id: eventId,
    capi_event_time: String(Math.floor(now / 1000)),
    event_source_url: window.location.href,
    fbc,
    fbp,
    client_ip_address: ip,
    client_ip_browser: ip,
    client_user_agent: navigator.userAgent || "",
    external_id: visitorId,

    // CAPI hashed
    em_hash,
    ph_hash,
    fn_hash,
    ln_hash,
    ct_hash,
    st_hash,
    zp_hash,
    country_hash,
    external_id_hash,

    // Session and device
    submitted_at: new Date(now).toISOString(),
    time_on_page_seconds: String(Math.max(0, Math.round((now - sessionStart) / 1000))),
    visit_count: safeGet(localStorage, K.visits) || "1",
    device_type: deviceType(),
    browser_language: navigator.language || "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
  };

  // Every form answer, as is. Colliding keys become answer_<key>.
  for (const [k, v] of Object.entries(input.answers || {})) {
    if (v === undefined || v === null) continue;
    const key = k in payload ? `answer_${k}` : k;
    payload[key] = Array.isArray(v) ? v.join(", ") : String(v);
  }

  safeSet(localStorage, K.lastLeadEventId, eventId);

  return { payload, eventId, offer };
}

/** UTMs and click ids to append to the booking calendar URL (only non empty values). */
export function getCalendarTrackingParams(): Record<string, string> {
  if (!isBrowser()) return {};
  const lt = readJSON<Touch>(localStorage, K.lastTouch);
  if (!lt) return {};
  const out: Record<string, string> = {};
  const keys: Array<keyof Touch> = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid", "gclid"];
  for (const k of keys) {
    const v = lt[k];
    if (typeof v === "string" && v) out[k] = v;
  }
  return out;
}

export function firePixelEvent(eventName: string, eventId: string, params: Record<string, unknown> = {}): void {
  try {
    (window as any).fbq?.("track", eventName, params, { eventID: eventId });
  } catch {}
}

export function fireCustomPixelEvent(eventName: string, eventId: string, params: Record<string, unknown> = {}): void {
  try {
    (window as any).fbq?.("trackCustom", eventName, params, { eventID: eventId });
  } catch {}
}

/** GA4 event, queued in dataLayer until gtag.js loads. */
export function fireGtagEvent(eventName: string, params: Record<string, unknown> = {}): void {
  try {
    (window as any).gtag?.("event", eventName, params);
  } catch {}
}

/** Booked call page: Schedule with eventID = <lead event id>_schedule so it dedupes with CAPI. Fires once per lead. */
export function fireScheduleOnce(params: Record<string, unknown> = {}): void {
  if (!isBrowser()) return;
  const leadId = safeGet(localStorage, K.lastLeadEventId) || "";
  if (leadId && safeGet(localStorage, K.scheduleFired) === leadId) return;
  const eventId = leadId ? `${leadId}_schedule` : uuid();
  firePixelEvent("Schedule", eventId, params);
  fireGtagEvent("schedule_call", { event_id: eventId });
  if (leadId) safeSet(localStorage, K.scheduleFired, leadId);
}
