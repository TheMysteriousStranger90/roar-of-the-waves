import { Lang } from './translations';

/** English lives at the site root, Russian under `/ru`. */
export const RU_PREFIX = '/ru';

/** `true` for `/ru`, `/ru/`, `/ru/music`, `/ru?x=1` — but not for `/rules`. */
const RU_PATH = /^\/ru(?=\/|\?|#|$)/;

export function langFromPath(pathOrUrl: string): Lang {
  return RU_PATH.test(pathOrUrl) ? 'ru' : 'en';
}

/** Strips the language prefix: `/ru/music?x=1` → `/music?x=1`, `/ru` → `/`. */
export function stripLangPrefix(url: string): string {
  const rest = url.replace(RU_PATH, '');
  return rest.startsWith('/') ? rest : `/${rest}`;
}

/**
 * Builds the URL of an app path in the given language.
 * `localizePath('/', 'ru')` → `/ru`, `localizePath('/music', 'ru')` → `/ru/music`,
 * `localizePath('/music', 'en')` → `/music`.
 */
export function localizePath(path: string, lang: Lang): string {
  const clean = stripLangPrefix(path);
  if (lang === 'en') return clean;
  return RU_PREFIX + clean.replace(/^\/(?=$|\?|#)/, '');
}
