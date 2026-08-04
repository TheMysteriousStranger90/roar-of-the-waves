import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { SafeResourceUrlPipe } from '@shared/pipes/safe-resource-url.pipe';

const SOUNDCLOUD_EMBED_BASE = 'https://w.soundcloud.com/player/?';
const SOUNDCLOUD_TRACK_PREFIX = 'https://soundcloud.com/';

@Component({
  selector: 'rotw-soundcloud-player',
  standalone: true,
  imports: [SafeResourceUrlPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (embedUrl(); as url) {
      <iframe
        class="player"
        [src]="url | safeResourceUrl"
        [title]="'SoundCloud player: ' + trackTitle()"
        height="140"
        loading="lazy"
        frameborder="0"
        allow="autoplay"
        scrolling="no"
      ></iframe>
    }
  `,
  styles: `
    :host { display: block; }

    .player {
      width: 100%;
      border: 1px solid var(--c-line);
      filter: grayscale(1) contrast(1.05);
    }
  `,
})
export class SoundcloudPlayerComponent {
  readonly trackUrl = input.required<string>();
  readonly trackTitle = input<string>('');
  readonly compact = input<boolean>(false);

  protected readonly embedUrl = computed<string | null>(() => {
    const source = this.trackUrl();
    if (!source.startsWith(SOUNDCLOUD_TRACK_PREFIX)) return null;

    const params = new URLSearchParams({
      url: source,
      color: '#000000',
      auto_play: 'false',
      hide_related: 'true',
      show_comments: 'false',
      show_user: 'false',
      show_reposts: 'false',
      show_teaser: 'false',
      visual: 'false',
    });

    return SOUNDCLOUD_EMBED_BASE + params.toString();
  });
}
