import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Roar of the Waves',
    loadComponent: () =>
      import('@features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'music',
    title: 'Music — Roar of the Waves',
    loadComponent: () =>
      import('@features/music/music.component').then((m) => m.MusicComponent),
  },
  {
    path: 'coordinates',
    title: 'Coordinates — Roar of the Waves',
    loadComponent: () =>
      import('@features/coordinates/coordinates.component').then((m) => m.CoordinatesComponent,),
  },
  {
    path: 'about',
    title: 'About — Roar of the Waves',
    loadComponent: () =>
      import('@features/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('@features/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];
