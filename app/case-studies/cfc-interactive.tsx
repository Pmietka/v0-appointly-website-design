"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, Play, X } from "lucide-react";
import type { MuxPlayerRefAttributes as MuxPlayerElement } from "@mux/mux-player-react";

import { muxPoster, type MuxClip } from "@/lib/cfc-case-study";

/* Mux Player only loads once someone clicks play, so a page with seven videos
   costs one poster image per video until then. */
const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), { ssr: false });

/* Only one video plays at a time: starting one pauses the rest. */
const PLAY_EVENT = "csp:video-play";

/* Anything on the page can jump the hero player to a moment in the full
   interview (transcript timestamps, "hear it in the full interview" links). */
const SEEK_EVENT = "csp:seek";

/* ── Click to play Mux video with a custom poster ──────────────────────────── */
export function MuxVideo({
  clip,
  label,
  tag,
  poster: posterSrc,
  captions,
  chapters = [],
  variant = "chapter",
  priority = false,
}: {
  clip: MuxClip;
  /** Button label on the poster, e.g. "Watch Phil, 15 min". */
  label: string;
  /** Small chapter tag in the poster's top corner. */
  tag?: string;
  /** Custom poster URL. Defaults to a Mux thumbnail at clip.posterTime. */
  poster?: string;
  /** WebVTT captions, shown by default. */
  captions?: string;
  /** Chapter markers in seconds, added to the player's chapter menu. */
  chapters?: { title: string; start: number }[];
  /** The hero also answers seek requests from the rest of the page. */
  variant?: "hero" | "chapter";
  priority?: boolean;
}) {
  const [active, setActive] = useState(false);
  const [startTime, setStartTime] = useState<number | undefined>(undefined);
  const player = useRef<MuxPlayerElement | null>(null);
  const id = clip.playbackId;
  const poster = posterSrc ?? muxPoster(id, clip.posterTime, variant === "hero" ? 1600 : 1120);

  useEffect(() => {
    const onOtherPlay = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== id) player.current?.pause();
    };
    window.addEventListener(PLAY_EVENT, onOtherPlay);
    return () => window.removeEventListener(PLAY_EVENT, onOtherPlay);
  }, [id]);

  useEffect(() => {
    if (variant !== "hero") return;
    const onSeek = (e: Event) => {
      const t = (e as CustomEvent<number>).detail;
      const el = player.current;
      if (el) {
        el.currentTime = t;
        void el.play();
      } else {
        setStartTime(t);
        setActive(true);
      }
    };
    window.addEventListener(SEEK_EVENT, onSeek);
    return () => window.removeEventListener(SEEK_EVENT, onSeek);
  }, [variant]);

  const addChapters = useCallback(() => {
    const el = player.current;
    if (!el || !chapters.length) return;
    const sorted = [...chapters].sort((a, b) => a.start - b.start);
    el.addChapters(
      sorted.map((c, i) => ({
        startTime: c.start,
        endTime: sorted[i + 1]?.start ?? el.duration,
        value: c.title,
      })),
    );
  }, [chapters]);

  return (
    <div className={`vid ${variant}${active ? " on" : ""}`}>
      {active ? (
        <MuxPlayer
          ref={player}
          playbackId={id}
          streamType="on-demand"
          poster={poster}
          startTime={startTime}
          autoPlay
          crossOrigin="anonymous"
          accentColor="#34d399"
          primaryColor="#ffffff"
          videoTitle={clip.title}
          metadataVideoTitle={clip.title}
          metadataVideoId={id}
          onLoadedMetadata={addChapters}
          onPlay={() => window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: id }))}
        >
          {captions && <track kind="captions" src={captions} srcLang="en" label="English" default />}
        </MuxPlayer>
      ) : (
        <button type="button" className="vposter" onClick={() => setActive(true)} aria-label={`Play video: ${clip.title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt=""
            width={1600}
            height={900}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
          />
          <span className="vshade" aria-hidden />
          {tag && <span className="vtag">{tag}</span>}
          <span className="vcta">
            <span className="vplay" aria-hidden><Play /></span>
            <span className="vlabel">{label}</span>
          </span>
        </button>
      )}
    </div>
  );
}

/* ── Jump the hero player to a moment in the full interview ─────────────────── */
export function SeekButton({ t, className, children }: { t: number; className?: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        document.getElementById("watch")?.scrollIntoView({ behavior: "smooth", block: "center" });
        window.dispatchEvent(new CustomEvent(SEEK_EVENT, { detail: t }));
      }}
    >
      {children}
    </button>
  );
}

/* ── Stat bar: values count up the first time they scroll into view ─────────── */
type CountStat = { prefix: string; to: number; suffix: string; label: string };

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

export function StatBar({ stats }: { stats: CountStat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  // Server HTML carries the final numbers, so crawlers and no-JS visitors see
  // them. The client rewinds to zero and counts up when the bar is on screen.
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setProgress(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1600;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          setProgress(1 - Math.pow(1 - t, 3));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="statbar" ref={ref}>
      {stats.map((s) => (
        <div className="stat" key={s.label}>
          <div className="sv">
            <span className="srx">{`${s.prefix}${fmt(s.to)}${s.suffix}`}</span>
            <span aria-hidden>
              {s.prefix}
              {fmt(s.to * progress)}
              {s.suffix}
            </span>
          </div>
          <div className="sl">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Sticky chapter nav: left rail on desktop, scrolling pills on mobile ────── */
export function ChapterNav({ items }: { items: { id: string; nav: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    // A chapter is active while it crosses a line just under the sticky bars.
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  // Keep the active pill visible in the horizontal strip on phones without
  // scrolling the page itself.
  useEffect(() => {
    const ol = list.current;
    const pill = ol?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!ol || !pill || ol.scrollWidth <= ol.clientWidth) return;
    ol.scrollTo({ left: pill.offsetLeft - ol.clientWidth / 2 + pill.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav className="chnav" aria-label="Chapters">
      <p className="chnav-t">Chapters</p>
      <ol ref={list}>
        {items.map((it, i) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              data-id={it.id}
              aria-current={active === it.id ? "true" : undefined}
              className={active === it.id ? "on" : undefined}
              onClick={() => setActive(it.id)}
            >
              <span className="chn" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
              {it.nav}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ── Screenshot grid with a lightbox ────────────────────────────────────────── */
type Shot = { src: string; width: number; height: number; label: string; alt: string };

export function Gallery({ shots, variant = "grid" }: { shots: Shot[]; variant?: "grid" | "strip" }) {
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + shots.length) % shots.length)),
    [shots.length],
  );

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };

  const cur = open === null ? null : shots[open];

  return (
    <>
      <div className={`gallery ${variant}`}>
        {shots.map((s, i) => (
          <figure className="gshot" key={s.src}>
            <button type="button" onClick={() => setOpen(i)} aria-label={`Open ${s.label} full size`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt={s.alt} width={s.width} height={s.height} loading="lazy" decoding="async" />
              <span className="gzoom" aria-hidden><Expand /></span>
            </button>
            <figcaption>{s.label}</figcaption>
          </figure>
        ))}
      </div>

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={cur ? cur.label : "Screenshot"}
        onClose={() => setOpen(null)}
        onKeyDown={onKey}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(null);
        }}
      >
        {cur && (
          <div className="lbin">
            <div className="lbbar">
              <span className="lbcount">
                {cur.label}
                {shots.length > 1 && <span> · {(open ?? 0) + 1} of {shots.length}</span>}
              </span>
              <button type="button" className="lbbtn" onClick={() => setOpen(null)} aria-label="Close">
                <X />
              </button>
            </div>
            <div className="lbimg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cur.src} alt={cur.alt} width={cur.width} height={cur.height} />
            </div>
            {shots.length > 1 && (
              <div className="lbnav">
                <button type="button" className="lbbtn" onClick={() => step(-1)} aria-label="Previous screenshot">
                  <ChevronLeft />
                </button>
                <button type="button" className="lbbtn" onClick={() => step(1)} aria-label="Next screenshot">
                  <ChevronRight />
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}

/* ── Local video (AFAB card) with a poster facade ───────────────────────────── */
export function LocalVideo({ src, poster, title }: { src: string; poster: string; title: string }) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onOtherPlay = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== src) ref.current?.pause();
    };
    window.addEventListener(PLAY_EVENT, onOtherPlay);
    return () => window.removeEventListener(PLAY_EVENT, onOtherPlay);
  }, [src]);

  return (
    <div className={`vid card${active ? " on" : ""}`}>
      {active ? (
        <video
          ref={ref}
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          onPlay={() => window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: src }))}
        />
      ) : (
        <button type="button" className="vposter" onClick={() => setActive(true)} aria-label={`Play video: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster} alt="" loading="lazy" decoding="async" />
          <span className="vshade" aria-hidden />
          <span className="vcta">
            <span className="vplay" aria-hidden><Play /></span>
            <span className="vlabel">{title}</span>
          </span>
        </button>
      )}
    </div>
  );
}
