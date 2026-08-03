import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { Lang } from '@core/i18n/translations';
import { APP_CONFIG } from '@core/tokens/app-config.token';

const OG_LOCALE: Record<Lang, string> = { en: 'en_US', ru: 'ru_RU' };

export interface PageMeta {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly lang: Lang;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly config = inject(APP_CONFIG);
  private readonly document = inject(DOCUMENT);

  apply({ title, description, path, lang }: PageMeta): void {
    const fullTitle = `${title} — ${this.config.projectName}`;
    const url = `${this.config.origin}${path}`;

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'music.musician' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:locale', content: OG_LOCALE[lang] });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

    this.setCanonical(url);
  }

  setMusicGroupJsonLd(trackUrls: readonly string[]): void {
    const payload = {
      '@context': 'https://schema.org',
      '@type': 'MusicGroup',
      name: this.config.projectName,
      description: this.config.tagline,
      url: this.config.origin,
      genre: ['Neoclassical', 'Cinematic', 'Modern Classical'],
      sameAs: this.config.social.map((link) => link.href),
      track: trackUrls.map((url) => ({ '@type': 'MusicRecording', url })),
    };

    const id = 'rotw-jsonld';
    this.document.getElementById(id)?.remove();

    const script = this.document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(payload);
    this.document.head.appendChild(script);
  }

  private setCanonical(url: string): void {
    const existing = this.document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    const link = existing ?? this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    if (!existing) this.document.head.appendChild(link);
  }
}
