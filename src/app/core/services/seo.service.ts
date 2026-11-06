import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { Lang } from '@core/i18n/translations';
import { localizePath } from '@core/i18n/localized-path';
import { APP_CONFIG } from '@core/tokens/app-config.token';

const OG_LOCALE: Record<Lang, string> = { en: 'en_US', ru: 'ru_RU' };
const LANGS: readonly Lang[] = ['en', 'ru'];
const JSON_LD_ID = 'rotw-jsonld';

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
    const url = this.absoluteUrl(path, lang);
    const image = this.config.shareImage;
    const imageUrl = `${this.config.origin}${image.path}`;
    const otherLang: Lang = lang === 'en' ? 'ru' : 'en';

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({ property: 'og:site_name', content: this.config.projectName });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'music.musician' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:locale', content: OG_LOCALE[lang] });
    this.meta.updateTag({ property: 'og:locale:alternate', content: OG_LOCALE[otherLang] });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:image:width', content: String(image.width) });
    this.meta.updateTag({ property: 'og:image:height', content: String(image.height) });
    this.meta.updateTag({ property: 'og:image:alt', content: image.alt });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
    this.meta.updateTag({ name: 'twitter:image:alt', content: image.alt });

    this.setCanonical(url);
    this.setAlternates(path);
  }

  /** The 404 page: out of the index, no canonical, no language alternates. */
  applyNotFound(title: string): void {
    this.title.setTitle(`${title} — ${this.config.projectName}`);
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
    this.removeLinks("link[rel='canonical']");
    this.removeLinks("link[rel='alternate'][hreflang]");
  }

  setMusicGroupJsonLd(trackUrls: readonly string[]): void {
    const payload = {
      '@context': 'https://schema.org',
      '@type': 'MusicGroup',
      name: this.config.projectName,
      description: this.config.tagline,
      url: this.config.origin,
      image: `${this.config.origin}${this.config.shareImage.path}`,
      genre: ['Neoclassical', 'Cinematic', 'Modern Classical'],
      sameAs: this.config.social.map((link) => link.href),
      track: trackUrls.map((url) => ({ '@type': 'MusicRecording', url })),
    };

    this.clearJsonLd();

    const script = this.document.createElement('script');
    script.id = JSON_LD_ID;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(payload);
    this.document.head.appendChild(script);
  }

  clearJsonLd(): void {
    this.document.getElementById(JSON_LD_ID)?.remove();
  }

  private absoluteUrl(path: string, lang: Lang): string {
    return `${this.config.origin}${localizePath(path, lang)}`;
  }

  private setCanonical(url: string): void {
    this.removeLinks("link[rel='canonical']");
    this.addLink({ rel: 'canonical', href: url });
  }

  /** `hreflang` pairs (plus `x-default` → English) so each language is indexed as its own page. */
  private setAlternates(path: string): void {
    this.removeLinks("link[rel='alternate'][hreflang]");
    for (const lang of LANGS) {
      this.addLink({ rel: 'alternate', hreflang: lang, href: this.absoluteUrl(path, lang) });
    }
    this.addLink({ rel: 'alternate', hreflang: 'x-default', href: this.absoluteUrl(path, 'en') });
  }

  private addLink(attributes: Record<string, string>): void {
    const link = this.document.createElement('link');
    for (const [name, value] of Object.entries(attributes)) link.setAttribute(name, value);
    this.document.head.appendChild(link);
  }

  private removeLinks(selector: string): void {
    this.document.head.querySelectorAll(selector).forEach((node) => node.remove());
  }
}
