"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

import { MuxVideo } from "@/app/case-studies/cfc-interactive";
import type { WallTile } from "@/lib/proof-wall";

/* ============================================================================
   The wall of proof: interview clips, client messages, numbers and real
   calendars in one masonry wall. Tiles come from lib/proof-wall.ts. Styles in
   app/sales.css (.pw*).
   ============================================================================ */

const FILTERS = [
  { key: "all", label: "Everything" },
  { key: "video", label: "Videos" },
  { key: "message", label: "In their words" },
  { key: "results", label: "Numbers & calendars" },
] as const;
type FilterKey = (typeof FILTERS)[number]["key"];

const GROUP: Record<WallTile["kind"], Exclude<FilterKey, "all">> = {
  clip: "video",
  video: "video",
  message: "message",
  shot: "message",
  stat: "results",
  calendar: "results",
};

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

function Tile({ t, mx }: { t: WallTile; mx: boolean }) {
  const cls = (c: string) => `pwtile ${c}${mx ? " mx" : ""}`;
  switch (t.kind) {
    case "clip":
      return (
        <figure className={cls("pwclip")}>
          <MuxVideo variant="card" clip={t.clip} label={`Watch, ${t.clip.length}`} tag={t.company} />
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

export function ProofWall({
  tiles,
  initial = 16,
  initialMobile = 8,
}: {
  tiles: WallTile[];
  /** Tiles shown before "Show the whole wall". */
  initial?: number;
  /** The same, on phones, where the wall is a single column. */
  initialMobile?: number;
}) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [expanded, setExpanded] = useState(false);

  const shown = filter === "all" ? tiles : tiles.filter((t) => GROUP[t.kind] === filter);
  const collapsed = filter === "all" && !expanded && shown.length > initial;
  const visible = collapsed ? shown.slice(0, initial) : shown;
  const count = (k: FilterKey) => (k === "all" ? tiles.length : tiles.filter((t) => GROUP[t.kind] === k).length);

  return (
    <div className="pw">
      <div className="pwfilters" role="group" aria-label="Filter the wall">
        {FILTERS.map((f) => (
          <button
            type="button"
            key={f.key}
            className={`pwchip${filter === f.key ? " on" : ""}`}
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
          >
            {f.label} <span>{count(f.key)}</span>
          </button>
        ))}
      </div>

      <div className={`pwgrid${collapsed ? " clipped" : ""}`}>
        {visible.map((t, i) => (
          <Tile t={t} key={t.id} mx={collapsed && i >= initialMobile} />
        ))}
      </div>

      {collapsed && (
        <div className="pwmore">
          <button type="button" className="pwmore-btn" onClick={() => setExpanded(true)}>
            Show the whole wall ({shown.length})
          </button>
        </div>
      )}
    </div>
  );
}
