import { AFAB_STORY } from "@/lib/afab-case-study";
import { CFC_STORY } from "@/lib/cfc-case-study";
import { GF_STORY } from "@/lib/gf-case-study";
import type { VideoCaseStudy } from "@/lib/video-case-study";

/** Every case study with a video story, in the order /case-studies shows them. */
export const VIDEO_STORIES: VideoCaseStudy[] = [CFC_STORY, AFAB_STORY, GF_STORY];

export function getVideoStory(slug: string) {
  return VIDEO_STORIES.find((s) => s.slug === slug);
}
