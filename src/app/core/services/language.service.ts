import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';

import { DEFAULT_LANG, Dictionary, Lang, translations } from '@core/i18n/translations';

const STORAGE_KEY = 'rotw-lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);

  readonly lang = signal<Lang>(this.readInitialLang());
  readonly dict = computed<Dictionary>(() => translations[this.lang()]);

  constructor() {
    effect(() => {
      const value = this.lang();
      this.document.documentElement.lang = value;
      try {
        this.document.defaultView?.localStorage.setItem(STORAGE_KEY, value);
      } catch {
        /* storage unavailable — non-critical */
      }
    });
  }

  setLang(value: Lang): void {
    this.lang.set(value);
  }

  toggle(): void {
    this.lang.update((current) => (current === 'en' ? 'ru' : 'en'));
  }

  private readInitialLang(): Lang {
    const view = this.document.defaultView;
    try {
      const stored = view?.localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'ru') return stored;
    } catch {
      /* ignore */
    }
    // English is always the default on first visit, regardless of browser locale.
    return DEFAULT_LANG;
  }
}
