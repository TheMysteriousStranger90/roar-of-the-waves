import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LanguageService } from '@core/services/language.service';
import { APP_CONFIG } from '@core/tokens/app-config.token';

@Component({
  selector: 'rotw-site-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="shell footer__inner">
        <p class="footer__note">
          {{ config.projectName }} — {{ t().footer.tagline }}
        </p>

        <ul class="footer__links">
          @for (link of config.social; track link.href) {
            <li>
              <a [href]="link.href" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
            </li>
          }
        </ul>

        <small class="footer__copy">© {{ year }} {{ config.projectName }}</small>
      </div>
    </footer>
  `,
  styles: `
    .footer {
      border-top: 1px solid var(--c-line);
      padding-block: var(--space-l);
    }

    .footer__inner {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: space-between;
      gap: var(--space-m);
      font-size: var(--step--1);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--c-mute);
    }

    .footer__links { display: flex; gap: var(--space-m); list-style: none; margin: 0; padding: 0; }
    .footer__links a:hover { color: var(--c-ink); }
  `,
})
export class SiteFooterComponent {
  protected readonly config = inject(APP_CONFIG);
  protected readonly year = new Date().getFullYear();

  protected readonly lang = inject(LanguageService);
  protected readonly t = this.lang.dict;
}
