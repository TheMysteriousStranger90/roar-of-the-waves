import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '@core/services/language.service';
import { SeoService } from '@core/services/seo.service';
import { TracksService } from '@core/services/tracks.service';
import { TrackCardComponent } from '@shared/components/track-card/track-card.component';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'rotw-music',
  standalone: true,
  imports: [RouterLink, TrackCardComponent, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section">
      <div class="shell">
        <p class="eyebrow">{{ t().music.eyebrow }}</p>
        <h1 class="page-title display">{{ t().music.title }}</h1>

        <div class="intro">
          <div class="note prose" rotwReveal>
            <p>{{ t().music.note }}</p>
            <p>{{ t().music.noteAlbum }}</p>
            <p>
              <a class="note__link" routerLink="/ai-check">{{ t().aiCheck.musicLink }}</a>
            </p>
          </div>

          <figure class="studio" rotwReveal>
            <div
              class="studio__frame"
              tabindex="0"
              role="group"
              [attr.aria-label]="t().music.studioGroupLabel"
              (touchstart)="onTouchStart($event)"
              (touchend)="onTouchEnd($event)"
              (keydown.arrowleft)="prev()"
              (keydown.arrowright)="next()"
            >
              @for (image of images(); track image.src; let i = $index) {
                <img
                  class="studio__img"
                  [class.is-active]="i === activeIndex()"
                  [src]="image.src"
                  [alt]="image.alt"
                  [attr.aria-hidden]="i === activeIndex() ? null : 'true'"
                  loading="lazy"
                  draggable="false"
                  width="1280"
                  height="720"
                />
              }
            </div>

            <div class="studio__controls">
              <button
                type="button"
                class="studio__arrow"
                (click)="prev()"
                [attr.aria-label]="t().music.prevImageLabel"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
                     stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>

              <span class="studio__counter" aria-live="polite">
                {{ activeIndex() + 1 }} / {{ images().length }}
              </span>

              <button
                type="button"
                class="studio__arrow"
                (click)="next()"
                [attr.aria-label]="t().music.nextImageLabel"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
                     stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </figure>
        </div>

        @if (tracks.isLoading()) {
          <p class="state">{{ t().music.loading }}</p>
        } @else if (tracks.hasError()) {
          <p class="state" role="alert">{{ t().music.error }}</p>
        } @else {
          @for (track of tracks.tracks(); track track.id) {
            <rotw-track-card [track]="track" />
          } @empty {
            <p class="state">{{ t().music.empty }}</p>
          }
        }
      </div>
    </section>
  `,
  styles: `
    .page-title {
      font-size: var(--step-3);
      margin-block: var(--space-s) var(--space-l);
    }

    .intro {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 24rem);
      gap: var(--space-l);
      align-items: start;
      margin-bottom: var(--space-xl);
      padding-bottom: var(--space-l);
      border-bottom: 1px solid var(--c-line);
    }

    .note {
      color: var(--c-ink);
    }

    .note p + p {
      margin-top: var(--space-m);
    }

    .note__link {
      font-family: var(--font-ui);
      font-size: var(--step--1);
      letter-spacing: 0.2em;
      text-transform: uppercase;
      border-bottom: 1px solid var(--c-line);
      padding-bottom: 0.25rem;
      transition: border-color var(--dur) var(--ease);

      &:hover { border-color: var(--c-ink); }
    }

    .studio {
      margin: 0;
      margin-top: 0.5rem;
      position: sticky;
      top: calc(var(--space-l) + 4rem);
    }

    /* Decorative gallery: not a link, so no pointer cursor and no navigation. */
    .studio__frame {
      position: relative;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      border: 1px solid var(--c-line);
      touch-action: pan-y;
      user-select: none;

      &:focus-visible {
        outline-offset: 2px;
      }
    }

    .studio__img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity var(--dur) var(--ease);
      pointer-events: none;

      &.is-active {
        opacity: 1;
      }
    }

    .studio__controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: var(--space-s);
    }

    .studio__arrow {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
      border: 1px solid var(--c-line);
      border-radius: 50%;
      color: var(--c-ink);
      transition: border-color var(--dur) var(--ease);

      &:hover {
        border-color: var(--c-ink);
      }
    }

    .studio__counter {
      font-size: var(--step--1);
      letter-spacing: 0.2em;
      color: var(--c-mute);
    }

    .state { color: var(--c-mute); padding-block: var(--space-l); }

    @media (max-width: 56rem) {
      .intro {
        grid-template-columns: 1fr;
      }

      .studio {
        order: -1;
        position: static;
        max-width: 22rem;
      }
    }
  `,
})
export class MusicComponent {
  protected readonly tracks = inject(TracksService);
  private readonly seo = inject(SeoService);

  protected readonly lang = inject(LanguageService);
  protected readonly t = this.lang.dict;

  protected readonly images = computed(() => [
    {
      src: 'assets/images/studio-kontakt-spotlight-piano.webp',
      alt: this.t().music.studioKontaktAlt,
    },
    {
      src: 'assets/images/studio-ableton-live.webp',
      alt: this.t().music.studioAbletonAlt,
    },
  ]);

  protected readonly activeIndex = signal(0);

  private touchStartX = 0;

  constructor() {
    effect(() => {
      const dict = this.t();
      this.seo.apply({
        title: dict.seo.music.title,
        description: dict.seo.music.description,
        path: '/music',
        lang: this.lang.lang(),
      });
    });
  }

  protected next(): void {
    const count = this.images().length;
    this.activeIndex.update((i) => (i + 1) % count);
  }

  protected prev(): void {
    const count = this.images().length;
    this.activeIndex.update((i) => (i - 1 + count) % count);
  }

  protected onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0]?.clientX ?? 0;
  }

  protected onTouchEnd(event: TouchEvent): void {
    const endX = event.changedTouches[0]?.clientX ?? 0;
    const delta = endX - this.touchStartX;
    const threshold = 40;

    if (delta > threshold) this.prev();
    else if (delta < -threshold) this.next();
  }
}
