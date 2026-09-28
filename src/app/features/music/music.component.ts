import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';

import { LanguageService } from '@core/services/language.service';
import { SeoService } from '@core/services/seo.service';
import { TracksService } from '@core/services/tracks.service';
import { TrackCardComponent } from '@shared/components/track-card/track-card.component';

@Component({
  selector: 'rotw-music',
  standalone: true,
  imports: [TrackCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section">
      <div class="shell">
        <p class="eyebrow">{{ t().music.eyebrow }}</p>
        <h1 class="page-title display">{{ t().music.title }}</h1>
        <div class="note prose">
          <p>{{ t().music.note }}</p>
          <p>{{ t().music.noteAlbum }}</p>
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
      text-transform: uppercase;
      margin-block: var(--space-s) var(--space-l);
    }

    .note {
      color: var(--c-ink);
      margin-bottom: var(--space-xl);
      padding-bottom: var(--space-l);
      border-bottom: 1px solid var(--c-line);
    }

    .note p + p {
      margin-top: var(--space-m);
    }

    .state { color: var(--c-mute); padding-block: var(--space-l); }
  `,
})
export class MusicComponent {
  protected readonly tracks = inject(TracksService);
  private readonly seo = inject(SeoService);

  protected readonly lang = inject(LanguageService);
  protected readonly t = this.lang.dict;

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
}
