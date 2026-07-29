import { BrandMark } from "@/components/brand-mark";

/**
 * Appointly Solutions watermark laid over every creative on /showcase: a
 * tiled diagonal wordmark (drawn in showcase.css) plus a corner lockup so the
 * mark survives a cropped screenshot. Purely decorative and click-through.
 */
export function Watermark() {
  return (
    <>
      <div className="sc-watermark" aria-hidden="true" />
      <div className="sc-watermark-badge" aria-hidden="true">
        <BrandMark />
        APPOINTLY SOLUTIONS
      </div>
    </>
  );
}
