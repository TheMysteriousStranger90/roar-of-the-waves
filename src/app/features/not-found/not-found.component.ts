import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '@core/services/language.service';

@Component({
  selector: 'rotw-not-found',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="nf shell">
      <p class="eyebrow">404</p>
      <h1 class="display nf__title">{{ t().notFound.title }}</h1>
      <p class="prose">{{ t().notFound.text }}</p>
      <a class="nf__cta" routerLink="/">{{ t().notFound.cta }}</a>
    </section>
  `,
  styles: `
    .nf {
      display: grid;
      align-content: center;
      min-height: 70svh;
      gap: var(--space-m);
    }

    .nf__title { font-size: var(--step-3); text-transform: uppercase; }

    .nf__cta {
      justify-self: start;
      padding: 0.85rem 2.4rem;
      font-size: var(--step--1);
      letter-spacing: 0.28em;
      text-transform: uppercase;
      border: 1px solid var(--c-ink);

      &:hover { background: var(--c-ink); color: var(--c-paper); }
    }
  `,
})
export class NotFoundComponent {
  protected readonly lang = inject(LanguageService);
  protected readonly t = this.lang.dict;
}
