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

/** Image used for link previews (Open Graph / Twitter card). Lives in `public/`. */
export interface ShareImage {
  readonly path: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

export interface AppConfig {
  readonly projectName: string;
  readonly tagline: string;
  readonly origin: string;
  readonly shareImage: ShareImage;
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
  shareImage: {
    path: '/og-image.jpg',
    width: 1200,
    height: 630,
    alt: 'Roar of the Waves — a storm-worn lighthouse standing alone in the open sea',
  },
  // Absolute paths: the same URL must work on `/music`, `/ru/music` and while prerendering.
  tracksEndpoint: '/assets/data/tracks.json',
  filmsEndpoint: '/assets/data/coordinates-films.json',
  musicEndpoint: '/assets/data/coordinates-music.json',
  literatureEndpoint: '/assets/data/coordinates-literature.json',
  social: [
    { label: 'SoundCloud', href: 'https://soundcloud.com/the_mysterious_stranger90' },
    { label: 'YouTube', href: 'https://www.youtube.com/channel/UCVDhx9HL3iWCJN8e9kteXyg' },
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
