import { InjectionToken } from '@angular/core';

export interface SocialLink {
  readonly label: string;
  readonly href: string;
}

export interface DeveloperCredit {
  readonly name: string;
  readonly website: string;
  readonly github: string;
  readonly email: string;
  readonly discogs: string;
}

export interface AppConfig {
  readonly projectName: string;
  readonly tagline: string;
  readonly origin: string;
  readonly tracksEndpoint: string;
  readonly filmsEndpoint: string;
  readonly musicEndpoint: string;
  readonly literatureEndpoint: string;
  readonly social: readonly SocialLink[];
  readonly developer: DeveloperCredit;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

export const defaultAppConfig: AppConfig = {
  projectName: 'Roar of the Waves',
  tagline: 'Dark piano and cinematic soundscapes',
  origin: 'https://roarofthewaves.com',
  tracksEndpoint: 'assets/data/tracks.json',
  filmsEndpoint: 'assets/data/coordinates-films.json',
  musicEndpoint: 'assets/data/coordinates-music.json',
  literatureEndpoint: 'assets/data/coordinates-literature.json',
  social: [
    { label: 'SoundCloud', href: 'https://soundcloud.com/the_mysterious_stranger90' },
    { label: 'Discogs', href: 'https://www.discogs.com/artist/18169269-Roar-of-the-Waves' },
  ],
  developer: {
    name: 'Bohdan Harabadzhyu (Bogdan Garabagiu)',
    website: 'https://bohdan-harabadzhyu-homepage.vercel.app/',
    github: 'https://github.com/TheMysteriousStranger90',
    email: 'bohdan_harabadzhyu@outlook.com',
    discogs: 'https://www.discogs.com/artist/18169272-Bogdan-Garabagiu',
  },
};
