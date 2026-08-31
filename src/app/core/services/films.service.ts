import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, map, of, tap } from 'rxjs';

import { APP_CONFIG } from '@core/tokens/app-config.token';
import { Film, FilmGroup, groupByDecade, parseFilmsResponse } from '@core/models/film.model';

type LoadState = 'idle' | 'loading' | 'ready' | 'error';

@Injectable({ providedIn: 'root' })
export class FilmsService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);
  private readonly destroyRef = inject(DestroyRef);

  private readonly _films = signal<readonly Film[]>([]);
  private readonly _state = signal<LoadState>('idle');

  readonly state = this._state.asReadonly();
  readonly isLoading = computed(() => this._state() === 'loading');
  readonly hasError = computed(() => this._state() === 'error');

  readonly films = computed(() => this._films());
  readonly byDecade = computed<readonly FilmGroup[]>(() => groupByDecade(this._films()));

  load(): void {
    if (this._state() === 'loading' || this._state() === 'ready') return;

    this._state.set('loading');

    this.http
      .get<unknown>(this.config.filmsEndpoint)
      .pipe(
        map(parseFilmsResponse),
        tap((films) => {
          this._films.set(films);
          this._state.set('ready');
        }),
        catchError((error: unknown) => {
          console.error('[FilmsService] unable to load films', error);
          this._state.set('error');
          return of([] as readonly Film[]);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
