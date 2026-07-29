"use client";

import { useCallback, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

import { Watermark } from "./watermark";

type AdVideoProps = {
  src: string;
  /** Intrinsic dimensions, used only to reserve the right box before load. */
  width: number;
  height: number;
};

/**
 * Click-to-play player for the vertical ad creatives. These files are large,
 * so nothing is fetched beyond metadata until the visitor actually plays one.
 * Starts muted (browsers block autoplay-with-sound anyway) with an explicit
 * unmute toggle.
 */
export function AdVideo({ src, width, height }: AdVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }, []);

  const toggleSound = useCallback((event: React.MouseEvent) => {
    // Keep the click off the play/pause button stacked underneath.
    event.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setMuted(video.muted);
  }, []);

  return (
    <div className="sc-media">
      <video
        ref={videoRef}
        /*
         * The #t fragment nudges the browser to seek and paint an actual frame
         * on metadata load, instead of leaving a black box until first play.
         */
        src={`${src}#t=0.1`}
        width={width}
        height={height}
        loop
        muted
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        style={{ aspectRatio: `${width} / ${height}` }}
      />

      <Watermark />

      <button
        type="button"
        className="sc-video-btn"
        data-playing={playing}
        onClick={togglePlay}
        aria-label={playing ? "Pause video" : "Play video"}
      >
        <span className="sc-video-glyph" aria-hidden="true">
          {playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
        </span>
      </button>

      <button
        type="button"
        className="sc-sound-btn"
        onClick={toggleSound}
        aria-label={muted ? "Unmute video" : "Mute video"}
      >
        {muted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
        {muted ? "SOUND OFF" : "SOUND ON"}
      </button>
    </div>
  );
}
