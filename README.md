# Roar of the Waves

Official website for the one-man musical project **Roar of the Waves** — dark piano and cinematic soundscapes.

## Stack

- Angular 19 (standalone components, no NgModules)
- Signals for state, `ChangeDetectionStrategy.OnPush`
- TypeScript strict + `strictTemplates`, `noUncheckedIndexedAccess`
- Lazy-loaded routes
- Static prerendering (`@angular/ssr`, `outputMode: "static"`) with client hydration
- Feature-sliced structure: `core` / `shared` / `features`
- Lightweight signal-based i18n — English / Russian, no third-party i18n library; the language is part of the URL (`/…` and `/ru/…`)
- SEO service (Title, Meta, Open Graph, canonical, `hreflang`, JSON-LD), `robots.txt`, `sitemap.xml`
- Security headers (CSP, `X-Content-Type-Options`, `Referrer-Policy`, `frame-ancestors`) in `vercel.json`
- Accessibility: skip-link, `prefers-reduced-motion`
- Plain SCSS with design tokens, no third-party UI libraries

## Getting started

Install dependencies and start the dev server:

```bash
npm install
npm start
```

The app will be available at `http://localhost:4200`.

## Build

```bash
npm run build
```

Build output goes to `dist/roar-of-the-waves/browser`. `npm run build` runs `ng build` (which prerenders
every route into its own `index.html`) and then `scripts/postbuild.mjs`, which writes `404.html`.

## Prerendering, SEO and hosting

- All pages exist twice — English at `/`, `/music`, `/ai-check`, `/coordinates`, `/about` and Russian under
  `/ru/…` — and are prerendered at build time, so crawlers and link-preview bots (Telegram, VK, Facebook, X)
  get the real HTML: title, description, Open Graph / Twitter tags, canonical and `hreflang` links.
- `src/index.html` carries static Open Graph defaults; `SeoService` overwrites them per page and language.
  The preview image is `public/og-image.jpg` (1200×630).
- Unknown URLs get the real `404.html` with HTTP status 404 and `noindex` (no catch-all rewrite in `vercel.json`).
- Adding a page: add it to `pages()` in `src/app/app.routes.ts`, call `SeoService.apply` with a language-neutral
  `path`, add the URL (both languages) to `public/sitemap.xml`. Use `LanguageService.link('/path')` for internal links.
- `vercel.json` sets the Content-Security-Policy. `style-src` needs `'unsafe-inline'` because Angular injects
  component styles as `<style>` elements; `script-src` is `'self'` only, which is why `inlineCritical` is switched off in
  `angular.json` (it would add an inline `onload` handler) and the theme bootstrap lives in `public/theme-init.js`.
  If you embed another third-party service, add its origin to the matching directive.

## Project structure

```
src/
├── app/
│   ├── core/        # services, models, tokens, i18n dictionary
│   ├── shared/      # reusable components, pipes, directives
│   └── features/    # pages (home, music, ai-check, coordinates, about, not-found)
├── assets/data/     # track catalogue
├── main.ts          # browser entry
├── main.server.ts   # prerender entry
└── styles/          # design tokens, reset, global styles
public/              # robots.txt, sitemap.xml, og-image.jpg, favicons, fonts
scripts/             # postbuild.mjs (404.html)
```

## Internationalization

The UI ships with English (default) and Russian copy. The URL decides the language: `/…` is English, `/ru/…`
is Russian (route guards in `src/app/app.routes.ts` set the signal held by `LanguageService`,
`src/app/core/services/language.service.ts`). All strings live in `src/app/core/i18n/translations.ts`.
The header switch opens the same page in the other language and remembers the choice in `localStorage`; a
visitor who chose Russian is sent from the bare root `/` to `/ru` on their next visit. Other URLs are never
redirected, and English is what a first-time visitor sees.

## Theming

Dark is the default theme. Visitors can switch to light mode from the
header; the choice is persisted to `localStorage`.

## Continuous integration

Every push and pull request against `main` runs
[`.github/workflows/ci.yml`](./.github/workflows/ci.yml), which installs
dependencies and builds the app in production mode.

## Author

Bohdan Harabadzhyu (Bogdan Garabagiu)

## License

MIT — see [LICENSE](./LICENSE).
