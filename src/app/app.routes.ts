import {Routes} from '@angular/router';
import {HomeComponent} from '@features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Roar of the Waves',
    component: HomeComponent,
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
