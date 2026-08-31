export interface Film {
  readonly id: number;
  readonly title: string;
  readonly year: number;
  readonly url: string;
}

export interface FilmGroup {
  readonly decade: number;
  readonly films: readonly Film[];
}

export interface FilmsResponse {
  readonly films: readonly Film[];
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export function isFilm(value: unknown): value is Film {
  if (!isRecord(value)) return false;
  return (
    typeof value['id'] === 'number' &&
    typeof value['title'] === 'string' &&
    typeof value['year'] === 'number' &&
    typeof value['url'] === 'string'
  );
}

export function parseFilmsResponse(value: unknown): readonly Film[] {
  if (!isRecord(value) || !Array.isArray(value['films'])) {
    throw new TypeError('Malformed films payload: expected { films: Film[] }');
  }
  return value['films'].filter(isFilm);
}

export function groupByDecade(films: readonly Film[]): readonly FilmGroup[] {
  const groups = new Map<number, Film[]>();

  for (const film of films) {
    const decade = Math.floor(film.year / 10) * 10;
    const bucket = groups.get(decade);
    if (bucket) {
      bucket.push(film);
    } else {
      groups.set(decade, [film]);
    }
  }

  return [...groups.entries()]
    .sort(([a], [b]) => a - b)
    .map(([decade, decadeFilms]) => ({ decade, films: decadeFilms }));
}
