import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

import { APP_CONFIG } from '@core/tokens/app-config.token';
import {
  Track,
  TrackView,
  parseTracksResponse,
  toTrackView,
} from '@core/models/track.model';

type LoadState = 'idle' | 'loading' | 'ready' | 'error';

@Injectable({ providedIn: 'root' })
export class TracksService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);
  private readonly destroyRef = inject(DestroyRef);

  private readonly _tracks = signal<readonly Track[]>([]);
  private readonly _state = signal<LoadState>('idle');

  readonly state = this._state.asReadonly();
  readonly isLoading = computed(() => this._state() === 'loading');
  readonly hasError = computed(() => this._state() === 'error');

  readonly tracks = computed<readonly TrackView[]>(() =>
    this._tracks().map(toTrackView),
  );

  readonly featured = computed<TrackView | undefined>(() => this.tracks()[0]);

  load(): void {
    if (this._state() === 'loading' || this._state() === 'ready') return;

    this._state.set('loading');

    this.http
      .get<unknown>(this.config.tracksEndpoint)
      .pipe(
        map(parseTracksResponse),
        tap((tracks) => {
          this._tracks.set(tracks);
          this._state.set('ready');
        }),
        catchError((error: unknown) => {
          console.error('[TracksService] unable to load tracks', error);
          this._state.set('error');
          return of([] as readonly Track[]);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  byId(id: number): TrackView | undefined {
    return this.tracks().find((track) => track.id === id);
  }
}
