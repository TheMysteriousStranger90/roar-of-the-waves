import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { LanguageService } from '@core/services/language.service';
import { TrackView } from '@core/models/track.model';
import { SoundcloudPlayerComponent } from '@shared/components/soundcloud-player/soundcloud-player.component';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'rotw-track-card',
  standalone: true,
  imports: [SoundcloudPlayerComponent, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="card" rotwReveal>
      <header class="card__head">
        <span class="card__ordinal">{{ track().ordinal }}</span>
        <div>
          <h3 class="card__title display" [lang]="mainLang()">{{ mainTitle() }}</h3>
          @if (subTitle()) {
            <p class="card__subtitle" [lang]="subLang()">{{ subTitle() }}</p>
          }
        </div>
      </header>

      <rotw-soundcloud-player
        [trackUrl]="track().url"
        [trackTitle]="mainTitle()"
      />

      <a class="card__link" [href]="track().url" target="_blank" rel="noopener noreferrer">
        {{ t().trackCard.listenOn }}
      </a>
    </article>
  `,
  styles: `
    :host { display: block; }

    .card {
      display: grid;
      gap: var(--space-m);
      padding-block: var(--space-l);
      border-bottom: 1px solid var(--c-line);
    }

    .card__head {
      display: grid;
      grid-template-columns: 4rem 1fr;
      align-items: baseline;
      gap: var(--space-s);
    }

    .card__ordinal {
      font-family: var(--font-display);
      font-size: var(--step-1);
      color: var(--c-mute);
    }

    .card__title {
      font-size: var(--step-2);
      font-weight: 300;
    }

    .card__subtitle {
      font-family: var(--font-display);
      font-style: italic;
      font-size: var(--step-1);
      color: var(--c-mute);
    }

    .card__link {
      justify-self: start;
      font-size: var(--step--1);
      letter-spacing: 0.2em;
      text-transform: uppercase;
      border-bottom: 1px solid var(--c-line);
      padding-bottom: 0.25rem;
      transition: border-color var(--dur) var(--ease);

      &:hover { border-color: var(--c-ink); }
    }

    @media (max-width: 40rem) {
      .card__head { grid-template-columns: 2.5rem 1fr; }
    }
  `,
})
export class TrackCardComponent {
  readonly track = input.required<TrackView>();

  protected readonly lang = inject(LanguageService);
  protected readonly t = this.lang.dict;

  /** The Russian title is shown first when the UI is in Russian, English otherwise. */
  protected readonly mainTitle = computed(() =>
    this.lang.lang() === 'ru' && this.track().titleRu
      ? this.track().titleRu
      : this.track().titleEn,
  );

  protected readonly subTitle = computed(() =>
    this.lang.lang() === 'ru' && this.track().titleRu
      ? this.track().titleEn
      : this.track().titleRu,
  );

  protected readonly mainLang = computed(() =>
    this.lang.lang() === 'ru' && this.track().titleRu ? 'ru' : 'en',
  );

  protected readonly subLang = computed(() =>
    this.lang.lang() === 'ru' && this.track().titleRu ? 'en' : 'ru',
  );
}
