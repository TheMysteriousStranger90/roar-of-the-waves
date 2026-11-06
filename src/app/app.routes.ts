import { inject } from '@angular/core';
import { CanActivateFn, Routes } from '@angular/router';

import { Lang } from '@core/i18n/translations';
import { LanguageService } from '@core/services/language.service';
import { HomeComponent } from '@features/home/home.component';

const languageGuard =
  (lang: Lang): CanActivateFn =>
  () => {
    inject(LanguageService).setLang(lang);
    return true;
  };

const pages = (): Routes => [
  { path: '', component: HomeComponent },
  {
    path: 'music',
    loadComponent: () =>
      import('@features/music/music.component').then((m) => m.MusicComponent),
  },
  {
    path: 'ai-check',
    loadComponent: () =>
      import('@features/ai-check/ai-check.component').then((m) => m.AiCheckComponent),
  },
  {
    path: 'coordinates',
    loadComponent: () =>
      import('@features/coordinates/coordinates.component').then((m) => m.CoordinatesComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('@features/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('@features/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];

export const routes: Routes = [
  { path: 'ru', canActivate: [languageGuard('ru')], children: pages() },
  { path: '', canActivate: [languageGuard('en')], children: pages() },
];
