/**
 * The five tracks that were run through the AI-music detectors on 2–3 November 2026.
 *
 * This is a snapshot, deliberately separate from `tracks.json`: tracks released later
 * have not been checked and must not appear in the evidence until they are.
 * `slug` matches the screenshot file names in `src/assets/images/ai-checks/`.
 */
export interface CheckedTrack {
  readonly slug: string;
  readonly titleEn: string;
  readonly titleRu: string;
}

export const CHECKED_TRACKS: readonly CheckedTrack[] = [
  { slug: 'the-fatalists-path', titleEn: 'The Fatalist’s Path', titleRu: 'Путь фаталиста' },
  { slug: 'dancing-on-the-embankment', titleEn: 'Dancing on the Embankment', titleRu: 'Танцы на набережной' },
  { slug: 'eternity', titleEn: 'Eternity', titleRu: 'Вечность' },
  { slug: 'the-lighthouse-by-the-sea', titleEn: 'The Lighthouse by the Sea', titleRu: 'Маяк у моря' },
  { slug: 'senza-parole', titleEn: 'Senza parole', titleRu: 'Без слов' },
];

/**
 * Screenshot files. Every `<name>.webp` is the full, uncropped screenshot (shown in the
 * lightbox); `<name>-thumb.webp` is a small copy for the grid.
 */
export const AI_CHECK_IMAGE_DIR = '/assets/images/ai-checks';

export interface ThumbSize {
  readonly width: number;
  readonly height: number;
}

/** Thumbnails of 1920×1080 screenshots. */
export const THUMB_LANDSCAPE: ThumbSize = { width: 640, height: 360 };
/** Thumbnail of Deezer's portrait share card (1032×1344). */
export const THUMB_PORTRAIT: ThumbSize = { width: 480, height: 625 };

export const AI_CHECK_URLS = {
  deezer: 'https://ai-music-detector.deezer.com/',
  wavespeed: 'https://wavespeed.ai/free-tools/ai-music-detector',
  aha: 'https://aha-music.com/aimusicdetector',
  exiftools: 'https://exiftools.com/tools/ai-music-checker',
} as const;
