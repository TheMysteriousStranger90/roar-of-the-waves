import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, map, of, tap } from 'rxjs';

import { APP_CONFIG } from '@core/tokens/app-config.token';
import { Book, BookShelfGroup, groupByShelf, parseBooksResponse } from '@core/models/book.model';

type LoadState = 'idle' | 'loading' | 'ready' | 'error';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);
  private readonly destroyRef = inject(DestroyRef);

  private readonly _books = signal<readonly Book[]>([]);
  private readonly _state = signal<LoadState>('idle');

  readonly state = this._state.asReadonly();
  readonly isLoading = computed(() => this._state() === 'loading');
  readonly hasError = computed(() => this._state() === 'error');

  readonly books = computed(() => this._books());
  readonly byShelf = computed<readonly BookShelfGroup[]>(() => groupByShelf(this._books()));

  load(): void {
    if (this._state() === 'loading' || this._state() === 'ready') return;

    this._state.set('loading');

    this.http
      .get<unknown>(this.config.literatureEndpoint)
      .pipe(
        map(parseBooksResponse),
        tap((books) => {
          this._books.set(books);
          this._state.set('ready');
        }),
        catchError((error: unknown) => {
          console.error('[BooksService] unable to load books', error);
          this._state.set('error');
          return of([] as readonly Book[]);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
