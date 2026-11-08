import type { Metadata, Viewport } from "next";

import { loadShare } from "@/lib/prompter/shares";

/* Landing page for a link an assistant made with the Prompter connector.
   One tap opens the Prompter app on the record screen with the script loaded;
   without the app, the web prompter can record it in the browser. */

export const dynamic = "force-dynamic";

export const viewport: Viewport = { themeColor: "#0b0b0c", width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  title: "Your script is ready | Prompter",
  robots: { index: false, follow: false },
};

// Must match the URL scheme in the iOS app's Info.plist.
const APP_SCHEME = "prompterapp";

type Props = { params: Promise<{ id: string }> };

const page: React.CSSProperties = {
  minHeight: "100dvh",
  background: "#0b0b0c",
  color: "#f5f5f7",
  display: "flex",
  justifyContent: "center",
  padding: "48px 16px 40px",
  fontFamily: "var(--font-jakarta), system-ui, -apple-system, sans-serif",
};
const card: React.CSSProperties = { width: "100%", maxWidth: 520, display: "flex", flexDirection: "column", gap: 16 };
const button: React.CSSProperties = {
  display: "block",
  textAlign: "center",
  borderRadius: 16,
  padding: "17px 20px",
  fontSize: 17,
  fontWeight: 800,
  textDecoration: "none",
};

export default async function SharePage({ params }: Props) {
  const { id } = await params;
  let share = null;
  let failed = false;
  try {
    share = await loadShare(id);
  } catch (error) {
    console.error("Prompter share page load failed", error);
    failed = true;
  }

  if (!share) {
    return (
      <main style={page}>
        <div style={card}>
          <h1 style={{ fontSize: 26, fontWeight: 800 }}>{failed ? "Couldn't load this script" : "This link has expired"}</h1>
          <p style={{ color: "#a1a1aa", lineHeight: 1.5 }}>
            {failed
              ? "Something went wrong on our side. Try the link again in a minute."
              : "Script links work for 7 days, and only until the script is opened in the Prompter app. Ask your assistant to set up the recording again for a fresh link."}
          </p>
        </div>
      </main>
    );
  }

  const words = share.script.split(/\s+/).filter(Boolean).length;
  const seconds = Math.round((words / 150) * 60);
  const preview = share.script.split("\n\n").slice(0, 3).join("\n\n");

  return (
    <main style={page}>
      <div style={card}>
        <p style={{ color: "#a1a1aa", fontSize: 14, fontWeight: 600 }}>Your script is ready</p>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{share.title}</h1>
        <p style={{ color: "#a1a1aa", fontSize: 14 }}>
          {words} words · about {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
        </p>

        <a href={`${APP_SCHEME}://open?id=${encodeURIComponent(id)}`} style={{ ...button, background: "#fff", color: "#0b0b0c" }}>
          ● Open in Prompter and record
        </a>
        <a href={`/prompter?s=${encodeURIComponent(id)}`} style={{ ...button, background: "#232327", color: "#f5f5f7" }}>
          Record in this browser instead
        </a>

        <div
          style={{
            marginTop: 8,
            background: "#17171a",
            border: "1px solid #2a2a2f",
            borderRadius: 16,
            padding: 16,
            whiteSpace: "pre-wrap",
            lineHeight: 1.55,
            fontSize: 16,
            color: "#d4d4d8",
          }}
        >
          {preview}
          {preview.length < share.script.length ? "\n\n…" : ""}
        </div>
      </div>
    </main>
  );
}
