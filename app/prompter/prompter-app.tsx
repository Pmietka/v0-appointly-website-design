"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ----------------------------------------------------------------------------
   Types, defaults and storage
---------------------------------------------------------------------------- */

type Phase = "edit" | "camera" | "review";
type Facing = "user" | "environment";

type Settings = {
  fontSize: number; // px
  speed: number; // 1 to 12
  countdown: boolean;
  mirror: boolean;
  facing: Facing;
};

type Take = { url: string; blob: Blob; mime: string; seconds: number };

const DEFAULTS: Settings = { fontSize: 40, speed: 4, countdown: true, mirror: false, facing: "user" };
const STORE_KEY = "prompter:v1";
const FONT_MIN = 24;
const FONT_MAX = 80;
const SPEED_MIN = 1;
const SPEED_MAX = 12;
const LINE_HEIGHT = 1.35;

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

function loadStore(): { script: string; settings: Settings } | null {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return {
      script: typeof data.script === "string" ? data.script : "",
      settings: { ...DEFAULTS, ...(data.settings || {}) },
    };
  } catch {
    return null;
  }
}

function saveStore(script: string, settings: Settings) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({ script, settings }));
  } catch {
    /* private mode or storage full: the app still works, it just forgets */
  }
}

function wordCount(text: string) {
  const m = text.trim().match(/\S+/g);
  return m ? m.length : 0;
}

function fmtTime(totalSeconds: number) {
  const s = Math.max(0, Math.round(totalSeconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

// iOS Safari records mp4, Chrome and Firefox record webm. Pick the first one
// this browser supports.
function pickMime(): string {
  if (typeof MediaRecorder === "undefined") return "";
  const options = [
    "video/mp4;codecs=avc1.42E01E,mp4a.40.2",
    "video/mp4",
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
  ];
  for (const o of options) {
    try {
      if (MediaRecorder.isTypeSupported(o)) return o;
    } catch {
      /* ignore */
    }
  }
  return "";
}

type Layout = { land: boolean; lensLeft: boolean };
type Shape = "tall" | "wide";

// A phone on its side gets the landscape layout. Desktops and tablets keep the
// band across the top, which already sits right under their webcam.
function readLayout(): Layout {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const land = w > h && h <= 600;
  let angle = 0;
  const legacy = (window as Window & { orientation?: number }).orientation;
  if (typeof legacy === "number") angle = legacy;
  else if (screen.orientation) angle = screen.orientation.angle;
  // 90 means the phone was turned counterclockwise, so its top edge (where the
  // camera is) ends up on the left. -90 / 270 puts the camera on the right.
  const lensLeft = !(angle === -90 || angle === 270);
  return { land, lensLeft };
}

const readShape = (): Shape => (window.innerHeight > window.innerWidth ? "tall" : "wide");

/* ----------------------------------------------------------------------------
   App shell
---------------------------------------------------------------------------- */

export default function PrompterApp() {
  const [phase, setPhase] = useState<Phase>("edit");
  const [script, setScript] = useState("");
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [loaded, setLoaded] = useState(false);
  const [take, setTake] = useState<Take | null>(null);

  useEffect(() => {
    const s = loadStore();
    if (s) {
      setScript(s.script);
      setSettings(s.settings);
    }
    // A link from an assistant (/prompter?s=ID): load that script with its
    // settings and go straight to the camera.
    const shareID = new URLSearchParams(window.location.search).get("s");
    if (!shareID) {
      setLoaded(true);
      return;
    }
    fetch(`/api/prompter/s/${encodeURIComponent(shareID)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((share) => {
        if (!share || typeof share.script !== "string") return;
        const incoming = share.settings || {};
        setScript(share.script);
        setSettings((current) => ({
          ...current,
          ...(typeof incoming.speed === "number" ? { speed: clamp(incoming.speed, SPEED_MIN, SPEED_MAX) } : {}),
          ...(typeof incoming.fontSize === "number" ? { fontSize: clamp(incoming.fontSize, FONT_MIN, FONT_MAX) } : {}),
          ...(typeof incoming.countdown === "number" ? { countdown: incoming.countdown > 0 } : {}),
          ...(typeof incoming.mirror === "boolean" ? { mirror: incoming.mirror } : {}),
          ...(incoming.camera === "back" ? { facing: "environment" as Facing } : incoming.camera === "front" ? { facing: "user" as Facing } : {}),
        }));
        setPhase("camera");
      })
      .catch(() => {})
      .finally(() => {
        window.history.replaceState(null, "", window.location.pathname);
        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (loaded) saveStore(script, settings);
  }, [script, settings, loaded]);

  // Free the previous recording when it is replaced or the app closes.
  useEffect(() => {
    return () => {
      if (take) URL.revokeObjectURL(take.url);
    };
  }, [take]);

  const handleDone = useCallback((blob: Blob, mime: string, seconds: number) => {
    setTake({ url: URL.createObjectURL(blob), blob, mime, seconds });
    setPhase("review");
  }, []);

  return (
    <div className="tp-root">
      {phase === "edit" && (
        <Editor
          script={script}
          setScript={setScript}
          settings={settings}
          setSettings={setSettings}
          onStart={() => setPhase("camera")}
        />
      )}
      {phase === "camera" && (
        <CameraView
          script={script}
          settings={settings}
          setSettings={setSettings}
          onBack={() => setPhase("edit")}
          onDone={handleDone}
        />
      )}
      {phase === "review" && take && (
        <Review
          take={take}
          onRetake={() => {
            setTake(null);
            setPhase("camera");
          }}
          onEdit={() => {
            setTake(null);
            setPhase("edit");
          }}
        />
      )}
    </div>
  );
}

/* ----------------------------------------------------------------------------
   1. Script editor
---------------------------------------------------------------------------- */

function Editor({
  script,
  setScript,
  settings,
  setSettings,
  onStart,
}: {
  script: string;
  setScript: (s: string) => void;
  settings: Settings;
  setSettings: (s: Settings) => void;
  onStart: () => void;
}) {
  const words = wordCount(script);
  const readSeconds = (words / 150) * 60; // a natural speaking pace
  const [pasteMsg, setPasteMsg] = useState("");

  const paste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setScript(text);
      else setPasteMsg("Clipboard is empty");
    } catch {
      setPasteMsg("Long press the box and tap Paste");
    }
    setTimeout(() => setPasteMsg(""), 2500);
  };

  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => setSettings({ ...settings, [k]: v });

  return (
    <div className="tp-edit">
      <header className="tp-edit-head">
        <h1>Prompter</h1>
        <p>Paste your script, hit record, read it off the screen.</p>
      </header>

      <section className="tp-card">
        <textarea
          className="tp-script"
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Paste your script here..."
          spellCheck
        />
        <div className="tp-script-bar">
          <div className="tp-script-actions">
            <button type="button" className="tp-chip" onClick={paste}>
              Paste
            </button>
            {script && (
              <button type="button" className="tp-chip tp-chip-ghost" onClick={() => setScript("")}>
                Clear
              </button>
            )}
          </div>
          <span className="tp-meta">
            {pasteMsg || (words ? `${words} words · about ${fmtTime(readSeconds)}` : "No script yet")}
          </span>
        </div>
      </section>

      <section className="tp-card tp-settings">
        <label className="tp-row">
          <span className="tp-row-label">
            Text size <b>{settings.fontSize}</b>
          </span>
          <input
            type="range"
            min={FONT_MIN}
            max={FONT_MAX}
            step={2}
            value={settings.fontSize}
            onChange={(e) => set("fontSize", Number(e.target.value))}
          />
        </label>
        <label className="tp-row">
          <span className="tp-row-label">
            Scroll speed <b>{settings.speed}</b>
          </span>
          <input
            type="range"
            min={SPEED_MIN}
            max={SPEED_MAX}
            step={1}
            value={settings.speed}
            onChange={(e) => set("speed", Number(e.target.value))}
          />
        </label>
        <div className="tp-row tp-row-inline">
          <span className="tp-row-label">Camera</span>
          <div className="tp-seg">
            <button
              type="button"
              className={settings.facing === "user" ? "on" : ""}
              onClick={() => set("facing", "user")}
            >
              Front
            </button>
            <button
              type="button"
              className={settings.facing === "environment" ? "on" : ""}
              onClick={() => set("facing", "environment")}
            >
              Back
            </button>
          </div>
        </div>
        <Toggle label="3 second countdown" on={settings.countdown} onChange={(v) => set("countdown", v)} />
        <Toggle label="Mirror text" on={settings.mirror} onChange={(v) => set("mirror", v)} />
      </section>

      <p className="tp-tip">
        Filming sideways? Turn off Portrait Orientation Lock in Control Center so the screen can rotate.
      </p>

      <div className="tp-start-wrap">
        <button type="button" className="tp-start" disabled={!script.trim()} onClick={onStart}>
          <span className="tp-start-dot" /> Open camera
        </button>
      </div>
    </div>
  );
}

function Toggle({ label, on, onChange }: { label: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" className="tp-row tp-row-inline tp-toggle-row" onClick={() => onChange(!on)}>
      <span className="tp-row-label">{label}</span>
      <span className={`tp-switch ${on ? "on" : ""}`} role="switch" aria-checked={on} />
    </button>
  );
}

/* ----------------------------------------------------------------------------
   2. Camera + scrolling prompter
---------------------------------------------------------------------------- */

function CameraView({
  script,
  settings,
  setSettings,
  onBack,
  onDone,
}: {
  script: string;
  settings: Settings;
  setSettings: (s: Settings) => void;
  onBack: () => void;
  onDone: (blob: Blob, mime: string, seconds: number) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll engine state lives in refs so the animation loop never re-renders.
  const offsetRef = useRef(0);
  const runningRef = useRef(false);
  const draggingRef = useRef(false);
  const speedRef = useRef(settings.speed);
  const fontRef = useRef(settings.fontSize);
  const dragRef = useRef<{ y: number; off: number; moved: boolean } | null>(null);
  const countdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedAt = useRef(0);

  const [running, setRunning] = useState(false);
  const [recording, setRecording] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [ready, setReady] = useState(false);
  const [camError, setCamError] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);
  const [atEnd, setAtEnd] = useState(false);

  const [layout, setLayout] = useState<Layout>(readLayout);
  // The camera is opened for the shape the phone was in at the time. When the
  // phone turns (and we're not mid take) it is reopened so the frame matches.
  const [shape, setShape] = useState<Shape>(readShape);
  const busyRef = useRef(false);

  speedRef.current = settings.speed;
  fontRef.current = settings.fontSize;
  busyRef.current = recording || count !== null;

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | null = null;
    const update = () => {
      setLayout(readLayout());
      if (!busyRef.current) setShape(readShape());
    };
    // iOS reports the new size a beat after the rotation event, so check twice.
    const onChange = () => {
      update();
      if (t) clearTimeout(t);
      t = setTimeout(update, 400);
    };
    window.addEventListener("resize", onChange);
    window.addEventListener("orientationchange", onChange);
    screen.orientation?.addEventListener?.("change", onChange);
    return () => {
      if (t) clearTimeout(t);
      window.removeEventListener("resize", onChange);
      window.removeEventListener("orientationchange", onChange);
      screen.orientation?.removeEventListener?.("change", onChange);
    };
  }, []);

  const setRun = useCallback((v: boolean) => {
    runningRef.current = v;
    setRunning(v);
  }, []);

  /* ---- camera ---- */
  useEffect(() => {
    let cancelled = false;

    async function open() {
      setReady(false);
      setCamError(null);
      if (!navigator.mediaDevices?.getUserMedia) {
        setCamError("This browser can't open the camera. Open the link in Safari or Chrome.");
        return;
      }
      // Tall frame when the phone is upright (9:16), wide frame on its side (16:9).
      const portrait = shape === "tall";
      const video: MediaTrackConstraints = {
        facingMode: settings.facing,
        width: { ideal: portrait ? 1080 : 1920 },
        height: { ideal: portrait ? 1920 : 1080 },
        frameRate: { ideal: 30 },
      };
      let stream: MediaStream | null = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video,
          audio: { echoCancellation: true, noiseSuppression: true },
        });
      } catch (err) {
        const name = (err as DOMException)?.name;
        if (name === "NotAllowedError" || name === "SecurityError") {
          setCamError("Camera or microphone access is blocked. Allow both in your browser settings, then tap Try again.");
          return;
        }
        // Looser second try for devices that reject the ideal constraints.
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: settings.facing }, audio: true });
        } catch {
          setCamError("Couldn't start the camera. Close other apps that might be using it, then tap Try again.");
          return;
        }
      }
      if (cancelled) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      streamRef.current = stream;
      const v = videoRef.current;
      if (v) {
        v.srcObject = stream;
        await v.play().catch(() => {});
      }
      setReady(true);
    }

    open();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [settings.facing, retry, shape]);

  /* ---- keep the screen awake ---- */
  useEffect(() => {
    let lock: { release: () => Promise<void> } | null = null;
    const nav = navigator as Navigator & { wakeLock?: { request: (t: "screen") => Promise<typeof lock> } };
    const grab = () => {
      if (document.visibilityState === "visible" && nav.wakeLock) {
        nav.wakeLock.request("screen").then((l) => (lock = l)).catch(() => {});
      }
    };
    grab();
    document.addEventListener("visibilitychange", grab);
    return () => {
      document.removeEventListener("visibilitychange", grab);
      lock?.release().catch(() => {});
    };
  }, []);

  /* ---- scroll loop ---- */
  const maxOffset = () => {
    const box = boxRef.current;
    const content = contentRef.current;
    if (!box || !content) return 0;
    return Math.max(0, content.scrollHeight - box.clientHeight);
  };

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const max = maxOffset();
      if (runningRef.current && !draggingRef.current) {
        // Speed is in lines per second, so it feels the same at any text size.
        const pxPerSec = speedRef.current * 0.125 * fontRef.current * LINE_HEIGHT;
        offsetRef.current = Math.min(max, offsetRef.current + pxPerSec * dt);
        if (offsetRef.current >= max) {
          runningRef.current = false;
          setRunning(false);
          setAtEnd(true);
        }
      }
      offsetRef.current = clamp(offsetRef.current, 0, max);
      if (contentRef.current) contentRef.current.style.transform = `translate3d(0, ${-offsetRef.current}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ---- recording timer ---- */
  useEffect(() => {
    if (!recording) return;
    const id = setInterval(() => setElapsed((performance.now() - startedAt.current) / 1000), 250);
    return () => clearInterval(id);
  }, [recording]);

  /* ---- record / stop ---- */
  const beginRecording = () => {
    const stream = streamRef.current;
    if (!stream) return;
    if (typeof MediaRecorder === "undefined") {
      setCamError("This browser can't record video. Update iOS or use Chrome.");
      return;
    }
    const mime = pickMime();
    let rec: MediaRecorder;
    try {
      rec = new MediaRecorder(stream, mime ? { mimeType: mime, videoBitsPerSecond: 8_000_000 } : undefined);
    } catch {
      rec = new MediaRecorder(stream);
    }
    const chunks: Blob[] = [];
    rec.ondataavailable = (e) => {
      if (e.data && e.data.size) chunks.push(e.data);
    };
    rec.onstop = () => {
      const type = rec.mimeType || mime || "video/webm";
      const seconds = (performance.now() - startedAt.current) / 1000;
      onDone(new Blob(chunks, { type }), type, seconds);
    };
    rec.start(1000);
    recorderRef.current = rec;
    startedAt.current = performance.now();
    setElapsed(0);
    setRecording(true);
    setAtEnd(false);
    setRun(true);
  };

  const cancelCountdown = () => {
    if (countdownTimer.current) clearTimeout(countdownTimer.current);
    countdownTimer.current = null;
    setCount(null);
  };

  const startCountdown = () => {
    if (!settings.countdown) return beginRecording();
    const step = (n: number) => {
      if (n === 0) {
        setCount(null);
        countdownTimer.current = null;
        beginRecording();
        return;
      }
      setCount(n);
      countdownTimer.current = setTimeout(() => step(n - 1), 1000);
    };
    step(3);
  };

  const stopRecording = () => {
    setRun(false);
    setRecording(false);
    const rec = recorderRef.current;
    if (rec && rec.state !== "inactive") rec.stop();
  };

  const onRecordButton = () => {
    if (recording) stopRecording();
    else if (count !== null) cancelCountdown();
    else startCountdown();
  };

  useEffect(() => () => cancelCountdown(), []);

  /* ---- touch: tap to pause or play, drag to move the text ---- */
  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { y: e.clientY, off: offsetRef.current, moved: false };
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    const dy = e.clientY - d.y;
    if (!d.moved && Math.abs(dy) > 6) {
      d.moved = true;
      draggingRef.current = true;
    }
    if (d.moved) {
      offsetRef.current = clamp(d.off - dy, 0, maxOffset());
      setAtEnd(false);
    }
  };
  const onPointerUp = () => {
    const d = dragRef.current;
    dragRef.current = null;
    draggingRef.current = false;
    if (d && !d.moved) togglePlay();
  };
  const onWheel = (e: React.WheelEvent) => {
    offsetRef.current = clamp(offsetRef.current + e.deltaY, 0, maxOffset());
  };

  const togglePlay = () => {
    if (runningRef.current) return setRun(false);
    if (offsetRef.current >= maxOffset() - 1) offsetRef.current = 0;
    setAtEnd(false);
    setRun(true);
  };

  const restart = () => {
    offsetRef.current = 0;
    setAtEnd(false);
  };

  const bump = (k: "speed" | "fontSize", delta: number) => {
    const next =
      k === "speed"
        ? clamp(settings.speed + delta, SPEED_MIN, SPEED_MAX)
        : clamp(settings.fontSize + delta, FONT_MIN, FONT_MAX);
    setSettings({ ...settings, [k]: next });
  };

  const flip = () => setSettings({ ...settings, facing: settings.facing === "user" ? "environment" : "user" });

  const busy = recording || count !== null;
  const { land, lensLeft } = layout;

  const backBtn = (
    <button type="button" className="tp-icon-btn" onClick={onBack} disabled={busy} aria-label="Back to script">
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
        <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>Script</span>
    </button>
  );

  const timer = (
    <div className={`tp-timer ${recording ? "rec" : ""}`}>
      {recording && <span className="tp-rec-dot" />}
      {fmtTime(elapsed)}
    </div>
  );

  const flipBtn = (
    <button type="button" className="tp-icon-btn" onClick={flip} disabled={busy} aria-label="Flip camera">
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
        <path
          d="M4 8h3l2-3h6l2 3h3v11H4z M9 13.5a3 3 0 0 0 5.6 1.5 M15 12.5a3 3 0 0 0-5.6-1.5 M14.6 15v-2h-2 M9.4 11v2h2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  const steppers = (
    <div className="tp-adjust">
      <Stepper label="Speed" value={settings.speed} onMinus={() => bump("speed", -1)} onPlus={() => bump("speed", 1)} />
      <Stepper label="Size" value={settings.fontSize} onMinus={() => bump("fontSize", -4)} onPlus={() => bump("fontSize", 4)} />
    </div>
  );

  const restartBtn = (
    <button type="button" className="tp-round" onClick={restart} aria-label="Back to the top of the script">
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
        <path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 6h12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </button>
  );

  const recBtn = (
    <button
      type="button"
      className={`tp-rec ${recording ? "on" : ""}`}
      onClick={onRecordButton}
      disabled={!ready}
      aria-label={recording ? "Stop recording" : "Start recording"}
    >
      <span />
    </button>
  );

  const playBtn = (
    <button type="button" className="tp-round" onClick={togglePlay} aria-label={running ? "Pause scrolling" : "Start scrolling"}>
      {running ? (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
          <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
          <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
          <path d="M8 5l11 7-11 7z" fill="currentColor" />
        </svg>
      )}
    </button>
  );

  return (
    <div className={`tp-cam ${land ? `land ${lensLeft ? "lens-left" : "lens-right"}` : ""}`}>
      <video
        ref={videoRef}
        className={`tp-video ${settings.facing === "user" ? "mirror" : ""}`}
        playsInline
        muted
        autoPlay
      />

      {!land && (
        <div className="tp-topbar">
          {backBtn}
          {timer}
          {flipBtn}
        </div>
      )}

      <div
        ref={boxRef}
        className="tp-box"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        style={{ ["--tp-font" as string]: `${settings.fontSize}px` }}
      >
        <div className={`tp-mirror ${settings.mirror ? "on" : ""}`}>
          <div ref={contentRef} className="tp-text">
            {script}
          </div>
        </div>
        {!running && !busy && (
          <div className="tp-hint">{atEnd ? "End of script. Tap to start over" : "Tap to scroll · drag to move"}</div>
        )}
        {running && !recording && <div className="tp-hint tp-hint-soft">Tap to pause</div>}
      </div>

      {count !== null && (
        <div className="tp-count" key={count}>
          {count}
        </div>
      )}

      {camError && (
        <div className="tp-error">
          <p>{camError}</p>
          <button type="button" className="tp-chip" onClick={() => setRetry((r) => r + 1)}>
            Try again
          </button>
        </div>
      )}

      {land ? (
        <>
          {/* Shutter column on the far side from the lens, like the Camera app. */}
          <div className="tp-side">
            {restartBtn}
            {recBtn}
            {playBtn}
          </div>
          <div className="tp-lowbar">
            {backBtn}
            {flipBtn}
            {timer}
            {steppers}
          </div>
        </>
      ) : (
        <div className="tp-bottom">
          {steppers}
          <div className="tp-controls">
            {restartBtn}
            {recBtn}
            {playBtn}
          </div>
        </div>
      )}
    </div>
  );
}

function Stepper({
  label,
  value,
  onMinus,
  onPlus,
}: {
  label: string;
  value: number;
  onMinus: () => void;
  onPlus: () => void;
}) {
  return (
    <div className="tp-stepper">
      <button type="button" onClick={onMinus} aria-label={`Less ${label.toLowerCase()}`}>
        −
      </button>
      <span>
        {label} <b>{value}</b>
      </span>
      <button type="button" onClick={onPlus} aria-label={`More ${label.toLowerCase()}`}>
        +
      </button>
    </div>
  );
}

/* ----------------------------------------------------------------------------
   3. Review and save
---------------------------------------------------------------------------- */

function Review({ take, onRetake, onEdit }: { take: Take; onRetake: () => void; onEdit: () => void }) {
  const [msg, setMsg] = useState("");
  const [saved, setSaved] = useState(false);
  const leave = (go: () => void) => {
    if (saved || window.confirm("Throw away this take? It hasn't been saved.")) go();
  };
  const ext = take.mime.includes("mp4") ? "mp4" : "webm";
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}-${String(
    d.getHours(),
  ).padStart(2, "0")}${String(d.getMinutes()).padStart(2, "0")}`;
  const filename = `take-${stamp}.${ext}`;
  const sizeMb = (take.blob.size / (1024 * 1024)).toFixed(1);

  const download = () => {
    const a = document.createElement("a");
    a.href = take.url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // On phones the share sheet is the way to get a video into Photos.
  const save = async () => {
    const file = new File([take.blob], filename, { type: take.mime.split(";")[0] });
    const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
    if (nav.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file] });
        setSaved(true);
        return;
      } catch (e) {
        if ((e as DOMException)?.name === "AbortError") return;
      }
    }
    download();
    setSaved(true);
    setMsg("Downloaded");
    setTimeout(() => setMsg(""), 2500);
  };

  return (
    <div className="tp-review">
      <video className="tp-review-video" src={take.url} controls playsInline autoPlay />
      <div className="tp-review-bar">
        <div className="tp-review-meta">
          {fmtTime(take.seconds)} · {sizeMb} MB{msg && ` · ${msg}`}
        </div>
        <div className="tp-review-actions">
          <button type="button" className="tp-chip tp-chip-ghost" onClick={() => leave(onEdit)}>
            Edit script
          </button>
          <button type="button" className="tp-chip tp-chip-ghost" onClick={() => leave(onRetake)}>
            Retake
          </button>
          <button type="button" className="tp-chip tp-chip-primary" onClick={save}>
            Save video
          </button>
        </div>
      </div>
    </div>
  );
}
