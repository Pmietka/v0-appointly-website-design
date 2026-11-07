import type { Metadata, Viewport } from "next";

import PrompterApp from "./prompter-app";
import "./prompter.css";

/* ============================================================================
   /prompter: a phone teleprompter. Paste a script, open the camera, hit record
   and the script scrolls over the top of the screen (close to the lens) while
   the camera records. Everything runs in the browser: the script and settings
   are kept in localStorage and the video never leaves the device until the
   user saves or shares it. Direct link only, so it stays out of the index.
   ============================================================================ */

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Prompter",
  description: "Paste your script, hit record, read it off the screen.",
  robots: { index: false, follow: false },
  appleWebApp: { capable: true, title: "Prompter", statusBarStyle: "black-translucent" },
};

export default function PrompterPage() {
  return <PrompterApp />;
}
