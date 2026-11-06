import { DOCUMENT, PlatformLocation } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Dictionary, Lang, translations } from '@core/i18n/translations';
import { langFromPath, localizePath } from '@core/i18n/localized-path';

const STORAGE_KEY = 'rotw-lang';

/**
 * The language lives in the URL: English at `/…`, Russian at `/ru/…`.
 * That is what makes both versions indexable and linkable. The route guards in `app.routes.ts`
 * call `setLang`; the initial value comes from the request path, so the prerendered HTML and the
 * first client render agree.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly location = inject(PlatformLocation);

  readonly lang = signal<Lang>(langFromPath(this.location.pathname));
  readonly dict = computed<Dictionary>(() => translations[this.lang()]);

  constructor() {
    effect(() => {
      this.document.documentElement.lang = this.lang();
    });
  }

  /** Called by the route guards; does not navigate. */
  setLang(value: Lang): void {
    this.lang.set(value);
  }

  /** URL of an app path (`'/music'`) in the current language. */
  link(path: string): string {
    return localizePath(path, this.lang());
  }

  /** Header switch: opens the same page in the other language and remembers the choice. */
  toggle(): void {
    const next: Lang = this.lang() === 'en' ? 'ru' : 'en';
    this.remember(next);
    void this.router.navigateByUrl(localizePath(this.router.url, next));
  }

  /**
   * A visitor who explicitly picked Russian earlier and lands on the bare root `/` is sent to `/ru`.
   * Other URLs are never redirected, so shared links keep working and crawlers (no storage) see
   * every page as written.
   */
  restoreSavedLanguage(): void {
    if (this.location.pathname !== '/') return;
    try {
      if (this.document.defaultView?.localStorage.getItem(STORAGE_KEY) === 'ru') {
        void this.router.navigateByUrl(localizePath('/', 'ru'), { replaceUrl: true });
      }
    } catch {
      /* storage unavailable — non-critical */
    }
  }

  private remember(value: Lang): void {
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* storage unavailable — non-critical */
    }
  }
}
