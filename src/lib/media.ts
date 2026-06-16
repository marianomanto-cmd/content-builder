import { type Ratio } from "./brands";
import { seeded } from "./utils";

/**
 * Free stock media — no API keys, no cost.
 *  - Photos: Lorem Picsum (deterministic by seed).
 *  - Videos: Google's public sample bucket (CC / public domain).
 */

const PHOTO_DIMS: Record<Ratio, [number, number]> = {
  "4:5": [512, 640],
  "1:1": [600, 600],
  "9:16": [405, 720],
  "16:9": [720, 405],
};

export function stockPhoto(seed: string, ratio: Ratio = "1:1"): string {
  const [w, h] = PHOTO_DIMS[ratio];
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
}

const STOCK_VIDEOS = [
  "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
];

export function stockVideo(seed: string): string {
  return STOCK_VIDEOS[Math.floor(seeded(seed + "vid") * STOCK_VIDEOS.length)];
}
