import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '@core/services/language.service';
import { SeoService } from '@core/services/seo.service';
import { TracksService } from '@core/services/tracks.service';
import { TrackCardComponent } from '@shared/components/track-card/track-card.component';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'rotw-home',
  standalone: true,
  imports: [RouterLink, TrackCardComponent, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero">
      <picture>
        <source
          type="image/avif"
          sizes="100vw"
          srcset="
            assets/images/hero/hero-640.avif 640w,
            assets/images/hero/hero-1024.avif 1024w,
            assets/images/hero/hero-1440.avif 1440w,
            assets/images/hero/hero-2000.avif 2000w
          "
        />
        <source
          type="image/webp"
          sizes="100vw"
          srcset="
            assets/images/hero/hero-640.webp 640w,
            assets/images/hero/hero-1024.webp 1024w,
            assets/images/hero/hero-1440.webp 1440w,
            assets/images/hero/hero-2000.webp 2000w
          "
        />
        <img
          class="hero__bg"
          src="assets/images/aniva-lighthouse.jpg"
          width="2000"
          height="1125"
          alt="A storm-worn lighthouse standing alone on rocks in the open sea"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </picture>
      <div class="hero__scrim"></div>
      <div class="shell hero__content">
        <p class="eyebrow">{{ t().home.eyebrow }}</p>
        <h1 class="hero__title display">Roar<br />of the<br />Waves</h1>
        <p class="hero__lede prose">
          {{ t().home.lede }}
        </p>
        <a class="hero__cta" routerLink="/music">{{ t().home.cta }}</a>
      </div>
    </section>

    <section class="section" id="selected">
      <div class="shell">
        <p class="eyebrow" rotwReveal>{{ t().home.selectedWorkEyebrow }}</p>

        @if (tracks.isLoading()) {
          <p class="state">{{ t().home.loading }}</p>
        } @else if (tracks.hasError()) {
          <p class="state" role="alert">{{ t().home.error }}</p>
        } @else {
          @for (track of tracks.tracks(); track track.id) {
            <rotw-track-card [track]="track" />
          } @empty {
            <p class="state">{{ t().home.empty }}</p>
          }
        }
      </div>
    </section>

    <section class="section">
      <div class="shell">
        <blockquote class="pull prose" rotwReveal>
          "{{ t().shared.everyTrackStory }}"
        </blockquote>
        <a class="hero__cta" routerLink="/about">{{ t().home.readStory }}</a>
      </div>
    </section>
  `,
  styles: `
    .hero {
      position: relative;
      display: grid;
      align-content: center;
      min-height: 92svh;
      padding-block: var(--space-xl);
      overflow: hidden;
      color: #f4f3f1;
    }

    .hero__bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 60%;
      filter: grayscale(1) contrast(1.15) brightness(0.6);
    }

    .hero__scrim {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(180deg, rgba(10, 10, 10, 0.35) 0%, rgba(10, 10, 10, 0.35) 45%, var(--c-paper) 96%),
        linear-gradient(90deg, rgba(10, 10, 10, 0.45), rgba(10, 10, 10, 0.1) 60%);
    }

    .hero__content {
      position: relative;
    }

    .hero .eyebrow { color: rgba(244, 243, 241, 0.7); }

    .hero__title {
      font-size: var(--step-3);
      margin-block: var(--space-m) var(--space-l);
      text-transform: uppercase;
    }

    .hero__lede { color: rgba(244, 243, 241, 0.8); }

    .hero__cta {
      display: inline-block;
      margin-top: var(--space-l);
      padding: 0.85rem 2.4rem;
      font-size: var(--step--1);
      letter-spacing: 0.28em;
      text-transform: uppercase;
      border: 1px solid var(--c-ink);
      transition: background var(--dur) var(--ease), color var(--dur) var(--ease);

      &:hover { background: var(--c-ink); color: var(--c-paper); }
    }

    .hero .hero__cta {
      border-color: #f4f3f1;
      color: #f4f3f1;

      &:hover { background: #f4f3f1; color: #0a0a0a; }
    }

    .pull {
      font-style: italic;
      font-size: var(--step-2);
      line-height: 1.35;
      max-width: 34ch;
    }

    .state { color: var(--c-mute); padding-block: var(--space-l); }
  `,
})
export class HomeComponent {
  protected readonly tracks = inject(TracksService);
  private readonly seo = inject(SeoService);

  protected readonly lang = inject(LanguageService);
  protected readonly t = this.lang.dict;

  constructor() {
    effect(() => {
      const dict = this.t();
      this.seo.apply({
        title: dict.seo.home.title,
        description: dict.seo.home.description,
        path: '/',
        lang: this.lang.lang(),
      });
    });
    this.seo.setMusicGroupJsonLd(this.tracks.tracks().map((track) => track.url));
  }
}
