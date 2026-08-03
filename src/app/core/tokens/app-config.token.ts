import { InjectionToken } from '@angular/core';

export interface SocialLink {
  readonly label: string;
  readonly href: string;
}

export interface AppConfig {
  readonly projectName: string;
  readonly tagline: string;
  readonly origin: string;
  readonly tracksEndpoint: string;
  readonly social: readonly SocialLink[];
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

export const defaultAppConfig: AppConfig = {
  projectName: 'Roar of the Waves',
  tagline: 'Dark piano and cinematic soundscapes',
  origin: 'https://roarofthewaves.com',
  tracksEndpoint: 'assets/data/tracks.json',
  social: [
    { label: 'SoundCloud', href: 'https://soundcloud.com/the_mysterious_stranger90' },
  ],
};
