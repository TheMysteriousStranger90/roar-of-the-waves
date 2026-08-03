export interface Track {
  readonly id: number;
  /** Bilingual title in the form "English | Русский". */
  readonly title: string;
  readonly url: string;
}

export interface TrackView extends Track {
  readonly titleEn: string;
  readonly titleRu: string;
  /** Zero-padded ordinal used as a typographic accent, e.g. "01". */
  readonly ordinal: string;
}

export interface TracksResponse {
  readonly tracks: readonly Track[];
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export function isTrack(value: unknown): value is Track {
  if (!isRecord(value)) return false;
  return (
    typeof value['id'] === 'number' &&
    typeof value['title'] === 'string' &&
    typeof value['url'] === 'string'
  );
}

export function parseTracksResponse(value: unknown): readonly Track[] {
  if (!isRecord(value) || !Array.isArray(value['tracks'])) {
    throw new TypeError('Malformed tracks payload: expected { tracks: Track[] }');
  }
  return value['tracks'].filter(isTrack);
}

export function toTrackView(track: Track, index: number): TrackView {
  const [en = track.title, ru = ''] = track.title.split('|').map((part) => part.trim());
  return {
    ...track,
    titleEn: en,
    titleRu: ru,
    ordinal: String(index + 1).padStart(2, '0'),
  };
}
