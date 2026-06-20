"use client";

import { useEffect } from "react";

/* Vidalytics Smart Player embed for /apply. Separate from the shared lander
   player so this page can run its own VSL. React strips inline <script> from
   JSX, so the loader (verbatim from the Vidalytics dashboard) is injected once
   on mount; it targets the div below by id and builds the player inside it. */
const EMBED_ID = "vidalytics_embed_yab2hhU03er3If8m";

const EMBED_SCRIPT = `(function (v, i, d, a, l, y, t, c, s) {
    y='_'+d.toLowerCase();c=d+'L';if(!v[d]){v[d]={};}if(!v[c]){v[c]={};}if(!v[y]){v[y]={};}var vl='Loader',vli=v[y][vl],vsl=v[c][vl + 'Script'],vlf=v[c][vl + 'Loaded'],ve='Embed';
    if (!vsl){vsl=function(u,cb){
        if(t){cb();return;}s=i.createElement("script");s.type="text/javascript";s.async=1;s.src=u;
        if(s.readyState){s.onreadystatechange=function(){if(s.readyState==="loaded"||s.readyState=="complete"){s.onreadystatechange=null;vlf=1;cb();}};}else{s.onload=function(){vlf=1;cb();};}
        i.getElementsByTagName("head")[0].appendChild(s);
    };}
    vsl(l+'loader.min.js',function(){if(!vli){var vlc=v[c][vl];vli=new vlc();}vli.loadScript(l+'player.min.js',function(){var vec=v[d][ve];t=new vec();t.run(a);});});
})(window, document, 'Vidalytics', '${EMBED_ID}', 'https://fast.vidalytics.com/embeds/FeX1NGyU/yab2hhU03er3If8m/');`;

export function ApplyVsl() {
  useEffect(() => {
    if (document.getElementById("vidalytics-loader-apply")) return;
    const s = document.createElement("script");
    s.id = "vidalytics-loader-apply";
    s.type = "text/javascript";
    s.text = EMBED_SCRIPT;
    document.body.appendChild(s);
  }, []);

  // Inline style matches the dashboard snippet — a self-contained 16:9 box.
  return <div id={EMBED_ID} style={{ width: "100%", position: "relative", paddingTop: "56.25%" }} />;
}
