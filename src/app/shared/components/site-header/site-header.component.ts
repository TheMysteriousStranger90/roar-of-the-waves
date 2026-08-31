import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { LanguageService } from '@core/services/language.service';

type Theme = 'light' | 'dark';

@Component({
  selector: 'rotw-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header">
      <div class="shell header__inner">
        <a class="header__brand display" routerLink="/">Roar of the Waves</a>

        <nav class="header__nav" aria-label="Primary">
          <a routerLink="/" routerLinkActive="is-active" [routerLinkActiveOptions]="{ exact: true }">{{ t().nav.home }}</a>
          <a routerLink="/music" routerLinkActive="is-active">{{ t().nav.music }}</a>
          <a routerLink="/about" routerLinkActive="is-active">{{ t().nav.about }}</a>
        </nav>

        <div class="header__controls">
          <button
            type="button"
            class="header__pill"
            [attr.aria-label]="t().header.langToggleAriaLabel"
            (click)="lang.toggle()"
          >
            {{ lang.lang() === 'en' ? 'RU' : 'EN' }}
          </button>

          <button
            type="button"
            class="header__pill"
            [attr.aria-pressed]="theme() === 'dark'"
            [attr.aria-label]="t().header.themeToggleAriaLabel"
            (click)="toggleTheme()"
          >
            {{ theme() === 'dark' ? t().header.themeLight : t().header.themeDark }}
          </button>
        </div>
      </div>
    </header>
  `,
  styles: `
    .header {
      position: sticky;
      top: 0;
      z-index: 20;
      backdrop-filter: blur(10px);
      background: color-mix(in srgb, var(--c-paper) 82%, transparent);
      border-bottom: 1px solid var(--c-line);
    }

    .header__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-m);
      padding-block: 1rem;
    }

    .header__brand {
      font-size: var(--step-1);
      letter-spacing: 0.01em;
    }

    .header__nav {
      display: flex;
      flex-wrap: wrap;
      row-gap: 0.5rem;
      gap: var(--space-m);
      font-size: var(--step--1);
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }

    .header__nav a {
      white-space: nowrap;
      color: var(--c-mute);
      transition: color 300ms var(--ease);
    }
    .header__nav a:hover, .header__nav a.is-active { color: var(--c-ink); }

    .header__controls {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .header__pill {
      font-size: var(--step--1);
      letter-spacing: 0.22em;
      text-transform: uppercase;
      border: 1px solid var(--c-line);
      padding: 0.4rem 0.9rem;
      white-space: nowrap;
      transition: border-color 300ms var(--ease), color 300ms var(--ease);
    }

    .header__pill:hover {
      border-color: var(--c-ink);
      color: var(--c-ink);
    }

    @media (max-width: 46rem) {
      .header__inner { flex-wrap: wrap; row-gap: 0.75rem; }
      .header__brand { flex: 1 1 100%; }
      .header__nav { flex: 1 1 100%; gap: 1rem; }
    }

    @media (max-width: 26rem) {
      .header__nav { gap: 0.75rem; }
    }
  `,
})
export class SiteHeaderComponent {
  private readonly document = inject(DOCUMENT);

  protected readonly lang = inject(LanguageService);
  protected readonly t = this.lang.dict;

  protected readonly theme = signal<Theme>(this.readInitialTheme());

  constructor() {
    effect(() => {
      const value = this.theme();
      this.document.documentElement.dataset['theme'] = value;
      try {
        this.document.defaultView?.localStorage.setItem('rotw-theme', value);
      } catch {
        /* storage unavailable — non-critical */
      }
    });
  }

  protected toggleTheme(): void {
    this.theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  private readInitialTheme(): Theme {
    const view = this.document.defaultView;
    try {
      const stored = view?.localStorage.getItem('rotw-theme');
      if (stored === 'dark' || stored === 'light') return stored;
    } catch {
      /* ignore */
    }
    // Dark is the default theme on first visit.
    return 'dark';
  }
}
