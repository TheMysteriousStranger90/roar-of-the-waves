export interface MusicRelease {
  readonly id: number;
  readonly title: string;
  readonly genre: string;
  readonly url: string;
}

export interface MusicGenreGroup {
  readonly genre: string;
  readonly releases: readonly MusicRelease[];
}

export interface MusicReleasesResponse {
  readonly releases: readonly MusicRelease[];
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export function isMusicRelease(value: unknown): value is MusicRelease {
  if (!isRecord(value)) return false;
  return (
    typeof value['id'] === 'number' &&
    typeof value['title'] === 'string' &&
    typeof value['genre'] === 'string' &&
    typeof value['url'] === 'string'
  );
}

export function parseMusicReleasesResponse(value: unknown): readonly MusicRelease[] {
  if (!isRecord(value) || !Array.isArray(value['releases'])) {
    throw new TypeError('Malformed music payload: expected { releases: MusicRelease[] }');
  }
  return value['releases'].filter(isMusicRelease);
}

/** Groups releases by genre, preserving first-seen genre order from the source data. */
export function groupByGenre(releases: readonly MusicRelease[]): readonly MusicGenreGroup[] {
  const order: string[] = [];
  const groups = new Map<string, MusicRelease[]>();

  for (const release of releases) {
    const bucket = groups.get(release.genre);
    if (bucket) {
      bucket.push(release);
    } else {
      groups.set(release.genre, [release]);
      order.push(release.genre);
    }
  }

  return order.map((genre) => ({ genre, releases: groups.get(genre) ?? [] }));
}
