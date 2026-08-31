import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';

import { FilmsService } from '@core/services/films.service';
import { MusicReleasesService } from '@core/services/music-releases.service';
import { LanguageService } from '@core/services/language.service';
import { SeoService } from '@core/services/seo.service';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

type Category = 'cinema' | 'music' | 'literature';

@Component({
  selector: 'rotw-coordinates',
  standalone: true,
  imports: [RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section">
      <div class="shell">
        <p class="eyebrow">{{ t().coordinates.eyebrow }}</p>
        <h1 class="page-title display">{{ t().coordinates.title }}</h1>
        <p class="note prose">{{ t().coordinates.note }}</p>

        <div class="coordinates-body">
          <div class="tabs" role="tablist">
            <button type="button" class="tab" role="tab" [class.is-active]="category() === 'cinema'" [attr.aria-selected]="category() === 'cinema'" (click)="setCategory('cinema')">{{ t().coordinates.filmsHeading }}</button>
            <button type="button" class="tab" role="tab" [class.is-active]="category() === 'music'" [attr.aria-selected]="category() === 'music'" (click)="setCategory('music')">{{ t().coordinates.musicHeading }}</button>
            <button type="button" class="tab" role="tab" [class.is-active]="category() === 'literature'" [attr.aria-selected]="category() === 'literature'" (click)="setCategory('literature')">{{ t().coordinates.literatureHeading }}</button>
          </div>

          @switch (category()) {
            @case ('cinema') {
              @if (films.isLoading()) {
                <p class="state">{{ t().coordinates.loading }}</p>
              } @else if (films.hasError()) {
                <p class="state" role="alert">{{ t().coordinates.error }}</p>
              } @else if (films.byDecade().length === 0) {
                <p class="state">{{ t().coordinates.empty }}</p>
              } @else {
                @for (group of films.byDecade(); track group.decade) {
                  <div class="decade" rotwReveal>
                    <h2 class="decade__label">{{ decadeLabel(group.decade) }}</h2>

                    <ul class="film-list">
                      @for (film of group.films; track film.id) {
                        <li class="film-row">
                          <span class="film-row__year">{{ film.year }}</span>
                          <a class="film-row__title" [href]="film.url" target="_blank" rel="noopener noreferrer">{{ film.title }}</a>
                        </li>
                      }
                    </ul>
                  </div>
                }
              }
            }
            @case ('music') {
              @if (music.isLoading()) {
                <p class="state">{{ t().coordinates.loading }}</p>
              } @else if (music.hasError()) {
                <p class="state" role="alert">{{ t().coordinates.error }}</p>
              } @else if (music.byGenre().length === 0) {
                <p class="state">{{ t().coordinates.empty }}</p>
              } @else {
                @for (group of music.byGenre(); track group.genre) {
                  <div class="decade" rotwReveal>
                    <h2 class="decade__label">{{ group.genre }}</h2>

                    <ul class="film-list">
                      @for (release of group.releases; track release.id) {
                        <li class="film-row film-row--music">
                          <a class="film-row__title" [href]="release.url" target="_blank" rel="noopener noreferrer">{{ release.title }}</a>
                        </li>
                      }
                    </ul>
                  </div>
                }
              }
            }
            @case ('literature') {
              <p class="placeholder-note" rotwReveal>{{ t().coordinates.comingSoon }}</p>
            }
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .page-title {
      font-size: var(--step-3);
      text-transform: uppercase;
      margin-block: var(--space-s) var(--space-l);
    }

    .note {
      color: var(--c-ink);
      margin-bottom: var(--space-xl);
      padding-bottom: var(--space-l);
      border-bottom: 1px solid var(--c-line);
    }

    .coordinates-body {
      max-width: 44rem;
    }

    .tabs {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-l);
      margin-bottom: var(--space-l);
    }

    .tab {
      background: none;
      border: none;
      border-bottom: 1px solid transparent;
      padding: 0 0 0.4rem;
      font-family: var(--font-ui);
      font-size: var(--step--1);
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--c-mute);
      cursor: pointer;
      transition: color 300ms var(--ease), border-color 300ms var(--ease);
    }

    .tab:hover { color: var(--c-ink); }

    .tab.is-active {
      color: var(--c-ink);
      border-bottom-color: var(--c-ink);
    }

    .state { color: var(--c-mute); padding-block: var(--space-l); }

    .decade {
      padding-block: var(--space-m);
      border-bottom: 1px solid var(--c-line);
    }

    .decade__label {
      font-family: var(--font-display);
      font-weight: 300;
      font-style: italic;
      font-size: var(--step-1);
      color: var(--c-mute);
      margin-bottom: var(--space-s);
    }

    .film-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .film-row {
      display: grid;
      grid-template-columns: 3.5rem 1fr;
      align-items: baseline;
      gap: var(--space-s);
      padding-block: 0.6rem;
    }

    .film-row__year {
      font-family: var(--font-display);
      font-size: var(--step-0);
      color: var(--c-mute);
      font-variant-numeric: tabular-nums;
    }

    .film-row__title {
      font-family: var(--font-display);
      font-size: var(--step-0);
      font-weight: 300;
      line-height: 1.3;
      color: var(--c-ink);
      transition: opacity var(--dur) var(--ease);

      &:hover { opacity: 0.6; }
    }

    .film-row--music {
      display: block;
      padding-block: 0.6rem;
    }

    .placeholder-note {
      font-family: var(--font-display);
      font-style: italic;
      font-size: var(--step-0);
      color: var(--c-mute);
      padding-block: var(--space-m);
    }

    @media (max-width: 32rem) {
      .film-row { grid-template-columns: 2.75rem 1fr; }
      .tabs { gap: var(--space-m); }
    }
  `,
})
export class CoordinatesComponent {
  protected readonly films = inject(FilmsService);
  protected readonly music = inject(MusicReleasesService);
  private readonly seo = inject(SeoService);

  protected readonly lang = inject(LanguageService);
  protected readonly t = this.lang.dict;

  protected readonly category = signal<Category>('cinema');

  constructor() {
    this.films.load();
    this.music.load();

    effect(() => {
      const dict = this.t();
      this.seo.apply({
        title: dict.seo.coordinates.title,
        description: dict.seo.coordinates.description,
        path: '/coordinates',
        lang: this.lang.lang(),
      });
    });
  }

  protected setCategory(value: Category): void {
    this.category.set(value);
  }

  protected decadeLabel(decade: number): string {
    return this.lang.lang() === 'ru' ? `${decade}-е` : `${decade}s`;
  }
}
