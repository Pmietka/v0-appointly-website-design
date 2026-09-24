"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, Play, X } from "lucide-react";

import { muxPoster, type MuxClip } from "@/lib/cfc-case-study";

/* Mux Player only loads once someone clicks play, so a page with eight videos
   costs one poster image per video until then. */
const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), { ssr: false });

/* One video at a time. Starting any video, or clicking a poster to start one,
   pauses every other video on the page right away. */
function pauseOthers(keep: HTMLElement | null) {
  document.querySelectorAll<HTMLElement & { paused?: boolean; pause?: () => void }>("mux-player, video").forEach((m) => {
    if (keep?.contains(m)) return;
    if (m.paused === false) m.pause?.();
  });
}

/* Modifier classes are prefixed (v-hero, v-chapter, v-card) so they can never
   collide with page level classes like .chapter or .hero. */

/* ── Click to play Mux video with a custom poster ──────────────────────────── */
export function MuxVideo({
  clip,
  label,
  tag,
  variant = "chapter",
  priority = false,
}: {
  clip: MuxClip;
  /** Button label on the poster, e.g. "Watch Phil, 59 sec". */
  label: string;
  /** Small chapter tag in the poster's top corner. */
  tag?: string;
  variant?: "hero" | "chapter";
  priority?: boolean;
}) {
  const [active, setActive] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const poster = muxPoster(clip.playbackId, clip.posterTime, variant === "hero" ? 1600 : 1120);

  return (
    <div className={`vid v-${variant}${active ? " on" : ""}`} ref={box}>
      {active ? (
        <MuxPlayer
          playbackId={clip.playbackId}
          streamType="on-demand"
          poster={poster}
          autoPlay
          accentColor="#34d399"
          primaryColor="#ffffff"
          videoTitle={clip.title}
          metadataVideoTitle={clip.title}
          metadataVideoId={clip.playbackId}
          onPlay={() => pauseOthers(box.current)}
        />
      ) : (
        <button
          type="button"
          className="vposter"
          onClick={() => {
            pauseOthers(box.current);
            setActive(true);
          }}
          aria-label={`Play video: ${clip.title}`}
        >
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
        <div className="cstat" key={s.label}>
          <div className="csv">
            <span className="srx">{`${s.prefix}${fmt(s.to)}${s.suffix}`}</span>
            <span aria-hidden>
              {s.prefix}
              {fmt(s.to * progress)}
              {s.suffix}
            </span>
          </div>
          <div className="csl">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Sticky chapter nav: left rail on desktop, scrolling pills on mobile ────── */
export function ChapterNav({ items }: { items: { id: string; nav: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const list = useRef<HTMLOListElement>(null);

  // The active chapter is the last one whose top has crossed a line a third of
  // the way down the screen. Above the first chapter, the first one is active.
  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let cur = sections[0]?.id;
      for (const sec of sections) if (sec.getBoundingClientRect().top <= line) cur = sec.id;
      setActive(cur);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
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
  const box = useRef<HTMLDivElement>(null);

  return (
    <div className={`vid v-card${active ? " on" : ""}`} ref={box}>
      {active ? (
        <video src={src} poster={poster} controls autoPlay playsInline onPlay={() => pauseOthers(box.current)} />
      ) : (
        <button
          type="button"
          className="vposter"
          onClick={() => {
            pauseOthers(box.current);
            setActive(true);
          }}
          aria-label={`Play video: ${title}`}
        >
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
