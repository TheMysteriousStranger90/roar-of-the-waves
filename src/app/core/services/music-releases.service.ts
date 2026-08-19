import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, map, of, tap } from 'rxjs';

import { APP_CONFIG } from '@core/tokens/app-config.token';
import {
  MusicGenreGroup,
  MusicRelease,
  groupByGenre,
  parseMusicReleasesResponse,
} from '@core/models/music-release.model';

type LoadState = 'idle' | 'loading' | 'ready' | 'error';

@Injectable({ providedIn: 'root' })
export class MusicReleasesService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);
  private readonly destroyRef = inject(DestroyRef);

  private readonly _releases = signal<readonly MusicRelease[]>([]);
  private readonly _state = signal<LoadState>('idle');

  readonly state = this._state.asReadonly();
  readonly isLoading = computed(() => this._state() === 'loading');
  readonly hasError = computed(() => this._state() === 'error');

  readonly releases = computed(() => this._releases());
  readonly byGenre = computed<readonly MusicGenreGroup[]>(() => groupByGenre(this._releases()));

  load(): void {
    if (this._state() === 'loading' || this._state() === 'ready') return;

    this._state.set('loading');

    this.http
      .get<unknown>(this.config.musicEndpoint)
      .pipe(
        map(parseMusicReleasesResponse),
        tap((releases) => {
          this._releases.set(releases);
          this._state.set('ready');
        }),
        catchError((error: unknown) => {
          console.error('[MusicReleasesService] unable to load music releases', error);
          this._state.set('error');
          return of([] as readonly MusicRelease[]);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
