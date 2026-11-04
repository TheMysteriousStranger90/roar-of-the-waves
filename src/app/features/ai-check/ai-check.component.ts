import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';

import { AiCheckTool } from '@core/i18n/translations';
import { LanguageService } from '@core/services/language.service';
import { SeoService } from '@core/services/seo.service';
import { LightboxComponent, LightboxItem } from '@shared/components/lightbox/lightbox.component';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

import {
  AI_CHECK_IMAGE_DIR,
  AI_CHECK_URLS,
  CHECKED_TRACKS,
  CheckedTrack,
  THUMB_LANDSCAPE,
  THUMB_PORTRAIT,
  ThumbSize,
} from './ai-checks.data';

type ToolId = 'deezer' | 'wavespeed' | 'aha' | 'exiftools';

/** `src` is the full, uncropped screenshot (lightbox); `thumb` is the small grid copy. */
interface Shot extends LightboxItem {
  readonly thumb: string;
  readonly thumbSize: ThumbSize;
}

interface ToolView {
  readonly id: ToolId;
  /** Short brand name used on the tab (a proper noun — not translated). */
  readonly tab: string;
  readonly copy: AiCheckTool;
  readonly url: string;
  readonly shots: readonly Shot[];
}

@Component({
  selector: 'rotw-ai-check',
  standalone: true,
  imports: [LightboxComponent, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section">
      <div class="shell">
        <p class="eyebrow">{{ c().eyebrow }}</p>
        <h1 class="page-title display">{{ c().title }}</h1>
        <div class="note prose" rotwReveal>
          <p>{{ c().lede }}</p>
          <p class="checked-on">{{ c().checkedOn }}</p>
        </div>

        <div class="body">
          <div class="tabs" role="tablist" [attr.aria-label]="c().tabsLabel">
            @for (tool of tools(); track tool.id) {
              <button
                type="button"
                class="tab"
                role="tab"
                [id]="'tab-' + tool.id"
                [class.is-active]="activeId() === tool.id"
                [attr.aria-selected]="activeId() === tool.id"
                [attr.aria-controls]="'panel-' + tool.id"
                [attr.tabindex]="activeId() === tool.id ? 0 : -1"
                (click)="select(tool.id)"
                (keydown)="onTabKeydown($event)"
              >{{ tool.tab }}</button>
            }
          </div>

          @let tool = active();
          <div
            class="panel"
            role="tabpanel"
            [id]="'panel-' + tool.id"
            [attr.aria-labelledby]="'tab-' + tool.id"
          >
            <header class="panel__head">
              <h2 class="panel__name display">{{ tool.copy.name }}</h2>
              <a class="link" [href]="tool.url" target="_blank" rel="noopener noreferrer">{{ c().openTool }}</a>
            </header>

            <p class="verdict">
              <span class="verdict__figure display">{{ tool.copy.figure }}</span>
              <span class="verdict__note">{{ tool.copy.figureNote }}</span>
            </p>

            <dl class="rows">
              <dt>{{ c().labels.what }}</dt>
              <dd class="prose">{{ tool.copy.what }}</dd>
              <dt>{{ c().labels.result }}</dt>
              <dd class="prose">{{ tool.copy.result }}</dd>
              <dt>{{ c().labels.limits }}</dt>
              <dd class="prose">{{ tool.copy.limits }}</dd>
            </dl>

            <h3 class="shots-label">{{ c().screenshotsLabel }}</h3>
            <ul class="shots">
              @for (shot of tool.shots; track shot.src; let i = $index) {
                <li>
                  <figure class="shot" [class.shot--portrait]="shot.thumbSize.height > shot.thumbSize.width">
                    <button type="button" class="shot__open" (click)="viewer.open(i)">
                      <img
                        [src]="shot.thumb"
                        [alt]="shot.alt"
                        [attr.width]="shot.thumbSize.width"
                        [attr.height]="shot.thumbSize.height"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                    <figcaption>{{ shot.caption }}</figcaption>
                  </figure>
                </li>
              }
            </ul>
          </div>

          <div class="closing" rotwReveal>
            <div>
              <h2 class="closing__title display">{{ c().readingTitle }}</h2>
              <p class="prose">{{ c().reading }}</p>
            </div>
            <div>
              <h2 class="closing__title display">{{ c().verifyTitle }}</h2>
              <p class="prose">{{ c().verify }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <rotw-lightbox #viewer [items]="active().shots" [labels]="c().lightbox" />
  `,
  styles: `
    .page-title {
      font-size: var(--step-3);
      margin-block: var(--space-s) var(--space-l);
    }

    .note {
      color: var(--c-ink);
      margin-bottom: var(--space-xl);
      padding-bottom: var(--space-l);
      border-bottom: 1px solid var(--c-line);
    }

    .checked-on {
      margin-top: var(--space-m);
      font-family: var(--font-ui);
      font-size: var(--step--1);
      letter-spacing: 0.08em;
      color: var(--c-mute);
    }

    .tabs {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-l);
      margin-bottom: var(--space-l);
    }

    .tab {
      border-bottom: 1px solid transparent;
      padding: 0 0 0.4rem;
      font-family: var(--font-ui);
      font-size: var(--step--1);
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--c-mute);
      transition: color 300ms var(--ease), border-color 300ms var(--ease);
    }

    .tab:hover { color: var(--c-ink); }
    .tab.is-active { color: var(--c-ink); border-bottom-color: var(--c-ink); }

    .panel__head {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: space-between;
      gap: var(--space-s) var(--space-m);
    }

    .panel__name { font-size: var(--step-2); font-weight: 300; line-height: 1.05; }

    .link {
      font-size: var(--step--1);
      letter-spacing: 0.2em;
      text-transform: uppercase;
      border-bottom: 1px solid var(--c-line);
      padding-bottom: 0.25rem;
      transition: border-color var(--dur) var(--ease);

      &:hover { border-color: var(--c-ink); }
    }

    .verdict {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: var(--space-s) var(--space-m);
      margin-top: var(--space-m);
      padding-block: var(--space-s);
      border-block: 1px solid var(--c-line);
    }

    .verdict__figure { font-size: var(--step-2); line-height: 1; }
    .verdict__note { font-size: var(--step--1); letter-spacing: 0.08em; color: var(--c-mute); }

    .rows {
      display: grid;
      grid-template-columns: 9rem minmax(0, var(--measure));
      gap: var(--space-s) var(--space-m);
      margin: var(--space-m) 0 0;
    }

    dt {
      font-size: var(--step--1);
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--c-mute);
      padding-top: 0.6rem;
    }

    dd.prose,
    .closing p.prose {
      font-size: calc(var(--step-1) * 0.8);
    }

    .shots-label {
      margin-top: var(--space-l);
      font-family: var(--font-ui);
      font-size: var(--step--1);
      font-weight: 400;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--c-mute);
    }

    .shots {
      list-style: none;
      margin: var(--space-s) 0 0;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 16rem), 1fr));
      gap: var(--space-m);
      align-items: start;
    }

    .shot { display: grid; gap: 0.5rem; }
    .shot--portrait { max-width: 12rem; }

    .shot__open {
      display: block;
      width: 100%;
      padding: 0;
      cursor: zoom-in;
    }

    .shot__open img {
      width: 100%;
      height: auto;
      border: 1px solid var(--c-ink);
      transition: opacity var(--dur) var(--ease);
    }

    .shot__open:hover img { opacity: 0.8; }

    figcaption {
      font-size: var(--step--1);
      letter-spacing: 0.06em;
      color: var(--c-mute);
    }

    .closing {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
      gap: var(--space-l);
      margin-top: var(--space-xl);
      padding-top: var(--space-l);
      border-top: 1px solid var(--c-line);
    }

    .closing__title {
      font-size: var(--step-1);
      font-weight: 400;
      font-style: italic;
      color: var(--c-mute);
      margin-bottom: var(--space-s);
    }

    @media (max-width: 40rem) {
      .rows { grid-template-columns: 1fr; gap: 0.25rem; }
      dd { margin-bottom: var(--space-s); }
      .tabs { gap: var(--space-m); }
    }
  `,
})
export class AiCheckComponent {
  private readonly seo = inject(SeoService);

  protected readonly lang = inject(LanguageService);
  protected readonly c = computed(() => this.lang.dict().aiCheck);

  protected readonly activeId = signal<ToolId>('deezer');

  protected readonly tools = computed<readonly ToolView[]>(() => {
    const c = this.c();
    const ru = this.lang.lang() === 'ru';
    const titleOf = (track: CheckedTrack): string => (ru ? track.titleRu : track.titleEn);
    const shot = (name: string, alt: string, caption: string, thumbSize: ThumbSize = THUMB_LANDSCAPE): Shot => ({
      src: `${AI_CHECK_IMAGE_DIR}/${name}.webp`,
      thumb: `${AI_CHECK_IMAGE_DIR}/${name}-thumb.webp`,
      thumbSize,
      alt,
      caption,
    });
    const perTrack = (prefix: string, altTemplate: string): readonly Shot[] =>
      CHECKED_TRACKS.map((track) =>
        shot(`${prefix}-${track.slug}`, altTemplate.replace('{title}', titleOf(track)), titleOf(track)),
      );

    return [
      {
        id: 'deezer',
        tab: 'Deezer',
        copy: c.deezer,
        url: AI_CHECK_URLS.deezer,
        shots: [
          shot('deezer-library', c.alts.deezerLibrary, c.captions.deezerLibrary),
          shot('deezer-playlist', c.alts.deezerPlaylist, c.captions.deezerPlaylist),
          shot('deezer-result', c.alts.deezerResult, c.captions.deezerResult),
          shot('deezer-share-card', c.alts.deezerShare, c.captions.deezerShare, THUMB_PORTRAIT),
        ],
      },
      {
        id: 'wavespeed',
        tab: 'WaveSpeed',
        copy: c.wavespeed,
        url: AI_CHECK_URLS.wavespeed,
        shots: perTrack('wavespeed', c.alts.wavespeed),
      },
      {
        id: 'aha',
        tab: 'aha-music',
        copy: c.aha,
        url: AI_CHECK_URLS.aha,
        shots: perTrack('aha-music', c.alts.aha),
      },
      {
        id: 'exiftools',
        tab: 'ExifTools',
        copy: c.exiftools,
        url: AI_CHECK_URLS.exiftools,
        shots: perTrack('exiftools', c.alts.exiftools),
      },
    ];
  });

  protected readonly active = computed<ToolView>(() => {
    const tools = this.tools();
    return tools.find((tool) => tool.id === this.activeId()) ?? tools[0]!;
  });

  constructor() {
    effect(() => {
      const dict = this.lang.dict();
      this.seo.apply({
        title: dict.seo.aiCheck.title,
        description: dict.seo.aiCheck.description,
        path: '/ai-check',
        lang: this.lang.lang(),
      });
    });
  }

  protected select(id: ToolId): void {
    this.activeId.set(id);
  }

  /** Left/Right/Home/End move between tabs, as in the WAI-ARIA tabs pattern. */
  protected onTabKeydown(event: KeyboardEvent): void {
    const tools = this.tools();
    const current = tools.findIndex((tool) => tool.id === this.activeId());
    let next = current;

    switch (event.key) {
      case 'ArrowRight': next = (current + 1) % tools.length; break;
      case 'ArrowLeft': next = (current - 1 + tools.length) % tools.length; break;
      case 'Home': next = 0; break;
      case 'End': next = tools.length - 1; break;
      default: return;
    }

    event.preventDefault();
    const target = tools[next];
    if (!target) return;
    this.activeId.set(target.id);
    (event.currentTarget as HTMLElement).parentElement
      ?.querySelector<HTMLElement>(`#tab-${target.id}`)
      ?.focus();
  }
}
