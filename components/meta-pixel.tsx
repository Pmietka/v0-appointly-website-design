"use client";

import Script from "next/script";

import { LazyExternalScript } from "@/components/deferred-loader";
import { META_PIXEL_ID, TRACKING_CLIENT_KEY } from "@/lib/tracking-config";

// A real pixel id is all digits. Anything else keeps it off.
export const pixelReady = /^\d+$/.test(META_PIXEL_ID);

/* Meta Pixel base code. Inits with external_id = the visitor id that is also
   sent (hashed) to CAPI, so browser and server events match the same person.
   `extra` is appended after PageView (for example a Schedule event).
   fbevents.js is deferred to first interaction / short timeout to keep it off
   the initial load window; queued fbq() calls send once it loads. */
export function MetaPixel({ id = "meta-pixel", extra = "" }: { id?: string; extra?: string }) {
  if (!pixelReady) return null;
  const vidKey = `${TRACKING_CLIENT_KEY}_vid`;
  return (
    <>
      <Script id={id} strategy="afterInteractive">
        {`!function(f,b,e,n){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[]}(window,document,'script');
(function(){var k='${vidKey}',v='';try{v=localStorage.getItem(k)||'';if(!v){v=(window.crypto&&crypto.randomUUID)?crypto.randomUUID():('id_'+Date.now()+'_'+Math.random().toString(36).slice(2));localStorage.setItem(k,v);}document.cookie=k+'='+v+'; max-age=31536000; path=/; SameSite=Lax';}catch(e){}
fbq('init','${META_PIXEL_ID}',v?{external_id:v}:{});fbq('track','PageView');${extra}})();`}
      </Script>
      <LazyExternalScript id={`${id}-lib`} src="https://connect.facebook.net/en_US/fbevents.js" />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
