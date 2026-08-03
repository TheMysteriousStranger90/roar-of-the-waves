import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';

import { LanguageService } from '@core/services/language.service';
import { SeoService } from '@core/services/seo.service';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'rotw-about',
  standalone: true,
  imports: [RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section">
      <div class="shell">
        <p class="eyebrow">{{ t().about.eyebrow }}</p>
        <h1 class="page-title display">{{ t().about.titleLine1 }}<br />{{ t().about.titleLine2 }}</h1>

        <div class="about-layout">
          <figure class="portrait" rotwReveal>
            <img
              src="assets/images/portrait.jpg"
              [alt]="t().about.portraitAlt"
              loading="lazy"
              width="960"
              height="720"
            />
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

    .portrait img {
      width: 100%;
      height: auto;
      aspect-ratio: 4 / 3;
      object-fit: cover;
      border: 1px solid var(--c-line);
    }

    .text p + p { margin-top: var(--space-m); }

    @media (max-width: 56rem) {
      .about-layout { grid-template-columns: 1fr; }
      .portrait { position: static; max-width: 22rem; }
    }
  `,
})
export class AboutComponent {
  private readonly seo = inject(SeoService);

  protected readonly lang = inject(LanguageService);
  protected readonly t = this.lang.dict;

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
}
