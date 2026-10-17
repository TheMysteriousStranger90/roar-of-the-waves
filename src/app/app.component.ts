import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SiteFooterComponent } from '@shared/components/site-footer/site-footer.component';
import { SiteHeaderComponent } from '@shared/components/site-header/site-header.component';
import { TracksService } from '@core/services/tracks.service';

@Component({
  selector: 'rotw-root',
  standalone: true,
  imports: [RouterOutlet, SiteHeaderComponent, SiteFooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#main">Skip to content</a>
    <rotw-site-header />
    <main id="main" tabindex="-1">
      <router-outlet />
    </main>
    <rotw-site-footer />
  `,
  styles: `
    main { min-height: 100svh; }
  `,
})
export class AppComponent {
  private readonly tracks = inject(TracksService);

  constructor() {
    this.tracks.load();
  }
}
