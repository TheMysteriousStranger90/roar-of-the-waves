import {ChangeDetectionStrategy, Component, effect, inject, signal} from '@angular/core';
import {RouterLink} from '@angular/router';

import {LanguageService} from '@core/services/language.service';
import {SeoService} from '@core/services/seo.service';
import {RevealOnScrollDirective} from '@shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'rotw-about',
  standalone: true,
  imports: [RevealOnScrollDirective, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section">
      <div class="shell">
        <p class="eyebrow">{{ t().about.eyebrow }}</p>
        <h1 class="page-title display">{{ t().about.titleLine1 }}<br/>{{ t().about.titleLine2 }}
        </h1>

        <div class="about-layout">
          <figure class="portrait" rotwReveal>
            <div
              class="portrait__frame"
              tabindex="0"
              role="group"
              routerLink="/coordinates"
              [attr.aria-label]="t().about.portraitAlt"
              (touchstart)="onTouchStart($event)"
              (touchend)="onTouchEnd($event)"
              (keydown.arrowleft)="prev()"
              (keydown.arrowright)="next()"
            >
              @for (photo of photos; track photo; let i = $index) {
                <img
                  class="portrait__img"
                  [class.is-active]="i === activeIndex()"
                  [src]="photo"
                  [alt]="t().about.portraitAlt"
                  loading="lazy"
                  width="960"
                  height="720"
                />
              }
            </div>

            @if (photos.length > 1) {
              <div class="portrait__controls">
                <button
                  type="button"
                  class="portrait__arrow"
                  (click)="prev()"
                  [attr.aria-label]="t().about.prevPhotoLabel"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
                       stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                </button>

                <span class="portrait__counter">
      {{ activeIndex() + 1 }} / {{ photos.length }}
    </span>

                <button
                  type="button"
                  class="portrait__arrow"
                  (click)="next()"
                  [attr.aria-label]="t().about.nextPhotoLabel"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
                       stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </div>
            }
          </figure>

          <div class="prose text" rotwReveal>
            <p>{{ t().about.paragraph1 }}</p>
            <p>{{ t().about.paragraph2 }}</p>
            <p>{{ t().shared.everyTrackStory }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .page-title {
      font-size: var(--step-3);
      margin-block: var(--space-s) var(--space-l);
    }

    .about-layout {
      display: grid;
      grid-template-columns: minmax(0, 20rem) 1fr;
      gap: var(--space-l) var(--space-xl);
      align-items: start;
    }

    .portrait {
      margin: 0;
      margin-top: 0.5rem;
      position: sticky;
      top: calc(var(--space-l) + 4rem);
    }

    .portrait__frame {
      position: relative;
      aspect-ratio: 4 / 3;
      overflow: hidden;
      border: 1px solid var(--c-line);
      touch-action: pan-y;
      cursor: pointer;

      &:focus-visible {
        outline-offset: 2px;
      }
    }

    .portrait__img {
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

    .portrait__controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: var(--space-s);
    }

    .portrait__arrow {
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

    .portrait__counter {
      font-size: var(--step--1);
      letter-spacing: 0.2em;
      color: var(--c-mute);
    }

    .text p + p {
      margin-top: var(--space-m);
    }

    @media (max-width: 56rem) {
      .about-layout {
        grid-template-columns: 1fr;
      }

      .portrait {
        position: static;
        max-width: 22rem;
      }
    }
  `,
})
export class AboutComponent {
  private readonly seo = inject(SeoService);

  protected readonly lang = inject(LanguageService);
  protected readonly t = this.lang.dict;

  protected readonly photos: readonly string[] = [
    'assets/images/portrait.webp',
    'assets/images/portrait-2.webp',
  ];

  protected readonly activeIndex = signal(0);

  private touchStartX = 0;

  constructor() {
    effect(() => {
      const dict = this.t();
      this.seo.apply({
        title: dict.seo.about.title,
        description: dict.seo.about.description,
        path: '/about',
        lang: this.lang.lang(),
      });
    });
  }

  protected next(): void {
    this.activeIndex.update((i) => (i + 1) % this.photos.length);
  }

  protected prev(): void {
    this.activeIndex.update((i) => (i - 1 + this.photos.length) % this.photos.length);
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
