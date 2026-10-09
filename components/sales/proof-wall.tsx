"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

import { MuxVideo } from "@/app/case-studies/cfc-interactive";
import type { Wall, WallTile } from "@/lib/proof-wall";

/* ============================================================================
   The wall of proof, organized: the numbers, then every interview clip
   grouped by client, then what clients have told us, then their calendars.
   Everything shows by default; the chips narrow it to one kind. Data comes
   from lib/proof-wall.ts. Styles in app/sales.css (.pw*).
   ============================================================================ */

const FILTERS = [
  { key: "all", label: "Everything" },
  { key: "video", label: "Videos" },
  { key: "message", label: "In their words" },
  { key: "results", label: "Numbers & calendars" },
] as const;
type FilterKey = (typeof FILTERS)[number]["key"];

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* Same facade as MuxVideo, for a self hosted mp4: poster until clicked, then
   the real player. Pauses any other video on the page when it starts. */
function LocalVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const [active, setActive] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const pauseOthers = () =>
    document.querySelectorAll<HTMLElement & { paused?: boolean; pause?: () => void }>("mux-player, video").forEach((m) => {
      if (box.current?.contains(m)) return;
      if (m.paused === false) m.pause?.();
    });
  return (
    <div className={`vid v-card${active ? " on" : ""}`} ref={box}>
      {active ? (
        <video src={src} poster={poster} controls autoPlay playsInline onPlay={pauseOthers} />
      ) : (
        <button type="button" className="vposter" onClick={() => setActive(true)} aria-label={`Play video: ${label}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster} alt="" loading="lazy" decoding="async" />
          <span className="vshade" aria-hidden />
          <span className="vcta">
            <span className="vplay" aria-hidden><Play /></span>
            <span className="vlabel">{label}</span>
          </span>
        </button>
      )}
    </div>
  );
}

function Tile({ t }: { t: WallTile }) {
  const cls = (c: string) => `pwtile ${c}`;
  switch (t.kind) {
    case "clip":
      return (
        <figure className={cls("pwclip")}>
          <MuxVideo variant="card" clip={t.clip} label={`Watch, ${t.clip.length}`} tag={t.tag} />
          <figcaption>
            <p className="pwq">&ldquo;{t.quote}&rdquo;</p>
            <span className="pwname">{t.name}</span>
          </figcaption>
        </figure>
      );
    case "video":
      return (
        <figure className={cls("pwclip")}>
          <LocalVideo src={t.src} poster={t.poster} label={`Watch ${t.name}`} />
          <figcaption>
            <p className="pwq">{t.caption}</p>
            <span className="pwname">{t.name}</span>
          </figcaption>
        </figure>
      );
    case "message":
      return (
        <figure className={cls("pwmsg")}>
          <figcaption className="pwmsg-hd">
            {t.photo ? (
              <Image className="pwav" src={t.photo} alt="" width={40} height={40} sizes="40px" loading="lazy" />
            ) : (
              <span className="pwav" aria-hidden>{initials(t.name)}</span>
            )}
            <span className="pwmsg-who">
              <b>{t.name}</b>
              {t.who && <span>{t.who}</span>}
            </span>
          </figcaption>
          <blockquote className="pwbubble">{t.quote}</blockquote>
          {t.stat && <span className="pwpill">{t.stat}</span>}
        </figure>
      );
    case "shot":
      return (
        <figure className={cls("pwshot")}>
          <Image src={t.src} alt={t.alt} width={t.width} height={t.height} sizes="(max-width: 640px) 92vw, 340px" loading="lazy" />
          <figcaption className="pwname">{t.name}</figcaption>
        </figure>
      );
    case "stat":
      return (
        <figure className={cls("pwstat")}>
          <b className="pwstat-v">{t.value}</b>
          <span className="pwstat-l">{t.label}</span>
          <figcaption className="pwstat-n">{t.name}</figcaption>
        </figure>
      );
    case "calendar":
      return (
        <figure className={cls("pwcal")}>
          <a href={t.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full size: ${t.label}`}>
            <Image
              src={t.src}
              alt={`${t.label}. Every blue event is an estimate booked by Appointly. Homeowner names shortened to first name and last initial.`}
              width={t.width}
              height={t.height}
              sizes="(max-width: 640px) 92vw, 340px"
              loading="lazy"
            />
          </a>
          <figcaption>
            <span className="pwcal-l"><span className="pwpip" aria-hidden /> {t.label}</span>
            <span className="pwname">{t.name}</span>
          </figcaption>
        </figure>
      );
  }
}

function Block({ title, count, unit, children }: { title: string; count: number; unit: string; children: React.ReactNode }) {
  return (
    <div className="pwblock">
      <div className="pwblock-hd">
        <h3>{title}</h3>
        <span>{count} {unit}</span>
      </div>
      {children}
    </div>
  );
}

export function ProofWall({ wall }: { wall: Wall }) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const show = (k: FilterKey) => filter === "all" || filter === k;

  const clipCount = wall.videos.reduce((n, g) => n + g.tiles.length, 0);
  const counts: Record<FilterKey, number> = {
    video: clipCount,
    message: wall.messages.length,
    results: wall.stats.length + wall.calendars.length,
    all: 0,
  };
  counts.all = counts.video + counts.message + counts.results;

  return (
    <div className="pw">
      <div className="pwfilters" role="group" aria-label="Filter the proof">
        {FILTERS.map((f) => (
          <button
            type="button"
            key={f.key}
            className={`pwchip${filter === f.key ? " on" : ""}`}
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
          >
            {f.label} <span>{counts[f.key]}</span>
          </button>
        ))}
      </div>

      {show("results") && (
        <Block title="By the numbers" count={wall.stats.length} unit="results">
          <div className="pwstats">
            {wall.stats.map((t) => <Tile t={t} key={t.id} />)}
          </div>
        </Block>
      )}

      {show("video") && (
        <Block title="On camera" count={clipCount} unit="clips">
          {wall.videos.map((g) => (
            <div className="pwgroup" key={g.id}>
              <div className="pwgroup-hd">
                <b>{g.title}</b>
                <span>{g.sub}</span>
                <em>{g.tiles.length} {g.tiles.length === 1 ? "clip" : "clips"}</em>
              </div>
              <div className="pwrow">
                {g.tiles.map((t) => <Tile t={t} key={t.id} />)}
              </div>
            </div>
          ))}
        </Block>
      )}

      {show("message") && (
        <Block title="In their words" count={wall.messages.length} unit="clients">
          <div className="pwmsgs">
            {wall.messages.map((t) => <Tile t={t} key={t.id} />)}
          </div>
        </Block>
      )}

      {show("results") && (
        <Block title="On their calendars" count={wall.calendars.length} unit="calendars">
          <div className="pwcals">
            {wall.calendars.map((t) => <Tile t={t} key={t.id} />)}
          </div>
        </Block>
      )}
    </div>
  );
}
