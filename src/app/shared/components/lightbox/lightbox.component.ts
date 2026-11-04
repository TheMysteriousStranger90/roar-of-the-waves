import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  signal,
  viewChild,
} from '@angular/core';

export interface LightboxItem {
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
}

export interface LightboxLabels {
  readonly dialog: string;
  readonly close: string;
  readonly previous: string;
  readonly next: string;
  readonly openOriginal: string;
}

const SWIPE_THRESHOLD_PX = 50;

/**
 * Full-screen image viewer built on the native modal <dialog>: focus is trapped,
 * Esc closes it and focus returns to the opener. Left/Right arrows, the on-screen
 * buttons and horizontal swipes move between images (wrapping around).
 */
@Component({
  selector: 'rotw-lightbox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog
      #dialog
      class="lb"
      [attr.aria-label]="labels().dialog"
      (click)="onBackdropClick($event)"
      (keydown)="onKeydown($event)"
      (touchstart)="onTouchStart($event)"
      (touchend)="onTouchEnd($event)"
    >
      @if (current(); as item) {
        <div class="lb__bar">
          <span class="lb__count" aria-live="polite">{{ index() + 1 }} / {{ items().length }}</span>
          <div class="lb__actions">
            <a class="lb__link" [href]="item.src" target="_blank" rel="noopener noreferrer">{{ labels().openOriginal }}</a>
            <button type="button" class="lb__btn" [attr.aria-label]="labels().close" (click)="close()">
              <span aria-hidden="true">✕</span>
            </button>
          </div>
        </div>

        <div class="lb__stage">
          @if (items().length > 1) {
            <button type="button" class="lb__btn lb__btn--side" [attr.aria-label]="labels().previous" (click)="step(-1)">
              <span aria-hidden="true">←</span>
            </button>
          }

          <img class="lb__img" [src]="item.src" [alt]="item.alt" />

          @if (items().length > 1) {
            <button type="button" class="lb__btn lb__btn--side" [attr.aria-label]="labels().next" (click)="step(1)">
              <span aria-hidden="true">→</span>
            </button>
          }
        </div>

        <p class="lb__caption">{{ item.caption }}</p>
      }
    </dialog>
  `,
  styles: `
    .lb {
      width: 100vw;
      height: 100dvh;
      max-width: none;
      max-height: none;
      margin: 0;
      padding: 0;
      border: 0;
      /* Follows the site theme: --c-ink / --c-paper flip between light and dark. */
      --lb-fg: var(--c-ink);
      --lb-line: color-mix(in srgb, var(--c-ink) 30%, transparent);
      --lb-hover: color-mix(in srgb, var(--c-ink) 8%, transparent);
      --lb-mute: color-mix(in srgb, var(--c-ink) 75%, transparent);
      background: var(--c-paper);
      color: var(--lb-fg);
    }

    .lb[open] {
      display: grid;
      grid-template-rows: auto minmax(0, 1fr) auto;
    }

    .lb::backdrop { background: transparent; }

    .lb__bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.25rem;
    }

    .lb__count {
      font-size: var(--step--1);
      letter-spacing: 0.22em;
      font-variant-numeric: tabular-nums;
    }

    .lb__actions { display: flex; align-items: center; gap: 1.25rem; }

    .lb__link {
      font-size: var(--step--1);
      letter-spacing: 0.2em;
      text-transform: uppercase;
      border-bottom: 1px solid var(--lb-line);
      padding-bottom: 0.2rem;
      transition: border-color 300ms var(--ease);
    }

    .lb__link:hover { border-color: var(--lb-fg); }
    .lb__link:focus-visible { outline-color: var(--lb-fg); }

    .lb__btn {
      display: grid;
      place-items: center;
      width: 2.75rem;
      height: 2.75rem;
      border: 1px solid var(--lb-line);
      border-radius: 50%;
      color: inherit;
      font-size: 1.1rem;
      transition: border-color 300ms var(--ease), background 300ms var(--ease);
    }

    .lb__btn:hover { border-color: var(--lb-fg); background: var(--lb-hover); }
    .lb__btn:focus-visible { outline-color: var(--lb-fg); }

    .lb__stage {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      min-height: 0;
      padding-inline: 1.25rem;
    }

    .lb__btn--side { flex: none; }

    .lb__img {
      min-width: 0;
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      border: 1px solid var(--lb-fg);
    }

    .lb__caption {
      padding: 1rem 1.25rem 1.5rem;
      text-align: center;
      font-size: var(--step--1);
      letter-spacing: 0.08em;
      color: var(--lb-mute);
    }

    @media (max-width: 40rem) {
      .lb__stage { gap: 0.5rem; padding-inline: 0.5rem; }
      .lb__btn--side { width: 2.25rem; height: 2.25rem; }
    }
  `,
})
export class LightboxComponent {
  readonly items = input.required<readonly LightboxItem[]>();
  readonly labels = input.required<LightboxLabels>();

  protected readonly index = signal(0);
  protected readonly current = computed(() => this.items()[this.index()]);

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private touchStartX: number | null = null;

  /** Opens the viewer on the image at `index`. */
  open(index: number): void {
    this.index.set(index);
    this.dialog().nativeElement.showModal();
    this.preloadNeighbours();
  }

  close(): void {
    this.dialog().nativeElement.close();
  }

  protected step(delta: number): void {
    const total = this.items().length;
    if (total < 2) return;
    this.index.update((i) => (i + delta + total) % total);
    this.preloadNeighbours();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.step(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.step(1);
    }
  }

  /** A click on the dim area around the image (not on the image or a button) closes the viewer. */
  protected onBackdropClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target === this.dialog().nativeElement || target.classList.contains('lb__stage')) {
      this.close();
    }
  }

  protected onTouchStart(event: TouchEvent): void {
    // Two-finger gestures are pinch-zoom, not a swipe between images.
    this.touchStartX = event.touches.length > 1 ? null : (event.changedTouches[0]?.clientX ?? null);
  }

  protected onTouchEnd(event: TouchEvent): void {
    const endX = event.changedTouches[0]?.clientX;
    if (this.touchStartX === null || endX === undefined) return;
    // While pinch-zoomed in, a horizontal drag pans the image instead.
    if ((window.visualViewport?.scale ?? 1) > 1.01) {
      this.touchStartX = null;
      return;
    }
    const delta = endX - this.touchStartX;
    this.touchStartX = null;
    if (Math.abs(delta) >= SWIPE_THRESHOLD_PX) this.step(delta > 0 ? -1 : 1);
  }

  private preloadNeighbours(): void {
    const items = this.items();
    if (items.length < 2) return;
    for (const delta of [-1, 1]) {
      const item = items[(this.index() + delta + items.length) % items.length];
      if (item) new Image().src = item.src;
    }
  }
}
