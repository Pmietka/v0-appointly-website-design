"use client";

import { MetaPixel } from "@/components/meta-pixel";
import { TRACKING_CLIENT_KEY } from "@/lib/tracking-config";

/* ============================================================================
   Meta Pixel for /booked-call.

   This page is shown once a lead has scheduled a call, so on load it fires the
   custom Meta "B2BCallBooked" event (in addition to PageView). It never fires
   the standard Schedule or Lead events, because standard conversion events on
   the B2B pixel are reserved for leads graded in Slack (sent server side via
   CAPI). The event id is <lead event id>_schedule. Fires once per lead, so a
   refresh or a second visit does not double count. If this browser has no
   lead id (booked from a reminder link on another device, say), B2BCallBooked
   fires at most once per SCHEDULE_TTL_MS. PageView still fires every time.
   ============================================================================ */

const LEAD_KEY = `${TRACKING_CLIENT_KEY}_lead_eid`;
const FIRED_KEY = `${TRACKING_CLIENT_KEY}_sched_fired`;
const NO_LEAD_SENT_KEY = "appointly:booked-call:schedule-sent";
const SCHEDULE_TTL_MS = 30 * 24 * 60 * 60 * 1000;

const SCHEDULE_JS = `try{var lid=localStorage.getItem('${LEAD_KEY}')||'',send=true;if(lid){if(localStorage.getItem('${FIRED_KEY}')===lid)send=false;}else{var t=Number(localStorage.getItem('${NO_LEAD_SENT_KEY}'))||0;if(Date.now()-t<${SCHEDULE_TTL_MS})send=false;}if(send){var eid=lid?lid+'_schedule':('sched_'+Date.now());fbq('trackCustom','B2BCallBooked',{},{eventID:eid});if(window.gtag)gtag('event','schedule_call',{event_id:eid});if(lid)localStorage.setItem('${FIRED_KEY}',lid);else localStorage.setItem('${NO_LEAD_SENT_KEY}',String(Date.now()));}}catch(e){fbq('trackCustom','B2BCallBooked');}`;

export function BookedCallPixel() {
  return <MetaPixel extra={SCHEDULE_JS} />;
}
